import { db } from "./firebaseConfig.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

async function submitEvent(e) {
    e.preventDefault();

    const title = document.getElementById("eventHost").value;
    const address = document.getElementById("eventAddress").value;
    const team1 = document.getElementById("team1").value;
    const team2 = document.getElementById("team2").value;
    const timeHour = document.getElementById("eventTimeHour").value;
    const timeMinute = document.getElementById("eventTimeMinute").value;
    const timeAMPM = document.getElementById("eventAMPM").value;

    const isPublic = document.getElementById("eventPrivacy").checked;

    try {
        const watchPartyRef = collection(db, "watch_parties");

        const docRef = await addDoc(watchPartyRef, {
            address: address,
            host: title,
            team1: team1,
            team2: team2,
            timeHour: timeHour,
            timeMinute: timeMinute,
            isAM: timeAMPM,
            isPublic: isPublic,
            createdAt: serverTimestamp()
        });
        console.log("Event submitted with ID: ", docRef.id);
        alert("Event successfully listed!");

        document.getElementById("eventForm").reset();
    } catch (error) {
        console.error("Error adding watch party: ", error);
        alert("Error: " + error.message);
    }
}
document.getElementById("eventForm").addEventListener("submit", submitEvent);