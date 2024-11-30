import React, { ReactNode } from "react";

/**
 * Props for the `RandomText` component – prepare for a **randomized** and slightly chaotic text experience.
 * 
 * @interface RandomTextProps
 * @property {boolean} [randomColors] - Random colors for each letter? Or not? It's a gamble.
 * @property {boolean} [randomLetterSizes] - Should each letter have a random size? 
 * @property {boolean} [randomWordSizes] - Want each word to have a random size? Chaos is coming.
 * @property {number} [textSize] - The base text size for your content. Expect a random range.
 * @property {ReactNode} children - The children elements, which will be randomly styled and might leave you frustrated.
 */

export interface TextTurbulenceProps {
    randomColors?: boolean;
    randomLetterSizes?: boolean;
    randomWordSizes?: boolean;
    textSize?: number;
    children: ReactNode;
}

/**
 * RandomText: The text component that adds *random chaos* to your life by randomly styling each letter or word.
 * 
 * @param {WackyWordsProps} props - The props for the RandomText component. No guarantees for your sanity.
 * @returns {JSX.Element} - The JSX element that will make you laugh, cry, or both.
 */

export const TextTurbulence: React.FC<TextTurbulenceProps> = ({
    randomColors = false,
    randomLetterSizes = false,
    randomWordSizes = false,
    textSize = 16,
    children,
}) => {

    const getRandomColor = (): string => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const getRandomSize = (baseSize: number): string => {
        const randomPercentage = Math.random() * 0.8;
        const randomSize = baseSize * (1 + randomPercentage);
        return `${Math.floor(randomSize)}px`;
    };

    const getLetterStyles = (text: string) => {
        return text.split('').map(() => ({
            color: randomColors ? getRandomColor() : 'inherit',
            fontSize: randomLetterSizes ? getRandomSize(textSize) : `${textSize}px`,
            display: 'inline',
            padding: '0 2px',
        }));
    };

    const getWordStyles = (text: string) => {
        return text.split(' ').map(() => ({
            fontSize: randomWordSizes ? getRandomSize(textSize) : `${textSize}px`,
            display: 'inline',
            padding: '0 5px',
        }));
    };

    const renderChildrenWithStyles = () => {
        return React.Children.map(children, (child) => {
            if (typeof child === 'string') {
                if (randomWordSizes) {
                    return getWordStyles(child).map((style, index) => (
                        <span key={index} style={style}>{child.split(' ')[index]}</span>
                    ));
                }

                if (randomLetterSizes) {
                    return getLetterStyles(child).map((style, index) => (
                        <span key={index} style={style}>{child[index]}</span>
                    ));
                }

                return child;
            }

            return child;
        });
    };

    return <>{renderChildrenWithStyles()}</>;
};
