import { motion } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { FiEdit, FiPlusCircle, FiTrash } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FlashcardContext } from './FlashcardContext';

const Dashboard = () => {
  const { flashcards, addFlashcard, editFlashcard, deleteFlashcard } = useContext(FlashcardContext);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
  const [editingFlashcard, setEditingFlashcard] = useState(null);

  const handleAddFlashcard = () => {
    if (newFlashcard.question.trim() === '' || newFlashcard.answer.trim() === '') {
      toast.error('Both question and answer fields are required.');
      return;
    }
    addFlashcard(newFlashcard);
    toast.success('Flashcard added successfully!');
    setNewFlashcard({ question: '', answer: '' }); // Clear input fields
  };

  const handleEditFlashcard = (id) => {
    editFlashcard(editingFlashcard);
    toast.info('Flashcard edited successfully!');
    setEditingFlashcard(null);
  };

  const handleDeleteFlashcard = (id) => {
    deleteFlashcard(id);
    toast.warn('Flashcard deleted.');
  };

  return (
    <div className="min-h-screen bg-gray-700 text-white p-8">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {flashcards.map((flashcard) => (
          <motion.div
            key={flashcard.id}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between">
              {editingFlashcard?.id === flashcard.id ? (
                <div>
                  <input
                    type="text"
                    value={editingFlashcard.question}
                    onChange={(e) =>
                      setEditingFlashcard({ ...editingFlashcard, question: e.target.value })
                    }
                    className="bg-gray-700 text-white p-2 rounded w-full mb-4"
                  />
                  <textarea
                    value={editingFlashcard.answer}
                    onChange={(e) =>
                      setEditingFlashcard({ ...editingFlashcard, answer: e.target.value })
                    }
                    className="bg-gray-700 text-white p-2 rounded w-full"
                  />
                  <button
                    onClick={() => handleEditFlashcard(flashcard.id)}
                    className="bg-gold-500 text-black mt-4 p-2 rounded hover:bg-gold-700 transition duration-300"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold">{flashcard.question}</h2>
                  <p className="mt-4">{flashcard.answer}</p>
                </div>
              )}
              <div className="flex space-x-4">
                <FiEdit
                  className="cursor-pointer text-gold-500"
                  onClick={() => setEditingFlashcard(flashcard)}
                />
                <FiTrash
                  className="cursor-pointer text-red-500"
                  onClick={() => handleDeleteFlashcard(flashcard.id)}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Add New Flashcard</h2>
        <input
          type="text"
          placeholder="Question"
          value={newFlashcard.question}
          onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
          className="bg-gray-700 text-white p-2 rounded w-full mb-4"
        />
        <textarea
          placeholder="Answer"
          value={newFlashcard.answer}
          onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
          className="bg-gray-700 text-white p-2 rounded w-full mb-4"
        />
        <button
          onClick={handleAddFlashcard}
          className="bg-gold-500 text-black p-2 rounded hover:bg-gold-700 transition duration-300"
        >
          <FiPlusCircle className="inline-block mr-2" />
          Add Flashcard
        </button>
      </motion.div>
    </div>
  );
};

export default Dashboard;
