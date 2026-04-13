class SitePartyListItems extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <!-- component: party-list-item -->
      <template id="watchPartyTemplate">
        <div class="card mb-3 party-card-trigger mx-auto"
          style="cursor: pointer;" 
          data-bs-toggle="modal" 
          data-bs-target="#partyModal">
        <div class="card-body d-flex justify-content-between align-items-center gap-2">

          <!-- Left: host + address -->
          <div class="d-flex flex-column" style="flex: 2; min-width: 0;">
            <div style="word-break: break-word; font-size: 1.1rem clamp(0.7rem, 2vw, 1rem);">
              <span class="host fw-semibold"></span>
            </div>
            <span class="eventDate text-muted small" style="word-break: break-word;"></span>
            <span class="partyType small text-muted fw-semibold"></span>
          </div>

          <!-- Middle: teams + time -->
          <div class="d-flex flex-column justify-content-center align-items-center text-center" style="flex: 1; min-width: 0;">
            <div style="word-break: break-word; font-size: clamp(0.7rem, 2vw, 1rem);">
              <span class="team1"></span> VS. <span class="team2"></span>
            </div>
            <span class="time small text-muted"></span>
          </div>

          <!-- Right: image -->
          <div class="d-flex justify-content-center align-items-center" style="flex: 0 0 auto;">
            <div class="border border-dark-subtle">
              <img src="images/bicycleKick.png" class="card-image" />
            </div>
          </div>

        </div>
      </div>
    </template>

    <!-- modal s
            
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
              <button type="button" class="btn btn-primary">Join Party</button>
            </div>
            </div>
          </div>
        </div>
        `;
  }
}

customElements.define("site-party-list-items", SitePartyListItems);
