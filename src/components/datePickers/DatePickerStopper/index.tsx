import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

export interface DatePickerStopperProps {
    selectLabel?: string;
    resetLabel?: string;
    submitLabel?: string;
    onSubmit: (date: Date) => void;
    customSelectButton?: React.ReactNode;
    customResetButton?: React.ReactNode;
    customSubmitButton?: React.ReactNode;
    dateFormat: 'normal' | 'retarded';
}

export const DatePickerStopper: React.FC<DatePickerStopperProps> = ({
    selectLabel = 'STOP',
    resetLabel = 'Reset',
    submitLabel = 'Submit',
    onSubmit,
    customSelectButton,
    customResetButton,
    customSubmitButton,
    dateFormat = 'normal'
}) => {
    const [day1, setDay1] = useState<number>(0);
    const [day2, setDay2] = useState<number>(0);
    const [month1, setMonth1] = useState<number>(0);
    const [month2, setMonth2] = useState<number>(0);
    const [year1, setYear1] = useState<number>(0);
    const [year2, setYear2] = useState<number>(0);
    const [year3, setYear3] = useState<number>(0);
    const [year4, setYear4] = useState<number>(0);
    const [position, setPosition] = useState<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startSet = (setter: React.Dispatch<React.SetStateAction<number>>) => {
        setter((prev) => (prev + 1) % 10);
    };

    const stopIncrementing = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const startIncrementing = () => {
        const incrementHandlers = [
            () => startSet(setDay1),
            () => startSet(setDay2),
            () => startSet(setMonth1),
            () => startSet(setMonth2),
            () => startSet(setYear1),
            () => startSet(setYear2),
            () => startSet(setYear3),
            () => startSet(setYear4),
        ];

        stopIncrementing();
        intervalRef.current = setInterval(() => {
            incrementHandlers[position]();
        }, 200);
    };

    const handleReset = () => {
        stopIncrementing();
        setPosition(0);
        setDay1(0);
        setDay2(0);
        setMonth1(0);
        setMonth2(0);
        setYear1(0);
        setYear2(0);
        setYear3(0);
        setYear4(0);
        startIncrementing();
    };

    const handleSelect = () => {
        stopIncrementing();
        if (position < 7) {
            setPosition((prev) => prev + 1);
            startIncrementing();
        }
    };

    const handleSubmit = () => {
        stopIncrementing();
        if (dateFormat === 'normal') {
            const date = new Date(
                `${month1}${month2}/${day1}${day2}/${year1}${year2}${year3}${year4}`
            );
            onSubmit(date);
        }else{
            const date = new Date(
                `${day1}${day2}/${month1}${month2}/${year1}${year2}${year3}${year4}`
            );
            onSubmit(date);

        }
    };

    useEffect(() => {
        startIncrementing();
        return () => stopIncrementing();
    }, [position]);

    return (
        <React.Fragment>
            <h3 className="text-lg mt-4 text-center">
                {`${day1}${day2}.${month1}${month2}.${year1}${year2}${year3}${year4}`}
            </h3>
            <div className="mt-4 flex justify-center">
                {customResetButton ? (
                    React.cloneElement(customResetButton as React.ReactElement, {
                        onClick: handleReset,
                    })
                ) : (
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                        onClick={handleReset}
                    >
                        {resetLabel}
                    </button>
                )}

                {customSelectButton ? (
                    React.cloneElement(customSelectButton as React.ReactElement, {
                        onClick: handleSelect,
                    })
                ) : (
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded mx-2 hover:bg-blue-600 transition"
                        onClick={handleSelect}
                    >
                        {selectLabel}
                    </button>
                )}

                {customSubmitButton ? (
                    React.cloneElement(customSubmitButton as React.ReactElement, {
                        onClick: handleSubmit,
                    })
                ) : (
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        onClick={handleSubmit}
                    >
                        {submitLabel}
                    </button>
                )}
            </div>
        </React.Fragment>
    );
};

DatePickerStopper.propTypes = {
    selectLabel: PropTypes.string,
    resetLabel: PropTypes.string,
    submitLabel: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    customSelectButton: PropTypes.node,
    customResetButton: PropTypes.node,
    customSubmitButton: PropTypes.node,
};
