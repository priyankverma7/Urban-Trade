importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCqdCBSAO7GpdqQrr6Mu1qwz98_xQf-MAQ",
  authDomain: "urban-trade-90de7.firebaseapp.com",
  projectId: "urban-trade-90de7",
  storageBucket: "urban-trade-90de7.firebasestorage.app",
  messagingSenderId: "275575185879",
  appId: "1:275575185879:web:7015559b70aef7df20ab92",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[SW] Background message:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo.png",
  });
});