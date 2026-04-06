import { db, auth } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  GeoPoint,
} from "firebase/firestore";

const GEOAPIFY_API_KEY = "cb08da8ec6f9432cbd97d86dfb14932c".trim();

async function loadCountries() {
  const team1Dropdown = document.getElementById("team1");
  const team2Dropdown = document.getElementById("team2");

  try {
    const q = query(collection(db, "teams"), orderBy("team"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const countryName = data.team;

      let option1 = document.createElement("option");
      option1.value = `${countryName}`;
      option1.innerHTML = `${countryName}`;
      team1Dropdown.appendChild(option1);

      let option2 = document.createElement("option");
      option2.value = `${countryName}`;
      option2.innerHTML = `${countryName}`;
      team2Dropdown.appendChild(option2);
    });
  } catch (error) {
    console.error(error);
  }
}

async function submitEvent(e) {
  e.preventDefault();

  const eventName = document.getElementById("eventName").value;
  const address = document.getElementById("eventAddress").value;
  const team1 = document.getElementById("team1").value;
  const team2 = document.getElementById("team2").value;

  const startTimeHour = document.getElementById("eventStartTimeHour").value;
  const startTimeMinute = document.getElementById("eventStartTimeMinute").value;
  const startTimeAMPM = document.getElementById("eventStartAMPM").value;
  const endTimeHour = document.getElementById("eventEndTimeHour").value;
  const endTimeMinute = document.getElementById("eventEndTimeMinute").value;
  const endTimeAMPM = document.getElementById("eventEndAMPM").value;

  const partyPrivacy = document.getElementById("partyType").value;

  //combines 3 time values into one string
  const eventStartTime = `${startTimeHour}:${startTimeMinute} ${startTimeAMPM}`;
  const eventEndTime = `${endTimeHour}:${endTimeMinute} ${endTimeAMPM}`;

  //combine the 2 teams into 1 venueName
  const teamMatch = `${team1} VS ${team2}`;

  try {
    const watchPartyRef = collection(db, "watch_parties");

    const docRef = await addDoc(watchPartyRef, {
      address: address,
      eventName: eventName,
      venueName: teamMatch,
      team1: team1,
      team2: team2,
      startTime: eventStartTime,
      endTime: eventEndTime,
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

loadCountries();
document.getElementById("eventForm").addEventListener("submit", submitEvent);
