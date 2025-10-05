// // [["use client";

// // import { useState } from "react";
// // import specializationData from "@/data/specializations.json";
// // import Image from "next/image";
// // import { motion } from "framer-motion";
// // import SpecializationModal from "./SpecializationModal";

// // interface Specialization {
// //   id: string;
// //   title: string;
// //   thumbnail: string;
// //   media: string[];
// // }

// // export default function Specializations() {
// //   const [selected, setSelected] = useState<Specialization | null>(null);

// //   return (
// //     <section id="specialization" className="bg-gray-100 py-20 px-6 md:px-12">
// //       <div className="max-w-6xl mx-auto text-center">
// //         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
// //           Our Specializations
// //         </h2>

// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
// //           {specializationData.map((spec, i) => (
// //             <motion.div
// //               key={spec.id}
// //               initial={{ opacity: 0, y: 30 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.3, delay: i * 0.1 }}
// //               onClick={() => setSelected(spec)}
// //               className="group relative rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition"
// //             >
// //               <Image
// //                 src={spec.thumbnail}
// //                 alt={spec.title}
// //                 width={600}
// //                 height={400}
// //                 className="w-full h-48 object-cover"
// //               />
// //               <div className="absolute bottom-0 bg-black/50 w-full text-white text-center py-2 text-sm font-medium">
// //                 {spec.title}
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>

// //         {/* Modal */}
// //         {selected && (
// //           <SpecializationModal
// //             isOpen={true}
// //             onClose={() => setSelected(null)}
// //             title={selected.title}
// //             media={selected.media}
// //           />
// //         )}
// //       </div>
// //     </section>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { ChevronLeft, ChevronRight, Wrench } from "lucide-react";

// interface SpecializationsProps {
//   isDark: boolean;
// }

// // Mock specialization data - replace with actual import from JSON
// const mockSpecializationData = [
//   {
//     id: "gates",
//     title: "Metal Gates & Entrances",
//     description: "Custom-designed gates with automated systems and premium finishing for residential and commercial properties.",
//     // media: ["/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600"]
//     media: ["/8a1b9ac5f5376d5a1e35f02c654a6763.png", "/13b67d5697f4c9226924058eae6f24e6.jpg", "/31d7b7fc9e18661ad31be10bb17126db.jpg"]

//   },
//   {
//     id: "shutters",
//     title: "Rolling Shutters",
//     description: "High-quality rolling shutters with smooth operation and enhanced security features for shops and warehouses.",
//     // media: ["/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600"]
//     media: ["/VID20240818185218.mp4", "/97178d9a2cb9c30866cdd1f5c63a80ac.jpg", "/941005d759413b19ae7a434278ce2f01.jpg"]

//   },
//   {
//     id: "railings",
//     title: "Decorative Railings",
//     description: "Artistic and functional railings for staircases, balconies, and terraces with intricate designs.",
//     // media: ["/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600"]
//     media: ["/994733ef131b9cc1f0d4255bed83a8e8.jpg", "/VID20250501125445.mp4", "/20171116_162231.jpg", "/IMG-20250509-WA0017.jpg"]
//   },
//   {
//     id: "grills",
//     title: "Window Grills & Security",
//     description: "Modern security grills with aesthetic appeal, providing safety without compromising on design.",
//     // media: ["/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600"]
//     media: ["/31fd7e99eeea533f8c0d92108450ed3c.jpg", "/97178d9a2cb9c30866cdd1f5c63a80ac.jpg", "/VID20250502145823.mp4"]

//   },
//   {
//     id: "structures",
//     title: "Structural Fabrication",
//     description: "Heavy-duty structural work for industrial facilities, warehouses, and commercial buildings.",
//     // media: ["/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600"]
//     media: ["/8a1b9ac5f5376d5a1e35f02c654a6763.png", "/13b67d5697f4c9226924058eae6f24e6.jpg", "/31d7b7fc9e18661ad31be10bb17126db.jpg"]

//   },
//   {
//     id: "custom",
//     title: "Custom Metalwork",
//     description: "Bespoke metal solutions tailored to unique requirements with precision engineering and craftsmanship.",
//     // media: ["/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600"]
//     media: ["/VID20240818185218.mp4", "/97178d9a2cb9c30866cdd1f5c63a80ac.jpg", "/941005d759413b19ae7a434278ce2f01.jpg"]
//   }
// ];

// export default function Specializations({ isDark }: SpecializationsProps) {
//   const [currentImageIndex, setCurrentImageIndex] = useState<{[key: string]: number}>({});

