import { LearningPackageDto } from '@/types/package';
import { Card, Button, Typography } from 'antd';
import { CiCircleCheck } from 'react-icons/ci';
import { formatPrice } from '@/utils/price/formatPrice';

const { Title, Paragraph } = Typography;

interface IProps {
  package: LearningPackageDto;
  loading: boolean;
  handleGetPaymentLink: (packageId: string) => Promise<void>;
}

const PackageCard = (props: IProps) => {

  const { package: pkg, handleGetPaymentLink, loading } = props;


  return (
    <Card
      className="max-w-xs shadow-lg hover:shadow-xl transition-shadow duration-300"
      hoverable
      cover={<div className="bg-gray-200 rounded-t-lg"></div>}
    >
      <Title level={3} className="text-gray-800 mb-4">
        {pkg.name}
      </Title>

      <Paragraph className="text-gray-600 text-sm mb-6 min-h-16">{pkg.description}</Paragraph>


      <div className="text-center mb-4">
        <p className="text-3xl font-extrabold">
          {formatPrice(pkg.finalPrice)}
        </p>
        {pkg.discountPrice && (
          <p className="text-sm text-gray-500 line-through">
            {formatPrice(pkg.price)}
          </p>
        )}
        <p className="text-gray-500 text-sm">{pkg.durationDay} ngày</p>
      </div>

      <Button loading={loading} onClick={() => handleGetPaymentLink(pkg.id)} className='w-full mb-6 !py-6 !font-bold !text-lg !bg-cyan-600 !text-white'>Đăng ký ngay</Button>

      <hr className='mb-4' />

      <ul className="text-gray-600 text-left text-sm list-none">
        {pkg.features?.split(',').map((feature, index) => (
          <li className='flex items-center gap-2' key={index}><CiCircleCheck className='text-cyan-500' /> {feature.trim()}</li>
        ))}
      </ul>

    </Card>
  );
};

export default PackageCard;
