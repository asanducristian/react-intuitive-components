import React, { useEffect, useState, ReactNode } from 'react';
import { formatSelectedDate, getRandomArbitrary } from '../../../utils/utils';

export interface DatePickerRandomProps {
    selectLabel?: string;
    resetLabel?: string;
    questionLabel?: string;
    onSubmit: (birthdate: Date) => void;
    customSelectButton?: ReactNode;
    customResetButton?: ReactNode;
    dateFormat: 'normal' | 'retarded';
    theme: 'dark' | 'light';
    startDate?: Date;
    endDate?: Date;
}

/**
 * **DatePickerRandom**
 * 
 * Take a leap of fate and let the randomizer choose a date for you! This component picks a random date between the specified `startDate` and `endDate`
 * and displays it as a potential birthdate. You can decide whether this is your actual birthdate by selecting "Yes" or generate a new random date with
 * the "No" button. A fun way to play with time!
 * 
 * **Note:** It’s called `retarded` format for a good reason. For the daredevils and those who like to have a little fun with the date formatting.
 * 
 * @component
 * @example
 * // Example usage:
 * <DatePickerRandom 
 *   onSubmit={(birthdate) => console.log("Chosen Birthdate:", birthdate)} 
 *   dateFormat="normal" 
 *   theme="light" 
 *   startDate={new Date('1900-01-01')} 
 *   endDate={new Date('2024-12-31')}
 * />
 * 
 * @param {Object} props - The random date picker props.
 * @param {string} [props.selectLabel='Yes'] - The label for the "Yes" button, confirming that the random date is your birthdate.
 * @param {string} [props.resetLabel='No'] - The label for the "No" button, which generates a new random date.
 * @param {string} [props.questionLabel='Is this your birthdate?'] - The label asking if the random date is your birthdate.
 * @param {Function} props.onSubmit - The function that gets called with the selected (or confirmed) birthdate.
 * @param {React.ReactNode} [props.customSelectButton] - A custom button for confirming the random date.
 * @param {React.ReactNode} [props.customResetButton] - A custom button for generating a new random date.
 * @param {'normal' | 'retarded'} [props.dateFormat='retarded'] - The date format. 'normal' is MMDDYYYY, 'retarded' is DDMMYYYY (yes, that's the name we went with).
 * @param {'dark' | 'light'} [props.theme='light'] - The theme of the random date picker. Choose dark mode for a mysterious vibe or light mode for clarity.
 * @param {Date} [props.startDate=new Date('1900-01-01')] - The start date for the random date range (default is January 1st, 1900).
 * @param {Date} [props.endDate=new Date()] - The end date for the random date range (default is the current date).
 * 
 * @returns {JSX.Element} The DatePickerRandom component, where fate decides your birthdate!
 */

export const DatePickerRandom: React.FC<DatePickerRandomProps> = ({
    selectLabel = 'Yes',
    resetLabel = 'No',
    questionLabel = 'Is this your birthdate?',
    onSubmit,
    customSelectButton,
    customResetButton,
    dateFormat = 'retarded',
    theme = 'light',
    startDate = new Date('1900-01-01'),
    endDate = new Date(),
}) => {
    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        generateRandomDate();
    }, []);

    const generateRandomDate = (): void => {
        const randomDate = new Date(getRandomArbitrary(startDate.getTime(), endDate.getTime()));
        setDate(randomDate);
    };

    const isDark = theme === 'dark';
    const textColor = isDark ? 'text-white' : 'text-black';

    return (
        <React.Fragment>
            <div className="mt-4 flex justify-center items-center">
                <div className={`${textColor} mr-4`}>{questionLabel}</div>
                <h3 className={`${textColor}`}>{formatSelectedDate(date, dateFormat)}</h3>
            </div>

            <div className="mt-4 flex justify-center space-x-4">
                {customResetButton ? (
                    React.cloneElement(customResetButton as React.ReactElement, {
                        onClick: generateRandomDate,
                    })
                ) : (
                    <button
                        onClick={generateRandomDate}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                    >
                        {resetLabel}
                    </button>
                )}

                {customSelectButton ? (
                    React.cloneElement(customSelectButton as React.ReactElement, {
                        onClick: () => onSubmit(date),
                    })
                ) : (
                    <button
                        onClick={() => onSubmit(date)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        {selectLabel}
                    </button>
                )}
            </div>
        </React.Fragment>
    );
};
