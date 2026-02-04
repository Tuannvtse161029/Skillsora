import { AttemptResponse } from '@/types/excercise';
import Image from 'next/image';
import React from 'react';

interface IProps {
    attemptResult: AttemptResponse | undefined;
    imgUrl?: string | undefined
}

const AnswerResult = ({ attemptResult, imgUrl }: IProps) => {
    if (!attemptResult) {
        return (
            <div className="p-4 text-gray-500">
                Không có thông tin về kết quả. Vui lòng thử lại!
            </div>
        );
    }

    return (
        <div className="">
            <div className="text-center">
                <h2
                    className={`text-2xl font-semibold ${attemptResult.isCorrect ? 'text-cyan-600' : 'text-red-600'
                        }`}
                >
                    {attemptResult.isCorrect
                        ? 'Bạn đã trả lời đúng!'
                        : 'Bạn đã trả lời sai!'}
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                    {attemptResult.isCorrect
                        ? 'Chúc mừng! Bạn đã chọn đáp án chính xác.'
                        : 'Đáp án bạn chọn không đúng. Hãy thử lại!'}
                </p>
            </div>
            <div className="mt-4 p-4 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Giải thích:</h3>
                <p className="mt-2 text-gray-600">
                    {
                        imgUrl && attemptResult.isCorrect &&
                        <Image src={imgUrl} alt='' width={500} height={500} className="w-full aspect-video h-auto object-fit rounded-lg" loading='eager' />
                    }
                    {attemptResult.explanation || 'Không có giải thích chi tiết.'}
                </p>
            </div>
        </div>
    );
};

export default AnswerResult;
