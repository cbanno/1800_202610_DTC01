import{m as i,n as o,k as s}from"./app-B_O6vh0-.js";class l extends HTMLElement{constructor(){super(),this.renderLoginButton(),this.renderAuthControls()}renderLoginButton(){this.innerHTML=`
            <!-- Make this button clickable, using onclick event listener -->
            
            <div id="authControls" class="auth-controls d-flex align-items-center gap-2 my-2 my-lg-0">
                <!-- populated by JS -->
            </div>
        `}renderAuthControls(){const t=this.querySelector("#authControls");t.innerHTML='<div class="btn btn-outline-light" style="visibility: hidden; min-width: 80px;">Log out</div>',i(s,e=>{let n;e?(n='<button class="btn btn-outline-dark" id="signOutBtn" type="button" style="min-width: 80px;">Log out</button>',t.innerHTML=n,t.querySelector("#signOutBtn")?.addEventListener("click",o)):(n='<a class="btn btn-outline-dark" id="loginBtn" href="/login.html" style="min-width: 80px;">Login/Signup</a>',t.innerHTML=n)})}}customElements.define("site-login-button",l);
