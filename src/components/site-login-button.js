class SiteLoginButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <!-- Make this button clickable, using onclick event listener -->
            <button
              onclick="window.location.href = 'login.html'"
              type="button"
              class="btn btn-success btn-lg"
            >
              Login/Signup
            </button>
        `;
  }
}

customElements.define("site-login-button", SiteLoginButton);