// src/App.tsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DeckPage from "./pages/DeckPage";
import DeckIdPage from "./pages/DeckIdPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/deck" element={<DeckPage />} />
      <Route path="/deck/:deckId" element={<DeckIdPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}




// // src/App.tsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import DeckPage from "./pages/DeckPage";
// import DeckIdPage from "./pages/DeckIdPage";
// import LoginPage from "./pages/LoginPage";
// import './App.css';

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/deck" element={<DeckPage />} />
//         <Route path="/deck/:deckId" element={<DeckIdPage />} />
//         <Route path="/login" element={<LoginPage />} />
//       </Routes>
//     </Router>
//   );
// }



// // import { Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import DeckPage from "./pages/DeckPage";
// import DeckIdPage from "./pages/DeckIdPage";
// import LoginPage from "./pages/LoginPage";
// import './App.css';


// export default function App() {
//   return (
//     //<Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/deck" element={<DeckPage />} />
//         <Route path="/deck/:deckId" element={<DeckIdPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         {/* Add register route later if needed */}
//       </Routes>
//     //</Router>
//     // <Routes>
//     //   <Route path="/" element={<HomePage />} />
//     //   <Route path="/deck" element={<DeckPage />} />
//     //   <Route path="/deck/:deckId" element={<DeckIdPage />} />
//     //   <Route path="/login" element={<LoginPage />} />
//     // </Routes>
//   );
// }
