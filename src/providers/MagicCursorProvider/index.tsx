import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CURSOR_STYLES } from '../../utils/constants';

/**
 * The magic of the cursor: Introducing the `MagicCursorContext` where the cursor style 
 * changes every few seconds to keep you on your toes. 
 * If you enjoy surprise cursor styles (or want to mess with your users), this is the context for you.
 * 
 * @interface MagicCursorContextType
 * @property {string} cursorStyle - The current cursor style. It’s probably different every time you look at it.
 * @property {() => void} changeCursorStyle - A function to change the cursor style. It happens automatically, but if you *need* control...
 */

interface MagicCursorContextType {
    cursorStyle: string;
    changeCursorStyle: () => void;
}

/**
 * Props for the `MagicCursorProvider` component. The provider sets up the magic cursor behavior. 
 * No more boring default cursors — just pure enchantment (or chaos, depending on your perspective).
 * 
 * @interface MagicCursorProviderProps
 * @property {ReactNode} children - The content that will be wrapped in the cursor magic. Yes, your content too will be affected.
 * @property {number} intervalTime - The interval time (in milliseconds) between cursor style changes. Default: 500ms. Choose wisely.
 */

export interface MagicCursorProviderProps {
    children: ReactNode;
    intervalTime: number;
}

const MagicCursorContext = createContext<MagicCursorContextType | undefined>(undefined);

/**
 * The `MagicCursorProvider` wraps your app with a constantly changing cursor style. 
 * It's like your cursor has a mind of its own. But don’t worry, it’s *a good kind of chaos*.
 * 
 * @param {MagicCursorProviderProps} props - The props for the MagicCursorProvider.
 * @returns {JSX.Element} - The provider that brings the cursor madness.
 */

export const MagicCursorProvider: React.FC<MagicCursorProviderProps> = ({ children, intervalTime = 500 }) => {
    const [cursorStyle, setCursorStyle] = useState<string>('default');

    const changeCursorStyle = () => {
        const randomIndex = Math.floor(Math.random() * CURSOR_STYLES.length);
        setCursorStyle(CURSOR_STYLES[randomIndex]);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            changeCursorStyle();
        }, intervalTime);

        document.body.style.cursor = cursorStyle;

        return () => {
            clearInterval(interval);
        };
    }, [cursorStyle]);

    return (
        <MagicCursorContext.Provider value={{ cursorStyle, changeCursorStyle }}>
            {children}
        </MagicCursorContext.Provider>
    );
};

/**
 * `useMagicCursor`: The custom hook to access the magic cursor context.
 * Use this hook if you want to manipulate or observe the cursor style manually, 
 * but only inside a `MagicCursorProvider` — otherwise, chaos will ensue.
 * 
 * @returns {MagicCursorContextType} - The cursor style and function to change it. 
 * @throws {Error} - Throws an error if used outside of a `MagicCursorProvider` (because the magic has to be contained).
 */

export const useMagicCursor = () => {
    const context = useContext(MagicCursorContext);
    if (!context) {
        throw new Error('useMagicCursor must be used within a MagicCursorProvider');
    }
    return context;
};
