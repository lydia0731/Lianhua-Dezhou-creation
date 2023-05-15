
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
     * @returns docsData
     */
    async getAllData(collection) {
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

    /** 取得 Artice 的特定資料
     * @param {object} body 
     * @returns docsData
     */
    async getArtice(body) {
        const collection = body.collection;
        const articeID = body.id;
        const articeType = body.type;
        let docRef, docSnap, docsData = [];
        // console.log(collection, articeID, articeType);
        if(articeID) {
            // 獲取某篇文章
            docRef = firestore.doc(db, collection, articeID);
            docSnap = await firestore.getDoc(docRef);
            
            let data = docSnap.data();
            if(data) {
                data.time = moment(data.time.seconds*1000).format('YYYY-MM-DD');
                docsData.push({
                    id: docSnap.id,
                    data: data
                });
            }
        } else if(articeType) {
            // 獲取文章清單(依分類)
            let query, citiesRef = firestore.collection(db, collection);
            switch(articeType) {
                case 'all':
                    query = firestore.query(citiesRef, firestore.orderBy('time', 'desc'));
                    break;
                default:
                    // query = firestore.query(citiesRef, firestore.where('tag', '==', articeType), firestore.orderBy('time', 'desc'));
                    query = firestore.query(
                        citiesRef, 
                        firestore.where('tag', 'array-contains', articeType),
                        firestore.orderBy('time', 'desc')
                    );
            }
            docSnap = await firestore.getDocs(query);
            docSnap.forEach((doc) => {
                let data = doc.data();
                if(data) {
                    data.time = moment(data.time.seconds*1000).format('YYYY-MM-DD');
                    docsData.push({
                        id: doc.id,
                        data: data
                    });
                }
            });
        }
        
        return docsData;
    }

    async getAllImage(collection) {
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
}

module.exports = new firebaseService();