<?php
/**
 * Email Test Script
 * Use this to test if email sending works on your Hostinger server
 * 
 * USAGE:
 * 1. Upload to: public_html/api/test-email.php
 * 2. Visit: https://yourdomain.com/api/test-email.php in your browser
 * 3. Check if email arrives at info@moreathome.in
 * 4. DELETE this file after testing for security
 */

// Test email settings
$to = 'info@moreathome.in';
$subject = 'Test Email - More@Home Contact Form';
$message = "This is a test email sent from your Hostinger server.\n\n";
$message .= "If you receive this, your email configuration is working!\n\n";
$message .= "Server: " . $_SERVER['SERVER_NAME'] . "\n";
$message .= "Time: " . date('Y-m-d H:i:s') . "\n";

$headers = array();
$headers[] = 'From: More@Home <info@moreathome.in>';
$headers[] = 'Reply-To: info@moreathome.in';
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

echo "<!DOCTYPE html>
<html>
<head>
    <title>Email Test</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
        .success { background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; }
        .error { background: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; }
        .info { background: #d1ecf1; color: #0c5460; padding: 15px; border-radius: 5px; margin-top: 20px; }
    </style>
</head>
<body>
    <h1>Email Function Test</h1>";

if (mail($to, $subject, $message, implode("\r\n", $headers))) {
    echo "<div class='success'>
        <strong>✓ Success!</strong><br>
        Test email sent to: $to<br>
        Please check your inbox (and spam folder).
    </div>";
} else {
    echo "<div class='error'>
        <strong>✗ Failed!</strong><br>
        Could not send email using PHP mail() function.<br>
        Contact your hosting support or use PHPMailer with SMTP instead.
    </div>";
}

echo "<div class='info'>
    <strong>Server Information:</strong><br>
    PHP Version: " . phpversion() . "<br>
    Server: " . $_SERVER['SERVER_SOFTWARE'] . "<br>
    <br>
    <strong>⚠️ IMPORTANT:</strong> Delete this file after testing for security!
</div>
</body>
</html>";
?>
