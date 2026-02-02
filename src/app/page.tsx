import Hero from '@/components/home/hero';
import VideoSection from '@/components/home/video-section';
import WhoWeAre from '@/components/home/who-we-are';
import FeaturedProperties from '@/components/home/featured-properties';
import WhyChooseUs from '@/components/home/why-choose-us';
import CtaBanner from '@/components/home/cta-banner';

export default function Home() {
  return (
    <>
      <Hero />
      <VideoSection />
      <WhoWeAre />
      <FeaturedProperties />
      <WhyChooseUs />
      <CtaBanner />
    </>
  );
}
