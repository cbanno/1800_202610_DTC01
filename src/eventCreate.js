import { db, auth } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthReady } from "./authentication.js";

const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

async function redirectNonLoggedIn() {
  
  onAuthReady(async (user) => {
    // If no user is logged in, redirect to the login page
    let location_checker = location.href.split("/")[3];
    const page_to_redirect = ["account.html", "event_form.html"];
    if (!user && page_to_redirect.includes(location_checker)) {
      location.href = "login.html";
      return; // Stop execution
    }
  })
}

redirectNonLoggedIn()

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

  let [lat, lng, formattedAddress] = await saveAddress();

  const eventName = document.getElementById("eventName").value;
  const unixTime = new Date(document.getElementById("eventDate").value);
  const eventDate = document.getElementById("eventDate").value;
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

  try {
    const watchPartyRef = collection(db, "watch_parties");

    const docRef = await addDoc(watchPartyRef, {
      address: formattedAddress,
      host: eventName,
      team1: team1,
      team2: team2,
      lat: lat,
      lng: lng,
      timestamp: Timestamp.fromDate(unixTime),
      eventDate: eventDate,
      startTime: eventStartTime,
      endTime: eventEndTime,
      partyType: partyPrivacy,
      createdBy: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    });

    console.log("Event submitted with ID: ", docRef.id);
    alert("Event successfully listed!");

    window.location.href = "account.html#created-watch-parties";
  } catch (error) {
    console.error("Error adding watch party: ", error);
    alert("Error: " + error.message);
  }
}

function showAddressStatus(message, type = "success") {
  const statusEl = document.getElementById("addressStatus");
  statusEl.className = `alert alert-${type}`;
  statusEl.textContent = message;
  statusEl.classList.remove("d-none");
}

async function saveAddress() {
  const user = auth.currentUser;

  if (!user) {
    showAddressStatus("Please log in first.", "danger");
    return;
  }

  const address = document.getElementById("eventAddress")?.value.trim();
  const postalCode = document.getElementById("eventPostalCode")?.value.trim();

  if (!address || !postalCode) {
    showAddressStatus("Please enter both address and postal code.", "warning");
    return;
  }

  try {
    showAddressStatus("Searching for address...", "info");

    const fullAddress = `${address}, ${postalCode}, Canada`;

    const url =
      `https://api.geoapify.com/v1/geocode/search` +
      `?text=${encodeURIComponent(fullAddress)}` +
      `&filter=countrycode:ca` +
      `&apiKey=${encodeURIComponent(GEOAPIFY_API_KEY)}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log("fullAddress:", fullAddress);
    console.log("Geoapify response:", data);

    if (data.error) {
      throw new Error(
        `Geocoding failed: ${data.statusCode || ""} ${data.error} - ${data.message || ""}`,
      );
    }

    if (!data.features || !data.features.length) {
      throw new Error(
        `Geocoding failed: no results found for "${fullAddress}"`,
      );
    }

    const result = data.features[0];
    const lat = result.properties.lat;
    const lng = result.properties.lon;
    const formattedAddress = result.properties.formatted;

    showAddressStatus(`Address saved!`, "success");

    return [lat, lng, formattedAddress];
  } catch (error) {
    console.error(error);
    showAddressStatus(error.message || "Failed to save address.", "danger");
  }
}

function partyTypeHelp() {
  var popup = document.querySelector(".partyTypePopupText");
  popup.classList.toggle("show");
}



loadCountries();
document
  .querySelector(".partyTypePopup")
  .addEventListener("click", partyTypeHelp);
document.getElementById("eventForm").addEventListener("submit", submitEvent);
