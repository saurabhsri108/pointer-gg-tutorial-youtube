require('dotenv').config();
const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  Timestamp,
} = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);
const firestoredb = getFirestore();

async function create(nft) {
  try {
    const docRef = await addDoc(collection(firestoredb, 'nfts'), {
      ...nft,
      createdAt: Timestamp.now(),
    });
    return { data: docRef.id };
  } catch (err) {
    console.error('Error adding NFT document: ', err.message);
    return 'Error: NFT Creation Failed!';
  }
}

async function read() {
  try {
    const querySnapshot = await getDocs(collection(firestoredb, 'nfts'));
    const data = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        data.push(doc.data());
      }
    });
    return data;
  } catch (err) {
    console.log(err);
    return 'Error: Something went wrong in fetching the NFTs!';
  }
}

module.exports.create = create;
module.exports.read = read;
