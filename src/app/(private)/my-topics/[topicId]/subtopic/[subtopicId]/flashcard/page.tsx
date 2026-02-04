"use client"

import ExcerciseSpace from "@/components/ExcercisePage/ExcerciseSpace";
import Spinner from "@/components/ui/Spinner";
import { GetPagedExcercisesRequest } from "@/types/excercise";
import useExcerciseStore from "@/zustand/useExcerciseStore";
import { useRequest } from "ahooks";
import { useParams } from "next/navigation";


const Page = () => {
    const params = useParams();
    const { excercises, getExcercises } = useExcerciseStore();
    const subTopicId = params.subtopicId as string;

    const { loading } = useRequest(async () => {

        const query: GetPagedExcercisesRequest = {
            searchProp: '',
            exerciseTypeId: '',
            searchKey: '',
            page: 1,
            size: 100,
            orderOn: '',
            isAscending: true,
        }
        await getExcercises(subTopicId!, query);
    }, {
        refreshDeps: [params]
    })

    return (
        <div className='w-full h-screen bg-white flex'>
            {
                loading
                    ?
                    (
                        <div className='h-full w-full flex justify-center items-center'>
                            <Spinner />
                        </div>
                    )
                    :
                    excercises === null
                        ?
                        (
                            <div className='h-full w-full flex justify-center items-center'>
                                <span className='text-gray-600'>Không có bài tập nào</span>
                            </div>
                        )
                        :
                        (
                            <div className="w-full max-h-full scroll-smooth">
                                <ExcerciseSpace />
                            </div>
                        )
            }
        </div>
    )
}

export default Page
