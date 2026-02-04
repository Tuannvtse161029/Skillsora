import { LEARNING_TOPICS_SUBS_ROUTE } from '@/constants/routes'
import { TopicOfUserDto } from '@/types/topic'
import checkmark from '../../../public/checkmark.png';
import fastForward from '../../../public/fast-forward.png';
import Link from 'next/link'
import Image from 'next/image';
import { TopicOfUserStatusEnum } from '@/enums/userTopicStatus';

interface IProps {
    userTopic: TopicOfUserDto
    status: TopicOfUserStatusEnum
}

const TopicCardLite = ({ userTopic, status }: IProps) => {

    const handleShowStatus = () => {
        switch (status) {
            case TopicOfUserStatusEnum.Completed: {
                return (
                    <Image
                        className=""
                        width={20}
                        height={20}
                        src={checkmark}
                        alt=""
                    />
                )
            }
            case TopicOfUserStatusEnum.InProgress: {
                return (
                    <Image
                        className="animate-pulse"
                        width={20}
                        height={20}
                        src={fastForward}
                        alt=""
                    />
                )
            }
        }
    }

    return (

        <Link
            href={`${LEARNING_TOPICS_SUBS_ROUTE}?topicId=${userTopic.topicId}`}
        >
            <div className="relative max-w-sm p-2 flex items-center gap-2 bg-white border shadow rounded-lg hover:shadow-lg transition-shadow duration-300">

                <h5 className="text-left pl-2 font-medium tracking-tight text-gray-900">
                    {userTopic.topicName}
                </h5>

                <div className='pr-2'>
                    {handleShowStatus()}
                </div>

            </div>
        </Link>


    )
}

export default TopicCardLite


{/* <div className="relative max-w-sm p-2 flex items-center gap-2 bg-white border shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">

{handleShowStatus()}

<h5 className="text-left px-2 font-medium tracking-tight text-gray-900">
    {userTopic.topicName}
</h5>

<Link
    href={`${LEARNING_TOPICS_SUBS_ROUTE}?topicId=${userTopic.topicId}`}
    className="inline-flex items-center hover:text-yellow-300 px-2 py-1 text-sm text-center text-white bg-cyan-600 rounded"
>
    {buttonTitle}
    <svg
        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
    >
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
        />
    </svg>
</Link>
</div> */}