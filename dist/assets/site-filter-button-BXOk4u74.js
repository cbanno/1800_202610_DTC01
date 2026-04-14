import{q as a,c as d,d as c,j as u,g as m}from"./app-B_O6vh0-.js";class p extends HTMLElement{constructor(){super(),this.renderFilterButton(),this.loadCountries(),this.addEventListener("submit",t=>{t.target.id==="filterForm"&&(t.preventDefault(),this.handleFilterSubmit(t))}),this.addEventListener("reset",t=>{t.target.id==="filterForm"&&(this.dispatchEvent(new CustomEvent("filterUpdate",{detail:{countries:[]},bubbles:!0,composed:!0})),this.closeDropdown())})}closeDropdown(){const t=this.querySelector(".filter-button"),e=bootstrap.Dropdown.getInstance(t);e&&e.hide()}renderFilterButton(){this.innerHTML=`
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
    `}handleFilterSubmit(t){t.preventDefault();const e=this.querySelectorAll(".country-filter:checked"),n=Array.from(e).map(i=>i.value),o=new CustomEvent("filterEdit",{detail:{countries:n},bubbles:!0,composed:!0});this.dispatchEvent(o);const r=this.querySelector(".filter-button"),s=bootstrap.Dropdown.getInstance(r);s&&s.hide()}async loadCountries(){const t=this.querySelector("#countryList");try{const e=a(d(c,"teams"),u("team")),n=await m(e);let o="";n.forEach(r=>{const s=r.data(),i=s.team,l=s.group;o+=`
          <div class="form-check mb-2">
            <input type="checkbox" class="form-check-input country-filter" 
              id="filter-${r.id}" value="${i}" data-group="${l}">
            <label class="form-check-label" for="filter-${r.id}">
              ${i} <span class="badge bg-light text-dark ms-1">Group ${l}</span>
            </label>
          </div>
        `}),t.innerHTML=o}catch(e){console.error("Error loading filters:",e),t.innerHTML="Error loading filters."}}}customElements.define("site-filter-button",p);
