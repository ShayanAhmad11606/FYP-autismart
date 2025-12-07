# ✅ Firebase Phone Authentication - Setup Checklist

## 🎯 Pre-Implementation Status

- [x] Firebase project created: **autismart-fe54c**
- [x] Firebase package installed in frontend
- [x] Firebase package installed in backend
- [x] Phone Authentication enabled in Firebase Console
- [x] Code implementation completed

---

## 📋 Required Setup Steps

### 1️⃣ Firebase Console Setup

#### A. Download Service Account Key
- [ ] Visit: https://console.firebase.google.com/project/autismart-fe54c/settings/serviceaccounts/adminsdk
- [ ] Click "Generate New Private Key" button
- [ ] Download the JSON file
- [ ] Rename file to: `serviceAccountKey.json`
- [ ] Move to: `backend/config/serviceAccountKey.json`
- [ ] Verify file location:
  ```bash
  ls backend/config/serviceAccountKey.json
  ```

#### B. Enable Phone Authentication
- [ ] Visit: https://console.firebase.google.com/project/autismart-fe54c/authentication/providers
- [ ] Find "Phone" provider in the list
- [ ] Click on "Phone" to expand
- [ ] Toggle "Enable" switch to ON
- [ ] Click "Save" button
- [ ] Verify status shows "Enabled"

#### C. Configure Test Phone Numbers (Optional - for development)
- [ ] In Phone provider settings, expand "Phone numbers for testing"
- [ ] Click "Add phone number"
- [ ] Enter phone: `+923001234567`
- [ ] Enter code: `123456`
- [ ] Click "Add"
- [ ] Verify test number appears in list

#### D. Authorize Domains
- [ ] Go to: Authentication → Settings → Authorized domains
- [ ] Verify `localhost` is in the list (should be by default)
- [ ] For production, add your domain later

---

### 2️⃣ Backend Configuration

#### A. Verify Files Exist
- [x] `backend/config/firebaseAdmin.js` exists
- [x] `backend/controllers/authController.js` updated
- [x] `backend/routes/authRoutes.js` updated
- [x] `backend/models/User.js` updated
- [ ] `backend/config/serviceAccountKey.json` exists (YOU NEED TO ADD THIS)

#### B. Install Dependencies
- [x] `firebase-admin` installed
  ```bash
  cd backend
  npm install firebase-admin
  ```

#### C. Environment Variables (Optional)
- [ ] Check if `.env` file exists in backend folder
- [ ] Verify `JWT_SECRET` is set
- [ ] Verify `MONGODB_URI` is set
- [ ] (Optional) Add Firebase env vars if not using JSON file

#### D. Test Backend
- [ ] Start backend server:
  ```bash
  cd backend
  npm start
  ```
- [ ] Check console for: "✓ Firebase Admin initialized successfully"
- [ ] If error, check service account key location

---

### 3️⃣ Frontend Configuration

#### A. Verify Files Exist
- [x] `frontend/src/config/firebaseClient.js` exists
- [x] `frontend/src/components/Auth/PhoneAuth.jsx` exists
- [x] `frontend/src/views/App.jsx` updated with route
- [x] `frontend/src/components/Auth/Login.jsx` updated with link

#### B. Install Dependencies
- [x] `firebase` installed
  ```bash
  cd frontend
  npm install firebase
  ```

#### C. Environment Variables
- [ ] Check if `.env` file exists in frontend folder
- [ ] Add/verify:
  ```env
  VITE_API_URL=http://localhost:5000
  ```

#### D. Test Frontend
- [ ] Start frontend dev server:
  ```bash
  cd frontend
  npm run dev
  ```
- [ ] Open browser: http://localhost:5173
- [ ] Navigate to: http://localhost:5173/phone-login
- [ ] Verify page loads without errors
- [ ] Check browser console for any errors

---

### 4️⃣ Integration Testing

#### A. Test with Test Phone Number
- [ ] Backend running ✓
- [ ] Frontend running ✓
- [ ] Navigate to: http://localhost:5173/phone-login
- [ ] Enter test phone: `+923001234567`
- [ ] Click "Send OTP"
- [ ] Verify no errors in browser console
- [ ] Enter test OTP: `123456`
- [ ] Click "Verify OTP"
- [ ] Verify successful login
- [ ] Check browser redirects to dashboard
- [ ] Verify user appears in MongoDB

#### B. Check MongoDB
- [ ] Open MongoDB (Compass or command line)
- [ ] Check `users` collection
- [ ] Verify new user document:
  ```javascript
  {
    phoneNumber: "+923001234567",
    firebaseUid: "...",
    isPhoneVerified: true,
    name: "User_4567",
    role: "caregiver"
  }
  ```

#### C. Test Login Again
- [ ] Logout from application
- [ ] Go to: http://localhost:5173/phone-login
- [ ] Enter same test phone: `+923001234567`
- [ ] Verify OTP is sent
- [ ] Enter OTP: `123456`
- [ ] Verify successful login as existing user
- [ ] Check MongoDB - verify no duplicate user created

---

### 5️⃣ Real Phone Testing (Optional)

⚠️ **Warning:** This uses SMS quota

#### A. Remove Test Number
- [ ] Firebase Console → Phone provider
- [ ] Remove test number from "Phone numbers for testing"

#### B. Test with Real Phone
- [ ] Enter your real phone number with country code
- [ ] Click "Send OTP"
- [ ] Wait for SMS (may take 10-30 seconds)
- [ ] Enter received OTP
- [ ] Verify successful login

#### C. Monitor Usage
- [ ] Firebase Console → Usage & Billing
- [ ] Check "Phone Authentication" quota
- [ ] Free tier: 10,000 verifications/month

