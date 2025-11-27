import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// Debug: Log email credentials (masked)
console.log('Email Config Debug:');
console.log('EMAIL:', process.env.EMAIL);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'NOT SET');

// Create transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Function to send OTP email
export const sendOTPEmail = async (email, otp, name, type = 'Email Verification') => {
  try {
    const isPasswordReset = type === 'Password Reset';
    const subject = isPasswordReset ? 'Password Reset - AutiSmart' : 'Email Verification - AutiSmart';
    const heading = isPasswordReset ? 'Password Reset Request' : 'Welcome to AutiSmart!';
    const message = isPasswordReset 
      ? 'You requested to reset your password. Please use the OTP below to reset your password:' 
      : 'Thank you for registering with AutiSmart. To complete your registration, please verify your email address using the OTP below:';
    const disclaimer = isPasswordReset
      ? 'If you didn\'t request a password reset, please ignore this email or contact support if you have concerns.'
      : 'If you didn\'t create an account with AutiSmart, please ignore this email.';

    const mailOptions = {
      from: `AutiSmart <${process.env.EMAIL}>`,
      to: email,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px; }
            .otp { font-size: 32px; font-weight: bold; color: #4CAF50; text-align: center; padding: 20px; background-color: #fff; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${heading}</h1>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>${message}</p>
              <div class="otp">${otp}</div>
              <p><strong>This OTP will expire in 10 minutes.</strong></p>
              <p>${disclaimer}</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} AutiSmart. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

// Verify email configuration
export const verifyEmailConfig = async () => {
  try {
    // Check if credentials exist
    if (!process.env.EMAIL || !process.env.EMAIL_PASS) {
      console.warn('⚠️  Email credentials not configured in .env file');
      return false;
    }
    
    await transporter.verify();
    console.log('✅ Email configuration verified successfully');
    return true;
  } catch (error) {
    console.warn('⚠️  Email configuration warning:', error.message);
    console.warn('   Email functionality will not work until credentials are properly configured');
    return false;
  }
};
