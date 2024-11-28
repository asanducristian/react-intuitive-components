import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

/**
 * The context for enabling or disabling reverse scroll. Because why should scrolling feel *normal*?
 * 
 * @interface ReverseScrollContextType
 * @property {boolean} isReverseScrollEnabled - Determines if reverse scrolling is enabled. Spoiler: It's on by default.
 * @property {() => void} toggleReverseScroll - A function to toggle reverse scroll on or off. Will you keep the madness going?
 */

export interface ReverseScrollContextType {
    isReverseScrollEnabled: boolean;
    toggleReverseScroll: () => void;
}

/**
 * `ReverseScrollProvider`: Wraps your app in a reality where scrolling isn’t as you know it. 
 * Scroll up to go down, and down to go up. A true anti-UX experience!
 * 
 * @interface ReverseScrollProviderProps
 * @property {ReactNode} children - The content to be wrapped. Prepare to scroll like it's the future!
 * 
 * @returns {JSX.Element} - The provider that turns your scrolling upside down (literally).
 */

interface ReverseScrollProviderProps {
    children: ReactNode;
}

/**
 * `ReverseScrollProvider`: Makes scrolling feel like a strange, topsy-turvy alternate universe. 
 * Get ready to scroll in reverse — up is down and down is up. Who needs *normal*?
 * 
 * @param {ReverseScrollProviderProps} props - The props for the `ReverseScrollProvider`.
 * @returns {JSX.Element} - The provider that governs your reverse scrolling madness.
 */

const ReverseScrollContext = createContext<ReverseScrollContextType | undefined>(undefined);

export const ReverseScrollProvider: React.FC<ReverseScrollProviderProps> = ({ children }) => {
    const [isReverseScrollEnabled, setIsReverseScrollEnabled] = useState<boolean>(true);

    const toggleReverseScroll = () => {
        setIsReverseScrollEnabled(prevState => !prevState);
    };

    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            if (!isReverseScrollEnabled) return;

            event.preventDefault();

            const speed = Math.abs(event.deltaY);
            const direction = event.deltaY > 0 ? -1 : 1;

            window.scrollBy(0, direction * speed);
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [isReverseScrollEnabled]);

    return (
        <ReverseScrollContext.Provider value={{ isReverseScrollEnabled, toggleReverseScroll }}>
            {children}
        </ReverseScrollContext.Provider>
    );
};

export const useReverseScroll = () => {
    const context = useContext(ReverseScrollContext);
    if (!context) {
        throw new Error('useReverseScroll must be used within ReverseScrollProvider');
    }
    return context;
};
