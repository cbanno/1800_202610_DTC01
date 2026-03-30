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

  // Once the map loads, we can add the user location and hike markers, etc.
  // We wait for the "load" event to ensure the map is fully initialized before we try to add sources/layers.
  map.once("load", async () => {
    // Choose either the built-in geolocate control or the manual pin method
    addGeolocationControl(map);
    console.log("map loaded, placed user pin!");
  });

  function addControls(map) {
    // Zoom and rotation
    map.addControl(new maplibregl.NavigationControl(), "top-right");
  }
}

function addGeolocationControl(map) {
  const geolocate = new maplibregl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: true,
    showUserHeading: true,
  });
  map.addControl(geolocate, "top-right");

  // Show watch parties on map
  showWatchParties(map);

  // Optional: trigger a locate once the control is added
  geolocate.on("trackuserlocationstart", () => {
    // You can react to tracking start here if needed
    addUserPin(map);

    // This might work when all watch parties have lat and lng fields
    // zoomToAll(map);
  });
}

// ------------------------------------------------------------
// This function manually gets the user's geolocation and adds a custom pin to the map.
// It also adds a click event to show a popup with "You are here".
// -------------------------------------------------------------
async function addUserPin(map) {
  if (!("geolocation" in navigator)) {
    console.warn("Geolocation is not available in this browser");
    return;
  }

  // Use the safe geolocation function that returns a Promise
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
    },
    (err) => {
      console.error("Geolocation error", err);
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
  );
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
    const doc = snap.data();
    const popupHtml = `
                <div>
                 <p>${doc.host || "Watch Party"}: ${doc.team1} vs. ${doc.team2}</p>
                 <p>Address: ${doc.address}</p>
                </div> 
                `;

    // Store watch party data in global variable (array)
    // for later use (e.g., zooming to all points)
    appState.watchParties.push(doc);

    let partyType = doc.partyType;
    let pinColour = "green";

    if (partyType === "hosted") {
      pinColour = "red";
    } else if (partyType === "official") {
      pinColour = "blue";
    }

    // create pin
    const el = document.createElement("div");
    el.style.width = "16px";
    el.style.height = "16px";
    el.style.borderRadius = "50%";
    el.style.backgroundColor = pinColour;
    el.style.border = "2px solid white";

    // new layer with markers, add to map
    new maplibregl.Marker({ element: el })
      .setLngLat([doc.lng, doc.lat])
      .addTo(map);

    // Add a click event to the marker to show a popup with watch party info
    el.addEventListener("click", () => {
      // Show a popup at the watch party's location with watch party info
      new maplibregl.Popup()
        .setLngLat([doc.lng, doc.lat])
        .setHTML(popupHtml)
        .addTo(map);
    });
  });
}

// ------------------------------------------------------------
// This function calculates the bounding box that includes both the user location and all hike locations,
// and then zooms the map to fit that bounding box with some padding.
// It uses the MapLibre "fitBounds" method to smoothly zoom and pan the map.
// ------------------------------------------------------------
async function zoomToAll(map) {
  const bounds = new maplibregl.LngLatBounds();

  // user location
  console.log("User location:", appState.userLngLat);
  bounds.extend(appState.userLngLat);

  // watch party locations
  console.log("Watch Party data:", appState.watchParties);
  appState.watchParties.forEach((post) => {
    console.log(
      `Adding post to bounds: ${post.name} at [${post.lng}, ${post.lat}]`,
    );
    bounds.extend([post.lng, post.lat]);
  });

  map.fitBounds(bounds, {
    padding: 80,
    duration: 1000,
  });
}

showMap();