//   // Auto-advance images for each specialization
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prev) => {
//         const updated: {[key: string]: number} = {};
//         mockSpecializationData.forEach((spec) => {
//           const current = prev[spec.id] || 0;
//           updated[spec.id] = (current + 1) % spec.media.length;
//         });
//         return updated;
//       });
//     }, 3500); // Change image every 3.5 seconds
//     return () => clearInterval(interval);
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 40 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.8, ease: "easeOut" }
//     }
//   };

//   const changeImage = (specId: string, direction: 'prev' | 'next') => {
//     setCurrentImageIndex(prev => {
//       const spec = mockSpecializationData.find(s => s.id === specId);
//       if (!spec) return prev;
      
//       const current = prev[specId] || 0;
//       const newIndex = direction === 'prev' 
//         ? (current - 1 + spec.media.length) % spec.media.length
//         : (current + 1) % spec.media.length;
      
//       return { ...prev, [specId]: newIndex };
//     });
//   };

//   return (
//     <section 
//       id="specialization" 
//       className={`relative py-20 px-6 md:px-12 overflow-hidden ${
//         isDark 
//           ? 'bg-gradient-to-br from-black via-gray-900 to-black' 
//           : 'bg-gradient-to-br from-gray-50 via-white to-orange-50'
//       }`}
//     >
//       {/* Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div
//           animate={{
//             rotate: [0, 360],
//             scale: [1, 1.1, 1]
//           }}
//           transition={{
//             duration: 25,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//           className={`absolute top-10 left-10 w-80 h-80 rounded-full opacity-5 ${
//             isDark ? 'bg-gradient-to-r from-orange-500 to-yellow-500' : 'bg-gradient-to-r from-orange-300 to-yellow-300'
//           }`}
//         />
//         <motion.div
//           animate={{
//             rotate: [360, 0],
//             scale: [1, 0.9, 1]
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//           className={`absolute bottom-10 right-10 w-60 h-60 rounded-full opacity-5 ${
//             isDark ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-yellow-300 to-orange-300'
//           }`}
//         />
//       </div>

//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.1 }}
//         className="relative z-10 max-w-7xl mx-auto"
//       >
//         {/* Section Title */}
//         <motion.div variants={itemVariants} className="text-center mb-16">
//           <motion.h2
//             className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
//             whileHover={{ scale: 1.02 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
//               Our
//             </span>{' '}
//             <span className={isDark ? 'text-white' : 'text-gray-900'}>
//               Specializations
//             </span>
//           </motion.h2>
          
//           <motion.div
//             initial={{ width: 0 }}
//             whileInView={{ width: "100%" }}
//             transition={{ duration: 1.5, delay: 0.5 }}
//             viewport={{ once: true }}
//             className="h-1 bg-gradient-to-r from-orange-500 to-yellow-500 max-w-md mx-auto rounded-full mb-8"
//           />

//           <motion.p
//             variants={itemVariants}
//             className={`text-xl max-w-3xl mx-auto leading-relaxed ${
//               isDark ? 'text-gray-300' : 'text-gray-700'
//             }`}
//           >
//             From precision metalwork to large-scale fabrication, we deliver excellence across all specializations
//           </motion.p>
//         </motion.div>

//         {/* Specializations Grid */}
//         <div className="space-y-16">
//           {mockSpecializationData.map((spec, index) => {
//             const currentIndex = currentImageIndex[spec.id] || 0;
//             const isEven = index % 2 === 0;
            
//             return (
//               <motion.div
//                 key={spec.id}
//                 variants={itemVariants}
//                 className={`flex flex-col ${
//                   isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
//                 } items-center gap-8 lg:gap-12`}
//               >
//                 {/* Content */}
//                 <div className="flex-1 space-y-6">
//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     className="flex items-center gap-3 mb-4"
//                   >
//                     <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
//                       <Wrench className="w-6 h-6 text-white" />
//                     </div>
//                     <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent">
//                       {spec.title}
//                     </h3>
//                   </motion.div>

//                   <motion.p
//                     className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     transition={{ delay: 0.3 }}
//                     viewport={{ once: true }}
//                   >
//                     {spec.description}
//                   </motion.p>

//                   {/* Features */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5 }}
//                     viewport={{ once: true }}
//                     className="flex flex-wrap gap-3"
//                   >
//                     {['Premium Quality', 'Fast Delivery', 'Custom Design'].map((feature, i) => (
//                       <span
//                         key={i}
//                         className={`px-4 py-2 rounded-full text-sm font-medium border ${
//                           isDark
//                             ? 'bg-orange-500/10 border-orange-400/30 text-orange-300'
//                             : 'bg-orange-50 border-orange-200 text-orange-700'
//                         }`}
//                       >
//                         {feature}
//                       </span>
//                     ))}
//                   </motion.div>
//                 </div>

