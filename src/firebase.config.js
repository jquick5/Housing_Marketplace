import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAXnUqHV5rO6I_T5FREhI-oePEkVOtUV5g',
	authDomain: 'housing-marketplace-app-cb630.firebaseapp.com',
	projectId: 'housing-marketplace-app-cb630',
	storageBucket: 'housing-marketplace-app-cb630.appspot.com',
	messagingSenderId: '835100336599',
	appId: '1:835100336599:web:f8482bfc04d60798eb6b92',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
