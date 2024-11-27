import React, { useState, ReactNode } from 'react';
import { shuffle } from '../../../utils/utils';

export interface DatePickerInputRandomProps {
    selectLabel?: string;
    resetLabel?: string;
    onSubmit: (date: Date) => void;
    customSelectButton?: ReactNode;
    customResetButton?: ReactNode;
    dateFormat: 'normal' | 'retarded';
}

const style: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '16px',
    border: '1px solid #ccc',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    outline: 'none',
};

export const DatePickerInputRandom: React.FC<DatePickerInputRandomProps> = ({
    selectLabel = 'Submit',
    resetLabel = 'Reset',
    onSubmit,
    customSelectButton,
    customResetButton,
    dateFormat = 'normal',
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
            <div className="mt-4 text-lg flex justify-center">FORMAT: Y3M2.D2Y4.D1M1Y2Y1</div>
            <div className="flex justify-center items-center mt-4 space-x-2 select-none">

                {dateFormat === 'normal' && (
                    ['day1', 'day2', 'month1', 'month2', 'year1', 'year2', 'year3', 'year4'].map((field, index) => (
                        <React.Fragment key={index}>
                            <div
                                onClick={() => {
                                    setSelectedElement(index);
                                    setOpenModal(true);
                                }}
                                className="border border-gray-300 rounded px-2 py-1 cursor-pointer hover:bg-gray-100"
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
                                className="border border-gray-300 rounded px-2 py-1 cursor-pointer hover:bg-gray-100"
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
                        <div style={style} onClick={(e) => e.stopPropagation()}>
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
