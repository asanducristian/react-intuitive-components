import React, { useState, useRef, useEffect, ReactNode } from "react";

/**
 * Props for the `LaggyInput` component – prepare for an input experience like no other.
 * 
 * @interface LaggyInputProps
 * @property {string} [placeholder] - Because we all love placeholder text! If you don't pass it, it defaults to "Enter text...". *Groundbreaking.*
 * @property {string} value - The actual value of the input field (in case you're wondering).
 * @property {(value: string) => void} onChange - The callback that will *eventually* receive the input value. Be patient. 
 * @property {ReactNode} [customInput] - Optional. Want to customize your input field? Good luck, this might still be broken.
 */

export interface LaggyInputProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    customInput?: ReactNode;
}

/**
 * LaggyInput: The input that *teases* you with delays. It updates with a random, agonizingly long lag,
 * *but* don't worry – the lag is more often short, though sometimes it will frustrate you with long delays.
 * It’s a test of patience, perseverance, and your sanity. Buckle up.
 * 
 * @param {LaggyInputProps} props - The props for the LaggyInput component. Good luck navigating these.
 * @returns {JSX.Element} - The JSX element that will make you question your life choices.
 */

export const LaggyInput: React.FC<LaggyInputProps> = ({
    placeholder = "Enter text...",
    value,
    onChange,
    customInput,
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [internalValue, setInternalValue] = useState<string>(value);
    const [isBlocked, setIsBlocked] = useState<Boolean>(false);

    const getRandomDelay = () => {
        const raw = Math.random();
        return 200 + Math.pow(raw, 2) * 1800;
    };

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isBlocked) return;
        setIsBlocked(true);

        const newValue = e.target.value;

        const delay = getRandomDelay();
        setTimeout(() => {
            setInternalValue(newValue);
            onChange(newValue);
            setIsBlocked(false);
        }, delay);
    };

    // Default Input
    const DefaultInput = (
        <input
            ref={inputRef}
            placeholder={placeholder}
            value={internalValue}
            onChange={handleChange}
            style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                outline: "none",
                transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007BFF")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />
    );

    return <>{customInput ? React.cloneElement(customInput as React.ReactElement, { value: internalValue, onChange: handleChange }) : DefaultInput}</>;
};

