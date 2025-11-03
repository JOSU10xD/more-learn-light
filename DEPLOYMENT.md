# Contact Form Email Setup - Deployment Guide

## Overview
This guide explains how to deploy the contact form email functionality on Hostinger using PHP (free, no external services required).

## Architecture
- **Frontend**: React form that POSTs JSON to `/api/send.php`
- **Backend**: PHP script that sends emails via `mail()` or SMTP
- **Email Recipient**: info@moreathome.in

---

## Quick Start (Hostinger Deployment)

### Step 1: Build the Frontend
```bash
npm run build
```
This creates the `dist/` folder with your production-ready React app.

### Step 2: Upload to Hostinger

**Upload these files to your Hostinger File Manager:**

1. **Upload the entire `dist/` folder contents** to `public_html/`
   - `public_html/index.html`
   - `public_html/assets/...`
   - `public_html/.htaccess` (already included for routing)

2. **Upload the PHP email handler** to `public_html/api/send.php`
   - Create folder: `public_html/api/`
   - Upload: `public/api/send.php` → `public_html/api/send.php`

3. **Set file permissions**:
   - Right-click `send.php` → Change Permissions → Set to `644` or `755`

### Step 3: Test the Form

1. **Visit your contact page**: `https://yourdomain.com/contact`
2. **Fill out the form** with test data
3. **Click "Send Message"**
4. **Check email** at info@moreathome.in (check spam folder too)

---

## Testing Checklist

### Basic Test (Using test-email.php)
```bash
# 1. Upload public/api/test-email.php to public_html/api/test-email.php
# 2. Visit in browser: https://yourdomain.com/api/test-email.php
# 3. Check if email arrives at info@moreathome.in
# 4. DELETE test-email.php after testing
```

### Form Submission Test
```bash
# Using curl (from terminal):
curl -X POST https://yourdomain.com/api/send.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 1234567890",
    "message": "This is a test message from the contact form.",
    "honeypot": ""
  }'

# Expected response:
# {"success":true,"message":"Thank you! Your message has been sent successfully."}
```

### Validation Test
```bash
# Test with missing fields (should fail):
curl -X POST https://yourdomain.com/api/send.php \
  -H "Content-Type: application/json" \
  -d '{"name":"","email":"invalid","message":""}'

# Expected response:
# {"success":false,"message":"Validation failed","errors":[...]}
```

---

## Email Delivery Options

### Option 1: PHP mail() Function (Default - Simplest)
**Pros:**
- ✅ Already enabled in `send.php`
- ✅ No configuration needed
- ✅ Works on most Hostinger plans
- ✅ Completely free

**Cons:**
- ⚠️ Lower deliverability (may go to spam)
- ⚠️ No SMTP authentication

**Status:** Currently active in `send.php`

---

### Option 2: PHPMailer with SMTP (Recommended for Production)
**Pros:**
- ✅ Much better deliverability
- ✅ SMTP authentication
- ✅ Professional email handling
- ✅ Still free if using Zoho/Gmail

**Cons:**
- ⚠️ Requires SMTP credentials
- ⚠️ Slightly more setup

**Setup Instructions:**

1. **Download PHPMailer**
   ```bash
   # On your local machine:
   cd public/api/
   wget https://github.com/PHPMailer/PHPMailer/archive/refs/tags/v6.9.1.zip
   unzip v6.9.1.zip
   mv PHPMailer-6.9.1/src PHPMailer
   ```

2. **Upload to Hostinger**
   - Upload `public/api/PHPMailer/` folder to `public_html/api/PHPMailer/`

3. **Configure SMTP Settings**
   - Copy `public/api/config.example.php` to `public/api/config.php`
   - Edit `config.php` with your SMTP credentials (see below)
   - Upload to: `public_html/api/config.php`
   - Set permissions to `600` (owner read/write only)

4. **Edit send.php**
   - Comment out the OPTION 1 code block (lines with `mail()`)
   - Uncomment the OPTION 2 code block (PHPMailer section)
   - Upload updated `send.php`

**SMTP Provider Options:**

#### Using Zoho Mail (Recommended - Free Tier Available)
```php
define('SMTP_HOST', 'smtp.zoho.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'info@moreathome.in');
define('SMTP_PASSWORD', 'your-zoho-password');
```

**Setup:**
1. Sign up at https://www.zoho.com/mail/
2. Add your domain `moreathome.in` and verify DNS
3. Create mailbox `info@moreathome.in`
4. Generate app-specific password for security

#### Using Hostinger Email
```php
define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'info@moreathome.in');
define('SMTP_PASSWORD', 'your-email-password');
```

---

### Option 3: Formspree (No-Server Alternative)
**Pros:**
- ✅ Zero backend code needed
- ✅ Instant setup
- ✅ Free tier: 50 submissions/month

