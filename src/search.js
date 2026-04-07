import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { db } from "./firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";

async function getWatchParties() {
  // Fetch all documents from the "watch_parties" collection in Firestore
  const snapshot = await getDocs(collection(db, "watch_parties"));
  return snapshot;
}

async function getWatchPartySearchSuggestions() {
  const snapshot = await getWatchParties();
  let watchPartySearchSuggestions = [];

  // Loop through each watch party document and add a pin to the map
  snapshot.forEach((snap) => {
    // Extract the watch party data from the Firestore document
    const partyData = snap.data();
    let party = {
      id: snap.id,
      address: partyData.address,
      eventName: partyData.eventName,
      team1: partyData.team1,
      team2: partyData.team2,
      lat: partyData.lat,
      lng: partyData.lng,
      eventDate: partyData.eventDate,
      startTime: partyData.startTime,
      endTime: partyData.endTime,
      partyType: partyData.partyType,
      createdBy: partyData.createdBy,
      createdAt: partyData.createdAt,
    };

    watchPartySearchSuggestions.push(party);
  });

  return watchPartySearchSuggestions;
}

const watchPartySearchSuggestions = await getWatchPartySearchSuggestions();

// Mock data
const preDefinedSuggestions = [
  "Apple",
  "Banana",
  "Orange",
  "Grapes",
  "Strawberry",
  "Blueberry",
  "Raspberry",
  "Pineapple",
  "Mango",
  "Watermelon",
];

// Get elements
const searchInput = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");

// Add event listener to input
// searchInput.addEventListener("input", function () {
//   const query = searchInput.value.toLowerCase();
//   suggestions.innerHTML = "";

//   if (query) {
//     // watchPartySearchSuggestions.forEach((party) => {
//     //   const filteredResults = party.filter((item) =>
//     //     item.toLowerCase().includes(query),
//     //   );

//       // let filteredResults = []

//       // for (const [key, value] of Object.entries(party)) {
//       //   if (value.toLowerCase().includes(query)) {
//       //     filteredResults.push({party.id:})
//       //   }
//       // }

//       const filteredResults = preDefinedSuggestions.filter(item =>
//             item.toLowerCase().includes(query)
//         );

//       filteredResults.forEach((result) => {
//         const suggestionItem = document.createElement("div");
//         suggestionItem.classList.add("autocomplete-suggestion");
//         suggestionItem.textContent = result;
//         suggestionItem.addEventListener("click", () => {
//           searchInput.value = result;
//           suggestions.innerHTML = "";
//         });
//         suggestions.appendChild(suggestionItem);
//       });
//     });
//   }
// });

searchInput.addEventListener("input", function () {
  const query = searchInput.value.toLowerCase();
  suggestions.innerHTML = "";

  if (query) {
    const filteredResults = preDefinedSuggestions.filter((item) =>
      item.toLowerCase().includes(query),
    );

    filteredResults.forEach((result) => {
      const suggestionItem = document.createElement("div");
      suggestionItem.classList.add("autocomplete-suggestion");
      suggestionItem.textContent = result;
      suggestionItem.addEventListener("click", () => {
        searchInput.value = result;
        suggestions.innerHTML = "";
      });
      suggestions.appendChild(suggestionItem);
    });
  }
});

// Hide suggestions when clicking outside
document.addEventListener("click", function (event) {
  if (event.target !== searchInput) {
    suggestions.innerHTML = "";
  }
});
