import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

//--------------------------------------------------------------
// If you have custom global styles, import them as well:
//--------------------------------------------------------------
import "/styles/style.css";

//--------------------------------------------------------------
// Custom global JS code (shared with all pages)can go here.
//--------------------------------------------------------------

function sidebar_open() {
  document.getElementById("mySidebar").style.display = "block";
    }
function sidebar_close() {
  document.getElementById("mySidebar").style.display = "none";
    }
document.getElementById("sidebar_close").addEventListener("click", sidebar_close);
document.getElementById("sidebar_open").addEventListener("click", sidebar_open);