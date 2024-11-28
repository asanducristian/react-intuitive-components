import React, { useState, ReactNode } from 'react';
import { shuffle } from '../../../utils/utils';

export interface DatePickerInputRandomProps {
    selectLabel?: string;
    resetLabel?: string;
    onSubmit: (date: Date) => void;
    customSelectButton?: ReactNode;
    customResetButton?: ReactNode;
    dateFormat: 'normal' | 'retarded';
    theme: 'dark' | 'light';
}

/**
 * **DatePickerInputRandom**
 * 
 * Ready to take a leap of fate? With the DatePickerInputRandom component, you can randomly select a date from the depths of time! Just pick digits for
 * day, month, and year and click "Submit" to confirm that this is your true, totally random birthdate — or just hit "Reset" to try again. Choose between 
 * two wild date formats, `normal` (for the sensible folks) and `retarded` (for the daredevils who like to keep things unpredictable).
 * 
 * **Note:** The `retarded` format is, well... it's not your grandma's date format. But it's for those who dare to live on the edge. Enjoy the chaos!
 * 
 * @component
 * @example
 * // Example usage:
 * <DatePickerInputRandom 
 *   onSubmit={(date) => console.log("Are you sure? Chosen Date:", date)} 
 *   dateFormat="normal" 
 *   theme="light" 
 * />
 * 
 * @param {Object} props - The random date picker input props that control the fate of your day.
 * @param {string} [props.selectLabel='Submit'] - The label for the "Submit" button, where you (probably) confirm your randomly selected date.
 * @param {string} [props.resetLabel='Reset'] - The label for the "Reset" button, in case you want to reset fate and pick another random date. Because why not?
 * @param {Function} props.onSubmit - The function that gets called with the date you *randomly* pick when you hit the "Submit" button. It's your fate now.
 * @param {React.ReactNode} [props.customSelectButton] - A custom button for those who want to make their "Submit" button as cool as their date picking skills.
 * @param {React.ReactNode} [props.customResetButton] - A custom button for resetting your date to start over. No regrets, just randomness.
 * @param {'normal' | 'retarded'} [props.dateFormat='normal'] - The date format. 'normal' is MMDDYYYY, 'retarded' is DDMMYYYY (yes, that's the name we went with).
 * @param {'dark' | 'light'} [props.theme='light'] - The theme of your date picker. Choose `dark` for a mysterious, "I like my dates like I like my coffee" vibe, or `light` for a brighter, "I'm feeling lucky" experience.
 * 
 * @returns {JSX.Element} The DatePickerInputRandom component, where fate, randomness, and questionable date formatting collide in the most fun way possible!
 */

