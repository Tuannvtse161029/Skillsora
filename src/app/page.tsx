import MainBanner from '@/components/Homepage/MainBanner/MainBanner'
import SpecialFeatures from '../components/Homepage/SpecialFeatures/SpecialFeatures';
import Reviews from '../components/Homepage/Reviews/Reviews'
import StudySetsSection from '@/components/Homepage/StudySets';
import CTASection from '@/components/Homepage/CTA';
export default function Home() {
  return (
    <div className='bg-white'>
      <MainBanner />
      <SpecialFeatures />
      <StudySetsSection />
      <Reviews />
      <CTASection />
    </div>
  );
}
