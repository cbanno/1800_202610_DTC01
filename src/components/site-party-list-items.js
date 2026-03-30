class SitePartyListItems extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <h1 class="p-4 pb-0">Watch Parties</h1>

            <div id="watch-parties" class="p-4">
            </div>

            <!-- component: party-list-item -->
            <template id="watchPartyTemplate">
              <div class="card mb-3 party-card-trigger" 
                  style="cursor: pointer;" 
                  data-bs-toggle="modal" 
                  data-bs-target="#partyModal">
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
            
            <div class="modal fade" id="partyModal" tabindex="-1" aria-labelledby="partyModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="partyModalLabel">Watch Party Details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            <div class="modal-body">
              <h3 id="modalHost"></h3>
              <p id="modalTeams" class="fw-bold"></p>
              <p id="modalAddress"></p>
              <p id="modalTime"></p>
              <hr>
              <p>Placeholder Event Description</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-success">Join Party</button>
            </div>
            </div>
          </div>
        </div>
        `;
  }
}

customElements.define("site-party-list-items", SitePartyListItems);
