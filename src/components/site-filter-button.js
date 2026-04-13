import { db } from "../firebaseConfig.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

class SiteFilterButton extends HTMLElement {
  constructor() {
    super();
    this.renderFilterButton();
    this.loadCountries();

    this.addEventListener("submit", (e) => {
      if (e.target.id === "filterForm") {
        e.preventDefault();
        this.handleFilterSubmit(e) ;
      }
    });

    this.addEventListener("reset", (e) => {
      if (e.target.id === "filterForm") {
        this.dispatchEvent(new CustomEvent("filterUpdate", {
          detail: {countries: []},
          bubbles: true,
          composed: true
        })) ;

        this.closeDropdown();
      }
    });
  }

  closeDropdown() {
    const btn = this.querySelector('.filter-button');
    const instance = bootstrap.Dropdown.getInstance(btn);
    if (instance) instance.hide() ;
  }


  renderFilterButton() {
    this.innerHTML = `
      <div class="sticky-filter">
        <div class="position-absolute end-0">
          <div class="dropstart">
            <button class="btn m-2 mt-0 filter-button" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                <img src="images/filter-list.svg" height="50px" width="40px" />
             </button>
            <ul class="dropdown-menu p-3 site-filter-dropdown">
              <form id="filterForm">
                <div id="countryList" style="max-height: 250px; overflow-y: auto;">
                  <p class="text-muted small">Loading countries...</p>
                </div>
                <hr>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button class="btn btn-sm btn-outline-secondary" type="reset">Clear</button>
                 <button class="btn btn-sm btn-primary" type="submit">Confirm</button>
                </div>
              </form>
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  handleFilterSubmit(e) {
    e.preventDefault();

    const filterFlag = this.querySelectorAll(".country-filter:checked");

    const selectedFlags = Array.from(filterFlag).map(cb => cb.value) ;

    const filterEvent = new CustomEvent("filterEdit", {
      detail: { countries: selectedFlags },
      bubbles: true,
      composed: true
    });

    this.dispatchEvent(filterEvent);

    const dropdownElement = this.querySelector('.filter-button');
    const modal = bootstrap.Dropdown.getInstance(dropdownElement);
    if (modal) modal.hide();
  }

  async loadCountries() {
    const countryContainer = this.querySelector("#countryList");
    
    try {
      // 1. Fetch countries ordered by name
      const q = query(collection(db, "teams"), orderBy("team"));
      const querySnapshot = await getDocs(q);
      
      let html = "";
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const countryName = data.team;
        const group = data.group; 

        html += `
          <div class="form-check mb-2">
            <input type="checkbox" class="form-check-input country-filter" 
              id="filter-${doc.id}" value="${countryName}" data-group="${group}">
            <label class="form-check-label" for="filter-${doc.id}">
              ${countryName} <span class="badge bg-light text-dark ms-1">${group}</span>
            </label>
          </div>
        `;
      });
      
      countryContainer.innerHTML = html;
    } catch (error) {
      console.error("Error loading filters:", error);
      countryContainer.innerHTML = "Error loading filters.";
    }
  }
}

customElements.define("site-filter-button", SiteFilterButton);
