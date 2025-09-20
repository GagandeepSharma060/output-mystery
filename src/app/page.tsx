
import VideoSection from '@/components/VideoSection';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <main className="w-full">
        <HeroSection />
        <VideoSection />
        <FeaturesSection />
      </main>
    </div>
  );
}
