import { useCallback, useEffect, useState } from 'react';

import { HangmanDrawing } from '../HangmanDrawing';
import { HangmanWord } from '../HangmanWord';
import { Keyboard } from '../Keyboard';

import './index.css';

import words from '../../data/words-en.json';

function App() {
    const getWord = () => {
        return words[Math.floor(Math.random() * words.length)];
    };

    const newWord = getWord();
    const [wordToGuess, setWordToGuess] = useState(newWord);

    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const incorrectLetters = guessedLetters.filter(
        (letter) => !wordToGuess.includes(letter)
    );

    // there are 6 body parts
    const isLoser = incorrectLetters.length >= 6;
    const isWinner = wordToGuess
        .split('')
        .every((letter) => guessedLetters.includes(letter));

    const addGuessedLetter = useCallback(
        (letter: string) => {
            if (guessedLetters.includes(letter) || isLoser || isWinner) {
                return;
            }

            setGuessedLetters((currentLetters) => [...currentLetters, letter]);
        },
        [guessedLetters, isLoser, isWinner]
    );

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key;

            if (!key.match(/^[a-z]$/)) {
                return;
            }

            e.preventDefault();
            addGuessedLetter(key);
        };

        document.addEventListener('keypress', handler);

        return () => {
            document.removeEventListener('keypress', handler);
        };
    }, [guessedLetters]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key;

            if (key !== 'Enter') {
                return;
            }

            e.preventDefault();
            setGuessedLetters([]);

            const word = getWord();
            setWordToGuess(word);
        };

        document.addEventListener('keypress', handler);

        return () => {
            document.removeEventListener('keypress', handler);
        };
    }, [guessedLetters]);

    return (
        <div className="container">
            <div className='info-banner'>
                ℹ️ The words are in English
            </div>
            <div className="info-banner">
                {isWinner && 'Winner!'}
                {isLoser && 'You lost... nice try'}
                <br />
                {(isWinner || isLoser) && 'Refresh to start a new game'}
            </div>
            <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
            <HangmanWord
                guessedLetters={guessedLetters}
                wordToGuess={wordToGuess}
                reveal={isLoser}
            />
            <div className="keyboard-container">
                <Keyboard
                    activeLetters={guessedLetters.filter((letter) =>
                        wordToGuess.includes(letter)
                    )}
                    inactiveLetters={incorrectLetters}
                    addGuessedLetter={addGuessedLetter}
                    disabled={isWinner || isLoser}
                />
            </div>
        </div>
    );
}

export default App;
