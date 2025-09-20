import Navigation from '@/components/Navigation';
import ChallengesSection from '@/components/ChallengesSection';

export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="pt-16">
        <ChallengesSection />
      </div>
    </div>
  );
}
