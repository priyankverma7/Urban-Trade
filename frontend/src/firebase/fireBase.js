import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCqdCBSAO7GpdqQrr6Mu1qwz98_xQf-MAQ",
  authDomain: "urban-trade-90de7.firebaseapp.com",
  projectId: "urban-trade-90de7",
  storageBucket: "urban-trade-90de7.firebasestorage.app",
  messagingSenderId: "275575185879",
  appId: "1:275575185879:web:7015559b70aef7df20ab92",
  measurementId: "G-N9HYBRE8CT",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);