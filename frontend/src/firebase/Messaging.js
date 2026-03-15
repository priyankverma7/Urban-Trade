import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseApp } from "./firebase";

export const messaging = getMessaging(firebaseApp);

export const requestPermissionAndGetToken = async () => {
  if (!("Notification" in window)) {
    alert("Browser does not support notifications");
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    alert("Permission denied");
    return;
  }

  try {
    const token = await getToken(messaging, {
      vapidKey:"BMdEwSVHvBjvD48aHPIhaMmyCVmRS766nEfoQ1xdHa8RjEJ73EJD6ZU9aeAeVRLh4pviexzv_AdmqbL6k6h6gjg" ,
    });
    console.log("FCM Token:", token);
    return token;
  } catch (err) {
    console.error("Token Error:", err);
  }
};

export const onForegroundMessage = (callback) => {
  onMessage(messaging, (payload) => {
    callback(payload);
  });
};