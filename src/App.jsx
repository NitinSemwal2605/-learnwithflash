import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Importing Routes instead of Switch
import { FlashcardProvider } from './components/FlashcardContext';
import FlipCardsSection from './components/Flashcard'; // Ensure the file name matches
import Navbar from './components/MyNavBar'; // Ensure the file name matches
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div>
        <FlashcardProvider>
          <Navbar />
          <Routes> {/* Use Routes instead of Switch */}
            <Route path="/" element={<FlipCardsSection />} /> {/* Use element instead of component */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </FlashcardProvider>
      </div>
    </Router>
  );
}

export default App;