//                 {/* Image Carousel */}
//                 <div className="flex-1 relative">
//                   <motion.div
//                     className={`relative rounded-2xl overflow-hidden shadow-2xl ${
//                       isDark ? 'shadow-orange-500/20' : 'shadow-orange-500/30'
//                     }`}
//                     whileHover={{ scale: 1.03 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {/* Current Image */}
//                     <div className="relative h-80 md:h-96 w-full bg-gray-200">
//                       <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-yellow-500/20" />
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="text-center">
//                           <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
//                             <Wrench className="w-8 h-8 text-white" />
//                           </div>
//                           <p className="text-gray-600 font-medium">{spec.title}</p>
//                           <p className="text-sm text-gray-500 mt-2">
//                             Image {currentIndex + 1} of {spec.media.length}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Navigation Arrows */}
//                     <button
//                       onClick={() => changeImage(spec.id, 'prev')}
//                       className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
//                     >
//                       <ChevronLeft className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => changeImage(spec.id, 'next')}
//                       className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
//                     >
//                       <ChevronRight className="w-5 h-5" />
//                     </button>

//                     {/* Image Indicators */}
//                     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//                       {spec.media.map((_, i) => (
//                         <button
//                           key={i}
//                           onClick={() => setCurrentImageIndex(prev => ({...prev, [spec.id]: i}))}
//                           className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                             i === currentIndex
//                               ? 'bg-orange-500 w-6'
//                               : 'bg-white/50 hover:bg-white/70'
//                           }`}
//                         />
//                       ))}
//                     </div>

//                     {/* Auto-slide Progress Bar */}
//                     <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
//                       <motion.div
//                         className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
//                         initial={{ width: "0%" }}
//                         animate={{ width: "100%" }}
//                         transition={{
//                           duration: 3.5,
//                           repeat: Infinity,
//                           ease: "linear"
//                         }}
//                         key={currentIndex}
//                       />
//                     </div>
//                   </motion.div>

//                   {/* Floating Stats */}
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     whileInView={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.7 }}
//                     viewport={{ once: true }}
//                     className={`absolute -top-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm border ${
//                       isDark
//                         ? 'bg-black/80 border-orange-500/30'
//                         : 'bg-white/90 border-orange-200 shadow-lg'
//                     }`}
//                   >
//                     <div className="text-center">
//                       <div className="text-xl font-bold bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent">
//                         50+
//                       </div>
//                       <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                         Projects
//                       </div>
//                     </div>
//                   </motion.div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Call to Action */}
//         <motion.div
//           variants={itemVariants}
//           className="text-center mt-16"
//         >
//           <motion.div
//             whileHover={{ scale: 1.05, y: -2 }}
//             whileTap={{ scale: 0.95 }}
//             className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold cursor-pointer transition-all duration-300 ${
//               isDark
//                 ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/30'
//                 : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/30'
//             }`}
//           >
//             <Wrench className="w-5 h-5" />
//             Get Custom Quote
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Wrench } from "lucide-react";

interface SpecializationsProps {
  isDark: boolean;
}

// Mock specialization data - replace with actual import from JSON
const mockSpecializationData = [
  {
    id: "gates",
    title: "Metal Gates & Entrances",
    description: "Custom-designed gates with automated systems and premium finishing for residential and commercial properties.",
    media: ["/8a1b9ac5f5376d5a1e35f02c654a6763.png", "/13b67d5697f4c9226924058eae6f24e6.jpg", "/31d7b7fc9e18661ad31be10bb17126db.jpg"]
  },
  {
    id: "shutters",
    title: "Rolling Shutters",
    description: "High-quality rolling shutters with smooth operation and enhanced security features for shops and warehouses.",
    media: ["/IMG-20250509-WA0017.jpg", "/97178d9a2cb9c30866cdd1f5c63a80ac.jpg", "/941005d759413b19ae7a434278ce2f01.jpg"]
  },
  {
    id: "railings",
    title: "Decorative Railings",
    description: "Artistic and functional railings for staircases, balconies, and terraces with intricate designs.",
    media: ["/994733ef131b9cc1f0d4255bed83a8e8.jpg", "/941005d759413b19ae7a434278ce2f01.jpg", "/20171116_162231.jpg", "/IMG-20250509-WA0017.jpg"]
  },
  {
    id: "grills",
    title: "Window Grills & Security",
    description: "Modern security grills with aesthetic appeal, providing safety without compromising on design.",
    media: ["/31fd7e99eeea533f8c0d92108450ed3c.jpg", "/97178d9a2cb9c30866cdd1f5c63a80ac.jpg", "/941005d759413b19ae7a434278ce2f01.jpg"]
  },
  {
    id: "structures",
    title: "Structural Fabrication",
    description: "Heavy-duty structural work for industrial facilities, warehouses, and commercial buildings.",
    media: ["/8a1b9ac5f5376d5a1e35f02c654a6763.png", "/13b67d5697f4c9226924058eae6f24e6.jpg", "/31d7b7fc9e18661ad31be10bb17126db.jpg"]
  },
  {
    id: "custom",
    title: "Custom Metalwork",
    description: "Bespoke metal solutions tailored to unique requirements with precision engineering and craftsmanship.",
    media: ["/941005d759413b19ae7a434278ce2f01.jpg", "/97178d9a2cb9c30866cdd1f5c63a80ac.jpg", "/941005d759413b19ae7a434278ce2f01.jpg"]
  }
];

