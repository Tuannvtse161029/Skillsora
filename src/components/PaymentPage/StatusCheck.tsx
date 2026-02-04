import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IProps {
    status?: boolean;
    successUrl: string;
    cancelUrl: string;
    countDown: number;
}

const StatusCheck: React.FC<IProps> = ({ status, successUrl, cancelUrl, countDown }) => {
    const router = useRouter();
    const [timer, setTimer] = useState(countDown);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }


        if (timer === 0) {
            router.push(status ? successUrl : cancelUrl);
        }
    }, [timer, status, successUrl, cancelUrl, router]);

    const icon = status ? (
        <svg viewBox="0 0 24 24" className="text-cyan-600 w-16 h-16 mx-auto my-6">
            <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
        </svg>
    ) : (
        <svg viewBox="0 0 24 24" className="text-red-600 w-16 h-16 mx-auto my-6">
            <path
                fill="currentColor"
                d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.656 16.344a1 1 0 0 1-1.414 0L12 13.414l-4.242 4.242a1 1 0 0 1-1.414-1.414L10.586 12 6.344 7.758a1 1 0 1 1 1.414-1.414L12 10.586l4.242-4.242a1 1 0 0 1 1.414 1.414L13.414 12l4.242 4.242a1 1 0 0 1 0 1.414z"
            />
        </svg>
    );

    return (
        <div className="p-6 md:mx-auto">
            {icon}
            <div className="text-center">
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                    {status ? "Thanh toán hoàn tất" : "Thanh toán không thành công"}
                </h3>
                <p className="text-gray-600 my-2">
                    {status
                        ? "Cảm ơn bạn đã mua gói dịch vụ của chúng tôi!"
                        : "Đơn thanh toán đã được hủy bỏ!"}
                </p>
                <p>{status ? "Chúc bạn học tập hiệu quả!" : "Vui lòng thử lại!"}</p>
                <p className="text-gray-500 mt-4">
                    Tự động chuyển hướng sau {timer} giây...
                </p>
                <div className="py-10 text-center">
                    <Button
                        onClick={() => router.push(status ? successUrl : cancelUrl)}
                        className={`!py-6 !font-bold !text-lg ${status ? "!bg-cyan-600" : "!bg-red-600"
                            } !text-white`}
                    >
                        {status ? "Tiếp tục học tập" : "Quay lại trang trước"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StatusCheck;
