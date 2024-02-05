// Import the functions you need from the SDKs you need
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi5DBBS49ArDNkSKYb2r5PQJmv96HKRas",
  authDomain: "nextjs-course-events-app-d42c4.firebaseapp.com",
  databaseURL:
    "https://nextjs-course-events-app-d42c4-default-rtdb.firebaseio.com",
  projectId: "nextjs-course-events-app-d42c4",
  storageBucket: "nextjs-course-events-app-d42c4.appspot.com",
  messagingSenderId: "997441568286",
  appId: "1:997441568286:web:cac6df8f6a0c250ec0380f",
  measurementId: "G-TT5M2HZ15P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export async function getAllEvents() {
  return new Promise((resolve, reject) => {
    onValue(
      ref(database, "events/"),
      (snapshot) => {
        const data = snapshot.val();
        if (!!data) {
          const events = [];

          for (const key in data) {
            events.push({
              id: key,
              ...data[key],
            });
          }

          resolve(events);
        } else {
          console.log("Data not found");
          reject();
        }
      },
      {
        onlyOnce: true,
      }
    );
  });
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
