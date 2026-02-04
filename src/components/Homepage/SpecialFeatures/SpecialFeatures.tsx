import React from 'react';
import { LuBarChart3, LuBookMarked, LuGroup } from 'react-icons/lu';
import { FaBrain } from 'react-icons/fa';
import { CiShare2 } from 'react-icons/ci';
import { FiZap } from 'react-icons/fi';


const FeatureGrid = () => {
  const features = [
    {
      icon: LuBookMarked,
      title: 'Flashcard Tương Tác',
      description: 'Tạo và luyện tập với flashcard đẹp, hỗ trợ hình ảnh, âm thanh và công thức toán.',
      color: 'bg-cyan-100 text-cyan-600'
    },
    {
      icon: FaBrain,
      title: 'Quiz Thông Minh',
      description: 'Kiểm tra kiến thức với các câu hỏi trắc nghiệm, tự luận và điền khuyết được tạo tự động.',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      icon: CiShare2,
      title: 'Chia Sẻ & Cộng Tác',
      description: 'Chia sẻ study sets với bạn bè, tạo nhóm học tập và học cùng nhau real-time.',
      color: 'bg-cyan-100 text-cyan-600'
    },
    {
      icon: FiZap,
      title: 'Học Tập Cá Nhân',
      description: 'Lộ trình học tập được cá nhân hóa dựa trên tốc độ và phong cách học của bạn.',
      color: 'bg-yellow-500/10 text-yellow-600'
    },
    {
      icon: LuBarChart3,
      title: 'Phân Tích Chi Tiết',
      description: 'Theo dõi tiến độ, xem thống kê chi tiết và nhận gợi ý cải thiện.',
      color: 'bg-purple-500/10 text-purple-600'
    },
    {
      icon: LuGroup,
      title: 'Cộng Đồng Học Tập',
      description: 'Kết nối với hàng triệu học sinh, chia sẻ kinh nghiệm và học hỏi từ nhau.',
      color: 'bg-cyan-500/10 text-cyan-600'
    }
  ]

  return (
    <section id='SpecialFeatures' className='pb-20 md:pb-32 pt-10 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
            Tính Năng Đặc Biệt
          </h2>
          <p className='text-lg text-gray-500 max-w-2xl mx-auto'>
            Mọi công cụ bạn cần để học tập hiệu quả và đạt được mục tiêu của mình
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className='group p-8 rounded-xl border border-gray-200 hover:border-cyan-300 hover:shadow-lg transition-all duration-300 bg-white text-center'
              >
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>
                  {feature.title}
                </h3>
                <p className='text-gray-500'>
                  {feature.description}
                </p>
              </div>

            )
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;