---

### 6️⃣ Security Verification

#### A. Service Account Security
- [x] `.gitignore` updated to exclude `serviceAccountKey.json`
- [ ] Verify service account file is NOT committed:
  ```bash
  git status
  # serviceAccountKey.json should NOT appear in list
  ```

#### B. Environment Variables
- [ ] Verify `.env` files are in `.gitignore`
- [ ] No sensitive data in committed code
- [ ] No API keys in frontend code (Firebase config is OK - it's public)

#### C. reCAPTCHA
- [ ] Open browser DevTools → Console
- [ ] Navigate to /phone-login
- [ ] Send OTP
- [ ] Look for "reCAPTCHA verified" message (or no errors)

---

### 7️⃣ Error Handling Testing

#### A. Test Invalid Phone
- [ ] Enter invalid phone: `123`
- [ ] Click "Send OTP"
- [ ] Verify error message displays
- [ ] Message should be user-friendly

#### B. Test Wrong OTP
- [ ] Send OTP to valid phone
- [ ] Enter wrong OTP: `000000`
- [ ] Click "Verify OTP"
- [ ] Verify error message displays
- [ ] No console errors

#### C. Test Expired OTP
- [ ] Send OTP to valid phone
- [ ] Wait 2-3 minutes
- [ ] Enter correct OTP
- [ ] Verify "OTP expired" message
- [ ] Option to resend OTP appears

#### D. Test Resend OTP
- [ ] Send OTP
- [ ] Click "Change Phone Number"
- [ ] Verify form resets
- [ ] Send OTP again
- [ ] Verify new OTP works

---

### 8️⃣ UI/UX Testing

#### A. Mobile Responsiveness
- [ ] Open browser DevTools
- [ ] Toggle device toolbar (mobile view)
- [ ] Test on iPhone SE size
- [ ] Test on iPad size
- [ ] Verify layout is responsive
- [ ] Buttons are clickable

#### B. Loading States
- [ ] Click "Send OTP"
- [ ] Verify button shows spinner
- [ ] Verify button text changes to "Sending OTP..."
- [ ] Verify button is disabled during loading

#### C. Navigation
- [ ] From /phone-login click "Email Login" link
- [ ] Verify redirects to /login
- [ ] From /login click "Login with Phone Number" link
- [ ] Verify redirects to /phone-login

---

### 9️⃣ Production Preparation (Do Later)

#### A. Environment Setup
- [ ] Set up production Firebase service account
- [ ] Configure environment variables in hosting platform
- [ ] Update VITE_API_URL to production backend
- [ ] Add production domain to Firebase authorized domains

#### B. Testing
- [ ] Test phone auth on staging environment
- [ ] Test with real phones in production
- [ ] Monitor error logs
- [ ] Check Firebase quota

#### C. Monitoring
- [ ] Set up Firebase budget alerts
- [ ] Monitor SMS usage
- [ ] Track authentication success/failure rates
- [ ] Set up error logging (Sentry, etc.)

---

## 🎉 Success Criteria

You've successfully completed the setup when:

- [x] All backend files are created and updated
- [x] All frontend files are created and updated
- [x] Dependencies installed
- [ ] Firebase service account key in place
- [ ] Phone authentication enabled in Firebase
- [ ] Test phone number configured
- [ ] Backend starts without errors
- [ ] Frontend loads /phone-login page
- [ ] Can send OTP to test number
- [ ] Can verify OTP successfully
- [ ] User is created in MongoDB
- [ ] Login works and redirects to dashboard
- [ ] No errors in browser console
- [ ] No errors in server logs

---

## 🚨 Critical Items (Must Do Now)

### Top Priority:
1. **Download Firebase Service Account Key**
   - Location: Firebase Console → Project Settings → Service Accounts
   - Save as: `backend/config/serviceAccountKey.json`

2. **Enable Phone Authentication**
   - Location: Firebase Console → Authentication → Sign-in method
   - Enable: Phone provider

3. **Add Test Phone Number**
   - Phone: `+923001234567`
   - Code: `123456`

### After Critical Items:
4. Start both servers and test
5. Verify user creation in MongoDB
6. Test login flow end-to-end

---

## 📞 Quick Test Commands

```bash
# Terminal 1 - Start Backend
cd backend
npm start

# Terminal 2 - Start Frontend
cd frontend
npm run dev

# Terminal 3 - Check MongoDB (if local)
mongosh
use autismart
db.users.find({ phoneNumber: "+923001234567" })
```

---

## 🆘 If Something Goes Wrong

### Service Account Error
```
✗ Could not load serviceAccountKey.json
```
**Fix:** Download and place `serviceAccountKey.json` in `backend/config/`

### Phone Auth Not Enabled
```
Error: Phone authentication is not enabled
```
**Fix:** Enable Phone provider in Firebase Console

### reCAPTCHA Error
```
reCAPTCHA verification failed
```
**Fix:** Clear browser cache, try incognito mode

### OTP Not Received
```
No SMS received
```
**Fix:** Use test phone number first, check Firebase quota

---

## 📊 Progress Tracker

**Implementation:** ✅ 100% Complete  
**Configuration:** ⏳ Waiting on you  
**Testing:** ⏳ Pending configuration  
**Production Ready:** ⏳ Pending testing  

---

## 🎯 Next Steps

1. [ ] Download Firebase service account key (5 minutes)
2. [ ] Enable phone authentication (2 minutes)
3. [ ] Add test phone number (2 minutes)
4. [ ] Start servers and test (5 minutes)
5. [ ] Celebrate! 🎉

**Total Time Required: ~15 minutes**

---

**Ready to complete the setup? Start with the Critical Items section above! 🚀**