**Cons:**
- ⚠️ Limited free submissions
- ⚠️ External dependency

**Setup:**
1. Sign up at https://formspree.io
2. Create a form, set recipient to `info@moreathome.in`
3. Get your form endpoint (e.g., `https://formspree.io/f/abcd1234`)
4. In ContactForm.tsx, uncomment the Formspree code block
5. Replace `YOUR_FORM_ID` with your actual form ID

---

## Security Features Implemented

- ✅ **Server-side validation**: All fields validated before sending
- ✅ **Honeypot protection**: Hidden field catches bots
- ✅ **Rate limiting**: Max 1 submission per 60 seconds per session
- ✅ **Input sanitization**: All inputs stripped of HTML tags
- ✅ **Email validation**: Proper regex + PHP filter_var
- ✅ **XSS prevention**: No direct HTML rendering of user input
- ✅ **CORS headers**: Configurable origin restrictions

---

## Improving Email Deliverability

### 1. DNS Records (Recommended for Production)
Add these DNS records in your Hostinger control panel:

**SPF Record:**
```
Type: TXT
Host: @
Value: v=spf1 include:_spf.hostinger.com ~all
```
Or if using Zoho:
```
Value: v=spf1 include:zoho.com ~all
```

**DKIM Record:** (Get from Zoho or Hostinger email settings)

**DMARC Record:**
```
Type: TXT
Host: _dmarc
Value: v=DMARC1; p=none; rua=mailto:info@moreathome.in
```

### 2. Email Best Practices
- Always send FROM your domain email (info@moreathome.in)
- Use Reply-To for sender's email (so you can reply directly)
- Include plain text content (avoid HTML-only emails)
- Don't send too frequently (rate limiting already implemented)

---

## Troubleshooting

### Email not received?
1. **Check spam folder** first
2. **Test with test-email.php** to isolate the issue
3. **Check PHP error logs** in Hostinger control panel
4. **Verify email address** info@moreathome.in exists and is active
5. **Try SMTP option** (PHPMailer) for better deliverability

### Form shows "Failed to send"?
1. **Check browser console** for network errors
2. **Check send.php permissions** (should be 644 or 755)
3. **Verify API path** is correct: `/api/send.php`
4. **Check CORS headers** if domain is different

### 403 Forbidden error?
- File permissions issue - set send.php to 755
- Check .htaccess isn't blocking PHP execution

### 500 Server Error?
- Check PHP error logs in Hostinger
- Enable error display temporarily in send.php (set display_errors = 1)
- Verify PHP version compatibility (requires PHP 7.0+)

---

## File Structure (After Deployment)

```
public_html/
├── index.html                 # React app entry point
├── assets/                    # React app assets
├── .htaccess                  # Routing configuration
└── api/
    ├── send.php              # Email handler (REQUIRED)
    ├── config.php            # SMTP credentials (optional, for PHPMailer)
    └── PHPMailer/            # PHPMailer library (optional)
        ├── Exception.php
        ├── PHPMailer.php
        └── SMTP.php
```

---

## Production Checklist

Before going live:

- [ ] Build frontend: `npm run build`
- [ ] Upload `dist/` contents to `public_html/`
- [ ] Upload `send.php` to `public_html/api/`
- [ ] Set file permissions (644 or 755)
- [ ] Test form submission from live site
- [ ] Verify email arrives at info@moreathome.in
- [ ] Delete test-email.php (if used)
- [ ] Configure SPF/DKIM DNS records
- [ ] Consider switching to PHPMailer+SMTP for production
- [ ] Add config.php to .gitignore
- [ ] Monitor for spam submissions

---

## Support & Resources

- **Hostinger Email Guide**: https://support.hostinger.com/en/articles/1583288-how-to-create-an-email-account
- **PHPMailer Documentation**: https://github.com/PHPMailer/PHPMailer
- **Zoho Mail Setup**: https://www.zoho.com/mail/help/adminconsole/configure-email-delivery.html
- **SPF Record Generator**: https://mxtoolbox.com/SPFRecordGenerator.aspx

---

## Cost Comparison

| Method | Setup Cost | Monthly Cost | Deliverability | Maintenance |
|--------|-----------|-------------|----------------|-------------|
| PHP mail() | Free | Free | Medium | None |
| PHPMailer + Zoho | Free | Free | High | Low |
| PHPMailer + Hostinger Email | Free | ~$1-2/mo | High | Low |
| Formspree Free | Free | Free (50/mo limit) | High | None |
| Formspree Pro | Free | $10/mo | High | None |

**Recommendation**: Start with PHP mail(), then upgrade to PHPMailer + Zoho if emails go to spam.
