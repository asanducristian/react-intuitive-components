import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

/**
 * The context for enabling or disabling horizontal scroll for vertical movement. Get ready for some unconventional scrolling!
 * 
 * @interface SideScrollContextType
 * @property {boolean} isSideScrollEnabled - Determines if side-scrolling for vertical movement is enabled. Default: true.
 * @property {() => void} toggleSideScroll - Function to toggle side-scroll mode. Will you embrace the oddity?
 */
export interface SideScrollContextType {
    isSideScrollEnabled: boolean;
    toggleSideScroll: () => void;
}

/**
 * `SideScrollProvider`: Wraps your app in a reality where vertical scrolling moves the page left and right and the other way around. 
 * Who needs vertical scroll when you can go sideways for vertical movement?
 * 
 * @interface SideScrollProviderProps
 * @property {ReactNode} children - The content to be wrapped. Prepare for an unpredictable scroll experience.
 * 
 * @returns {JSX.Element} - The provider that governs your sideways scroll shenanigans.
 */
interface SideScrollProviderProps {
    children: ReactNode;
}

/**
 * `SideScrollProvider`: Turns your scroll wheel into a horizontal navigation tool! 
 * Scroll up to move left, scroll down to move right — who needs normal vertical scrolling anyway?
 * 
 * @param {SideScrollProviderProps} props - The props for the `SideScrollProvider`.
 * @returns {JSX.Element} - The provider that makes scrolling sideways a reality.
 */
const SideScrollContext = createContext<SideScrollContextType | undefined>(undefined);

export const SideScrollProvider: React.FC<SideScrollProviderProps> = ({ children }) => {
    const [isSideScrollEnabled, setIsSideScrollEnabled] = useState<boolean>(true);

    const toggleSideScroll = () => {
        setIsSideScrollEnabled(prevState => !prevState);
    };

    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            if (!isSideScrollEnabled) return;

            event.preventDefault();

            const speedY = Math.abs(event.deltaY); 
            const speedX = Math.abs(event.deltaX); 

            if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
                const direction = event.deltaX > 0 ? 1 : -1;
                window.scrollBy(0, direction * speedX);
            } else {
                const direction = event.deltaY > 0 ? 1 : -1;
                window.scrollBy(direction * speedY, 0);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [isSideScrollEnabled]);

    return (
        <SideScrollContext.Provider value={{ isSideScrollEnabled, toggleSideScroll }}>
            {children}
        </SideScrollContext.Provider>
    );
};

/**
 * `useSideScroll`: Hook to interact with the side-scroll functionality. 
 * Toggle this strange scrolling behavior and control the madness!
 * 
 * @returns {SideScrollContextType} - The state and function for managing side-scroll.
 * @throws {Error} - If used outside of `SideScrollProvider`. Side-scrolling must be controlled!
 */
export const useSideScroll = () => {
    const context = useContext(SideScrollContext);
    if (!context) {
        throw new Error('useSideScroll must be used within SideScrollProvider');
    }
    return context;
};
