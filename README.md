# Movie Theater Booking Application

This application was originally provided with most of the **styling completed**, but **without functionality**, implemented in **vanilla JavaScript**.

The objective of this project was to serve as the **final project** for the course **Frontend 2** in the **C# studies program at Nackademin**.

The project was later **recreated and expanded in React**, adding full functionality, state management, and backend interaction using `json-server`.

For instructions on how to run this project, please see the **Vite + React instructions** at the bottom of this README.

---

## 🎯 Project Objectives

The main goals of the project included:

- Adding seat selection functionality
- Rendering prices dynamically
- Retrieving movie data from `json-server`
- Creating a booking form that posts data to `json-server`
- Implementing full CRUD functionality in an **Admin Mode**
- Hosting the project on GitHub
- Recreating the project using **React**

---

## 📁 Project Structure & File Breakdown

### `/components`

- **AdminPanel.tsx**  
  A component that includes:
  - A movie `<select>` input
  - A `handleAdminSelect` function that sets `editMovieId`
  - An `AdminPanelForm` subcomponent that receives `editMovieId` and its dispatch as props

- **AdminPanelForm.tsx**  
  A subcomponent responsible for:
  - Conditionally providing CRUD functionality
  - Sending fetch requests to the `/movies` endpoint in `json-server`
  - Handling add, edit, and delete operations based on `editMovieId`

- **BookingForm.tsx**  
  Handles booking creation by:
  - Posting bookings to the `/bookings` endpoint
  - Updating the `bookedSeats` array for a movie via `/movies/:id`
  - Performing simple JavaScript validation on inputs

- **BookingFormErrorMessage.tsx**  
  A reusable component used to render validation error messages.

- **MovieSelect.tsx**  
  A `<select>` component that updates the `currentMovie` state via `useMovieContext`.

- **Theater.tsx**  
  Maps through `theaterStatus` (from context) and renders a `TheaterRow` for each row.

- **TheaterRow.tsx**  
  A subcomponent of `Theater` that maps through seats in a row and renders `TheaterRowSeat` components.

- **TheaterRowSeat.tsx**  
  Responsible for:
  - Rendering individual seats
  - Applying conditional styling based on seat status
  - Adding seats to the `selectedSeats` array in context when clicked

- **TotalPrice.tsx**  
  Displays:
  - Number of selected seats
  - Price per seat
  - Total price for the current booking

---

### `/context`

- **MovieContext.tsx**  
  Provides shared state and logic including:
  - `movies`
  - `currentMovie`
  - `selectedSeats`
  - Their respective dispatch functions
  - Seat selection logic
  - Derived `theaterStatus` using `useMemo`

- **useMovieContext.ts**  
  Custom hook for consuming `MovieContext`.

---

### `/data`

- **movies.json**  
  Mock database used by `json-server`.

- **theaterStatus.ts**  
  Initial data structure representing the theater layout.

---

### `/models`

- **movie.ts**  
  Defines the `Movie` model.

---

### Root Files

- **App.css**  
  Styling for the project.

- **App.tsx**  
  Main application entry point. Includes:
  - Navigation bar
  - Conditional rendering of Home or Admin Panel
  - Initial fetch of movies from `json-server` with a fallback if unavailable

---

## 📓 Development Diary

### Day 1
Fixed functionality for total price calculation, seat selection, and HTML rendering from a movies array in vanilla JavaScript.

### Day 2
Started a new Vite + React project and imported the initial HTML and styling from the vanilla JavaScript version.  
Completed a test version without `json-server`, Git commits, or form functionality.  
Introduced a custom `useMovieContext` hook to avoid prop drilling.  
Initially used a union type for seat status including `"selected"`, which later proved unnecessary and problematic.

### Day 3
Added `json-server`, the booking form, and the admin panel to the test version.  
Implemented a hardcoded movies fallback if fetching failed.  
Originally used a separate endpoint for `bookedSeats`, but later merged it into each movie object to reduce complexity.  
Noted limitations of `json-server`, including automatic conversion of numeric values to strings.  
Considered flattening theater seat data but kept the row/seat structure for readability and debugging.

### Day 4
Started a fresh Vite + React project using feature branches and pull requests.  
Recreated core functionality up to seat selection and price rendering.  
Removed unnecessary seat status union types, simplifying update logic significantly.

### Day 5
Added the booking form and its core logic.

### Day 6
Extended booking functionality, including:
- Allowing client-side bookings when `json-server` is unavailable
- Fixing stale state issues caused by failed requests
- Refactoring state updates to rely on `useMemo` instead of `useEffect`
- Adding Admin components and finalizing CRUD functionality  
This is also when this README was written.

---

## 🧠 Framework & Architecture Discussion

React was chosen primarily due to prior experience, allowing deeper exploration into state management.  
While the code could have been simplified by not assigning each movie its own `bookedSeats` array, this approach felt like a natural next step in increasing project complexity.

Using `useContext` for state management is not optimal for large-scale applications due to potential re-renders, but given time constraints and complexity, alternatives like Redux or Zustand were not explored (though they may be revisited later).

The `theaterStatus` data structure adds complexity, and a flat-mapped seat structure would likely improve performance and simplify logic. However, the current structure was retained for readability.

The limitations of `json-server` introduced additional complexity. In a real backend scenario, booking creation and seat updates would typically be handled by a single request rather than multiple endpoints.

The original vanilla JavaScript styling also influenced architectural decisions. A grid-based layout with flattened seat data might have simplified the project significantly from the beginning.

For input validation, simple JavaScript validation was used instead of external libraries, as requirements were not clearly defined and regex-based validation would have added unnecessary complexity.

---

## ▶️ Running the Project

Follow the standard **Vite + React** setup instructions below.

1. Install dependencies:
   ```bash
   npm install
   
2. Start json-server
   ```bash
    npx json-server ./src/data/movies.json
   
3. Run Development server:
   ```bash
    npm run dev


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
