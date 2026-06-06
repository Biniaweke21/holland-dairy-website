'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScrollSectionProps {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  imagePosition?: 'left' | 'right';
}

export default function ScrollSection({
  id,
  title,
  description,
  content,
  imagePosition = 'right',
}: ScrollSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id={id} className="w-full py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        <div
          className={`grid md:grid-cols-2 gap-12 items-center ${
            imagePosition === 'left' ? 'md:grid-cols-2' : 'md:grid-cols-2'
          }`}
        >
          {/* Content Side */}
          <motion.div
            variants={itemVariants}
            className={imagePosition === 'right' ? 'order-1' : 'order-2'}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-amber-900 mb-4"
            >
              {title}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 mb-6 leading-relaxed"
            >
              {description}
            </motion.p>
            <motion.div variants={itemVariants}>{content}</motion.div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            variants={itemVariants}
            className={`relative h-96 rounded-lg overflow-hidden shadow-xl ${
              imagePosition === 'right' ? 'order-2' : 'order-1'
            }`}
          >
            <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
              <img
                src="/dairy-fresh.png"
                alt="Dairy products"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
