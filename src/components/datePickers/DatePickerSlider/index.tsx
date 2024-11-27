import React, { useState } from 'react';
import { formatSelectedDate } from '../../../utils/utils';

export interface DatePickerSliderProps {
    submitLabel?: string;
    onSubmit: (date: Date) => void;
    customSlider?: React.ReactNode;
    customSubmitButton?: React.ReactNode;
    dateFormat: 'normal' | 'retarded';
}

export const DatePickerSlider: React.FC<DatePickerSliderProps> = ({
    submitLabel = 'Submit',
    onSubmit,
    customSlider,
    customSubmitButton,
    dateFormat = 'normal'
}) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const startTimestamp = -2208995064000;

    const handleSliderChange = (value: number): void => {
        setSelectedDate(new Date(value));
    };


    return (
        <React.Fragment>
            <h3 className="text-lg mt-4 text-center">{formatSelectedDate(selectedDate, dateFormat)}</h3>

            <div className="mt-4 w-full max-w-full">
                {customSlider ? (
                    React.cloneElement(customSlider as React.ReactElement, {
                        onChange: (value: number) => handleSliderChange(value),
                        min: startTimestamp,
                        max: new Date().getTime(),
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
                        onClick: () => onSubmit(selectedDate),
                    })
                ) : (
                    <button
                        onClick={() => onSubmit(selectedDate)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        {submitLabel}
                    </button>
                )}
            </div>
        </React.Fragment>
    );
};
