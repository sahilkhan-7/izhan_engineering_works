"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface TestimonialsProps {
  isDark: boolean;
}

// Mock testimonial data - replace with actual import from JSON
const mockTestimonials = [
  {
    id: 1,
    name: "Ravi Kumar",
    text: "Excellent fabrication work and timely delivery. The quality exceeded our expectations and the team was very professional throughout the project.",
    avatar: "/api/placeholder/60/60",
    stars: 5,
    role: "Business Owner",
    location: "Jaipur"
  },
  {
    id: 2,
    name: "Meena Sharma",
    text: "Great finishing on the railings. Very professional team! They completed the work within the promised timeline and budget.",
    avatar: "/api/placeholder/60/60",
    stars: 4,
    role: "Homeowner",
    location: "Delhi"
  },
  {
    id: 3,
    name: "Imran Sheikh",
    text: "The custom gate they designed was perfect. Smooth process from start to end with excellent customer service and support.",
    avatar: "/api/placeholder/60/60",
    stars: 5,
    role: "Property Manager",
    location: "Mumbai"
  },
  {
    id: 4,
    name: "Sakshi Jain",
    text: "Good work on rolling shutters. Pricing was fair too and the installation was completed without any hassle.",
    avatar: "/api/placeholder/60/60",
    stars: 4,
    role: "Shop Owner",
    location: "Ahmedabad"
  },
  {
    id: 5,
    name: "Pankaj Joshi",
    text: "Reliable, skilled, and honest team. Will hire again for future projects. They delivered exactly what was promised.",
    avatar: "/api/placeholder/60/60",
    stars: 5,
    role: "Industrial Manager",
    location: "Surat"
  },
  {
    id: 6,
    name: "Anita Gupta",
    text: "Outstanding craftsmanship and attention to detail. The metal gates look amazing and the security features work perfectly.",
    avatar: "/api/placeholder/60/60",
    stars: 5,
    role: "Residential Client",
    location: "Pune"
  },
  {
    id: 7,
    name: "Vikash Singh",
    text: "Professional approach and quality materials used. The structural work was completed with precision and met all safety standards.",
    avatar: "/api/placeholder/60/60",
    stars: 4,
    role: "Construction Head",
    location: "Indore"
  },
  {
    id: 8,
    name: "Priya Patel",
    text: "Exceptional service from consultation to completion. The team understood our requirements perfectly and delivered beyond expectations.",
    avatar: "/api/placeholder/60/60",
    stars: 5,
    role: "Architect",
    location: "Udaipur"
  }
];

