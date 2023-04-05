
const firebase = require('firebase/app');
const {
    API_KEY,
    AUTH_DOMAIN, 
    PROJECT_ID, 
    STORAGE_BUCKET, 
    MESSAGING_SENDER_ID, 
    APP_ID
} = process.env;

class firebaseService {
    init() {
        // Your web app's Firebase configuration
        const firebaseConfig = {
          apiKey: API_KEY,
          authDomain: AUTH_DOMAIN,
          projectId: PROJECT_ID,
          storageBucket: STORAGE_BUCKET,
          messagingSenderId: MESSAGING_SENDER_ID,
          appId: APP_ID
        };
          
        // Initialize Firebase
        const database = firebase.initializeApp(firebaseConfig)
        // const db = firebase.firestore()
        console.log('database', database);
    
        return database;
    }

    set() {

    }
    
    //   db.collection('users')
    //   .add({
    //     first: 'Dez',
    //     last: 'Chuang',
    //     gender: 'male'
    //   })
    //   .then(function(docRef) {
    //     console.log('Document written with ID: ', docRef.id)
    //   })
    //   .catch(function(error) {
    //     console.error('Error adding document: ', error)
    //   })
}

module.exports = new firebaseService();