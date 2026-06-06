'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ProductCardProps {
  name: string;
  description: string;
  image: string;
  features: string[];
  index: number;
}

export default function ProductCard({
  name,
  description,
  image,
  features,
  index,
}: ProductCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={cardVariants}
      className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Container */}
      <div className="p-6">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.2 }}
          className="text-2xl font-bold text-amber-900 mb-2"
        >
          {name}
        </motion.h3>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {description}
        </p>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 + 0.3 + i * 0.1 }}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              {feature}
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
        >
          Learn More
        </motion.button>
      </div>
    </motion.div>
  );
}
