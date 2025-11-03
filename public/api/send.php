<?php
/**
 * Contact Form Email Handler for Hostinger
 * Sends contact form submissions to info@moreathome.in
 * 
 * DEPLOYMENT:
 * 1. Upload this file to: public_html/api/send.php on Hostinger
 * 2. Set file permissions to 644 (or 755 if needed)
 * 3. Configure SMTP settings in config.php for better deliverability
 */

// Enable error reporting for debugging (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0); // Set to 1 for debugging, 0 for production

// CORS headers - adjust domain in production
header('Access-Control-Allow-Origin: *'); // In production, use your actual domain
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Rate limiting - simple session-based throttle
session_start();
$now = time();
$timeout = 60; // 60 seconds between submissions

if (isset($_SESSION['last_submission']) && ($now - $_SESSION['last_submission']) < $timeout) {
    http_response_code(429);
    echo json_encode([
        'success' => false,
        'message' => 'Please wait before submitting again'
    ]);
    exit();
}

// Get POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit();
}

// Extract and sanitize form fields
$name = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$email = isset($data['email']) ? trim(strip_tags($data['email'])) : '';
$phone = isset($data['phone']) ? trim(strip_tags($data['phone'])) : '';
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : '';
$honeypot = isset($data['honeypot']) ? $data['honeypot'] : '';

// Honeypot spam protection
if (!empty($honeypot)) {
    http_response_code(200); // Return success to fool bots
    echo json_encode(['success' => true, 'message' => 'Message sent']);
    exit();
}

// Server-side validation
$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Name is required (minimum 2 characters)';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Valid email is required';
}

if (empty($message) || strlen($message) < 10) {
    $errors[] = 'Message is required (minimum 10 characters)';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Validation failed',
        'errors' => $errors
    ]);
    exit();
}

// Prepare email content
$to = 'info@moreathome.in';
$subject = 'Website Contact Form - ' . $name;

// Email body (plain text)
$emailBody = "New Contact Form Submission\n";
$emailBody .= "==========================\n\n";
$emailBody .= "Name: " . $name . "\n";
$emailBody .= "Email: " . $email . "\n";
$emailBody .= "Phone: " . (!empty($phone) ? $phone : 'Not provided') . "\n\n";
$emailBody .= "Message:\n";
$emailBody .= "--------\n";
$emailBody .= $message . "\n\n";
$emailBody .= "==========================\n";
$emailBody .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
$emailBody .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";

// ============================================================================
// OPTION 1: PHP mail() function (Simple, works on most Hostinger plans)
// ============================================================================
// This is the simplest method but has lower deliverability rates

$headers = array();
$headers[] = 'From: More@Home <info@moreathome.in>'; // Use your domain email
$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>'; // Sender can be replied to directly
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

$mailSent = mail($to, $subject, $emailBody, implode("\r\n", $headers));

if ($mailSent) {
    $_SESSION['last_submission'] = $now;
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent successfully.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send email. Please try again or contact us directly.'
    ]);
}

// ============================================================================
// OPTION 2: PHPMailer with SMTP (Recommended for better deliverability)
// ============================================================================
// Uncomment the code below and comment out OPTION 1 above to use PHPMailer
// You'll need to upload PHPMailer library and configure SMTP settings

/*
// Include PHPMailer (download from: https://github.com/PHPMailer/PHPMailer)
// Upload to: public_html/api/PHPMailer/
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load SMTP configuration
if (file_exists(__DIR__ . '/config.php')) {
    require __DIR__ . '/config.php';
} else {
    // Default settings (REPLACE WITH YOUR ACTUAL SMTP DETAILS)
    define('SMTP_HOST', 'smtp.zoho.com'); // Zoho SMTP server
    define('SMTP_PORT', 587); // TLS port (use 465 for SSL)
    define('SMTP_USERNAME', 'info@moreathome.in'); // Your email
    define('SMTP_PASSWORD', 'your-email-password'); // Your email password or app password
    define('SMTP_FROM_EMAIL', 'info@moreathome.in');
    define('SMTP_FROM_NAME', 'More@Home');
}

try {
    $mail = new PHPMailer(true);
    
    // Server settings
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USERNAME;
    $mail->Password = SMTP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Use ENCRYPTION_SMTPS for port 465
    $mail->Port = SMTP_PORT;
    $mail->CharSet = 'UTF-8';
    
    // Recipients
    $mail->setFrom(SMTP_FROM_EMAIL, SMTP_FROM_NAME);
    $mail->addAddress($to);
    $mail->addReplyTo($email, $name); // Reply goes to form sender
    
    // Content
    $mail->isHTML(false); // Plain text email
    $mail->Subject = $subject;
    $mail->Body = $emailBody;
    
    $mail->send();
    
    $_SESSION['last_submission'] = $now;
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent successfully.'
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send email. Please try again later.',
        'error' => $mail->ErrorInfo // Remove in production
    ]);
}
*/

?>
