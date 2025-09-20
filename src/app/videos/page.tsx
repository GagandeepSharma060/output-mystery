import VideoSection from '@/components/VideoSection';
import Navigation from '@/components/Navigation';

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="pt-16">
        <VideoSection />
      </div>
    </div>
  );
}
