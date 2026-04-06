import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { db } from "./firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";

// ------------------------------------------------------------
// Global variable to store user location, hike data - good practice
// ------------------------------------------------------------
const appState = {
  watchParties: [],
  userLngLat: null,
};

// ------------------------------------------------------------
// This top level function initializes the MapLibre map, adds controls
// It waits for the map to load before trying to add sources/layers.
// ------------------------------------------------------------
function showMap() {
  // Initialize MapLibre
  // Centered at BCIT
  const map = new maplibregl.Map({
    container: "map",
    style: `https://api.maptiler.com/maps/streets/style.json?key=${import.meta.env.VITE_MAPTILER_KEY}`,
    center: [-123.00163752324765, 49.25324576104826],
    zoom: 10,
  });

  // Add controls (zoom, rotation, etc.) shown in top-right corner of map
  addControls(map);

  // Once the map loads, we can add the user location and watch party markers, etc.
  map.once("load", async () => {
    // Choose either the built-in geolocate control or the manual pin method
    await addGeolocationControl(map);
    console.log("map loaded, placed user pin!");
  });

  function addControls(map) {
    // Zoom and rotation
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    // Custom legend for watch party types
    const legendDiv = document.createElement("div");
    legendDiv.style.padding = "10px";
    legendDiv.innerHTML = `
      <div style="background-color: white; padding: 10px; border-radius: 4px; box-shadow: 0 0 0 2px rgba(0,0,0,0.1); font-size: 14px;">
        <div style="font-weight: bold; margin-bottom: 8px;">Watch Party Types</div>
        <div style="display: flex; align-items: center; margin-bottom: 6px;">
          <img src="images/party-private.png" style="width: 20px; height: 20px; margin-right: 8px;" />
          <span>Hosted Party</span>
        </div>
        <div style="display: flex; align-items: center;">
          <img src="images/party-public.png" style="width: 20px; height: 20px; margin-right: 8px;" />
          <span>Public Party</span>
        </div>
      </div>
    `;

    class LegendControl {
      onAdd() {
        return legendDiv;
      }
    }

    map.addControl(new LegendControl(), "top-left");
  }
}

async function addGeolocationControl(map) {
  const geolocate = new maplibregl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: true,
    showUserHeading: true,
  });
  map.addControl(geolocate, "top-right");

  // Load watch parties on map first before setting up the event
  await showWatchParties(map);
  await addUserPin(map);
  zoomToAll(map);
}

// ------------------------------------------------------------
// This function manually gets the user's geolocation and adds a custom pin to the map.
// It also adds a click event to show a popup with "You are here".
// Made this an async function to await the user location before calling zoomToAll
// -------------------------------------------------------------
async function addUserPin(map) {
  if (!("geolocation" in navigator)) {
    console.warn("Geolocation is not available in this browser");
    return;
  }

  // Use the safe geolocation function that returns a Promise
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // Store user location in global variable for later use (e.g., zooming to all points)
        appState.userLngLat = [pos.coords.longitude, pos.coords.latitude];

        // Add a GeoJSON source
        map.addSource("userLngLat", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: { type: "Point", coordinates: appState.userLngLat },
                properties: { description: "Your location" },
              },
            ],
          },
        });

        // Add a simple circle layer
        map.addLayer({
          id: "userLngLat",
          type: "circle",
          source: "userLngLat",
          paint: {
            "circle-color": "#1E90FF",
            "circle-radius": 6,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
          },
        });

        // Optional: add a tooltip on hover or click
        map.on("click", "userLngLat", (e) => {
          const [lng, lat] = e.features[0].geometry.coordinates;
          new maplibregl.Popup()
            .setLngLat([lng, lat])
            .setHTML("You are here")
            .addTo(map);
        });
        resolve();
      },
      (err) => {
        console.error("Geolocation error", err);
        reject(err);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  });
}

// ------------------------------------------------------------
// This function fetches watch party data (converted to JSON)
// from Firestore and adds green pins to the map.
// It assumes each watch party document has "lat" and "lng" fields.
// ------------------------------------------------------------
async function getWatchParties() {
  // Fetch all documents from the "watch_parties" collection in Firestore
  const snapshot = await getDocs(collection(db, "watch_parties"));

  // Convert Firestore documents to plain JavaScript objects
  // And returns a new array (list of the documents, json format)
  // Equivalent to doing this:
  //   const watchParties = [];
  //   for (const doc of snapshot.docs) {
  //       watchParties.push(doc.data());

  return snapshot;
}

// ------------------------------------------------------------
// This function takes the watch party data and adds coloured pins to the map based on partyType.
// It also stores the watch party data in a global variable for later use (e.g., zooming).
// ------------------------------------------------------------
async function showWatchParties(map) {
  // Fetch watch party data from Firestore
  const snapshot = await getWatchParties();

  // Loop through each watch party document and add a pin to the map
  snapshot.forEach((snap) => {
    // Extract the watch party data from the Firestore document
    const party = snap.data();

    // Store watch party data in global variable (array)
    // for later use (e.g., zooming to all points)
    appState.watchParties.push(party);

    let partyType = party.partyType;
    let partyColour;

    if (partyType === "hosted") {
      partyColour = "images/party-private.png";
    } else {
      partyColour = "images/party-public.png";
    }

    // create pin
    const el = document.createElement("div");
    el.style.width = "24px";
    el.style.height = "24px";
    el.style.backgroundImage = `url(${partyColour})`;
    // Add modal attributes
    el.setAttribute("data-bs-toggle", "modal");
    el.setAttribute("data-bs-target", "#partyModal");

    // Add a click event to the marker to show a popup with watch party info
    el.addEventListener("click", (e) => {
      e.stopPropagation();

      document.getElementById("modalHost").textContent = party.host;
      document.getElementById("modalTeams").textContent =
        `${party.team1} VS ${party.team2}`;
      document.getElementById("modalAddress").textContent = party.address;
      document.getElementById("modalTime").textContent = party.time;
    });

    // new layer with markers, add to map
    new maplibregl.Marker({ element: el })
      .setLngLat([party.lng, party.lat])
      .addTo(map);
  });
}

// ------------------------------------------------------------
// This function calculates the bounding box that includes both the user location and all watch party locations,
// and then zooms the map to fit that bounding box with some padding.
// It uses the MapLibre "fitBounds" method to smoothly zoom and pan the map.
// ------------------------------------------------------------
function zoomToAll(map) {
  const bounds = new maplibregl.LngLatBounds();

  bounds.extend(appState.userLngLat)

  appState.watchParties.forEach((party, index) => {
    if (party.lng !== undefined && party.lat !== undefined) {
      bounds.extend([party.lng, party.lat]);
    } else {
      console.warn(`Party ${index} has missing coordinates`);
    }
  });

  map.fitBounds(bounds, {
    padding: 100,
    duration: 1000,
  });
}

showMap();
