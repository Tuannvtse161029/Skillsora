import Image from 'next/image'
import logo from '../../../public/logo.png'

const CommingSoon = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image src={logo} alt='' width={200} height={200}></Image>
            <h1 className="text-5xl text-black font-bold mb-8 animate-pulse">
                Comming Soon
            </h1>
            <p className="text-black text-lg mb-8">
                Cảm ơn bạn đã sử dụng Skillsora, tính năng đang phát triển, hãy chờ đợi những cập nhật tiếp theo!
            </p>
        </div>
    )
}

export default CommingSoon
