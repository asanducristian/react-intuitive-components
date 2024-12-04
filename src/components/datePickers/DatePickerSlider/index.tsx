import React, { useState } from 'react';
import { formatSelectedDate } from '../../../utils/utils';

export interface DatePickerSliderProps {
    submitLabel?: string;
    onSubmit: (date: Date) => void;
    customSlider?: React.ReactNode;
    customSubmitButton?: React.ReactNode;
    dateFormat: 'normal' | 'retarded';
    theme: 'dark' | 'light';
    startDate?: Date;
    endDate?: Date;
}

/**
 * **DatePickerSlider**
 * 
 * Hop on the time slider and experience time travel at your fingertips!
 * This slider lets you pick any date by sliding through history — or the future — like you're moving through time itself! 
 * Adjust the slider and watch the date change in real-time. If you’re feeling fancy, you can even add your own custom slider!
 * Want to submit your chosen date? Just hit the “Submit” button, and voilà — the time is locked in!
 * 
 * **Note:** It’s called `retarded` format for a good reason. Let’s just say it’s for the daredevils.
 * 
 * @component
 * @example
 * // Example usage:
 * <DatePickerSlider 
 *   onSubmit={(date) => console.log("Time Selected:", date)} 
 *   dateFormat="normal" 
 *   theme="light" 
 *   startDate={new Date('2000-01-01')}
 *   endDate={new Date('2024-12-31')}
 * />
 * 
 * @param {Object} props - The magical slider props.
 * @param {string} [props.submitLabel='Submit'] - The label for the submit button. A moment in time captured.
 * @param {Function} props.onSubmit - The function that gets called with the chosen date. Don't miss it!
 * @param {React.ReactNode} [props.customSlider] - A custom slider, for those who like to get creative.
 * @param {React.ReactNode} [props.customSubmitButton] - A custom submit button, for those who want to make it their own.
 * @param {'normal' | 'retarded'} [props.dateFormat='normal'] - The date format. 'normal' is MMDDYYYY, 'retarded' is DDMMYYYY (yes, that's the name we went with).
 * @param {'dark' | 'light'} [props.theme='light'] - The theme of your time machine. Are you a dark-mode traveler or a light mode adventurer?
 * @param {Date} [props.startDate=new Date(-2208995064000)] - The starting date for the slider range. Defaults to a very old date.
 * @param {Date} [props.endDate=new Date()] - The end date for the slider range. Defaults to the current date.
 * 
 * @returns {JSX.Element} The DatePickerSlider component, where time waits for no one!
 */

export const DatePickerSlider: React.FC<DatePickerSliderProps> = ({
    submitLabel = 'Submit',
    onSubmit,
    customSlider,
    customSubmitButton,
    dateFormat = 'normal',
    theme = 'light',
    startDate = new Date(-2208995064000),
    endDate = new Date(),
}) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();

    const handleSliderChange = (value: number): void => {
        setSelectedDate(new Date(value));
    };

    const isDark = theme === 'dark';
    const textColor = isDark ? 'text-white' : 'text-black';

    return (
        <React.Fragment>
            <h3 className={`${textColor} text-lg mt-4 text-center`}>{formatSelectedDate(selectedDate, dateFormat)}</h3>

            <div className="mt-4 w-full max-w-full">
                {customSlider ? (
                    React.cloneElement(customSlider as React.ReactElement, {
                        onChange: (value: number) => handleSliderChange(value),
                        min: startTimestamp,
                        max: endTimestamp,
                    })
                ) : (
                    <input
                        className="w-full min-w-full"
                        type="range"
                        min={startTimestamp}
                        max={new Date().getTime()}
                        defaultValue={startTimestamp}
                        onChange={(e) => handleSliderChange(Number(e.target.value))}
                    />
                )}
            </div>

            <div className="mt-4 flex justify-center">
                {customSubmitButton ? (
                    React.cloneElement(customSubmitButton as React.ReactElement, {
                        onClick: (e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); onSubmit(selectedDate) },
                    })
                ) : (
                    <button
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); onSubmit(selectedDate) }}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        {submitLabel}
                    </button>
                )}
            </div>
        </React.Fragment>
    );
};
