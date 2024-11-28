import React, { useState } from 'react';

export interface ButtonChaseMeProps {
    maxEscapes: number;
    onStop: () => void;
    onClick: () => void;
    style?: React.CSSProperties;
    customButton?: React.ReactNode;
    customSubmitButton?: React.ReactNode;
    buttonLabel?: string;
    submitLabel?: string;
}

/**
 * **ButtonChaseMe**
 * 
 * Meet ButtonChaseMe, the button that loves a good game of "catch me if you can." This button will run away from your mouse like it’s got something to hide.
 *  Every time you get close, it escapes, taunting you with its unpredictable movements. But, don’t worry—there’s an end to its mischief. After a set number
 *  of escapes, it will stop and finally let you click it.
 * 
 * **Warning:** If you manage to corner it, the fun doesn’t end there—make sure to call the "onStop" function wisely, as it will only run away so many times
 * before it surrenders. Prepare for the ultimate chase!
 * 
 * @component
 * @example
 * // Example usage:
 * <ButtonChaseMe 
 *   maxEscapes={5} 
 *   onStop={() => console.log("The button stopped running!")}
 *   onClick={() => console.log("You caught it!")}
 *   buttonLabel="Chase Me!" 
 * />
 * 
 * @param {Object} props - The props that control the button’s runaway behavior.
 * @param {number} [props.maxEscapes=5] - The maximum number of escapes the button will make before it surrenders. It’s a race to the finish!
 * @param {Function} props.onStop - The function to call when the button finally stops running. It’s game over—time to catch your breath.
 * @param {Function} props.onClick - The function that gets executed when you finally catch the button. You’ve won the race!
 * @param {React.CSSProperties} [props.style] - Optional custom styles to add a little flair to your chase. Make it as bold or stealthy as you like!
 * @param {React.ReactNode} [props.customButton] - Optional custom button element to use instead of the default. Make your button chase even more exciting!
 * @param {React.ReactNode} [props.customSubmitButton] - Optional custom submit button to use once you’ve caught the button. You did it, now make it official.
 * @param {string} [props.buttonLabel="Click Me!"] - The label for the button that’s always one step ahead. The name says it all!
 * @param {string} [props.submitLabel="Submit"] - Optional submit button label (used with customSubmitButton).
 * 
 * @returns {JSX.Element} The ButtonChaseMe component—your new favorite chase buddy.
 */


export const ButtonChaseMe: React.FC<ButtonChaseMeProps> = ({
    maxEscapes = 5,
    onStop = () => { },
    onClick,
    style = {},
    customButton,
    buttonLabel = 'Click Me!',
}) => {
    const [escapes, setEscapes] = useState<number>(0);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const handleMouseEnter = () => {
        if (escapes < maxEscapes) {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Ensure the div stays within the screen boundaries
            const divSize = 100; // Size of the div (100px by 100px)
            const randomX = Math.random() * (viewportWidth - divSize);
            const randomY = Math.random() * (viewportHeight - divSize);

            setPosition({
                x: (randomX / viewportWidth) * 100, // Convert to percentage
                y: (randomY / viewportHeight) * 100, // Convert to percentage
            });

            setEscapes((prev) => prev + 1);
        } else {
            onStop();
        }
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            style={{
                display: 'inline-block',
                transform: `translate(${position.x}vw, ${position.y}vh)`,
                transition: 'transform 0.3s ease',
                ...style,
            }}
        >
            {customButton ? (
                React.cloneElement(customButton as React.ReactElement, {
                    onClick: onClick,
                })
            ) : (
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    onClick={onClick}
                >
                    {buttonLabel}
                </button>
            )}
        </div>
    );
};
