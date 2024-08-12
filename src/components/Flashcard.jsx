import React, { useContext, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import { FlashcardContext } from './FlashcardContext';

const FlipCardsSection = () => {
  const { flashcards } = useContext(FlashcardContext) || { flashcards: [] };
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  if (flashcards.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center p-4">
      <div className="flex justify-center items-center">
        <button className="text-yellow-400 p-4 text-3xl" onClick={handlePrevCard}>
          <FiArrowLeftCircle />
        </button>
        <div className="mx-8">
          <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            {/* Front Side */}
            <div
              key="front"
              className="w-96 h-64 bg-gray-900 text-white px-6 py-4 rounded-lg shadow-md flex justify-center items-center cursor-pointer"
              onClick={handleFlip}
            >
              <div className="text-center">
                <p className="text-lg font-semibold mb-2">Question {currentCard + 1}</p>
                <p className="text-2xl">{flashcards[currentCard]?.question}</p>
              </div>
            </div>

            {/* Back Side */}
            <div
              key="back"
              className="w-96 h-64 bg-gray-900 text-white px-6 py-4 rounded-lg shadow-md flex justify-center items-center cursor-pointer"
              onClick={handleFlip}
            >
              <div className="text-center">
                <p className="text-lg font-semibold mb-2">Answer</p>
                <p className="text-2xl">{flashcards[currentCard]?.answer}</p>
              </div>
            </div>
          </ReactCardFlip>
        </div>
        <button className="text-yellow-400 p-4 text-3xl" onClick={handleNextCard}>
          <FiArrowRightCircle />
        </button>
      </div>
    </div>
  );
};

export default FlipCardsSection;
