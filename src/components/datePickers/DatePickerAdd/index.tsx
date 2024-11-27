import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

export interface DatePickerAddProps {
    submitLabel: string;
    dateFormat: 'normal' | 'retarded';
    onSubmit: (date: Date) => void;
    button?: React.ReactNode;
}

export const DatePickerAdd: React.FC<DatePickerAddProps> = ({
    submitLabel = 'Submit',
    onSubmit,
    button,
    dateFormat = 'normal'
}) => {
    const [day, setDay] = useState(0);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(1900);

    const handleDateSubmit = () => {
        onSubmit(new Date(`${month}/${day}/${year}`));
    };

    return (
        <React.Fragment>
            <div className="flex justify-center items-center space-x-4 select-none">
                {dateFormat === 'retarded' && (
                    <>
                        <div className="p-3 flex flex-col items-center select-none">
                            <FaPlus className='hover:text-black text-[#4a4a4a] h-5 w-5 inline-block' onClick={(e) => { e.preventDefault(); setMonth((prev) => prev + 1) }} />
                            <h3 className="text-[#4a4a4a] flex text-lg font-semibold w-10 h-10 items-center justify-center">{('0' + month).slice(-2)}</h3>
                            <FaMinus className='hover:text-black text-[#4a4a4a] h-5 w-5 inline-block' onClick={(e) => {
                                e.preventDefault();
                                if (month - 1 >= 0) setMonth((prev) => prev - 1);
                            }} />
                        </div>

                        <h3 className="text-lg font-semibold">-</h3>
                    </>
                )}
                <div className="p-3 flex flex-col items-center select-none">
                    <FaPlus className='hover:text-black text-[#4a4a4a] h-5 w-5 inline-block' onClick={(e) => { e.preventDefault(); setDay((prev) => prev + 1) }} />
                    <h3 className="text-[#4a4a4a] flex text-lg font-semibold w-10 h-10 items-center justify-center">{('0' + day).slice(-2)}</h3>
                    <FaMinus className='hover:text-black text-[#4a4a4a] h-5 w-5 inline-block' onClick={(e) => {
                        e.preventDefault();
                        if (day - 1 >= 0) setDay((prev) => prev - 1);
                    }} />
                </div>

                <h3 className="text-lg font-semibold">-</h3>

                {dateFormat === 'normal' && (
                    <>
                        <div className="p-3 flex flex-col items-center select-none">
                            <FaPlus className='hover:text-black text-[#4a4a4a] h-5 w-5 inline-block' onClick={(e) => { e.preventDefault(); setMonth((prev) => prev + 1) }} />
                            <h3 className="text-[#4a4a4a] flex text-lg font-semibold w-10 h-10 items-center justify-center">{('0' + month).slice(-2)}</h3>
                            <FaMinus className='hover:text-black text-[#4a4a4a] h-5 w-5 inline-block' onClick={(e) => {
                                e.preventDefault();
                                if (month - 1 >= 0) setMonth((prev) => prev - 1);
                            }} />
                        </div>

                        <h3 className="text-lg font-semibold">-</h3>
                    </>
                )}

                <div className="p-3 flex flex-col items-center select-none">
                    <FaPlus className='hover:text-black text-[#4a4a4a] h-5 w-5 inline-block' onClick={(e) => { e.preventDefault(); setYear((prev) => prev + 1) }} />
                    <h3 className="text-[#4a4a4a] flex text-lg font-semibold w-14 h-10 items-center justify-center">{('000' + year).slice(-4)}</h3>
                    <FaMinus className='hover:text-black text-[#4a4a4a] h-5 w-5 inline-block' onClick={(e) => {
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
