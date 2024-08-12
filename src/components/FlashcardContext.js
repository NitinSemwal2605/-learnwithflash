import React, { createContext, useEffect, useState } from 'react';


const host = '127.0.0.1';
const port = 5000;
// Create the context
export const FlashcardContext = createContext();
// Create the provider component
export const FlashcardProvider = ({ children }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const res = await fetch(`http://${host}:${port}/sql/flashcards`);
        const data = await res.json();
        setFlashcards(data);
        console.log(data); // Check the fetched data
      } catch (err) {
        console.log('Error in cards fetch: ', err);
      } finally {
        setLoaded(true);
      }
    };

    fetchFlashcards();
  }, []); // Empty dependency array to run only on component mount

  const addFlashcard = async (newFlashcard) => {
    try {
      const res = await fetch(`http://${host}:${port}/sql/flashcards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFlashcard),
      });
      const data = await res.json();
      setFlashcards([...flashcards, data]);
    } catch (err) {
      console.error('Error adding flashcard: ', err);
    }
  };
  // Function to add a new flashcard

  // Function to edit a flashcard
  const editFlashcard = async (updatedFlashcard) => {
    try {
      const res = await fetch(`http://${host}:${port}/sql/flashcards/${updatedFlashcard.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFlashcard),
      });
      if (res.ok) {
        setFlashcards(flashcards.map(f => (f.id === updatedFlashcard.id ? updatedFlashcard : f)));
      } else {
        console.error('Failed to edit flashcard');
      }
    } catch (err) {
      console.error('Error editing flashcard: ', err);
    }
  };

  const deleteFlashcard = async (id) => {
    try {
      const res = await fetch(`http://${host}:${port}/sql/flashcards/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setFlashcards(flashcards.filter(f => f.id !== id));
      } else {
        console.error('Failed to delete flashcard');
      }
    } catch (err) {
      console.error('Error deleting flashcard: ', err);
    }
  };

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <FlashcardContext.Provider value={{ flashcards, addFlashcard, editFlashcard, deleteFlashcard }}>
      {children}
    </FlashcardContext.Provider>
  );
};
