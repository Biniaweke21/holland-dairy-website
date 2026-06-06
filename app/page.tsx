'use client';

import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero-section';
import ScrollSection from '@/components/scroll-section';
import ProductShowcase from '@/components/product-showcase';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <Navbar />
      <HeroSection />

      {/* About Section */}
      <ScrollSection
        id="about"
        title="Our Story"
        description="Holland Dairy has been a beacon of excellence in the dairy industry since 1985. We combine traditional Dutch craftsmanship with modern innovation to bring you the finest dairy products. Our commitment to quality starts from our family farms and extends to your table."
        content={
          <p className="text-gray-600 mb-4">
            Our farmers take pride in caring for their cattle with respect and dedication, ensuring every drop of milk meets our highest standards.
          </p>
        }
        imagePosition="right"
      />

      {/* Quality Section */}
      <ScrollSection
        id="quality"
        title="Quality Promise"
        description="Every product undergoes rigorous quality checks. We use only natural ingredients, no artificial preservatives, and maintain the coldest chain from farm to doorstep."
        content={
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span className="text-gray-700">Farm-to-table freshness</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span className="text-gray-700">100% natural ingredients</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span className="text-gray-700">Certified sustainable practices</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span className="text-gray-700">Award-winning dairy craftsmanship</span>
            </div>
          </div>
        }
        imagePosition="left"
      />

      {/* Products Section */}
      <ProductShowcase />

      {/* Innovation Section */}
      <ScrollSection
        id="innovation"
        title="Innovation Meets Tradition"
        description="While we honor our heritage, we&apos;re not afraid to innovate. Our research lab constantly develops new products that delight modern tastes while maintaining our core values of quality and purity."
        content={
          <p className="text-gray-600">
            From lactose-free options to organic certifications, Holland Dairy adapts to your needs without compromising on taste or nutrition.
          </p>
        }
        imagePosition="right"
      />

      <Footer />
    </main>
  );
}
