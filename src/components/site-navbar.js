// Import specific functions from the Firebase Auth SDK
import { onAuthStateChanged } from "firebase/auth"; //Detect login state
import { auth } from "/src/firebaseConfig.js"; //Firebase authentication connection
import { logoutUser } from "/src/authentication.js"; //Perform logout action

class SiteNavbar extends HTMLElement {
  constructor() {
    super();
    this.renderNavbar();
    // this.renderAuthControls();
  }

  renderNavbar() {
    this.innerHTML = `
            <!-- Navbar: single source of truth -->
            <nav class="navbar fixed-top navbar-expand-lg bg-white">
              <div id="responsive-sidebar">
                <button class="w3-button" id="sidebar_open""><img src="images/hamburger-sprite.png" height="36" /></button>
              </div>
              <div class="w3-sidebar w3-bar-block w3-border-right fixed-top" style="display:none" id="mySidebar" id="responsive-sidebar">
                <button id="sidebar_close" class="w3-bar-item w3-large">Close &times;</button>
                <a href="main.html" class="w3-bar-item w3-button d-flex justify-content-between">Home<img src="images/home-sprite.png" height="36"/></a>
                <a href="index.html" class="w3-bar-item w3-button d-flex justify-content-between">Browse<img src="images/list-sprite.png" height="36"/></a>
                <a href="event_form.html" class="w3-bar-item w3-button d-flex justify-content-between">Create<img src="images/plus-sprite.png" height="36"/></a>
                <a href="map.html" class="w3-bar-item w3-button d-flex justify-content-between">Map<img src="images/map-sprite2.png" height="36"/></a>
              </div>


                <div class="container-fluid d-flex flex-nowrap">
                    <div class="d-flex flex-row gap-2">
                        <a class="d-flex align-items-center" href="main.html">
                            <img src="images/WWicon.png" height="36" />
                        </a>
                        <h3>World Watch</h3>
                    </div>

                    <div class="d-flex flex-row gap-2">
                        <div class="search d-flex align-items-center">
                            <input class="rounded container" placeholder="Search...">
                        </div>
                        <a href="account.html"><img src="../../images/profile.png" height="50px" width="50px"></a>
                    </div>
                </div>
            </nav>

            <link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css">
        `;
  }

  renderAuthControls() {
    const authControls = this.querySelector("#authControls");

    // Initialize with invisible placeholder to maintain layout space
    console.log(authControls);
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

customElements.define("site-navbar", SiteNavbar);
