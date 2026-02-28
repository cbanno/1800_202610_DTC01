// Import specific functions from the Firebase Auth SDK
import { onAuthStateChanged } from "firebase/auth"; //Detect login state
import { auth } from "/src/firebaseConfig.js"; //Firebase authentication connection
import { logoutUser } from "/src/authentication.js"; //Perform logout action

class SiteLoginButton extends HTMLElement {
  constructor() {
    super();
    this.renderLoginButton();
    this.renderAuthControls();
  }

  renderLoginButton() {
    this.innerHTML = `
            <!-- Make this button clickable, using onclick event listener -->
            
            <div id="authControls" class="auth-controls d-flex align-items-center gap-2 my-2 my-lg-0">
                <!-- populated by JS -->
            </div>
        `;
  }

  renderAuthControls() {
    const authControls = this.querySelector("#authControls");

    // Initialize with invisible placeholder to maintain layout space
    authControls.innerHTML = `<div class="btn btn-outline-light" style="visibility: hidden; min-width: 80px;">Log out</div>`;

    onAuthStateChanged(auth, (user) => {
      let updatedAuthControl;
      if (user) {
        updatedAuthControl = `<button class="btn btn-outline-dark" id="signOutBtn" type="button" style="min-width: 80px;">Log out</button>`;
        authControls.innerHTML = updatedAuthControl;
        const signOutBtn = authControls.querySelector("#signOutBtn");
        signOutBtn?.addEventListener("click", logoutUser);
      } else {
        updatedAuthControl = `<button
              onclick="window.location.href = 'login.html'"
              type="button"
              class="btn btn-success btn-lg"
            >
              Login/Signup
            </button><a class="btn btn-outline-dark" id="loginBtn" href="/login.html" style="min-width: 80px;">Log in</a>`;
        authControls.innerHTML = updatedAuthControl;
      }
    });
  }
}

customElements.define("site-login-button", SiteLoginButton);
