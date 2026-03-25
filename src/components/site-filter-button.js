class SiteFilterButton extends HTMLElement {
  constructor() {
    super();
    this.renderFilterButton();
  }

  renderFilterButton() {
    this.innerHTML = `
      <!-- Filter Button Dropdown -->
      <div class="sticky-filter">
        <div class="position-absolute end-0">
          <div class="dropstart">
            <button class="btn m-2 filter-button" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                <img class="nav-link" href="#" src="images/filter-list.svg" height="50px" width="40px" onclick="" />
            </button>
            <ul class="dropdown-menu">
              <form action="" target="_self">
                <li>
                  <div class="mb-3">
                    <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="Country1" />
                    <label class="form-check-label" for="Country1">Flag</label>
                    </div>
                  </div>        
                </li>
                <li>
                  <div class="mb-3">
                    <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="Country2" />
                    <label class="form-check-label" for="Country2">Flag</label>
                    </div>
                  </div>        
                </li>
                <li>
                  <div class="mb-3">
                    <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="Country3" />
                    <label class="form-check-label" for="Country3">Flag</label>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="mb-3">
                    <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="Country4" />
                    <label class="form-check-label" for="Country4">Flag</label>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="mb-3">
                    <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="Country5" />
                    <label class="form-check-label" for="Country5">Flag</label>
                    </div>
                  </div>        
                </li>
                <li>
                  <div class="mb-3">
                    <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="Country6" />
                    <label class="form-check-label" for="Country6">Flag</label>
                    </div>
                  </div>        
                </li>
                <li>
                  <div class="mb-3">
                    <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="Country6" />
                    <label class="form-check-label" for="Country6">Flag</label>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="mb-3">
                    <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="Country7" />
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
        </div>
      </div>
  `;
  }
}

customElements.define("site-filter-button", SiteFilterButton);
