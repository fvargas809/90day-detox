import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import ProgramFeatures from '@/components/ProgramFeatures';
import ProductBanner from '@/components/ProductBanner';
import VideoEducation from '@/components/VideoEducation';
import PricingTiers from '@/components/PricingTiers';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <ProgramFeatures />
        <ProductBanner />
        <VideoEducation />
        <PricingTiers />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
