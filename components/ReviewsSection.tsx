import ReviewCarousel from './ReviewCarousel';
import ReviewForm from './ReviewForm';

export default function ReviewsSection() {
  return (
    <section className="bg-linen">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <p className="eyebrow text-center">Real stories</p>
        <h2 className="text-3xl md:text-4xl text-center mt-3">What clients are saying</h2>

        <div className="mt-12">
          <ReviewCarousel />
          <ReviewForm />
        </div>
      </div>
    </section>
  );
}
