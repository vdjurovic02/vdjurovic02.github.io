importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyAxZY3TzOa8Xd3YgzyknPQ1y4LGjMQ_ItI",
    authDomain: "demoapp-b6738.firebaseapp.com",
    projectId: "demoapp-b6738",
    storageBucket: "demoapp-b6738.firebasestorage.app",
    messagingSenderId: "118920480020",
    appId: "1:118920480020:web:409562408dadea60636e01",
    measurementId: "G-BHLR9WFNH2"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});