import './index.css';

const Head = <div className="head" />;
const Body = <div className="body" />;
const LeftArm = <div className="left-arm" />;
const RightArm = <div className="right-arm" />;
const LeftLeg = <div className="left-leg" />;
const RightLeg = <div className="right-leg" />;

const BodyParts = [Head, Body, LeftArm, RightArm, LeftLeg, RightLeg];

type HangmanDrawingProps = {
    numberOfGuesses: number;
};

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
    return (
        <div className="hang-container">
            {BodyParts.slice(0, numberOfGuesses)}
            <div className="up-bar" />
            <div className="hook" />
            <div className="vertical-bar" />
            <div className="base" />
        </div>
    );
}
