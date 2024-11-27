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
}

export const DatePickerRandom: React.FC<DatePickerRandomProps> = ({
    selectLabel = 'Yes',
    resetLabel = 'No',
    questionLabel = 'Is this your birthdate?',
    onSubmit,
    customSelectButton,
    customResetButton,
    dateFormat = 'retarded'
}) => {
    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        generateRandomDate();
    }, []);

    const generateRandomDate = (): void => {
        const currentDate = new Date();
        const startDate = new Date('1900-01-01');
        const randomDate = new Date(getRandomArbitrary(startDate.getTime(), currentDate.getTime()));
        setDate(randomDate);
    };

    return (
        <React.Fragment>
            <div className="mt-4 flex justify-center items-center">
                <div className="mr-4">{questionLabel}</div>
                <h3>{formatSelectedDate(date, dateFormat)}</h3>
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
