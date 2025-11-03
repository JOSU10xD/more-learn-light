<?php
/**
 * SMTP Configuration for PHPMailer
 * 
 * INSTRUCTIONS:
 * 1. Copy this file to: public/api/config.php
 * 2. Fill in your actual SMTP credentials below
 * 3. Set file permissions to 600 (read/write for owner only) for security
 * 4. Add config.php to .gitignore to keep credentials private
 * 
 * RECOMMENDED: Use Zoho Mail (free tier available)
 * - Sign up at: https://www.zoho.com/mail/
 * - Add your domain and verify DNS records
 * - Create info@moreathome.in mailbox
 * - Generate an app-specific password for better security
 * 
 * For Hostinger users:
 * - You can also use Hostinger's email service
 * - SMTP host: smtp.hostinger.com
 * - Port: 587 (TLS) or 465 (SSL)
 * - Username: your email address
 * - Password: your email password
 */

// SMTP Server Settings
define('SMTP_HOST', 'smtp.zoho.com'); // Zoho: smtp.zoho.com | Hostinger: smtp.hostinger.com | Gmail: smtp.gmail.com
define('SMTP_PORT', 587); // 587 for TLS, 465 for SSL
define('SMTP_USERNAME', 'info@moreathome.in'); // Your full email address
define('SMTP_PASSWORD', 'your-secure-password-here'); // Email password or app password

// From Address (should match SMTP_USERNAME for best deliverability)
define('SMTP_FROM_EMAIL', 'info@moreathome.in');
define('SMTP_FROM_NAME', 'More@Home Contact Form');

// Optional: Enable debug output (set to 0 in production)
define('SMTP_DEBUG', 0); // 0 = off, 1 = client messages, 2 = client and server messages

?>
