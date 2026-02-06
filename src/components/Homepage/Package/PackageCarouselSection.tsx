"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRequest } from 'ahooks'
import axiosClient from '@/utils/axios/axiosClient'

// Components
import PackageCard from '@/components/PackagePage/PackageCard'
import Spinner from '@/components/ui/Spinner'

// Constants & Types
import { GET_LEARNING_PACKAGES_API, POST_PAYMENT_CHECKOUT_API } from '@/constants/apis'
import { IBaseModel, IPaginate } from '@/interfaces/general'
import { GetPagedPackageRequest, LearningPackageDto } from '@/types/package'
import { CheckOutInfo, CheckOutRequest } from '@/types/payment'

// Store
import useUserStore from '@/zustand/useUserStore'

// Swiper Import
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const PackageCarouselSection = () => {
    const router = useRouter();
    const { user } = useUserStore();
    const [packages, setPackages] = useState<IPaginate<LearningPackageDto>>();
    const [isCreatingLink, setIsCreatingLink] = useState<boolean>(false);

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
        if (response.data.isSuccess) {
            setPackages(response.data.responseRequest)
        }
    })

    const handleGetPaymentLink = async (packageId: string) => {
        try {
            if (!user) {
                router.push('/signin');
                return;
            }

            const currentOrigin = window.location.origin;
            setIsCreatingLink(true);

            const checkOutRequest: CheckOutRequest = {
                canceledReturnUrl: `${currentOrigin}/packages/payment`,
                isCreateInvoice: false,
                packageId: packageId,
                successReturnUrl: `${currentOrigin}/packages/payment`,
                buyerAddress: "Vietnam",
                buyerEmail: user?.email,
                buyerName: user?.fullName,
                buyerPhone: user.phoneNumber || "",
            };

            const response = await axiosClient.post<IBaseModel<CheckOutInfo>>(POST_PAYMENT_CHECKOUT_API, checkOutRequest);

            if (response.data.responseRequest?.checkOutUrl) {
                router.push(response.data.responseRequest.checkOutUrl);
            }

        } catch (error) {
            console.error("Error creating payment link", error);
        } finally {
            setIsCreatingLink(false);
        }
    };

    return (
        <section className="py-16 bg-gradient-to-b from-white to-cyan-50">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="mx-auto max-w-[600px] text-center mb-12">
                    <span className="mb-2 block text-lg font-semibold text-cyan-600">
                        Bảng giá ưu đãi
                    </span>
                    <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-gray-800 sm:text-4xl">
                        Chọn gói dịch vụ phù hợp
                    </h2>
                    <p className="text-base text-gray-500">
                        Nâng cấp tài khoản để mở khóa toàn bộ tính năng và học tập không giới hạn cùng StudyHub.
                    </p>
                </div>

                {/* Carousel Content */}
                {loading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <Spinner />
                    </div>
                ) : (
                    <div className="w-full px-4 md:px-8">
                        <Swiper
                            modules={[Pagination, Navigation, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            navigation={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                            }}
                            className="package-swiper pb-12"
                        >
                            {packages?.items.map((item) => (

                                <SwiperSlide key={item.id} className="h-auto pb-8 pt-4 !mr-[55px]">
                                    <div className="h-full flex flex-col">
                                        <PackageCard
                                            loading={isCreatingLink}
                                            handleGetPaymentLink={handleGetPaymentLink}
                                            package={item}

                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
            </div>
        </section>
    )
}

export default PackageCarouselSection;