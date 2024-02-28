import React, { useState } from 'react';
import './StudentGame1.css';
import Layout from './Layout';
import { Link } from 'react-router-dom';

// Emojis for the game
const emojis = ['😀', '😍', '🎉', '🍕', '🚀', '🌈'];

// Duplicate the emojis to create pairs
const cards = [...emojis, ...emojis];

// Shuffle the cards
cards.sort(() => Math.random() - 0.5);

const MatchingGame = () => {
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [matches, setMatches] = useState(0);

    const flipCard = (index) => {
        if (flippedCards.length < 2 && !flippedCards.includes(index)) {
            setFlippedCards([...flippedCards, index]);

            if (flippedCards.length === 1) {
                const firstIndex = flippedCards[0];
                if (cards[firstIndex] === cards[index]) {
                    // Match found
                    setMatches(matches + 1);
                    setMatchedCards([...matchedCards, firstIndex, index]); // Update matchedCards
                    setFlippedCards([]); // Reset flipped cards
                } else {
                    // No match, flip cards back after a short delay
                    setTimeout(() => setFlippedCards([]), 1000);
                }
            }
        }
    };


    const resetGame = () => {
        setFlippedCards([]);
        setMatchedCards([]);
        // Shuffle the cards again for a new game
        cards.sort(() => Math.random() - 0.5);
    };

    return (
        <Layout>
            <div className="matching-game">
                <Link to="/StudentPortal">
                    <button>Back to Student Portal</button>
                </Link>

                <h1>Emoji Matching Game</h1>
                <div className="card-grid">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`card ${flippedCards.includes(index) ? 'flipped' : ''} ${matchedCards.includes(index) ? 'matched' : ''}`}
                            onClick={() => flipCard(index)}
                        >
                            {flippedCards.includes(index) || matchedCards.includes(index) ? (
                                <span>{card}</span>
                            ) : (
                                <span>&nbsp;</span>
                            )}
                        </div>
                    ))}
                </div>
                {matchedCards.length === emojis.length / 2 && <p>Congratulations! You matched all pairs!</p>}
                <button onClick={resetGame}>Reset Game</button>
            </div>
        </Layout>
    );
};

export default MatchingGame;
