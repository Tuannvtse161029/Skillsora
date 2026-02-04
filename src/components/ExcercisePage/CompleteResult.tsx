import { IBaseModel } from '@/interfaces/general';
import sunHappy from '../../../public/sun.png';
import moonSad from '../../../public/unhappy.png';
import Image from 'next/image';
import { Button } from 'antd';

interface IProps {
    completeResult: IBaseModel<string>;
    handleRestart: () => void;
    handleNextLesson: () => void
}

const CompleteResult = ({ completeResult, handleNextLesson, handleRestart }: IProps) => {


    const containerClass = completeResult.isSuccess
        ? 'bg-cyan-50 border-cyan-400 text-cyan-800'
        : 'bg-red-50 border-red-400 text-red-800';

    const icon = completeResult.isSuccess ? sunHappy : moonSad;
    const message = completeResult.isSuccess
        ? (
            <>
                Chúc mừng bạn đã hoàn thành. <br />
                Tiếp tục học tập nhé!
            </>
        )
        : (
            <>
                Bạn vẫn còn bài chưa học. <br />
                Hãy chăm chỉ nhé!
            </>
        );

    return (
        <div className={`p-6 rounded-lg shadow-md border ${containerClass} flex flex-col items-center space-y-4`}>
            <div className='w-24 h-auto'>
                <Image
                    src={icon}
                    alt="Status Icon"
                    width={500}
                    height={500}
                    className="flex-shrink-0 w-full"
                />
            </div>
            <div className="text-lg text-center font-semibold leading-relaxed">
                {message}
            </div>
            <div className='flex w-full gap-4 items-center justify-center'>
                <Button className='!font-semibold !w-4/12 hover:!border-cyan-600 hover:!text-cyan-600 !h-12 !rounded-lg' onClick={handleRestart}>{completeResult.isSuccess ? 'Ôn lại' : 'Học tiếp'}</Button>
                {
                    completeResult.isSuccess &&
                    <Button className='!font-semibold !w-4/12 !text-white !bg-cyan-600 hover:!border-cyan-600  hover:!text-white !h-12 !rounded-lg' onClick={handleNextLesson}>Tiếp theo</Button>
                }
            </div>
        </div>
    );
};

export default CompleteResult;
