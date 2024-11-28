import React, { ReactNode } from "react";

export interface ButtonRussianRouletteProps {
    label?: string;
    onFavorable: () => void;
    onNotSoFavorable?: () => void;
    favorableChance?: number;
    notSoFavorableChance?: number;
    customButton?: ReactNode;
}

/**
 * **ButtonRussianRoulette**
 * 
 * Welcome to ButtonRussianRoulette, the button that makes decisions for you! It’s like flipping a coin, but with a twist. You never know whether you’re 
 * going to get something favorable or not-so-favorable. The button lets you decide the odds and add a little excitement to your day. May the odds be always your favor.
 * 
 * **Warning:** The "not so favorable" option is as unpredictable as life itself. Proceed with caution. Click at your own risk!
 * 
 * @component
 * @example
 * // Example usage:
 * <ButtonRussianRoulette 
 *   label="Take a Chance!" 
 *   onFavorable={() => console.log("Lucky you!")} 
 *   onNotSoFavorable={() => console.log("Better luck next time!")} 
 *   favorableChance={70} 
 *   notSoFavorableChance={30} 
 * />
 * 
 * @param {Object} props - The props that control your fate.
 * @param {string} [props.label="Click Me"] - The label on the button. Choose wisely; it's the first step towards your destiny.
 * @param {Function} props.onFavorable - The function that gets called if fate is on your side. Will you escape unscathed? Who knows!
 * @param {Function} [props.onNotSoFavorable] - The function that gets called if the odds aren't in your favor. Default: a quick trip to the home page.
 * @param {number} [props.favorableChance=50] - The chance (in percentage) that you'll get the favorable outcome. Choose your odds—will you tempt fate?
 * @param {number} [props.notSoFavorableChance=50] - The chance (in percentage) of the less favorable outcome. Balance it however you see fit.
 * @param {React.ReactNode} [props.customButton] - A custom button for those who want to add their own flair to the randomness. Maybe it’s a magical button? Who’s to say?
 * 
 * @returns {JSX.Element} The ButtonRussianRoulette component—where every click could be your lucky break... or your inevitable doom.
 */

export const ButtonRussianRoulette: React.FC<ButtonRussianRouletteProps> = ({
    label = "Click Me",
    onFavorable,
    onNotSoFavorable = () => { window.location.href = "/"; },
    favorableChance = 50,
    notSoFavorableChance = 50,
    customButton,
}) => {
    const handleClick = () => {

        const totalChance = favorableChance + notSoFavorableChance;
        const randomChance = Math.random() * totalChance;

        if (randomChance < favorableChance) {
            onFavorable();
        } else {
            onNotSoFavorable();
        }
    };

    const DefaultButton = (
        <button
            onClick={handleClick}
            style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
        >
            {label}
        </button>
    );

    return (
        <div>
            {customButton ? (
                React.cloneElement(customButton as React.ReactElement, {
                    onClick: handleClick,
                })
            ) : (
                DefaultButton
            )}
        </div>
    );
};
