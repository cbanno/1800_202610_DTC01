class SitePartyListItems extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <h1>Watch Parties</h1>

            <div id="watch-parties" class="row p-4">
            </div>

            <!-- component: party-list-item -->
            <template id="watchPartyTemplate">
              <div class="card mb-3">
                <div class="card-body d-flex justify-content-between">
                  <div class="d-flex flex-column">
                    <div class="flex">
                      <span class="host"></span> (<span class="partyType"></span>)
                    </div>
                    <span class="address"></span>
                    <br />
                    <span>17.4 km away</span>
                  </div>
                  <div class="d-flex flex-column justify-content-center align-items-center">
                    <div>
                      <span class="team1"></span> VS. <span class="team2"></span>
                    </div>
                    <span class="time"></span>
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
            </template>
        `;
  }
}

customElements.define("site-party-list-items", SitePartyListItems);
