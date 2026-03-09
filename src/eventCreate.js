import { db } from "./firebaseConfig.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

async function submitEvent(e) {
    e.preventDefault();

    const title = document.getElementById("eventHost").value;
    const address = document.getElementById("eventAddress").value;
    const team1 = document.getElementById("team1").value;
    const team2 = document.getElementById("team2").value;
    const time = document.getElementById("eventTime").value;

    try {
        const watchPartyRef = collection(db, "watch_parties");

        const docRef = await addDoc(watchPartyRef, {
            address: address,
            host: title,
            team1: team1,
            team2: team2,
            time: time,
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