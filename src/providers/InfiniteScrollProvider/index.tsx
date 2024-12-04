import React, { createContext, useState, useEffect, ReactNode, useRef } from "react";
import { timeout } from "../../utils/utils";

export interface InfiniteScrollContextType {
    childElements: ReactNode[];
    addMoreChildren: () => void;
}

export const InfiniteScrollContext = createContext<InfiniteScrollContextType>({
    childElements: [],
    addMoreChildren: () => { },
});

export interface InfiniteScrollProviderProps {
    children: ReactNode;
}

/**
 * InfiniteScrollProvider component is here to keep you endlessly scrolling.
 * It feeds you more child elements like your favorite snack, just when you think you’ve reached the bottom.
 * 
 * @component
 * @example
 * // Use this if you want your scroll to feel like an infinite buffet of components.
 * <InfiniteScrollProvider>
 *   <YourComponent />
 * </InfiniteScrollProvider>
 * 
 * @param {ReactNode} children - The never-ending stream of child elements. You thought there were enough? Think again!
 * 
 * @returns {ReactNode} A context provider, just like a magical scroll genie, offering endless child elements.
 */

export const InfiniteScrollProvider: React.FC<InfiniteScrollProviderProps> = ({ children }) => {
    const [childElements, setChildElements] = useState<ReactNode[]>([]);
    const lastIndexRef = useRef(0);
    const childSizeRef = useRef(0);

    const addMoreChildren = () => {
        const nextIndex = lastIndexRef.current;
        setChildElements((prev) => {
            const newChildren = React.Children.toArray(children)
                .filter(React.isValidElement)
                .map((child, index) =>
                    React.cloneElement(child, {
                        key: `${index}-${prev.length}-${nextIndex}`,
                    })
                );
            lastIndexRef.current += 1;
            return [
                ...prev,
                ...newChildren
            ]
        });
    };

    const popChildren = () => {
        setChildElements((prev) => {
            const newChildElements = prev.slice(React.Children.toArray(children).length);
            return newChildElements;
        });
    }

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollY + windowHeight >= documentHeight - 7000) {
            addMoreChildren();
        }

        if (scrollY > childSizeRef.current) {
            popChildren();
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [children]);

    useEffect(() => {
        addMoreChildren();
        initElements();
    }, [])

    const initElements = async () => {
        await timeout(100);
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.clientHeight;

        childSizeRef.current = document.body.scrollHeight<documentHeight?document.body.scrollHeight:documentHeight;

        if (documentHeight <= windowHeight) {
            addMoreChildren();
            addMoreChildren();
        }
    }

    return (
        <>
            <style>
                {`
                    body {
                        overflow: auto !important;
                    }
                    ::-webkit-scrollbar {
                        display: none;
                    }
                    body {
                        scrollbar-width: none;
                    }
                    body {
                        -ms-overflow-style: none;
                    }
                `}
            </style>
            <InfiniteScrollContext.Provider value={{ childElements, addMoreChildren }}>
                {childElements}
            </InfiniteScrollContext.Provider>
        </>
    );
};