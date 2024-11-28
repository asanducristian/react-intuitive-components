import React, { useState, useRef } from "react";

export interface ButtonExtraLongClickProps {
  clickTime?: number;
  onLongClick?: () => void;
  onNotLongEnoughClick?: () => void;
  customButton?: React.ReactNode;
  label?: string;
}

/**
 * **ButtonExtraLongClick**
 * 
 * Introducing the ButtonExtraLongClick—a button that reacts to how long you press it. It is a button that triggers different actions based on how
 * long you press it. Hold it for a specified time to trigger one action; release it too soon to trigger another.
 * 
 * **Warning:** This button requires patience! A short press won't trigger the long click effect, so make sure you're prepared to keep your finger on it.
 * But don't worry, the button will notify you if you didn't hold it long enough.
 * 
 * @component
 * @example
 * // Example usage:
 * <ButtonExtraLongClick 
 *   clickTime={1500} 
 *   onLongClick={() => console.log("Long click detected!")}
 *   onNotLongEnoughClick={() => console.log("That was too short!")}
 *   label="Hold Me" 
 * />
 * 
 * @param {Object} props - The props that control the button’s press-and-hold behavior.
 * @param {number} [props.clickTime=1000] - The amount of time (in milliseconds) the button must be pressed to trigger the "long click" action. Default is 1000ms.
 * @param {Function} [props.onLongClick] - The function to execute if the user holds the button long enough. It’s the “reward” for being patient!
 * @param {Function} [props.onNotLongEnoughClick] - The function to execute if the user releases the button before the "long click" threshold is met. You didn’t hold it long enough!
 * @param {React.ReactNode} [props.customButton] - Optional custom button element to replace the default one. Customize the look or feel of your button.
 * @param {string} [props.label="Hold Me"] - The label displayed on the button. A little text to remind the user to press and hold!
 * 
 * @returns {JSX.Element} The ButtonExtraLongClick component—because sometimes, you just need to hold on a little longer.
 */


export const ButtonExtraLongClick: React.FC<ButtonExtraLongClickProps> = ({
  clickTime = 1000,
  onLongClick = () => { },
  onNotLongEnoughClick = () => { },
  customButton,
  label = "Hold Me",
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseDown = () => {
    setIsPressed(true);
    timeoutRef.current = window.setTimeout(() => {
      setIsPressed(false);
      onLongClick();
    }, clickTime);
  };

  const handleMouseUp = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;

      if (isPressed) {
        onNotLongEnoughClick();
      }
    }
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsPressed(false);
  };

  const defaultButton = (
    <button
      style={{
        padding: "10px 20px",
        backgroundColor: isPressed ? "#f0f0f0" : "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {label}
    </button>
  );

  if (customButton) {
    return React.cloneElement(customButton as React.ReactElement, {
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
    });
  }

  return defaultButton;
};
