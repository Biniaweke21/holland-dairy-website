'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProductCard from './product-card';

const PRODUCTS = [
  {
    name: 'Premium Greek Yogurt',
    description: 'Creamy, rich yogurt made from the finest milk. Perfect for breakfast or as a healthy snack.',
    image: '/yogurt-product.png',
    features: ['High in protein', 'Probiotic cultures', 'No artificial preservatives', 'Creamy texture'],
  },
  {
    name: 'Artisan Gouda Cheese',
    description: 'Aged Dutch cheese with a smooth, slightly sweet taste. A true delicacy for cheese lovers.',
    image: '/cheese-product.png',
    features: ['Aged 12 months', 'Rich flavor', 'Perfect for entertaining', 'Authentic Dutch recipe'],
  },
  {
    name: 'Fresh Dairy Range',
    description: 'Our complete collection of fresh milk and dairy products, delivered straight from our farms.',
    image: '/dairy-fresh.png',
    features: ['Farm-fresh daily', 'Cold chain maintained', 'Sustainable practices', 'Family approved'],
  },
];

export default function ProductShowcase() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="products" className="w-full py-24 px-4 bg-white">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <motion.div
          variants={titleVariants}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-amber-900 mb-4">
            Our Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our range of premium dairy products, crafted with passion and tradition
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {PRODUCTS.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-4">
            Interested in wholesale or bulk orders?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-full hover:shadow-lg transition-all"
          >
            Contact Sales
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
