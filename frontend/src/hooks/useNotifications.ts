import { useEffect } from "react";

export function useNotifications(events: any[]) {
  useEffect(() => {
    if (!("Notification" in window)) return;

    Notification.requestPermission();

    const now = new Date().getTime();

    events.forEach((event) => {
      const eventTime = new Date(event.startTime).getTime();
      const delay = eventTime - now;

      if (delay > 0) {
        const timer = setTimeout(() => {
          showNotification(event.title, delay, event);
        }, delay);

        return () => clearTimeout(timer);
      }
    });
  }, [events]);
}

function showNotification(title: string, delay: number, event: any) {
  const notif = new Notification(`⏰ Reminder: ${title}`, {
    body: "Event is starting now!",
    requireInteraction: true,
  });

  notif.onclick = () => {
    notif.close();
  };

  notif.onclose = () => {
    console.log("Notification closed.");
  };

  notif.onshow = () => {
    // Add a snooze timer (5 minutes or 10 seconds for testing)
    setTimeout(() => {
      if (!notif.closed) {
        new Notification(`🔁 Snoozed: ${title}`, {
          body: "Reminder after 5 mins (simulated: 10 seconds)",
        });
      }
    }, 10000); // 🔁 10 seconds for demo (replace with 5 * 60 * 1000)
  };
}
