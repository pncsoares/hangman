import './index.css';

import keys from '../../data/alphabet.json';

type KeyboardProps = {
    activeLetters: string[];
    inactiveLetters: string[];
    addGuessedLetter: (letter: string) => void;
    disabled?: boolean;
};

export function Keyboard({
    activeLetters,
    inactiveLetters,
    addGuessedLetter,
    disabled = false,
}: KeyboardProps) {
    return (
        <div className="keyboard-inner-container">
            {keys.map((key) => {
                const isActive = activeLetters.includes(key);
                const isInactive = inactiveLetters.includes(key);

                return (
                    <button
                        className={`btn ${isActive ? 'active' : ''} ${
                            isInactive ? 'inactive' : ''
                        }`}
                        disabled={isActive || isInactive || disabled}
                        key={key}
                        onClick={() => addGuessedLetter(key)}
                    >
                        {key}
                    </button>
                );
            })}
        </div>
    );
}
