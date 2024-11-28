import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ELEMENTS } from '../../utils/constants';

/**
 * A single trail item, following your cursor's every move. 
 * Think of it as a little ghost that follows you around, appearing randomly from a collection of elements.
 * 
 * @interface TrailItem
 * @property {number} id - A unique ID to identify the trail. You *won’t* get away from it.
 * @property {number} x - The x-coordinate of where this trail item should appear. It’ll haunt your mouse!
 * @property {number} y - The y-coordinate of the trail item. Get ready for some random chaos.
 * @property {ReactNode} item - The item (or ghost) that will appear at that position. Could be anything — we keep it mysterious.
 */

export interface TrailItem {
    id: number;
    x: number;
    y: number;
    item: ReactNode;
}



export interface MouseTrailContextType {
    addTrail: (x: number, y: number) => void;
    trailItems: TrailItem[];
    maxTrailLength: number;
}

const MouseTrailContext = createContext<MouseTrailContextType | undefined>(undefined);

/**
 * The provider that wraps your app and adds a bit of mouse chaos with trailing elements. 
 * Because why shouldn’t your mouse be followed around by random stuff? The more the better!
 * 
 * @interface MouseTrailProviderProps
 * @property {ReactNode} children - The content to be wrapped in a magical trail. Warning: it's unpredictable.
 * @property {ReactNode[]} trailItems - The possible elements that will follow your cursor. They’re like digital confetti.
 * @property {number} maxTrailLength - The max number of trail items. The more trails, the more chaos! (Default: 10)
 */

export interface MouseTrailProviderProps {
    children: ReactNode;
    trailItems: ReactNode[];
    maxTrailLength?: number;
}

/**
 * `MouseTrailProvider`: It adds a trail of random items following your mouse. 
 * They appear as you move and vanish after a brief moment. Think of it as a digital version of "The Floor is Lava."
 * 
 * @param {MouseTrailProviderProps} props - The props for the `MouseTrailProvider`.
 * @returns {JSX.Element} - The provider that will make your mouse feel less lonely and more... hunted.
 */

export const MouseTrailProvider: React.FC<MouseTrailProviderProps> = ({ children, trailItems = ELEMENTS, maxTrailLength = 10 }) => {
    const [trail, setTrail] = useState<TrailItem[]>([]);
    const [lastPosition, setLastPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const addTrail = (x: number, y: number) => {
        const newTrail = {
            id: Date.now(),
            x,
            y,
            item: trailItems[Math.floor(Math.random() * trailItems.length)],
        };

        setTrail((prev) => {
            const updatedTrail = [...prev, newTrail];
            if (updatedTrail.length > maxTrailLength) {
                updatedTrail.shift();
            }
            return updatedTrail;
        });
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const distance = Math.sqrt(
                Math.pow(clientX - lastPosition.x, 2) + Math.pow(clientY - lastPosition.y, 2)
            );

            if (distance > 10) {
                addTrail(clientX, clientY);
                setLastPosition({ x: clientX, y: clientY });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [addTrail]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTrail((prev) => prev.filter((item) => Date.now() - item.id < 500));
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <MouseTrailContext.Provider value={{ addTrail, trailItems: trail, maxTrailLength }}>
            {children}
            {trail.map((item, index) => (
                item.item && (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            top: item.y,
                            left: item.x,
                            pointerEvents: 'none',
                            opacity: 0.7,
                            transition: 'transform 0.1s ease-in-out',
                        }}
                    >
                        {item.item}
                    </div>
                )
            ))}
        </MouseTrailContext.Provider>
    );
};

/**
 * `useMouseTrail`: The hook for all things related to the mouse trail. 
 * Use this to mess with the trail items or add new ones. But only if you like chaos.
 * 
 * @returns {MouseTrailContextType} - The trail items and the ability to add more. Don’t worry, they’ll be gone soon enough.
 * @throws {Error} - Throws an error if used outside of a `MouseTrailProvider`. Chaos can only exist within order.
 */

export const useMouseTrail = () => {
    const context = useContext(MouseTrailContext);
    if (!context) {
        throw new Error('useMouseTrail must be used within a MouseTrailProvider');
    }
    return context;
};
