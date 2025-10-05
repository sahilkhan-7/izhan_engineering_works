// "use client";

// import { motion } from "framer-motion";
// import { Building2, MapPinned, CalendarCheck } from "lucide-react";

// export default function About() {
//   return (
//     <section id="about" className="bg-gray-100 py-20 px-6 md:px-12">
//       <div className="max-w-6xl mx-auto text-center">
//         <motion.h2
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
//         >
//           About Izhan Engineering Works
//         </motion.h2>

//         <motion.p
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-gray-600 max-w-3xl mx-auto text-lg"
//         >
//           Izhan Engineering Works is a trusted name in industrial and commercial fabrication services.
//           From metal gates and shutters to full-scale custom projects, we’ve delivered premium
//           solutions for over a decade — with excellence, innovation, and on-time delivery.
//         </motion.p>

//         {/* Stats */}
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
//           {/* Projects Completed */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className="flex items-start gap-4"
//           >
//             <Building2 className="w-10 h-10 text-blue-700 mt-1" />
//             <div>
//               <h4 className="text-xl font-bold text-gray-800">450+ Projects</h4>
//               <p className="text-sm text-gray-600">Across residential, industrial, and commercial sectors</p>
//             </div>
//           </motion.div>

//           {/* Locations */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//             viewport={{ once: true }}
//             className="flex items-start gap-4"
//           >
//             <MapPinned className="w-10 h-10 text-blue-700 mt-1" />
//             <div>
//               <h4 className="text-xl font-bold text-gray-800">20+ Cities</h4>
//               <p className="text-sm text-gray-600">Jaipur, Delhi, Mumbai, Ahmedabad, Surat & more</p>
//             </div>
//           </motion.div>

//           {/* Years of Experience */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.9 }}
//             viewport={{ once: true }}
//             className="flex items-start gap-4"
//           >
//             <CalendarCheck className="w-10 h-10 text-blue-700 mt-1" />
//             <div>
//               <h4 className="text-xl font-bold text-gray-800">12+ Years</h4>
//               <p className="text-sm text-gray-600">Of trusted fabrication craftsmanship</p>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion, useInView } from "framer-motion";
import { Building2, MapPin, Calendar, Award, Users, Zap } from "lucide-react";
import { useRef } from "react";

interface AboutProps {
  isDark: boolean;
}

export default function About({ isDark }: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      icon: Building2,
      number: "450+",
      label: "Projects Completed",
      description: "Across residential, industrial, and commercial sectors",
      color: "from-orange-400 to-yellow-500"
    },
    {
      icon: MapPin,
      number: "20+",
      label: "Cities Served",
      description: "Jaipur, Delhi, Mumbai, Ahmedabad, Surat & more",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Calendar,
      number: "12+",
      label: "Years Experience",
      description: "Of trusted fabrication craftsmanship",
      color: "from-orange-500 to-yellow-400"
    }
  ];

  const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "ISO certified processes ensuring excellence in every project"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Skilled professionals with decades of combined experience"
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Committed to on-time project completion without compromise"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const countVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section 
      id="about" 
      ref={ref}
      className={`py-20 px-6 md:px-12 relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
          : 'bg-gradient-to-br from-orange-50 via-white to-yellow-50'
      }`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              isDark ? 'bg-orange-500/5' : 'bg-orange-200/20'
            }`}
            style={{
              width: Math.random() * 150 + 50,
              height: Math.random() * 150 + 50,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
              scale: [1, Math.random() * 0.3 + 0.8, 1],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-4xl md:text-6xl font-black mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            About{' '}
            <motion.span
              className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Izhan Engineering
            </motion.span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-lg md:text-xl max-w-4xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Izhan Engineering Works is a trusted name in industrial and commercial fabrication services.
            From metal gates and shutters to full-scale custom projects, we've delivered premium
            solutions for over a decade — with{' '}
            <motion.span
              className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              excellence, innovation, and on-time delivery
            </motion.span>.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className={`relative p-8 rounded-2xl overflow-hidden group cursor-pointer ${
                isDark 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-orange-500/20' 
                  : 'bg-white border border-orange-200 shadow-xl'
              }`}
            >
              {/* Gradient background on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Number with count animation */}
                <motion.h3
                  variants={countVariants}
                  className={`text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                >
                  {stat.number}
                </motion.h3>

                <h4 className={`text-xl font-bold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  {stat.label}
                </h4>

                <p className={`text-sm leading-relaxed ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.description}
                </p>
              </div>

              {/* Decorative elements */}
              <div className={`absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br ${stat.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`text-center p-6 rounded-xl ${
                isDark 
                  ? 'bg-gray-800/50 border border-orange-500/10' 
                  : 'bg-white/80 border border-orange-100'
              } backdrop-blur-sm`}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center ${
                  isDark ? 'shadow-lg shadow-orange-500/30' : 'shadow-lg shadow-orange-300/50'
                }`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </motion.div>
              
              <h4 className={`text-lg font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                {feature.title}
              </h4>
              
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}