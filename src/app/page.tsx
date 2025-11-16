
import VideoSection from '@/components/VideoSection';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="w-full">
        <HeroSection />
        <VideoSection />
        <FeaturesSection />
      </main>
    </>
  );
}
