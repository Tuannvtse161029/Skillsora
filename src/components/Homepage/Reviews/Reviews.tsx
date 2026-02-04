"use client";
import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

const TestimonialSlider = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Nguyễn Thuỳ Dương',
      role: 'Học Sinh Khối 11',
      rating: 5,
      comment: 'Skillsora đã giúp tôi cải thiện điểm Tiếng Anh từ 6.5 lên 7.5 IELTS trong 3 tháng. Flashcard thực sự rất hiệu quả!',
      avatar: '👩‍🎓'
    },
    {
      id: 2,
      name: 'Phạm Quốc Hùng',
      role: 'Giáo Viên Toán',
      rating: 5,
      comment: 'Tôi sử dụng Skillsora để tạo bài tập cho lớp. Công cụ này giúp học sinh luyện tập nhiều hơn và hiểu bài sâu hơn.',
      avatar: '👨‍🏫'
    },
    {
      id: 3,
      name: 'Trần Minh Châu',
      role: 'Sinh Viên Năm 1',
      rating: 5,
      comment: 'Với khối lượng bài vở khổng lồ, Skillsora giúp tôi tổ chức và ôn tập một cách khoa học và hiệu quả.',
      avatar: '👨‍🎓'
    },
    {
      id: 4,
      name: 'Lê Hương Giang',
      role: 'Du Học Sinh',
      rating: 5,
      comment: 'Tính năng share study sets rất tuyệt vời! Mình có thể học cùng bạn bè dù ở các nước khác nhau.',
      avatar: '👩‍💼'
    }
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id='testimonials' className='py-20 md:py-24 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
            Cộng Đồng Yêu Thích Skillsora
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Nghe những câu chuyện thành công từ học sinh, giáo viên và cộng đồng trên khắp thế giới
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className='max-w-4xl mx-auto'>
          <div className='relative bg-gradient-to-br from-cyan-100 to-purple-100 rounded-2xl p-8 md:p-12'>
            {/* Navigation Buttons */}
            <div className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8'>
              <button
                onClick={prevTestimonial}
                className='w-12 h-12 rounded-full bg-cyan-600 text-white hover:bg-cyan-500 flex items-center justify-center hover:opacity-90 transition-opacity'
                aria-label='Previous testimonial'
              >
                ←
              </button>
            </div>

            <div className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8'>
              <button
                onClick={nextTestimonial}
                className='w-12 h-12 rounded-full bg-cyan-600 text-white hover:bg-cyan-500 flex items-center justify-center hover:opacity-90 transition-opacity'
                aria-label='Next testimonial'
              >
                →
              </button>
            </div>

            {/* Testimonial Content */}
            <div className='text-center'>
              <div className='text-5xl mb-4'>{testimonials[currentIndex].avatar}</div>

              {/* Rating */}
              <div className='flex items-center justify-center gap-1 mb-4'>
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className='text-xl text-gray-900 mb-6 italic leading-relaxed'>
                &quot;{testimonials[currentIndex].comment}&quot;
              </p>

              {/* Author */}
              <div>
                <p className='font-bold text-lg text-gray-900'>
                  {testimonials[currentIndex].name}
                </p>
                <p className='text-muted-foreground'>
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className='flex justify-center gap-2 mt-8'>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-cyan-600 w-8' : 'bg-gray-300'
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}


export default TestimonialSlider;