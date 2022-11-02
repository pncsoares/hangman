import './index.css';

type HangmanWordProps = {
    guessedLetters: string[];
    wordToGuess: string;
    reveal?: boolean;
};

export function HangmanWord({
    guessedLetters,
    wordToGuess,
    reveal = false,
}: HangmanWordProps) {
    const isRight = (letter: string) => {
        return guessedLetters.includes(letter) || reveal;
    };

    const userLost = (letter: string) => {
        return !guessedLetters.includes(letter) && reveal;
    };

    return (
        <div className="word-container">
            {wordToGuess.split('').map((letter, index) => (
                <span
                    className="letter"
                    key={index}
                >
                    <span
                        className={`${isRight(letter) ? '' : 'curtain'} ${
                            userLost(letter) ? 'red' : ''
                        }`}
                    >
                        {letter}
                    </span>
                </span>
            ))}
        </div>
    );
}
