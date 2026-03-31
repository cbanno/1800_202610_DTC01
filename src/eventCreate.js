import { db, auth } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  GeoPoint,
} from "firebase/firestore";

const GEOAPIFY_API_KEY = "cb08da8ec6f9432cbd97d86dfb14932c".trim();

async function submitEvent(e) {
  e.preventDefault();

  const title = document.getElementById("eventHost").value;
  const address = document.getElementById("eventAddress").value;
  const team1 = document.getElementById("team1").value;
  const team2 = document.getElementById("team2").value;

  const timeHour = document.getElementById("eventTimeHour").value;
  const timeMinute = document.getElementById("eventTimeMinute").value;
  const timeAMPM = document.getElementById("eventAMPM").value;

  const partyPrivacy = document.getElementById("partyType").value;

  //combines 3 time values into one string
  const eventTime = `${timeHour}:${timeMinute} ${timeAMPM}`;
  //combine the 2 teams into 1 venueName
  const teamMatch = `${team1} VS ${team2}`;
  try {
    const watchPartyRef = collection(db, "watch_parties");

    const docRef = await addDoc(watchPartyRef, {
      address: address,
      host: title,
      venueName: teamMatch,
      team1: team1,
      team2: team2,
      time: eventTime,
      partyType: partyPrivacy,
      createdBy: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    });

    console.log("Event submitted with ID: ", docRef.id);
    alert("Event successfully listed!");

    window.location.href = "main.html?docID=${eventID}";
  } catch (error) {
    console.error("Error adding watch party: ", error);
    alert("Error: " + error.message);
  }
}
document.getElementById("eventForm").addEventListener("submit", submitEvent);
