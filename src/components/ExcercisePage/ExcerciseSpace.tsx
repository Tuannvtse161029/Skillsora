'use client';

import { AnswerDto, AttemptResponse, CreateUserAttemptRequest, ExcerciseDto } from '@/types/excercise';
import useExcerciseStore from '@/zustand/useExcerciseStore'
import { useRequest } from 'ahooks';
import { Button, Modal, Progress } from 'antd';
import { useCallback, useEffect, useState } from 'react'
import { MdOutlineDone } from 'react-icons/md';
import Flashcard from './Flashcard';
import { ExcerciseType } from '@/enums/excerciseType';
import BestChoice from './BestChoice';
import SituationChoice from './SituationChoice';
import TrueFalse from './TrueFalse';
import { getCookie, setCookie } from 'cookies-next';
import axiosClient from '@/utils/axios/axiosClient';
import { IBaseModel } from '@/interfaces/general';
import { POST_ATTEMPT_EXCERCISE_API, POST_COMPLETION_SUBTOPIC_API } from '@/constants/apis';
import AnswerResult from './AnswerResult';
import CompleteResult from './CompleteResult';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import useSubTopicStore from '@/zustand/useSubTopicStore';
import { useParams, useRouter } from 'next/navigation';


const ExcerciseSpace = () => {

    const params = useParams();
    const subTopicId = params.subtopicId as string;
    const topicId = params.topicId as string;


    const [isAttemptModalOpen, setIsAttemptModalOpen] = useState(false);
    const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

    const showAttemptModal = () => {
        setIsAttemptModalOpen(true);
    };

    const handleAttemptModalOk = () => {
        if (attemptResult?.isCorrect) {
            navigateNext()
        }
        setIsAttemptModalOpen(false);
    };

    const showCompleteModal = () => {
        setIsCompleteModalOpen(true);
    };

    const handleCompleteModalOk = () => {
        if (completeResult?.isSuccess) {
            setNo(0);
        }
        setAttempted(false);
        setIsCompleteModalOpen(false);
    };

    const [completeLoading, setCompleteLoading] = useState<boolean>(false);
    const [attemptLoading, setAttemptLoading] = useState<boolean>(false);
    const [attempted, setAttempted] = useState(false);
    const [attemptedExercises, setAttemptedExercises] = useState<string[]>([]);
    const [excercise, setExcercise] = useState<ExcerciseDto>();
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [attemptResult, setAttemptResult] = useState<AttemptResponse>();
    const [completeResult, setCompleteResult] = useState<IBaseModel<string>>();
    const [flip, setFlip] = useState<boolean>(false);
    const [no, setNo] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const { excercises } = useExcerciseStore();
    const { subTopic, getSubTopic, subTopics } = useSubTopicStore();
    const router = useRouter();
    const isLastExercise =
        excercises?.total !== undefined && no >= excercises.total - 1;

    useEffect(() => {
        if (subTopicId) {
            const remSubNo = getCookie(`rem_sub_${subTopicId}`)?.toString();
            if (remSubNo) {
                setNo(Number(remSubNo));
                for (let index = 0; index <= Number(remSubNo); index++) {
                    setAttemptedExercises((prev) => [...prev, excercises?.items[index].id ?? ""]);
                }
            }
            getSubTopic(subTopicId);
        }
    }, [excercises?.items, getSubTopic, params])

    const { } = useRequest(async () => {

        if (!excercises || !excercises.items || !excercises.items[no]) {
            return;
        }


        if (subTopicId) {
            setCookie(`rem_sub_${subTopicId}`, no);
        }

        setExcercise(excercises.items[no])
        calculateProgress();

    }, {
        refreshDeps: [no, excercises]
    });

    const handleFlip = useCallback(async () => {

        setFlip((prev) => !prev);

        if (attempted) {
            return;
        }

        try {
            const exerciseId = excercise?.id;
            const answerId = excercise?.ans?.[0]?.id;

            if (!exerciseId || !answerId) {
                return;
            }

            const userId = getCookie('__appUserId') as string;
            if (!userId) {
                return;
            }

            const request: CreateUserAttemptRequest = {
                options: [answerId],
                userId,
            };

            await axiosClient.post<IBaseModel<AttemptResponse[]>>(
                POST_ATTEMPT_EXCERCISE_API(exerciseId),
                request
            );

            setAttempted(true);

            if (!attemptedExercises.includes(excercise!.id)) {
                setAttemptedExercises((prev) => [...prev, excercise!.id]);
            }

            if (
                excercises?.items &&
                excercises.items.every((item) => attemptedExercises.includes(item.id) || item.id === excercise!.id)
            ) {
                setIsComplete(true);
            }

        } catch {
        }
    }, [attempted, attemptedExercises, excercise, excercises?.items]);

    const calculateProgress = () => {
        if (!excercises?.total) {
            setProgress(0);
            return;
        }

        // ✅ chỉ có 1 flashcard
        if (excercises.total === 1) {
            setProgress(attempted ? 100 : 0);
            return;
        }

        const value = (no / (excercises.total - 1)) * 100;
        setProgress(Math.min(100, Math.max(0, value)));
    };

    useEffect(() => {
        calculateProgress();
    }, [no, attempted, excercises?.total]);


    const navigateNext = useCallback(() => {

        if (!excercises || no >= (excercises.total || 0) - 1) {
            return;
        }

        setFlip(false);
        setAttempted(false);
        setNo((prev) => prev + 1);

    }, [excercises, no]);

    const navigatePrev = useCallback(() => {

        if (no <= 0) {
            return
        }
        setFlip(false)
        setNo((prev) => prev - 1)
    }, [no])

    const handleComplete = async () => {
        try {
            showCompleteModal();
            setCompleteLoading(true);

            const appUserId = getCookie('__appUserId');
            const response = await axiosClient.post<IBaseModel<string>>(POST_COMPLETION_SUBTOPIC_API(excercise!.subTopicId), appUserId)


            setCompleteResult(response.data);
            setCompleteLoading(false);
            setNo(0)
        } catch {
        }
    }

    const handleAttempt = async (answer: AnswerDto) => {
        showAttemptModal()
        setAttemptLoading(true);
        const request: CreateUserAttemptRequest = {
            options: [answer.id],
            userId: getCookie('__appUserId') as string,
        };

        try {
            const response = await axiosClient.post<IBaseModel<AttemptResponse[]>>(
                POST_ATTEMPT_EXCERCISE_API(excercise!.id),
                request
            );

            if (response.data?.responseRequest && response.data.responseRequest.length > 0) {

                const result = response.data.responseRequest[0];

                setAttemptResult(result);

                if (!attemptedExercises.includes(excercise!.id)) {
                    setAttemptedExercises((prev) => [...prev, excercise!.id]);
                }

                if (
                    excercises?.items &&
                    excercises.items.every((item) => attemptedExercises.includes(item.id) || item.id === excercise!.id)
                ) {
                    setIsComplete(true);
                }

            } else {
                console.warn('responseRequest is empty or undefined');
            }

            setAttemptLoading(false);
        } catch {
        }
    };

    const handleRestart = () => {
        if (completeResult?.isSuccess) {
            setNo(0);
        }
        setAttempted(false);
        setIsComplete(false);
        setAttemptedExercises([]);
        setIsCompleteModalOpen(false);
    }

    const handleNextLesson = () => {
        if (subTopics) {
            const index = subTopics?.items.findIndex(x => x.id == subTopic?.id)
            if (index === -1 || index === subTopics?.items.length - 1) {
                router.back();
            }
            router.push(`/my-topics/${topicId}/subtopic`);
        } else {
            router.back();
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.code) {

                case "Space":
                    event.preventDefault();
                    if (excercise?.exerciseTypeId == ExcerciseType.flashcard) {
                        handleFlip();
                    }
                    break;

                case "ArrowLeft":
                    navigatePrev();
                    break;

                case "ArrowRight":
                    if (attempted) {

                        navigateNext();
                    }
                    break;

                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleFlip, navigatePrev, navigateNext, excercise?.exerciseTypeId, attempted]);


    return (
        <div className='flex w-full h-full flex-col gap-6 bg-white py-8'>
            <Modal closable={false} loading={completeLoading} centered okText={completeResult?.isSuccess ? 'Ôn lại' : 'Học tiếp'} okButtonProps={{ style: { backgroundColor: 'cyan', display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }} open={isCompleteModalOpen} onOk={handleCompleteModalOk}>
                <CompleteResult handleNextLesson={handleNextLesson} handleRestart={handleRestart} completeResult={completeResult!} />
            </Modal>
            <Modal closable={false} loading={attemptLoading} centered title="Kết quả" okText={attemptResult?.isCorrect ? "Tiếp tục" : "Thử lại"} okButtonProps={{ style: { backgroundColor: 'cyan' } }} cancelButtonProps={{ style: { display: 'none' } }} open={isAttemptModalOpen} onOk={handleAttemptModalOk}>
                <AnswerResult imgUrl={excercise?.imageUrl} attemptResult={attemptResult} />
            </Modal>

            {/* Header */}
            <div className="flex w-full gap-4 px-6 md:px-12 rounded-lg text-gray-900 items-center">
                <Button
                    onClick={() => router.back()}
                    className="!w-12 !h-12 flex items-center justify-center !bg-cyan-100 !text-cyan-600 hover:!bg-cyan-200 !border-0 !rounded-lg flex-shrink-0"
                >
                    <ArrowLeftIcon className="w-6 h-6" />
                </Button>
                <div className='flex flex-col items-start'>
                    <h1 className='text-lg md:text-2xl font-bold text-left text-gray-900'>{subTopic?.name}</h1>
                    <p className='text-sm text-gray-600 mt-1'>Hoàn thành các bài tập để tiến bộ</p>
                </div>
            </div>

            {/* Main Content - Side by Side */}
            <div className='flex-1 flex flex-col lg:flex-row gap-6 px-6 md:px-12'>
                {/* Left: Exercise Content */}
                <div className='flex-1 flex items-center justify-center min-h-96'>
                    {
                        excercise?.exerciseTypeId == ExcerciseType.flashcard
                            ?
                            <Flashcard excercise={excercise!} flip={flip} handleFlip={handleFlip} />
                            :
                            excercise?.exerciseTypeId == ExcerciseType.bestChoice
                                ?
                                <BestChoice handleAttempt={handleAttempt} excercise={excercise!} />
                                :
                                excercise?.exerciseTypeId == ExcerciseType.situationChoice
                                    ?
                                    <SituationChoice handleAttempt={handleAttempt} excercise={excercise} />
                                    :
                                    excercise?.exerciseTypeId == ExcerciseType.trueFalse
                                        ?
                                        <TrueFalse handleAttempt={handleAttempt} excercise={excercise} />
                                        :
                                        <h1 className='text-gray-600'>Chế độ học đang được phát triển...</h1>
                    }
                </div>

                {/* Right: Progress & Info Sidebar */}
                <div className='w-full lg:w-80 flex flex-col gap-4'>
                    {/* Card Counter */}
                    <div className='bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200 rounded-lg p-4'>
                        <p className='text-xs text-gray-600 font-medium mb-1'>Bài học</p>
                        <p className='text-3xl font-bold text-cyan-600'>
                            {no + 1} <span className='text-gray-400 text-lg'>/ {excercises?.total || 0}</span>
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className='bg-white rounded-lg p-4 border border-gray-200'>
                        <div className='flex justify-between items-center mb-3'>
                            <span className='text-xs font-semibold text-gray-700'>Tiến độ</span>
                            <span className='text-sm font-bold text-cyan-600'>{Math.round(progress)}%</span>
                        </div>
                        <Progress percent={progress} percentPosition={{ align: 'center', type: 'inner' }} strokeColor="#10B981" showInfo={false} style={{ width: '100%' }} />
                    </div>

                    {/* Navigation Buttons */}
                    <div className='flex gap-2'>
                        <Button
                            className='flex-1 !h-11 !rounded-lg !border-cyan-300 !text-cyan-600 hover:!bg-cyan-50 hover:!border-cyan-400 !font-semibold'
                            onClick={navigatePrev}
                            disabled={no <= 0}
                        >
                            ← Trở về
                        </Button>
                        <Button
                            onClick={handleComplete}
                            disabled={!isComplete}
                            className={`flex-1 !h-11 !rounded-lg !border-0 flex items-center justify-center font-semibold ${isComplete
                                ? 'animate-bounce !bg-cyan-500 !text-white hover:!bg-cyan-600'
                                : '!bg-gray-100 !text-gray-400'
                                }`}
                            icon={<MdOutlineDone className='w-5 h-5' />}
                            title="Hoàn thành bài học"
                        />
                    </div>

                    {/* Next Button */}
                    <Button
                        disabled={!attempted || isLastExercise}
                        className={`!h-11 !rounded-lg !font-bold w-full ${attempted && !isLastExercise
                            ? '!bg-cyan-500 !text-white hover:!bg-cyan-600 !border-0'
                            : '!bg-gray-100 !text-gray-400 !border-gray-200'
                            }`}
                        onClick={navigateNext}
                    >
                        {isLastExercise ? 'Đã hết bài' : 'Tiếp theo →'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ExcerciseSpace
