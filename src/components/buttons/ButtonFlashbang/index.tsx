import React, { useState } from "react";

interface ButtonFlashbangProps {
    flashDuration?: number;
    onClick?: () => void;
    customButton?: React.ReactNode;
    label?: string;
}

/**
 * **ButtonFlashbang**
 * 
 * Introducing the ButtonFlashbang, the button that packs a punch—literally! When clicked, this button triggers a brief "flashbang" effect, causing the
 *  entire screen to flash white for a specified duration. It’s like a sudden burst of light to get your attention, but don’t worry, it fades quickly.
 * 
 * **Warning:** If you value your retinas, be cautious with this one. The flash duration can be customized, so you control how intense the flash is.
 * Perfect for moments when you need to give users a jolt or get them to pay attention!
 * 
 * @component
 * @example
 * // Example usage:
 * <ButtonFlashbang 
 *   flashDuration={500} 
 *   onClick={() => console.log("Flashbang deployed!")}
 *   label="Flash Me!" 
 * />
 * 
 * @param {Object} props - The props that control the flashbang effect and button behavior.
 * @param {number} [props.flashDuration=500] - The duration (in milliseconds) of the flash effect. Default is 500ms.
 * @param {Function} [props.onClick] - The function that gets executed when the button is clicked. It happens after the flash effect.
 * @param {React.ReactNode} [props.customButton] - Optional custom button element to replace the default one. Customize the look or feel of your flashbang button.
 * @param {string} [props.label="Flashbang!"] - The label displayed on the button. Choose a text that fits your "explosive" button!
 * 
 * @returns {JSX.Element} The ButtonFlashbang component—a jolt of energy wrapped in a button.
 */


export const ButtonFlashbang: React.FC<ButtonFlashbangProps> = ({
    flashDuration = 500,
    onClick = () => { },
    customButton,
    label = "Flashbang!",
}) => {
    const [isFlashing, setIsFlashing] = useState(false);

    const handleClick = () => {
        setIsFlashing(true);
        setTimeout(() => {
            setIsFlashing(false);
        }, flashDuration - 100);
        onClick();
    };

    const defaultButton = (
        <button
            onClick={handleClick}
            style={{
                padding: "10px 20px",
                backgroundColor: "#ff0000",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
            }}
        >
            {label}
        </button>
    );

    return (
        <div>
            {isFlashing && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "white",
                        zIndex: 9999,
                        opacity: 1,
                        animation: `fadeOut ${flashDuration}ms ease-in-out`,
                    }}
                />
            )}
            {customButton
                ? React.cloneElement(customButton as React.ReactElement, {
                    onClick: handleClick,
                })
                : defaultButton}
            <style>
                {`
          @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
            </style>
        </div>
    );
};
