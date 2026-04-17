# World Watch

## Overview

World Watch is a FIFA World Cup watch party app designed to help locals and tourists find places to watch World Cup matches with others by connecting them to available watch parties in their area.

Developed for the COMP 1800 course, this project applies User-Centred Design practices and agile project management, and demonstrates integration with Firebase backend services for storing user-created watch parties.

---

## Features

- Public and private watch parties
  - Users can find local businesses that are hosting watch parties, or create their own private party
- Filter watch parties
  - Users can filter the watch parties by team/country name
- Watch Party Map
  - Map shows location of user watch parties and party type
- User Accounts
  - Users can update account details and see the watch parties they have created on their account page

---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Backend**: Firebase for hosting and authentication
- **Database**: Firestore
- **APIs**:
  - [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) for map implementation
  - [Geoapify](https://www.geoapify.com/)
- **Images**: [8-bit-football.com](https://8bit-football.com/)

---

## Usage

To run the application locally:

1. **Clone** the repository.
2. **Install dependencies** by running `npm install` in the project root directory.
3. **Start the development server** by running the command: `npm run dev`.
4. Open your browser and visit the local address shown in your terminal (usually `http://localhost:5173` or similar).

Once the application is running:

1. Browse the list of watch parties displayed on the index page.
2. Filter the watch parties by team.
3. Click a watch party to see its details.
4. Create a user account to create your own watch parties.
5. View the map to see private and public watch parties available in your area.

---

## Project Structure

```
1800_202610_DTC01/
├── components/
│   ├── site-footer.js
│   ├── site-login-button.js
│   ├── site-map.js
│   ├── site-navbar.js
│   ├── site-party-list-items.js
│   ├── site-party-modal.js
├── src/
│   ├── app.js
│   ├── authentication.js
│   ├── eventCreate.js
│   ├── firebaseConfig.js
│   ├── landing-main.js
│   ├── loginSignup.js
│   ├── main.js
│   ├── map.js
│   ├── profile.js
├── styles/
│   └── style.css
├── public/
├── images/
├── account.html
├── event-form.html
├── index.html
├── login.html
├── main.html
├── index.html
├── map.html
├── package.json
├── README.md
├── vite-config.js
```

---

## Contributors

- **Sam** - BCIT CST Student with a passion for staying indoors. Fun fact: Loves baseball.

- **Darien** - BCIT CST Student with a passion for outdoor adventures and user-friendly applications. Fun fact: Loves solving Rubik's Cubes in under a minute.

- **Chris Banno** - BCIT CST Student with a passion for outdoor adventures and user-friendly applications. Fun fact: Loves snowboarding and working on cars.

---

## Acknowledgments

- Watch party data is for demonstration purposes only.
- Code snippets were adapted from resources such as [Stack Overflow](https://stackoverflow.com/) and [MDN Web Docs](https://developer.mozilla.org/).
- Icons sourced from [Material Symbols & Icons](https://fonts.google.com/icons)

---

## Limitations and Future Work

### Limitations

- Watch party and matches are for demo purposes only.
- Accessibility features can be further improved.

### Future Work

- Add more filtering and sorting options (e.g., by distance).
- Add search functionality
- Add clickable map to each watch party card
- Create a dark mode for better usability in low-light conditions.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
