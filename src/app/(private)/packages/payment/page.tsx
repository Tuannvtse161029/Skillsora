"use client"

import StatusCheck from "@/components/PaymentPage/StatusCheck";
import Spinner from "@/components/ui/Spinner";
import { PUT_PAYMENT_UPDATE_API } from "@/constants/apis";
import { LEARNING_PACKAGES_ROUTE, LEARNING_TOPICS_ROUTE } from "@/constants/routes";
import { IBaseModel } from "@/interfaces/general";
import { UpdatePaymentOrderRequest } from "@/types/payment";
import axiosClient from "@/utils/axios/axiosClient";
import { useRequest } from "ahooks";
import { useRouter } from "next/navigation";
import { useState } from "react";



const Page = () => {

  const router = useRouter();
  const [status, setStatus] = useState<boolean>();

  const { loading } = useRequest(async () => {
    try {
      const searchParams = new URLSearchParams(window.location.search);

      if (searchParams.get('orderCode') === null) {
        router.push(LEARNING_PACKAGES_ROUTE)
      }

      const request: UpdatePaymentOrderRequest = {
        cancel: searchParams.get('cancel') === 'true',
        code: searchParams.get('code') || '',
        id: searchParams.get('id') || '',
        orderCode: searchParams.get('orderCode') || '',
        status: searchParams.get('status') || ''
      }

      const response = await axiosClient.put<IBaseModel<string>>(PUT_PAYMENT_UPDATE_API, request)

      if (response.data.isSuccess) {
        setStatus(request.status !== 'CANCELLED')
      }

    } catch {
      router.push(LEARNING_PACKAGES_ROUTE)
    }

  });

  return (
    <div className='flex gap-4 h-full justify-center items-center'>
      {
        loading ?
          <div>
            <Spinner />
          </div>
          :
          <>
            <div className="w-full">
              <StatusCheck countDown={5} status={status} successUrl={LEARNING_TOPICS_ROUTE} cancelUrl={LEARNING_PACKAGES_ROUTE} />
            </div>
          </>
      }
    </div>
  )
}

export default Page
