import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc, collection, getDocs, where, query } from "firebase/firestore";
import { auth, db } from "./firebaseConfig.js";
import { onAuthReady } from "./authentication.js";


// -------------------------------------------------------------
// Function to populate user info in the profile form
// Fetches user data from Firestore and fills in the form fields
// Assumes user is already authenticated
// and their UID corresponds to a document in the "users" collection
// of Firestore.
// Fields populated: name, school, country
// Form field IDs: nameInput, schoolInput, countryInput
// -------------------------------------------------------------
async function redirectNonLoggedIn() {
  
  onAuthReady(async (user) => {
    // If no user is logged in, redirect to the login page
    let location_checker = location.href.split("/")[3];
    const page_to_redirect = ["account.html", "event_form.html"];
    if (!user && page_to_redirect.includes(location_checker)) {
      location.href = "login.html";
      return; // Stop execution
    }
  })
}

redirectNonLoggedIn()

function populateUserInfo() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {       
      try {
        // reference to the user document
        displayCreatedWatchParties();

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
        
          //unpack the data into json
          const userData = userSnap.data();
          // console.log(auth.currentUser.uid)
          //extract the fields
					const { name = "", email = ""} = userData;

          //update the DOM elements with fields
					document.getElementById("nameInput").value = name;
          document.getElementById("emailInput").innerHTML = email;
					// document.getElementById("schoolInput").value = school;
					// document.getElementById("countryInput").value = country;
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting user document:", error);
      }
    } else {
      console.log("No user is signed in");
    }
  });
}


//call the function to run it 
populateUserInfo();


//-------------------------------------------------------------
// Function to enable editing of user info form fields
//------------------------------------------------------------- 
document.querySelector('#editButton').addEventListener('click', editUserInfo);
function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

//-------------------------------------------------------------
// Function to save updated user info from the profile form
//-------------------------------------------------------------
document.querySelector('#saveButton').addEventListener('click', saveUserInfo);   //Add event listener for save button
async function saveUserInfo() {
		  const user = auth.currentUser;   // ✅ get the currently logged-in user
	    if (!user) {
		    alert("No user is signed in. Please log in first.");
		    return;
		  }
     //enter code here

     //a) get user entered values
    const userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    // const userSchool = document.getElementById('schoolInput').value;     //get the value of the field with id="schoolInput"
    // const userCountry = document.getElementById('countryInput').value;       //get the value of the field with id="cityInput"
     //b) update user's document in Firestore
    await updateUserDocument(user.uid, userName); 
     //c) disable edit 
     document.getElementById('personalInfoFields').disabled = true;
}

//-------------------------------------------------------------
// Updates the user document in Firestore with new values
// Parameters:
//   uid (string)  – user’s UID
//   name, school, city (strings)
//-------------------------------------------------------------
async function updateUserDocument(uid, name) {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { name });
    console.log("User document successfully updated!");
  } catch (error) {
    console.error("Error updating user document:", error);
  }
}




async function displayCreatedWatchParties() {
  let watchPartyTemplate = document.getElementById("watchPartyTemplate");
  const container = document.getElementById("created-watch-parties");
  const watchPartyCollectionRef = collection(db, "watch_parties");
  // console.log(auth.currentUser.uid)


  try {
  const query_ref = query(watchPartyCollectionRef, where("createdBy", "==", `${auth.currentUser.uid}`))
  const querySnapshot = await getDocs(query_ref);
    
    // const querySnapshot = await getDocs(watchPartyCollectionRef);
    container.innerHTML = "";
    querySnapshot.forEach((doc) => {
      // Clone the template
      let newParty = watchPartyTemplate.content.cloneNode(true);
      // Get watch party data once
      const party = doc.data();

      // Populate the card with watch party data
      newParty.querySelector(".host").textContent = party.host;
      newParty.querySelector(".partyType").textContent = party.partyType;
      newParty.querySelector(".address").textContent = party.address;
      newParty.querySelector(".team1").textContent = party.team1;
      newParty.querySelector(".team2").textContent = party.team2;
      newParty.querySelector(".time").textContent = party.time;

      const cardContainer = newParty.querySelector(".party-card-trigger");
      cardContainer.addEventListener("click", () => {
      document.getElementById("modalHost").textContent = party.host;
        document.getElementById("modalTeams").textContent = `${party.team1} VS ${party.team2}`;
        document.getElementById("modalAddress").textContent = party.address;
        document.getElementById("modalTime").textContent = party.time;
      });

      // Attach the new party to the container
      document.getElementById("created-watch-parties").appendChild(newParty);
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

// async function displaySavedWatchParties() {
//   let watchPartyTemplate = document.getElementById("watchPartyTemplate");
//   const container = document.getElementById("saved-watch-parties");
//   const watchPartyCollectionRef = collection(db, "watch_parties");

//   try {
//     const querySnapshot = await getDocs(watchPartyCollectionRef);
//     container.innerHTML = "";
//     querySnapshot.forEach((doc) => {
//       // Clone the template
//       let newParty = watchPartyTemplate.content.cloneNode(true);
//       // Get watch party data once
//       const party = doc.data();

//       // Populate the card with watch party data
//       newParty.querySelector(".host").textContent = party.host;
//       newParty.querySelector(".partyType").textContent = party.partyType;
//       newParty.querySelector(".address").textContent = party.address;
//       newParty.querySelector(".team1").textContent = party.team1;
//       newParty.querySelector(".team2").textContent = party.team2;
//       newParty.querySelector(".time").textContent = party.time;

//       const cardContainer = newParty.querySelector(".party-card-trigger");
//       cardContainer.addEventListener("click", () => {
//       document.getElementById("modalHost").textContent = party.host;
//         document.getElementById("modalTeams").textContent = `${party.team1} VS ${party.team2}`;
//         document.getElementById("modalAddress").textContent = party.address;
//         document.getElementById("modalTime").textContent = party.time;
//       });

//       // Attach the new party to the container
//       document.getElementById("saved-watch-parties").appendChild(newParty);
//     });
//   } catch (error) {
//     console.error("Error getting documents: ", error);
//   }
// }




// Call the function to display watch parties when the page loads
// displayCreatedWatchParties();
// displaySavedWatchParties();
