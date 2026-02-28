class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <!-- Footer: single source of truth -->
            <footer class="py-3 my-4 border-top text-center">
                
            </footer>
        `;
  }
}

customElements.define("site-footer", SiteFooter);
