import Image from "next/image"
import Link from "next/link"


const Advertisement = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Link className="w-full h-full flex flex-col items-center justify-center" href={'https://toongadventure.vn/'}>
        <Image width={100} height={100} alt="" className="w-4/6 h-auto" src={'https://toongadventure.vn/wp-content/uploads/2018/09/512px-logo-To-Ong-2022.png'} />
      </Link>
    </div>
  )
}

export default Advertisement
