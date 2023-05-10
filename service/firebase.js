
const initApp = require('firebase/app');
const firestore = require('firebase/firestore');
const moment = require('moment');

const {DB_NAME,DB_SERVICE,DB_APP_ID, DB_API_KEY,DB_AUTH_DOMAIN,DB_PROJECT_ID,DB_STORAGE_BUCKET,DB_MESSAGING_SENDER_ID} = process.env;
const firebaseConfig = {
    databaseURL: DB_NAME + DB_SERVICE,
    apiKey: DB_API_KEY,
    authDomain: DB_AUTH_DOMAIN,
    projectId: DB_PROJECT_ID,
    storageBucket: DB_STORAGE_BUCKET,
    messagingSenderId: DB_MESSAGING_SENDER_ID,
    appId: DB_APP_ID
};

// 初始化 Firebase
const app = initApp.initializeApp(firebaseConfig);
const db = firestore.getFirestore(app);

class firebaseService {
    /** 取得某個 collection 的全部資料
     * @param {string} collection 
     * @returns 
     */
    async getAllArtice(collection) {
        let citiesRef = firestore.collection(db, collection);
        let query = firestore.query(citiesRef, firestore.orderBy('time', 'desc'));
        
        let docSnap = await firestore.getDocs(query);
        let docsData = [];
        docSnap.forEach((doc) => {
            let data = doc.data();
            data.time = moment(data.time.seconds*1000).format('YYYY-MM-DD');
            docsData.push({
                id: doc.id,
                data: data
            });
        });
        
        return docsData;
    }

    /** 取得某個 collection 的特定資料
     * @param {string} collection 
     * @param {string} body 
     * @returns 
     */
    async getData(collection, body) {
        // const docRef = firestore.doc(db, "article_type", "1");
        // const docSnap = await firestore.getDoc(docRef);
        // if (docSnap.exists()) {
        //     console.log("Document data:", docSnap.data());
        // } else {
        //     // docSnap.data() will be undefined in this case
        //     console.log("No such document!");
        // }
    }
}

module.exports = new firebaseService();