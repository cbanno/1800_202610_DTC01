// Import specific functions from the Firebase Auth SDK
import { onAuthStateChanged } from "firebase/auth"; //Detect login state
import { auth } from "/src/firebaseConfig.js"; //Firebase authentication connection
import { logoutUser } from "/src/authentication.js"; //Perform logout action

class SiteMap extends HTMLElement {
  constructor() {
    super();
    this.renderMap();
    // this.renderAuthControls();
  }

  renderMap() {
    this.innerHTML = `
      <!-- Map: single source of truth -->
      <h2>Watch Parties Near You</h2>
      <div id="map" style="width: 100%; height: 70vh"></div>

      <!-- <div>
        <div class="card"></div>
        <div class="card-body">
          <h5 class="card-title">Need Suggestion?</h5>
          <p class="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit...
          </p>
        </div>
      </div> -->`;
  }

  renderAuthControls() {
    const authControls = this.querySelector("#authControls");

    // Initialize with invisible placeholder to maintain layout space
    authControls.innerHTML = `<div class="btn btn-outline-light" style="visibility: hidden; min-width: 80px;">Log out</div>`;

    onAuthStateChanged(auth, (user) => {
      let updatedAuthControl;
      if (user) {
        updatedAuthControl = `<button class="btn btn-outline-light" id="signOutBtn" type="button" style="min-width: 80px;">Log out</button>`;
        authControls.innerHTML = updatedAuthControl;
        const signOutBtn = authControls.querySelector("#signOutBtn");
        signOutBtn?.addEventListener("click", logoutUser);
      } else {
        updatedAuthControl = `<a class="btn btn-outline-light" id="loginBtn" href="/login.html" style="min-width: 80px;">Log in</a>`;
        authControls.innerHTML = updatedAuthControl;
      }
    });
  }
}

customElements.define("site-map", SiteMap);
