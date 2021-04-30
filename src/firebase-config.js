import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAQaCkC1vOOcIGm-6P5lRHHLJx8TDMZttk",
  authDomain: "video-auth.firebaseapp.com",
  projectId: "video-auth",
  storageBucket: "video-auth.appspot.com",
  messagingSenderId: "452802152678",
  appId: "1:452802152678:web:aa4e60c1ca8ea86b9bd327",
};
const firebase = Firebase.initializeApp(firebaseConfig);
export default firebase;