export default function Testimonials({ isDark }: TestimonialsProps) {
  // Create multiple loops for continuous circular motion
  const extendedTestimonials = [...mockTestimonials, ...mockTestimonials, ...mockTestimonials];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section
      className={`relative py-20 px-4 md:px-10 overflow-hidden ${isDark
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
          : 'bg-gradient-to-br from-orange-50 via-white to-yellow-50'
        }`}
      id="testimonials"
    >
      {/* Background Elements */}
      <div className={`absolute inset-0 opacity-20 pointer-events-none ${isDark
          ? 'bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent'
          : 'bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-orange-200/30 via-transparent to-transparent'
        }`} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10"
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
              What Our Clients
            </span>{' '}
            <span className={isDark ? 'text-white' : 'text-gray-900'}>
              Say
            </span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-orange-500 to-yellow-500 max-w-md mx-auto rounded-full mb-8"
          />

          <motion.p
            variants={itemVariants}
            className={`text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
          >
            Don't just take our word for it - hear from our satisfied customers across India
          </motion.p>
        </motion.div>

        {/* Circular Testimonials */}
        <div className="relative -mx-4 md:-mx-10 overflow-hidden">
          {/* First Row - Left to Right */}
          <motion.div
            className="flex gap-6 mb-8"
            animate={{
              x: [0, -100 * mockTestimonials.length]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25, // Faster animation
                ease: "linear"
              }
            }}
            style={{ width: `${extendedTestimonials.length * 320}px` }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`row1-${index}`}
                className={`flex-shrink-0 w-80 p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 group hover:scale-105 ${isDark
                    ? 'bg-white/10 border-orange-500/20 hover:bg-white/20 hover:border-orange-400/40'
                    : 'bg-white/90 border-orange-200/50 hover:bg-white hover:border-orange-300 shadow-lg hover:shadow-2xl'
                  }`}
                whileHover={{ y: -5 }}
              >
                {/* Quote Icon */}
                <div className="flex justify-between items-start mb-4">
                  <Quote className="w-8 h-8 text-orange-500 opacity-60" />
                  <div className="flex text-yellow-400">
                    {Array.from({ length: testimonial.stars }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  "{testimonial.text}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {testimonial.name}
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-yellow-500 rounded-full opacity-15 group-hover:opacity-30 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>

          {/* Second Row - Right to Left */}
          <motion.div
            className="flex gap-6 mb-8"
            animate={{
              x: [-100 * mockTestimonials.length, 0]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30, // Slightly different speed for variation
                ease: "linear"
              }
            }}
            style={{ width: `${extendedTestimonials.length * 320}px` }}
          >
            {extendedTestimonials.reverse().map((testimonial, index) => (
              <motion.div
                key={`row2-${index}`}
                className={`flex-shrink-0 w-80 p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 group hover:scale-105 ${isDark
                    ? 'bg-white/10 border-yellow-500/20 hover:bg-white/20 hover:border-yellow-400/40'
                    : 'bg-white/90 border-yellow-200/50 hover:bg-white hover:border-yellow-300 shadow-lg hover:shadow-2xl'
                  }`}
                whileHover={{ y: -5 }}
              >
                {/* Quote Icon */}
                <div className="flex justify-between items-start mb-4">
                  <Quote className="w-8 h-8 text-yellow-500 opacity-60" />
                  <div className="flex text-orange-400">
                    {Array.from({ length: testimonial.stars }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  "{testimonial.text}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {testimonial.name}
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-orange-500 rounded-full opacity-15 group-hover:opacity-30 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>

          {/* Third Row - Left to Right (Faster) */}
          {/* <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -100 * mockTestimonials.length]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20, // Even faster
                ease: "linear"
              }
            }}
            style={{ width: `${extendedTestimonials.length * 320}px` }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`row3-${index}`}
                className={`flex-shrink-0 w-80 p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 group hover:scale-105 ${
                  isDark
                    ? 'bg-white/10 border-orange-500/20 hover:bg-white/20 hover:border-orange-400/40'
                    : 'bg-white/90 border-orange-200/50 hover:bg-white hover:border-orange-300 shadow-lg hover:shadow-2xl'
                }`}
                whileHover={{ y: -5 }}
              >

                <div className="flex justify-between items-start mb-4">
                  <Quote className="w-8 h-8 text-orange-500 opacity-60" />
                  <div className="flex text-yellow-400">
                    {Array.from({ length: testimonial.stars }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                </div>


                <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  "{testimonial.text}"
                </p>


                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {testimonial.name}
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </div>


                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-yellow-500 rounded-full opacity-15 group-hover:opacity-30 transition-opacity" />
              </motion.div>
            ))}
          </motion.div> */}

          {/* Gradient Overlays for Seamless Loop
          <div className={`fixed inset-y-0 left-0 w-20 pointer-events-none z-10 ${
              isDark 
                  ? 'bg-gradient-to-r from-gray-900 to-transparent' 
                  : 'bg-gradient-to-r from-orange-50 to-transparent'
          }`} />
          <div className={`fixed inset-y-0 right-0 w-20 pointer-events-none z-10 ${
              isDark 
                  ? 'bg-gradient-to-l from-gray-900 to-transparent' 
                  : 'bg-gradient-to-l from-orange-50 to-transparent'
          }`} /> */}
          {/* Gradient Overlays for Seamless Loop */}
          <div className={`absolute inset-y-0 left-0 w-20 pointer-events-none z-10 ${isDark
              ? 'bg-gradient-to-r from-gray-900 to-transparent'
              : 'bg-gradient-to-r from-orange-50 to-transparent'
            }`} />
          <div className={`absolute inset-y-0 right-0 w-20 pointer-events-none z-10 ${isDark
              ? 'bg-gradient-to-l from-gray-900 to-transparent'
              : 'bg-gradient-to-l from-orange-50 to-transparent'
            }`} />

        </div>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: "500+", label: "Happy Clients" },
            { number: "4.8/5", label: "Average Rating" },
            { number: "15+", label: "Years Experience" },
            { number: "99%", label: "Satisfaction Rate" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`text-center p-6 rounded-xl backdrop-blur-sm border ${isDark
                  ? 'bg-white/10 border-orange-500/20 hover:bg-white/20'
                  : 'bg-white/80 border-orange-200/50 hover:bg-white shadow-lg hover:shadow-xl'
                }`}
            >
              <motion.h3
                className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                {stat.number}
              </motion.h3>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-12"
        >
          <motion.p
            className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            Join our growing list of satisfied customers
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Project Today
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}