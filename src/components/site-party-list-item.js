class SitePartyListItem extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <!-- component: party-list-item -->
              <div class="card mb-3">
                <div class="card-body d-flex justify-content-between">
                  <div class="d-flex flex-column">
                    <span>Venue Name</span>
                    <span>555 Main St.</span>
                    <span>Vancouver, BC</span>
                    <br />
                    <span>17.4 km away</span>
                  </div>
                  <div class="d-flex justify-content-center align-items-center">
                    <span>TEAM VS. TEAM</span>
                  </div>
                  <div class="d-flex justify-content-center align-items-center">
                    <div class="border border-dark-subtle">
                      <img
                        src="images/sadia-afreen-0ff2wEWSeTA-unsplash.jpg"
                        class="card-image"
                      />
                    </div>
                  </div>
                </div>
              </div>
        `;
  }
}

customElements.define("site-party-list-item", SitePartyListItem);
