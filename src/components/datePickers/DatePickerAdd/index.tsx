import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

export interface DatePickerAddProps {
    submitLabel: string;
    dateFormat: 'normal' | 'retarded';
    onSubmit: (date: Date) => void;
    button?: React.ReactNode;
    theme: 'dark' | 'light'
}
/**
 * **DatePickerAdd**
 * 
 * Looking to add a date, but with a little flair? Welcome to the DatePickerAdd component, where you can tweak your day, month, and year with a simple click.
 * Plus, the buttons come with fun icons to make your date-picking experience just a bit more entertaining. Pick a month, day, and year, and hit "Submit" to
 * lock in your brand new date. Choose between two chaotic formats: `normal` (for the mildly sane) or `retarded` (for the adventurers out there who like 
 * their dates a little wacky).
 * 
 * **Warning:** The `retarded` format will throw your sense of order out the window. Proceed with caution.
 * 
 * @component
 * @example
 * // Example usage:
 * <DatePickerAdd 
 *   submitLabel="Confirm your new fate!" 
 *   onSubmit={(date) => console.log("You've sealed your destiny:", date)} 
 *   dateFormat="normal" 
 *   theme="light" 
 * />
 * 
 * @param {Object} props - The props to control your date-picking destiny.
 * @param {string} props.submitLabel - The label for the button that seals your fate. Click it to finalize your date selection.
 * @param {'normal' | 'retarded'} props.dateFormat - The date format. 'normal' is MMDDYYYY, 'retarded' is DDMMYYYY (yes, that's the name we went with).
 * @param {Function} props.onSubmit - The function that gets called when you submit your newly crafted date. Will you regret it later? Only time will tell.
 * @param {React.ReactNode} [props.button] - A custom button for those who want to bring their own flair to the "Submit" action. Maybe it's a magic button that gives you the perfect date (or maybe not).
 * @param {'dark' | 'light'} props.theme - Choose the vibe: `dark` for that mysterious, "I'm making questionable decisions" look, or `light` for the "I’m choosing my fate with confidence" mood.
 * 
 * @returns {JSX.Element} The DatePickerAdd component, where day, month, and year are just a click away—whether you're living on the edge or keeping it classic!
 */
export const DatePickerAdd: React.FC<DatePickerAddProps> = ({
    submitLabel = 'Submit',
    onSubmit,
    button,
    dateFormat = 'normal',
    theme = 'light',
}) => {
    const [day, setDay] = useState(0);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(1900);

    const handleDateSubmit = () => {
        onSubmit(new Date(`${month}/${day}/${year}`));
    };

    const isDark = theme === "dark";
    const textColor = isDark ? "text-white" : "text-[#2e2e2e]";
    const hoverColor = isDark ? "hover:text-gray-400" : "hover:text-gray-600";

    return (
        <React.Fragment>
            <div className="flex justify-center items-center space-x-4 select-none">
                {dateFormat === 'retarded' && (
                    <>
                        <div className="p-3 flex flex-col items-center select-none">
                            <FaPlus className={`${hoverColor} ${textColor} h-5 w-5 inline-block`} onClick={(e) => { e.preventDefault(); setMonth((prev) => prev + 1) }} />
                            <h3 className={`${textColor} flex text-lg font-semibold w-10 h-10 items-center justify-center`}>{('0' + month).slice(-2)}</h3>
                            <FaMinus className={`${hoverColor} ${textColor} h-5 w-5 inline-block`} onClick={(e) => {
                                e.preventDefault();
                                if (month - 1 >= 0) setMonth((prev) => prev - 1);
                            }} />
                        </div>

                        <h3 className={`${textColor} text-lg font-semibold`}>-</h3>
                    </>
                )}
                <div className="p-3 flex flex-col items-center select-none">
                    <FaPlus className={`${hoverColor} ${textColor} h-5 w-5 inline-block`} onClick={(e) => { e.preventDefault(); setDay((prev) => prev + 1) }} />
                    <h3 className={`${textColor} flex text-lg font-semibold w-10 h-10 items-center justify-center`}>{('0' + day).slice(-2)}</h3>
                    <FaMinus className={`${hoverColor} ${textColor} h-5 w-5 inline-block`} onClick={(e) => {
                        e.preventDefault();
                        if (day - 1 >= 0) setDay((prev) => prev - 1);
                    }} />
                </div>

                <h3 className={`${textColor} text-lg font-semibold`}>-</h3>

                {dateFormat === 'normal' && (
                    <>
                        <div className="p-3 flex flex-col items-center select-none">
                            <FaPlus className={`${hoverColor} ${textColor} h-5 w-5 inline-block`} onClick={(e) => { e.preventDefault(); setMonth((prev) => prev + 1) }} />
                            <h3 className={`${textColor} flex text-lg font-semibold w-10 h-10 items-center justify-center`}>{('0' + month).slice(-2)}</h3>
                            <FaMinus className={`${hoverColor} ${textColor} h-5 w-5 inline-block`} onClick={(e) => {
                                e.preventDefault();
                                if (month - 1 >= 0) setMonth((prev) => prev - 1);
                            }} />
                        </div>

                        <h3 className={`${textColor} text-lg font-semibold`}>-</h3>
                    </>
                )}

                <div className="p-3 flex flex-col items-center select-none">
                    <FaPlus className={`${hoverColor} ${textColor} h-5 w-5 inline-block`} onClick={(e) => { e.preventDefault(); setYear((prev) => prev + 1) }} />
                    <h3 className={`${textColor} flex text-lg font-semibold w-14 h-10 items-center justify-center`}>{('000' + year).slice(-4)}</h3>
                    <FaMinus className={`${hoverColor} ${textColor} h-5 w-5 inline-block`} onClick={(e) => {
                        e.preventDefault();
                        if (year - 1 >= 0) setYear((prev) => prev - 1);
                    }} />
                </div>
            </div>

            <div className="mt-4 flex justify-center">
                {button ? (
                    React.cloneElement(button as React.ReactElement, {
                        onClick: handleDateSubmit,
                    })
                ) : (
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        onClick={handleDateSubmit}
                    >
                        {submitLabel}
                    </button>
                )}
            </div>
        </React.Fragment>
    );
};
