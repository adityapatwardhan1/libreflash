import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DeckPage from "./pages/DeckPage";
import DeckIdPage from "./pages/DeckIdPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyDecksPage from "./pages/MyDecksPage";
import PrivateRoute from "./components/PrivateRoute";

import './App.css';

export default function App() {
  return (
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/deck"
          element={
            <PrivateRoute>
              <DeckPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/deck/:deckId"
          element={
            <PrivateRoute>
              <DeckIdPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-decks"
          element={
            <PrivateRoute>
              <MyDecksPage />
            </PrivateRoute>
          }
        />
      </Routes>
  );
}



// // src/App.tsx
// import { Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import DeckPage from "./pages/DeckPage";
// import DeckIdPage from "./pages/DeckIdPage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import PrivateRoute from "./components/PrivateRoute";
// import './App.css';


// export default function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />

//       <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
//       <Route path="/deck" element={<PrivateRoute><DeckPage /></PrivateRoute>} />
//       <Route path="/deck/:deckId" element={<PrivateRoute><DeckIdPage /></PrivateRoute>} />
//     </Routes>
//   );
// }




// // // src/App.tsx
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import HomePage from "./pages/HomePage";
// // import DeckPage from "./pages/DeckPage";
// // import DeckIdPage from "./pages/DeckIdPage";
// // import LoginPage from "./pages/LoginPage";
// // import './App.css';

// // export default function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/" element={<HomePage />} />
// //         <Route path="/deck" element={<DeckPage />} />
// //         <Route path="/deck/:deckId" element={<DeckIdPage />} />
// //         <Route path="/login" element={<LoginPage />} />
// //       </Routes>
// //     </Router>
// //   );
// // }



// // // import { Routes, Route } from "react-router-dom";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import HomePage from "./pages/HomePage";
// // import DeckPage from "./pages/DeckPage";
// // import DeckIdPage from "./pages/DeckIdPage";
// // import LoginPage from "./pages/LoginPage";
// // import './App.css';


// // export default function App() {
// //   return (
// //     //<Router>
// //       <Routes>
// //         <Route path="/" element={<HomePage />} />
// //         <Route path="/deck" element={<DeckPage />} />
// //         <Route path="/deck/:deckId" element={<DeckIdPage />} />
// //         <Route path="/login" element={<LoginPage />} />
// //         {/* Add register route later if needed */}
// //       </Routes>
// //     //</Router>
// //     // <Routes>
// //     //   <Route path="/" element={<HomePage />} />
// //     //   <Route path="/deck" element={<DeckPage />} />
// //     //   <Route path="/deck/:deckId" element={<DeckIdPage />} />
// //     //   <Route path="/login" element={<LoginPage />} />
// //     // </Routes>
// //   );
// // }