export default function Specializations({ isDark }: SpecializationsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: string]: number}>({});

  // Auto-advance images for each specialization
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const updated: {[key: string]: number} = {};
        mockSpecializationData.forEach((spec) => {
          const current = prev[spec.id] || 0;
          updated[spec.id] = (current + 1) % spec.media.length;
        });
        return updated;
      });
    }, 3500); // Change image every 3.5 seconds
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const changeImage = (specId: string, direction: 'prev' | 'next') => {
    setCurrentImageIndex(prev => {
      const spec = mockSpecializationData.find(s => s.id === specId);
      if (!spec) return prev;
      
      const current = prev[specId] || 0;
      const newIndex = direction === 'prev' 
        ? (current - 1 + spec.media.length) % spec.media.length
        : (current + 1) % spec.media.length;
      
      return { ...prev, [specId]: newIndex };
    });
  };

  return (
    <section 
      id="specialization" 
      className={`relative py-20 px-6 md:px-12 overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-black via-gray-900 to-black' 
          : 'bg-gradient-to-br from-gray-50 via-white to-orange-50'
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute top-10 left-10 w-80 h-80 rounded-full opacity-5 ${
            isDark ? 'bg-gradient-to-r from-orange-500 to-yellow-500' : 'bg-gradient-to-r from-orange-300 to-yellow-300'
          }`}
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute bottom-10 right-10 w-60 h-60 rounded-full opacity-5 ${
            isDark ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-yellow-300 to-orange-300'
          }`}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
              Our
            </span>{' '}
            <span className={isDark ? 'text-white' : 'text-gray-900'}>
              Specializations
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
            className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            From precision metalwork to large-scale fabrication, we deliver excellence across all specializations
          </motion.p>
        </motion.div>

        {/* Specializations Grid */}
        <div className="space-y-16">
          {mockSpecializationData.map((spec, index) => {
            const currentIndex = currentImageIndex[spec.id] || 0;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={spec.id}
                variants={itemVariants}
                className={`flex flex-col ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center gap-8 lg:gap-12`}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 mb-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Wrench className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent">
                      {spec.title}
                    </h3>
                  </motion.div>

                  <motion.p
                    className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {spec.description}
                  </motion.p>

                  {/* Features */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-3"
                  >
                    {['Premium Quality', 'Fast Delivery', 'Custom Design'].map((feature, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 rounded-full text-sm font-medium border ${
                          isDark
                            ? 'bg-orange-500/10 border-orange-400/30 text-orange-300'
                            : 'bg-orange-50 border-orange-200 text-orange-700'
                        }`}
                      >
                        {feature}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Image Carousel */}
                <div className="flex-1 relative group">
                  <motion.div
                    className={`relative rounded-2xl overflow-hidden shadow-2xl ${
                      isDark ? 'shadow-orange-500/20' : 'shadow-orange-500/30'
                    }`}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Current Image/Video */}
                    <div className="relative h-80 md:h-96 w-full bg-gray-900">
                      {spec.media[currentIndex]?.endsWith('.mp4') ? (
                        <video
                          className="w-full h-full object-cover"
                          muted
                          autoPlay
                          loop
                          key={spec.media[currentIndex]}
                        >
                          <source src={spec.media[currentIndex]} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          src={spec.media[currentIndex]}
                          alt={`${spec.title} - Image ${currentIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                      onClick={() => changeImage(spec.id, 'prev')}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => changeImage(spec.id, 'next')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {spec.media.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImageIndex(prev => ({...prev, [spec.id]: i}))}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i === currentIndex
                              ? 'bg-orange-500 w-6'
                              : 'bg-white/50 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Auto-slide Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                      <motion.div
                        className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        key={currentIndex}
                      />
                    </div>
                  </motion.div>

                  {/* Floating Stats */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    viewport={{ once: true }}
                    className={`absolute -top-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm border ${
                      isDark
                        ? 'bg-black/80 border-orange-500/30'
                        : 'bg-white/90 border-orange-200 shadow-lg'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-xl font-bold bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent">
                        50+
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Projects
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold cursor-pointer transition-all duration-300 ${
              isDark
                ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/30'
                : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/30'
            }`}
          >
            <Wrench className="w-5 h-5" />
            Get Custom Quote
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}