import { useEffect } from "react";
import { onForegroundMessage } from "../firebase/messaging";

export const useNotification = () => {
  useEffect(() => {
    const unsubscribe = onForegroundMessage((payload) => {
      if (Notification.permission !== "granted") return;

      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/logo.png",
      });
    });

    return () => unsubscribe();
  }, []);
};