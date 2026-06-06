'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <footer className="bg-amber-900 text-white py-12 px-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full flex items-center justify-center">
                <span className="text-amber-900 font-bold text-sm">HD</span>
              </div>
              <span className="font-bold text-lg">Holland Dairy</span>
            </div>
            <p className="text-amber-100 text-sm">
              Crafting premium dairy products since 1985
            </p>
          </motion.div>

          {/* Products */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-4 text-amber-200">Products</h4>
            <ul className="space-y-2 text-sm text-amber-100">
              <li><a href="#" className="hover:text-white transition">Yogurt</a></li>
              <li><a href="#" className="hover:text-white transition">Cheese</a></li>
              <li><a href="#" className="hover:text-white transition">Milk</a></li>
              <li><a href="#" className="hover:text-white transition">Butter</a></li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-4 text-amber-200">Company</h4>
            <ul className="space-y-2 text-sm text-amber-100">
              <li><a href="#about" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Sustainability</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-4 text-amber-200">Contact</h4>
            <ul className="space-y-2 text-sm text-amber-100">
              <li>Email: info@hollanddairy.com</li>
              <li>Phone: +31 (0) 123 456 789</li>
              <li>Location: Amsterdam, Netherlands</li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
          className="h-px bg-amber-700 mb-8 origin-left"
        ></motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center text-sm text-amber-100"
        >
          <p>&copy; {currentYear} Holland Dairy. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Cookie Policy</a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
