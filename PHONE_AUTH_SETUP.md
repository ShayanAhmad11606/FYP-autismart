# Firebase Phone Authentication Setup Guide

## Overview
This guide will help you set up Firebase Phone Authentication for AutiSmart. Users can now login using their phone number with OTP verification.

---

## Backend Setup

### 1. Install Required Dependencies

```bash
cd backend
npm install firebase-admin
```

### 2. Generate Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **autismart-fe54c**
3. Click on the gear icon ⚙️ → **Project Settings**
4. Navigate to **Service Accounts** tab
5. Click **Generate New Private Key**
6. A JSON file will be downloaded (e.g., `autismart-fe54c-firebase-adminsdk-xxxxx.json`)

### 3. Add Service Account Key to Backend

**Option 1: Using File (Recommended for Development)**

1. Rename the downloaded file to `serviceAccountKey.json`
2. Move it to: `backend/config/serviceAccountKey.json`
3. Add to `.gitignore` to keep it secure:

```gitignore
# Firebase Service Account
backend/config/serviceAccountKey.json
```

**Option 2: Using Environment Variables (Recommended for Production)**

Add these to your `.env` file:

```env
FIREBASE_PROJECT_ID=autismart-fe54c
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@autismart-fe54c.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_CLIENT_CERT_URL=your_cert_url
```

### 4. Update User Model (Already Done ✓)

The User model has been updated with:
- `phoneNumber`: Stores the user's phone number
- `isPhoneVerified`: Boolean flag for verification status
- `firebaseUid`: Unique Firebase user ID

---

## Frontend Setup

### 1. Install Firebase SDK

```bash
cd frontend
npm install firebase
```

### 2. Firebase Console Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select **autismart-fe54c** project
3. Go to **Authentication** → **Sign-in method**
4. Enable **Phone** authentication
5. Add your domain to authorized domains:
   - `localhost` (for development)
   - Your production domain (e.g., `autismart.com`)

### 3. Add reCAPTCHA Site Key (Optional)

For invisible reCAPTCHA (already configured in code):
- Firebase automatically handles reCAPTCHA for phone auth
- No additional configuration needed for basic setup

### 4. Update Environment Variables

Create or update `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

---

## Testing Phone Authentication

### Test Phone Numbers (Development Only)

For testing without sending real SMS:

1. Go to Firebase Console → **Authentication** → **Sign-in method**
2. Scroll to **Phone** section
3. Click **Phone numbers for testing**
4. Add test numbers:

```
Phone Number: +923001234567
OTP Code: 123456
```

### Testing Flow

1. Navigate to: `http://localhost:5173/phone-login`
2. Enter phone number: `+923001234567` (or your test number)
3. Click **Send OTP**
4. Enter OTP: `123456` (or your configured test OTP)
5. Click **Verify OTP**
6. You should be logged in and redirected to dashboard

---

## Usage

### For Users

1. **New Users:**
   - Visit `/phone-login`
   - Enter phone number with country code (e.g., `+923001234567`)
   - Receive OTP via SMS
   - Enter OTP to verify
   - Account is created automatically on first login

2. **Existing Users:**
   - Visit `/phone-login`
   - Enter registered phone number
   - Receive OTP via SMS
   - Enter OTP to login

### For Developers

**PhoneAuth Component:**
```jsx
import PhoneAuth from './components/Auth/PhoneAuth';

// Use in route
<Route path="/phone-login" element={<PhoneAuth />} />
```

**Backend API Endpoint:**
```javascript
POST /api/auth/firebase-login
Body: {
  idToken: "firebase_id_token",
  phoneNumber: "+923001234567"
}

Response: {
  success: true,
  data: {
    token: "jwt_token",
    user: { ... }
  }
}
```

---

## Security Best Practices

### 1. Protect Service Account Key
- Never commit `serviceAccountKey.json` to version control
- Use environment variables in production
- Rotate keys periodically

### 2. Rate Limiting
- Firebase automatically limits SMS sends per phone number
- Implement additional backend rate limiting if needed

### 3. Phone Number Validation
- Always validate phone number format
- Use international format (+country_code + number)
- Validate on both frontend and backend

### 4. User Data
- Store minimal user data for phone-only accounts
- Prompt users to complete profile after login
- Allow linking email to phone accounts

---

## Troubleshooting

### Issue: "Firebase Admin not initialized"
**Solution:** Ensure `serviceAccountKey.json` exists or environment variables are set correctly.

### Issue: "Invalid phone number format"
**Solution:** Use international format with country code: `+923001234567`

### Issue: "reCAPTCHA verification failed"
**Solution:** 
- Check if domain is authorized in Firebase Console
- Clear browser cache
- Ensure pop-ups are not blocked

### Issue: "SMS not received"
**Solution:**
- Check Firebase quota limits
- Verify phone number is correct
- Use test phone numbers for development
- Check Firebase Console logs

### Issue: "OTP expired"
**Solution:** 
- OTP is valid for 60 seconds by default
- Request a new OTP
- Implement resend functionality (already included)

---

## File Structure

```
backend/
├── config/
│   ├── firebaseAdmin.js          # Firebase Admin SDK initialization
│   └── serviceAccountKey.json    # Service account credentials (DO NOT COMMIT)
├── controllers/
│   └── authController.js         # Added firebaseLogin function
├── models/
│   └── User.js                   # Updated with phone fields
└── routes/
    └── authRoutes.js             # Added /firebase-login route

frontend/
├── src/
│   ├── components/
│   │   └── Auth/
│   │       ├── PhoneAuth.jsx     # Complete phone auth component
│   │       └── Login.jsx         # Updated with phone login link
│   ├── config/
│   │   └── firebaseClient.js     # Firebase client initialization
│   └── views/
│       └── App.jsx               # Added /phone-login route
```

---

## API Reference

### Backend Endpoints

#### POST /api/auth/firebase-login
Authenticates user with Firebase ID token.

**Request:**
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6...",
  "phoneNumber": "+923001234567"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "User Name",
      "phoneNumber": "+923001234567",
      "role": "caregiver",
      "isPhoneVerified": true
    }
  }
}
```

---

## Next Steps

1. ✅ Test phone authentication in development
2. ✅ Configure test phone numbers
3. ✅ Add production domain to Firebase
4. ✅ Set up environment variables for production
5. ✅ Monitor Firebase quota usage
6. ✅ Implement user profile completion flow
7. ✅ Add analytics for phone login tracking

---

## Support

For issues or questions:
- Check Firebase Console logs
- Review backend server logs
- Test with Firebase test phone numbers first
- Verify all environment variables are set correctly

---

## Credits

Built with:
- Firebase Authentication (Phone Auth)
- Firebase Admin SDK
- React + Vite
- Node.js + Express
- MongoDB + Mongoose
