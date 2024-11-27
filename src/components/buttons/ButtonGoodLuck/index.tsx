import React, { useState } from 'react';

export interface ButtonGoodLuckProps {
    maxEscapes: number; // Number of times the div can escape
    onStop: () => void; // Function to execute when the div stops escaping
    onClick: () => void; // Function to execute when the submit button is clicked
    style?: React.CSSProperties; // Optional custom styles for the div
    customButton?: React.ReactNode; // Optional custom runaway button
    customSubmitButton?: React.ReactNode; // Optional custom submit button
    buttonLabel?: string; // Label for the default runaway button
    submitLabel?: string; // Label for the default submit button
}

export const ButtonGoodLuck: React.FC<ButtonGoodLuckProps> = ({
    maxEscapes = 5,
    onStop,
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
