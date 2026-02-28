// Import specific functions from the Firebase Auth SDK
import { onAuthStateChanged } from "firebase/auth"; //Detect login state
import { auth } from "/src/firebaseConfig.js"; //Firebase authentication connection
import { logoutUser } from "/src/authentication.js"; //Perform logout action

class SiteNavbar extends HTMLElement {
  constructor() {
    super();
    this.renderNavbar();
    this.renderAuthControls();
  }

  renderNavbar() {
    this.innerHTML = `
            <!-- Navbar: single source of truth -->
            <nav class="navbar navbar-expand-lg bg-warning">
            <div class="container-fluid">
                <div class="navlogo">
                    <a class="navbar-brand" href="#">
                    <img src="images/logo.jpg" height="36" />
                    </a>
                    <h4>World Watch</h4>
                </div>

                <ul class="navbar-nav">
                    <div class="search">
                        <li class="nav-item">
                            <input placeholder="Search...">
                        </li>
                        <li class="nav-item">
                            <div class="dropstart">
                            <button class="btn btn-secondary bg-danger" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                            <img class="nav-link" href="#" src="images/filter.png" height="30px" onclick="">
                            </button>
                            <ul class="dropdown-menu">
                                <form action="" target="_self">
                                <li>
                                <div class="mb-3">
                                    <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="Country1">
                                    <label class="form-check-label" for="Country1">Flag</label>
                                    </div>
                                </div>        
                                </li>
                                <li>
                                <div class="mb-3">
                                    <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="Country2">
                                    <label class="form-check-label" for="Country2">Flag</label>
                                    </div>
                                </div>        
                                </li>
                                <li>
                                <div class="mb-3">
                                    <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="Country3">
                                    <label class="form-check-label" for="Country3">Flag</label>
                                    </div>
                                </div>
                                </li>
                                <li>
                                <div class="mb-3">
                                    <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="Country4">
                                    <label class="form-check-label" for="Country4">Flag</label>
                                    </div>
                                </div>
                                </li>
                                <li>
                                <div class="mb-3">
                                    <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="Country5">
                                    <label class="form-check-label" for="Country5">Flag</label>
                                    </div>
                                </div>        
                                </li>
                                <li>
                                <div class="mb-3">
                                    <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="Country6">
                                    <label class="form-check-label" for="Country6">Flag</label>
                                    </div>
                                </div>        
                                </li>
                                <li>
                                <div class="mb-3">
                                    <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="Country6">
                                    <label class="form-check-label" for="Country6">Flag</label>
                                    </div>
                                </div>
                                </li>
                                <li>
                                <div class="mb-3">
                                    <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="Country7">
                                    <label class="form-check-label" for="Country7">Flag</label>
                                    </div>
                                </div>
                                </li>
                                <div class="d-grid p-3 gap-2 d-md-flex justify-content-md-end">
                                <button class="btn btn-primary me-md-2" type="reset">Clear</button>
                                <button class="btn btn-primary" type="submit">Confirm</button>
                                </div>
                                </form>
                            </ul>
                            </div>
                        </li>
                    </div>
                </ul>
                </divid=>
            </div>
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

customElements.define("site-navbar", SiteNavbar);
