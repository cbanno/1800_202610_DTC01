// Import specific functions from the Firebase Auth SDK
import { onAuthStateChanged } from "firebase/auth"; //Detect login state
import { auth } from "/src/firebaseConfig.js"; //Firebase authentication connection
import { logoutUser } from "/src/authentication.js"; //Perform logout action

class SiteFooter extends HTMLElement {
  constructor() {
    super();
    this.renderFooter();
    // this.renderAuthControls();
  }

  renderFooter() {
    this.innerHTML = `
            <!-- Footer: single source of truth -->
          <nav class="navbar fixed-bottom bg-white">
            <div class="container-fluid d-flex flex-nowrap">
              <a class="navbar-brand" href="main.html">
                <img src="images/home-sprite.png" height="36" />
              </a>
              <a class="navbar-brand" href="index.html">
                <img src="images/list-sprite.png" height="36" />
              </a>
              <a class="navbar-brand" href="event_form.html">
                <img src="images/plus-sprite.png" height="36" />
              </a>
              <a class="navbar-brand" href="map.html">
                <img src="images/map-sprite.png" height="36" />
              </a>
          </nav>
        `;
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

customElements.define("site-footer", SiteFooter);
