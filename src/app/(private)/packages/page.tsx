"use client"

import PackageCard from '@/components/PackagePage/PackageCard'
import Spinner from '@/components/ui/Spinner'
import { GET_LEARNING_PACKAGES_API, POST_PAYMENT_CHECKOUT_API } from '@/constants/apis'
import { IBaseModel, IPaginate } from '@/interfaces/general'
import { GetPagedPackageRequest, LearningPackageDto } from '@/types/package'
import { CheckOutInfo, CheckOutRequest } from '@/types/payment'
import axiosClient from '@/utils/axios/axiosClient'
import useUserStore from '@/zustand/useUserStore'
import { useRequest } from 'ahooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
// import { Modal } from 'antd'
// import { useEffect } from 'react'
// import { PayOSConfig, usePayOS } from 'payos-checkout'

const Page = () => {

  const router = useRouter();

  const [packages, setPackages] = useState<IPaginate<LearningPackageDto>>();
  const { user } = useUserStore();

  const { loading } = useRequest(async () => {
    const query: GetPagedPackageRequest = {
      searchProp: '',
      searchKey: '',
      page: 1,
      size: 100,
      orderOn: 'price',
      isAscending: true,
    }
    const response = await axiosClient.get<IBaseModel<IPaginate<LearningPackageDto>>>(GET_LEARNING_PACKAGES_API, { params: query })
    if (!response.data.isSuccess) {
      return
    }

    setPackages(response.data.responseRequest)
  })

  // const [isOpen, setIsOpen] = useState(false);
  const [isCreatingLink, setIsCreatingLink] = useState<boolean>(false);

  // const [payOSConfig, setPayOSConfig] = useState<PayOSConfig>({
  //   RETURN_URL: window.location.origin,
  //   ELEMENT_ID: "embedded-payment-container",
  //   CHECKOUT_URL: "",
  //   embedded: true,
  //   onSuccess: (event) => {
  //     setIsOpen(false);
  //   },
  //   onCancel: (event) => {

  //   },
  //   onExit: (event) => {

  //   },
  // });

  // const { open, exit } = usePayOS(payOSConfig);

  const handleGetPaymentLink = async (packageId: string) => {
    try {
      const currentOrigin = window.location.origin;

      setIsCreatingLink(true);

      // exit();


      const checkOutRequest: CheckOutRequest = {
        canceledReturnUrl: `${currentOrigin}/packages/payment`,
        isCreateInvoice: false,
        packageId: packageId,
        successReturnUrl: `${currentOrigin}/packages/payment`,
        buyerAddress: "Vietnam",
        buyerEmail: user?.email,
        buyerName: user?.fullName,
        buyerPhone: "",
      };

      const response = await axiosClient.post<IBaseModel<CheckOutInfo>>(POST_PAYMENT_CHECKOUT_API, checkOutRequest);
      router.push(response.data.responseRequest!.checkOutUrl!);

      ///// Code style for Embedded form of payos
      // setPayOSConfig((oldConfig) => ({
      //   ...oldConfig,
      //   CHECKOUT_URL: response.data.responseRequest!.checkOutUrl!,
      // }));

      // setIsOpen(true);
      // setIsCreatingLink(false);

    } catch {
      setIsCreatingLink(false);
    }
  };

  ///// Code style for Embedded form of payos
  // const handleCancelPayment = () => {
  //   setIsOpen(false);
  //   exit();
  // }

  ///// Code style for Embedded form of payos
  // useEffect(() => {
  //   if (payOSConfig.CHECKOUT_URL != "" && isOpen && !isCreatingLink) {
  //     open();
  //   }
  // }, [payOSConfig]);

  return (
    <div className='flex gap-4 h-full'>
      {
        loading
          ?
          (
            <div className='h-full w-full flex justify-center items-center'>
              <Spinner />
            </div>
          )
          :
          <div className='flex justify-evenly w-full flex-col gap-4'>

            <div className="container mx-auto">
              <div className="flex flex-wrap">
                <div className="w-full">
                  <div className="mx-auto max-w-[510px] text-center">
                    <span className="mb-2 block text-lg font-semibold text-primary">
                      Bảng giá
                    </span>
                    <h2 className="mb-3 text-3xl font-bold leading-[1.208] text-cyan-700 sm:text-4xl md:text-[40px]">
                      Các gói dịch vụ
                    </h2>
                    <p className="text-base text-body-color dark:text-dark-6">
                      Đừng bỏ lỡ cơ hội trải nghiệm hệ thống với mức giá vô cùng hợp lý! Chọn ngay gói dịch vụ phù hợp và khởi đầu hành trình của bạn.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-4 flex-wrap w-full justify-evenly '>
              {
                packages?.items.map((item) => {
                  return (
                    <PackageCard loading={isCreatingLink} handleGetPaymentLink={handleGetPaymentLink} key={item.id} package={item}></PackageCard>
                  )
                })
              }
            </div>

            {/* ///// Code style for Embedded form of payos */}
            {/* <Modal className='' footer={null} title="Thanh toán" open={isOpen} onCancel={handleCancelPayment}>
              {isOpen && (
                <div style={{ maxWidth: "400px" }}>
                  Sau khi thực hiện thanh toán thành công, vui lòng đợi từ 5 - 10s để
                  hệ thống tự động cập nhật.
                </div>

              )}
              <div
                id="embedded-payment-container"
                style={{
                  height: "450px",
                }}
              >
              </div>
            </Modal> */}

          </div>
      }

    </div>
  )
}

export default Page
