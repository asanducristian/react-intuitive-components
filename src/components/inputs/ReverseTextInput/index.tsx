import React, { useRef, useState, ReactNode } from "react";

/**
 * Props for the `ReverseTextInput` component. Just when you thought text input was simple, 
 * we decided to make things *a bit* more complex. You're welcome (or not).
 * 
 * @interface ReverseTextInputProps
 * @property {string} [placeholder] - The placeholder text (just in case you need a hint on what to type). Defaults to "Type here...".
 * @property {string} [label] - Optional label, because we all need more text on the screen. 
 * @property {(value: string) => void} onChange - The callback function that receives the reversed value. Yes, reversed. Prepare for confusion.
 * @property {ReactNode} [customInput] - Optional custom input element. If you want something special, try it, but don’t say we didn’t warn you.
 */

export interface ReverseTextInputProps {
    placeholder?: string;
    label?: string;
    onChange: (value: string) => void;
    customInput?: ReactNode;
}

/**
 * ReverseTextInput: Because sometimes you just want to type, but *not* in the usual order.
 * This component flips your input text around before updating. It’s like a twisted riddle for your brain.
 * 
 * @param {ReverseTextInputProps} props - The props for the ReverseTextInput component. Try not to get too confused.
 * @returns {JSX.Element} - The JSX element that will make you wonder: "Why am I typing backwards?"
 */

export const ReverseTextInput: React.FC<ReverseTextInputProps> = ({
    placeholder = "Type here...",
    label,
    onChange,
    customInput,
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [value, setValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange(newValue);

        if (inputRef.current) {
            inputRef.current.selectionStart = 0;
            inputRef.current.selectionEnd = 0;
        }
    };

    const DefaultInput = (
        <input
            ref={inputRef}
            placeholder={placeholder}
            value={value}
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

    return (
        <div style={{ marginBottom: "20px" }}>
            {customInput ? (
                React.cloneElement(customInput as React.ReactElement, {
                    ref: inputRef,
                    value,
                    onChange: handleChange,
                })
            ) : (
                <>
                    {label && (
                        <label
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "bold",
                                color: "#333",
                            }}
                        >
                            {label}
                        </label>
                    )}
                    {DefaultInput}
                </>
            )}
        </div>
    );
};