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
    let location_checker = location.href.split('/')[3]
    const page_to_redirect = ["account.html", "event_form.html"]
    if (!user && page_to_redirect.includes(location_checker)) {
      location.href = "login.html";
      return; // Stop execution
    } else if (!user && location_checker == "home.html"){
      location.href = "index.html"
      return;
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
      accountElement.innerHTML = `E-mail: ${user.email} </br> Country: ${userDoc.data().country} </br> School: ${userDoc.data().school}`;
    }
  });
}

showName();

// -----------------Watch party:database------------------------------------------------------
function addWatchPartyData() {
  const watchPartyRef = collection(db, "watch_parties");
  console.log("Adding sample watch party data...");
  addDoc(watchPartyRef, {
    watchPartyID: "12345",
    venueName: "TEAM1 VS TEAM2",
    address: "555 Main St.",
    host: "Dave's bar",
    time: "5:00pm",
    partyType: "public",
    team1: "team1",
    team2: "team2",
    last_updated: serverTimestamp(),
  });
  addDoc(watchPartyRef, {
    watchPartyID: "67890",
    venueName: "TEAM3 VS TEAM4",
    address: "655 Main St.",
    host: "Bob",
    time: "10:00pm",
    partyType: "hosted",
    team1: "team3",
    team2: "team4",
    last_updated: serverTimestamp(),
  });
  addDoc(watchPartyRef, {
    watchPartyID: "10111",
    venueName: "TEAM5 VS TEAM6",
    address: "755 Main St.",
    host: "Fred's diner",
    time: "7:00pm",
    partyType: "official",
    team1: "team5",
    team2: "team6",
    last_updated: serverTimestamp(),
  });
}

// Seeds the "watch_party" collection with initial data if it is empty
async function seedWatchParties() {
  // Get a reference to the "watch_parties" collection
  const watchPartyRef = collection(db, "watch_parties");

  // Retrieve all documents currently in the collection
  const querySnapshot = await getDocs(watchPartyRef);

  // If no documents exist, the collection is empty
  if (querySnapshot.empty) {
    console.log("Watch Parties collection is empty. Seeding data...");

    // Call function to insert default watch party documents
    addWatchPartyData();
  } else {
    // If documents already exist, do not reseed
    console.log("Watch_Party collection already contains data. Skipping seed.");
  }
}

// Call the seeding function when the main.html page loads.
seedWatchParties();

async function displayWatchParties() {
  let watchPartyTemplate = document.getElementById("watchPartyTemplate");
  const watchPartyCollectionRef = collection(db, "watch_parties");

  try {
    const querySnapshot = await getDocs(watchPartyCollectionRef);
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

      // Attach the new party to the container
      document.getElementById("watch-parties").appendChild(newParty);
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

// Call the function to display watch parties when the page loads
displayWatchParties();
