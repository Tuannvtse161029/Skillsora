import { AnswerDto, ExcerciseDto } from "@/types/excercise"
import Answer from "./Answer"

interface IProps {
    handleAttempt: (answer: AnswerDto) => Promise<void>
    excercise: ExcerciseDto
}

const SituationChoice = ({ excercise, handleAttempt }: IProps) => {
    return (
        <div className='flex w-full h-5/6 flex-col justify-center items-center gap-8'>
            <div>
                <h2 className="text-2xl font-bold">Câu hỏi:</h2>
                {
                    excercise.videoUrl &&
                    <iframe className="mx-auto" width="560" height="315" src="https://www.youtube.com/embed/21yibkpE0iI?si=Or3_jcuDY1pYsSik" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                }
                <p className="text-lg text-pretty text-center">
                    {excercise?.question}
                </p>
            </div>
            <div className='flex w-full items-center justify-evenly gap-4 flex-wrap '>
                {excercise.ans.map((item, index) => {
                    return (
                        <div key={index} className={`w-1/${excercise.ans.length}`}>
                            <Answer handleAttempt={handleAttempt} no={index} answer={item} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SituationChoice