export const DatePickerInputRandom: React.FC<DatePickerInputRandomProps> = ({
    selectLabel = 'Submit',
    resetLabel = 'Reset',
    onSubmit,
    customSelectButton,
    customResetButton,
    dateFormat = 'normal',
    theme = 'light',
}) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedElement, setSelectedElement] = useState<number>(-1);

    const [digits, setDigits] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    const [values, setValues] = useState<Record<string, number>>({
        year3: 0,
        year4: 0,
        year2: 0,
        year1: 0,
        month1: 0,
        month2: 0,
        day1: 0,
        day2: 0,
    });

    const isDark = theme === 'dark';
    const textColor = isDark ? 'text-white' : 'text-gray-800';
    const hoverTextColor = isDark ? 'hover:text-gray-800' : 'hover:text-white';
    const backgroundColor = isDark ? 'bg-gray-600' : 'bg-white';
    const borderColor = isDark ? 'border-white' : 'border-gray-300';
    const hoverBgColor = isDark ? 'hover:bg-gray-100' : 'hover:bg-gray-600';

    const resetValues = (): void => {
        setValues({
            year3: 0,
            year4: 0,
            year2: 0,
            year1: 0,
            month1: 0,
            month2: 0,
            day1: 0,
            day2: 0,
        });
    };

    const handleDigitSelection = (digit: number): void => {
        const updatedValues = { ...values };
        switch (selectedElement) {
            case 0:
                if (dateFormat === 'normal') {
                    updatedValues.day1 = digit;
                } else {
                    updatedValues.month1 = digit;
                }
                break;
            case 1:
                if (dateFormat === 'normal') {
                    updatedValues.day2 = digit;
                } else {
                    updatedValues.month2 = digit;
                }
                break;
            case 2:
                if (dateFormat === 'normal') {
                    updatedValues.month1 = digit;
                } else {
                    updatedValues.day1 = digit;
                }
                break;
            case 3:
                if (dateFormat === 'normal') {
                    updatedValues.month2 = digit;
                } else {
                    updatedValues.day2 = digit;
                }
                break;
            case 4:
                updatedValues.year1 = digit;
                break;
            case 5:
                updatedValues.year2 = digit;
                break;
            case 6:
                updatedValues.year3 = digit;
                break;
            case 7:
                updatedValues.year4 = digit;
                break;
            default:
                break;
        }
        setValues(updatedValues);
        setOpenModal(false);
        setDigits(shuffle(digits));
    };

    return (
        <React.Fragment>
            <div className="flex justify-center items-center mt-4 space-x-2 select-none">

                {dateFormat === 'normal' && (
                    ['day1', 'day2', 'month1', 'month2', 'year1', 'year2', 'year3', 'year4'].map((field, index) => (
                        <React.Fragment key={index}>
                            <div
                                onClick={() => {
                                    setSelectedElement(index);
                                    setOpenModal(true);
                                }}
                                className={`border ${textColor} ${borderColor} ${backgroundColor} rounded px-2 py-1 cursor-pointer ${hoverTextColor} ${hoverBgColor}`}
                            >
                                {values[field]}
                            </div>
                            {(index === 1 || index === 3) && <span>.</span>}
                        </React.Fragment>
                    ))
                )}

                {dateFormat === 'retarded' && (
                    ['month1', 'month2', 'day1', 'day2', 'year1', 'year2', 'year3', 'year4'].map((field, index) => (
                        <React.Fragment key={index}>
                            <div
                                onClick={() => {
                                    setSelectedElement(index);
                                    setOpenModal(true);
                                }}
                                className={`border ${textColor} ${borderColor} ${backgroundColor} rounded px-2 py-1 cursor-pointer ${hoverTextColor} ${hoverBgColor}`}
                            >
                                {values[field]}
                            </div>
                            {(index === 1 || index === 3) && <span>.</span>}
                        </React.Fragment>
                    ))
                )}
            </div>
            <div className="mt-4 flex justify-center space-x-4">
                {customResetButton ? (
                    React.cloneElement(customResetButton as React.ReactElement, {
                        onClick: resetValues,
                    })
                ) : (
                    <button
                        onClick={resetValues}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                    >
                        {resetLabel}
                    </button>
                )}

                {customSelectButton ? (
                    React.cloneElement(customSelectButton as React.ReactElement, {
                        onClick: () =>
                            onSubmit(
                                new Date(
                                    `${values.month1}${values.month2}/${values.day1}${values.day2}/${values.year1}${values.year2}${values.year3}${values.year4}`
                                )
                            ),
                    })
                ) : (
                    <button
                        onClick={() =>
                            onSubmit(
                                new Date(
                                    `${values.month1}${values.month2}/${values.day1}${values.day2}/${values.year1}${values.year2}${values.year3}${values.year4}`
                                )
                            )
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        {selectLabel}
                    </button>
                )}
            </div>
            <div>
                {openModal && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center"
                        onClick={() => setOpenModal(false)}
                    >
                        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                bg-white p-4 border border-gray-300 shadow-md rounded-md`} onClick={(e) => e.stopPropagation()}>
                            <div className="p-4 grid grid-cols-3 gap-4">
                                {digits.slice(0, 9).map((digit, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleDigitSelection(digit)}
                                        className="border border-gray-300 rounded p-2 cursor-pointer text-center hover:bg-gray-100"
                                    >
                                        {digit}
                                    </div>
                                ))}
                                <div className="col-span-3 flex justify-center">

                                </div>
                                <div className="col-span-3 flex justify-center">
                                    <div
                                        onClick={() => handleDigitSelection(digits[9])}
                                        className="border border-gray-300 rounded p-2 cursor-pointer text-center hover:bg-gray-100"
                                    >
                                        {digits[9]}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};
