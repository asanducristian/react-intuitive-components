import React, { useEffect, useState } from "react";
import { shuffle } from "../../../utils/utils";
import { EASY_QS, HARD_QS, MEDIUM_QS } from "../../../utils/constants";

/**
 * Props for the `MathCaptcha` component. It’s time to prove your brainpower— 
 * but don’t get too cocky, it’s just math! Or is it? Get ready for a wild ride.
 * 
 * @interface MathCaptchaProps
 * @property {() => void} noQuestionAnswered - The callback for when you totally skip the quiz. 
 *     Because, you know, sometimes life just doesn’t allow for math.
 * @property {() => void} onMonkey - This one’s for when you can’t solve a single problem. 
 *     Don’t worry, we won’t judge... much.
 * @property {() => void} onStupid - For when you get just one answer right. Not bad, but maybe it’s time for more coffee.
 * @property {() => void} onAverage - For when you get two questions right. 
 *     Not genius level yet, but hey, it’s better than zero!
 * @property {() => void} onGenius - The ultimate callback when you answer three or more questions correctly. 
 *     You’re a certified genius in our book. We’re impressed (but don’t let it get to your head).
 */

export type MathCaptchaProps = {
    noQuestionAnswered: () => void;
    onMonkey: () => void;
    onStupid: () => void;
    onAverage: () => void;
    onGenius: () => void;
};

/**
 * MathCaptcha: The ultimate test of your brainpower. Prove your not a robot with your wit.
 * A math problem here, a timer there, and a sprinkle of chaos just to keep you on your toes. 
 * Ready to prove your smarts? Or are you just here for the thrill of it all?
 * 
 * This captcha will have you racing against the clock, tackling math questions that will make you question 
 * your ability to do basic math. Get through it, and you’ll either be crowned a genius, 
 * or left wondering what went wrong. It’s all part of the fun!
 * 
 * @param {MathCaptchaProps} props - The props for the MathCaptcha component. 
 * Just don’t skip the questions. We’re watching.
 * @returns {JSX.Element} - A fun and quirky captcha that’s definitely *not* your average math quiz.
 */

export const MathCaptcha: React.FC<MathCaptchaProps> = ({
    noQuestionAnswered = () => { console.log("NO Q ANSWERED") },
    onMonkey = () => { console.log("MONKEY") },
    onStupid = () => { console.log("STUPID") },
    onAverage = () => { console.log("AVERAGE") },
    onGenius = () => { console.log("GENIUS") },
}) => {

    const [currentStep, setCurrentStep] = useState(1);
    const [timer, setTimer] = useState(30.0);
    const [answersCorrect, setAnswersCorrect] = useState(0);
    const [input, setInput] = useState("");

    const [questions, setQuestions] = useState([
        ...shuffle(EASY_QS).slice(0, 1),
        ...shuffle(MEDIUM_QS).slice(0, 2),
        ...shuffle(HARD_QS).slice(0, 30),
    ]);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 0) {
                    clearInterval(timerInterval);
                    return 0;
                }
                return parseFloat((prev - 0.1).toFixed(1));
            });
        }, 100);

        return () => clearInterval(timerInterval);
    }, []);

    useEffect(() => {
        setQuestions([
            ...shuffle(EASY_QS).slice(0, 1),
            ...shuffle(MEDIUM_QS).slice(0, 1),
            ...shuffle(HARD_QS).slice(0, 30),
        ]);
    }, [])

    useEffect(() => {
        if (timer <= 0) {
            calculateOutcome()
        }
    }, [timer])

    const handleNextQuestion = () => {
        const currentQuestion = questions[currentStep - 1];
        if (parseInt(input, 10) === currentQuestion.answer) {
            setAnswersCorrect((prev) => prev + 1);
        }
        setInput('')
        if (currentStep < 30) {
            setCurrentStep((prev) => prev + 1);
        } else {
            calculateOutcome();
        }
    };

    const calculateOutcome = () => {
        if (currentStep === 1) {
            noQuestionAnswered();
            return;
        }
        if (answersCorrect === 0) {
            onMonkey();
        } else if (answersCorrect === 1) {
            onStupid();
        } else if (answersCorrect === 2) {
            onAverage();
        } else if (answersCorrect >= 3) {
            onGenius();
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
            style={{ fontFamily: "Arial, sans-serif" }}
        >
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full">
                {timer > 0 ? (
                    <>
                        <p className="text-gray-700 font-bold text-lg">
                            Captcha Verification: Question {currentStep}/132
                        </p>
                        <p className="text-gray-500 text-sm mb-4">
                            Solve the math problem below:
                        </p>
                        <p className="text-2xl font-bold mb-4">{questions[currentStep - 1].question}</p>
                        <input
                            type="number"
                            className="border px-4 py-2 w-2/3 text-center rounded-md"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleNextQuestion();
                            }}
                        />
                        <button
                            onClick={handleNextQuestion}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Submit
                        </button>
                        {timer > 23 && (
                            <p className="h-[20px] mt-4 text-sm text-gray-600">
                                Time left: <span className="font-bold">{timer.toFixed(1)}s</span>
                            </p>
                        )}
                        {timer <= 23 && (
                            <p className="h-[20px] mt-4 text-sm text-gray-600">
                                
                            </p>
                        )}
                    </>
                ) : (
                    <p className="text-red-500 font-bold text-lg">
                        Time's up! Submitting your answers...
                    </p>
                )}
            </div>
        </div>
    );
};