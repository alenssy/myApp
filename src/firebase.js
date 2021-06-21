import firebase from 'firebase';

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCum-kQXqYglcb8j-xUQttgScB2Av8d7oQ",
    authDomain: "myapp-23029.firebaseapp.com",
    projectId: "myapp-23029",
    storageBucket: "myapp-23029.appspot.com",
    messagingSenderId: "970611393205",
    appId: "1:970611393205:web:bbbafb6c442aaba20734fc",
    measurementId: "G-RRY83J9R86"
  });
  
  const db = firebase.firestore();

  export { db };