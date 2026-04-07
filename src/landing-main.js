import { onAuthReady } from "./authentication.js";
import { db } from "./firebaseConfig.js";
import {
  doc,
  onSnapshot,
  getDoc,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// Function to fetch the signed-in user's name and display it in the UI
function showName() {
  // Get the DOM element where the user's name will be displayed
  // Example: <h1 id="name-goes-here"></h1>
  const nameElement = document.getElementById("name-goes-here");
  const accountElement = document.getElementById("account-goes-here");

  // Wait until Firebase Auth finishes checking the user's auth state
  onAuthReady(async (user) => {
    // If no user is logged in, redirect to the login page
    let location_checker = location.href.split("/")[3];
    const page_to_redirect = ["account.html", "event_form.html"];
    if (!user && page_to_redirect.includes(location_checker)) {
      location.href = "login.html";
      return; // Stop execution
    }

    // Get the user's Firestore document from the "users" collection
    // Document ID is the user's unique UID
    const userDoc = await getDoc(doc(db, "users", user.uid));

    // Determine which name to display:
    const name = userDoc.exists() // 1️⃣ Use Firestore name if document exists
      ? userDoc.data().name // 2️⃣ Otherwise fallback to Firebase displayName
      : user.displayName || user.email; // 3️⃣ Otherwise fallback to email

    // If the DOM element exists, update its text using a template literal to add "!"
    if (nameElement) {
      nameElement.textContent = `${name}`;
      // accountElement.innerHTML = `E-mail: ${user.email}`;
    }
  });
}

showName();



async function displayNewWatchParties() {
  let watchPartyTemplate = document.getElementById("watchPartyTemplate");
  const container = document.getElementById("new-watch-parties");
  const watchPartyCollectionRef = collection(db, "watch_parties");
  // const q = query(collection(db, "watch_parties"), where("last_updated", ">", "timeformat"))
  try {
    const querySnapshot = await getDocs(watchPartyCollectionRef);
    container.innerHTML = "";
    querySnapshot.forEach((doc) => {
      // Clone the template
      let newParty = watchPartyTemplate.content.cloneNode(true);
      // Get watch party data once
      const party = doc.data();

      // Populate the card with watch party data
      newParty.querySelector(".host").textContent = party.host;
      newParty.querySelector(".partyType").textContent = party.partyType;
      newParty.querySelector(".address").textContent = party.address;
      newParty.querySelector(".team1").textContent = party.team1;
      newParty.querySelector(".team2").textContent = party.team2;
      newParty.querySelector(".time").textContent = party.time;

      const cardContainer = newParty.querySelector(".party-card-trigger");
      cardContainer.addEventListener("click", () => {
      document.getElementById("modalHost").textContent = party.host;
        document.getElementById("modalTeams").textContent = `${party.team1} VS ${party.team2}`;
        document.getElementById("modalAddress").textContent = party.address;
        document.getElementById("modalTime").textContent = party.time;
      });

      // Attach the new party to the container
      document.getElementById("new-watch-parties").appendChild(newParty);
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}


async function displayUpcomingWatchParties() {
  let watchPartyTemplate = document.getElementById("watchPartyTemplate");
  const container = document.getElementById("upcoming-watch-parties");
  const watchPartyCollectionRef = collection(db, "watch_parties");

  try {
    const querySnapshot = await getDocs(watchPartyCollectionRef);
    container.innerHTML = "";
    querySnapshot.forEach((doc) => {
      // Clone the template
      let newParty = watchPartyTemplate.content.cloneNode(true);
      // Get watch party data once
      const party = doc.data();

      // Populate the card with watch party data
      newParty.querySelector(".host").textContent = party.host;
      newParty.querySelector(".partyType").textContent = party.partyType;
      newParty.querySelector(".address").textContent = party.address;
      newParty.querySelector(".team1").textContent = party.team1;
      newParty.querySelector(".team2").textContent = party.team2;
      newParty.querySelector(".time").textContent = party.time;

      const cardContainer = newParty.querySelector(".party-card-trigger");
      cardContainer.addEventListener("click", () => {
      document.getElementById("modalHost").textContent = party.host;
        document.getElementById("modalTeams").textContent = `${party.team1} VS ${party.team2}`;
        document.getElementById("modalAddress").textContent = party.address;
        document.getElementById("modalTime").textContent = party.time;
      });

      // Attach the new party to the container
      document.getElementById("upcoming-watch-parties").appendChild(newParty);
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

// Call the function to display watch parties when the page loads
displayNewWatchParties();
displayUpcomingWatchParties();
