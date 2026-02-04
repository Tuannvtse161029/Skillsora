'use client';

import { ExcerciseDto } from '@/types/excercise';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface FlashcardProps {
    excercise: ExcerciseDto;
    flip: boolean;
    handleFlip: () => void;
}

const Flashcard = ({ excercise, flip, handleFlip }: FlashcardProps) => {
    const [isFlipped, setIsFlipped] = useState(flip);

    useEffect(() => {
        setIsFlipped(flip);
    }, [flip]);

    return (
        <div className="w-full h-full flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-2xl">
                {/* Card Container */}
                <div
                    onClick={handleFlip}
                    className="relative w-full h-96 cursor-pointer perspective"
                    style={{
                        perspective: '1000px',
                    }}
                >
                    <div
                        className="relative w-full h-full transition-transform duration-500"
                        style={{
                            transformStyle: 'preserve-3d',
                            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        }}
                    >
                        {/* Front of card */}
                        <div
                            className="absolute w-full h-full bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl border-2 border-cyan-200 shadow-2xl p-8 flex flex-col items-center justify-center"
                            style={{ backfaceVisibility: 'hidden' }}
                        >
                            <div className="text-center space-y-4">
                                {excercise?.imageUrl && (
                                    <div className="mb-4">
                                        <Image
                                            src={excercise.imageUrl || "/placeholder.svg"}
                                            alt="Exercise"
                                            width={200}
                                            height={200}
                                            className="mx-auto rounded-lg object-cover w-40 h-40"
                                        />
                                    </div>
                                )}
                                <p className="text-sm text-cyan-600 font-semibold tracking-widest uppercase">
                                    Câu hỏi
                                </p>
                                <h2 className="text-3xl font-bold text-gray-900 leading-relaxed">
                                    {excercise?.question}
                                </h2>
                                <p className="text-sm text-gray-500 mt-8">
                                    👆 Bấm vào thẻ để xem đáp án
                                </p>
                            </div>
                        </div>

                        {/* Back of card */}
                        <div
                            className="absolute w-full h-full bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl border-2 border-cyan-600 shadow-2xl p-8 flex flex-col items-center justify-center"
                            style={{
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)',
                            }}
                        >
                            <div className="text-center space-y-4">
                                <p className="text-sm text-cyan-100 font-semibold tracking-widest uppercase">
                                    Đáp án
                                </p>
                                <h2 className="text-3xl font-bold text-white leading-relaxed">
                                    {excercise?.ans?.[0]?.explanation}
                                </h2>
                                <p className="text-sm text-cyan-100 mt-8">
                                    👆 Bấm vào thẻ để xem câu hỏi
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info badges */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-white border border-cyan-200 rounded-lg p-4 text-center">
                        <p className="text-xs text-gray-600 mb-1">Dạng bài</p>
                        <p className="font-bold text-cyan-600">Flashcard</p>
                    </div>
                    <div className="bg-white border border-teal-200 rounded-lg p-4 text-center">
                        <p className="text-xs text-gray-600 mb-1">Phím tắt</p>
                        <p className="font-bold text-teal-600">Spacebar</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;
