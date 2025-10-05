// // "use client";

// // import { useEffect, useState, useRef } from "react";
// // import { motion } from "framer-motion";
// // import Image from "next/image";
// // import projectData from "@/data/projects.json";

// // export default function Projects() {
// //   const [mediaIndex, setMediaIndex] = useState<{ [key: string]: number }>({});
// //   const [playingVideos, setPlayingVideos] = useState<{ [key: string]: boolean }>({});
// //   const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

// //   // Auto-slide effect (only when video is not playing)
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setMediaIndex((prev) => {
// //         const updated: { [key: string]: number } = {};
// //         projectData.forEach((project) => {
// //           // Only advance if video is not playing
// //           if (!playingVideos[project.id]) {
// //             const current = prev[project.id] || 0;
// //             updated[project.id] = (current + 1) % project.media.length;
// //           } else {
// //             updated[project.id] = prev[project.id] || 0;
// //           }
// //         });
// //         return updated;
// //       });
// //     }, 4000); // Every 4 seconds
// //     return () => clearInterval(interval);
// //   }, [playingVideos]);

// //   // Handle video play/pause
// //   const handleVideoPlay = (projectId: string) => {
// //     setPlayingVideos(prev => ({ ...prev, [projectId]: true }));
// //   };

// //   const handleVideoPause = (projectId: string) => {
// //     setPlayingVideos(prev => ({ ...prev, [projectId]: false }));
// //   };

// //   // Manual navigation
// //   const goToNext = (projectId: string) => {
// //     const project = projectData.find(p => p.id === projectId);
// //     if (project) {
// //       setMediaIndex(prev => ({
// //         ...prev,
// //         [projectId]: ((prev[projectId] || 0) + 1) % project.media.length
// //       }));
// //     }
// //   };

// //   const goToPrev = (projectId: string) => {
// //     const project = projectData.find(p => p.id === projectId);
// //     if (project) {
// //       setMediaIndex(prev => ({
// //         ...prev,
// //         [projectId]: ((prev[projectId] || 0) - 1 + project.media.length) % project.media.length
// //       }));
// //     }
// //   };

// //   return (
// //     <section id="projects" className="bg-gray-100 py-20 px-6 md:px-12">
// //       <div className="max-w-7xl mx-auto">
// //         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
// //           Our Featured Projects
// //         </h2>

// //         <div className="space-y-16">
// //           {projectData.slice(0, 5).map((project, index) => {
// //             const currentIndex = mediaIndex[project.id] || 0;
// //             const currentMedia = project.media[currentIndex];
// //             const isVideo = currentMedia.endsWith(".mp4");

// //             return (
// //               <motion.div
// //                 key={project.id}
// //                 initial={{ opacity: 0, y: 50 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.6, delay: index * 0.1 }}
// //                 className="bg-white rounded-2xl shadow-lg overflow-hidden"
// //               >
// //                 {/* Project Info Section */}
// //                 <div className="p-8 pb-6">
// //                   <h3 className="text-2xl md:text-3xl font-bold text-blue-700 mb-3">
// //                     {project.title}
// //                   </h3>
// //                   <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
// //                     <span className="flex items-center gap-1">
// //                       📍 {project.location}
// //                     </span>
// //                     <span className="flex items-center gap-1">
// //                       🛠️ {project.type}
// //                     </span>
// //                   </div>
// //                   <p className="text-gray-700 text-base md:text-lg leading-relaxed">
// //                     {project.description}
// //                   </p>
// //                 </div>

// //                 {/* Media Carousel Section */}
// //                 <div className="relative bg-gray-50 px-8 pb-8">
// //                   <div className="relative h-80 md:h-96 rounded-xl overflow-hidden bg-black">
// //                     {/* Media Container */}
// //                     <div 
// //                       className="flex transition-transform duration-500 ease-in-out h-full"
// //                       style={{ transform: `translateX(-${currentIndex * 100}%)` }}
// //                     >
// //                       {project.media.map((mediaItem, mediaIdx) => (
// //                         <div key={mediaIdx} className="w-full h-full flex-shrink-0 relative">
// //                           {mediaItem.endsWith(".mp4") ? (
// //                             <video
// //                               ref={(el) => {
// //                                 if (el) videoRefs.current[`${project.id}-${mediaIdx}`] = el;
// //                               }}
// //                               className="w-full h-full object-cover"
// //                               controls
// //                               onPlay={() => handleVideoPlay(project.id)}
// //                               onPause={() => handleVideoPause(project.id)}
// //                               onEnded={() => handleVideoPause(project.id)}
// //                               preload="metadata"
// //                             >
// //                               <source src={mediaItem} type="video/mp4" />
// //                               Your browser does not support the video tag.
// //                             </video>
// //                           ) : (
// //                             <Image
// //                               src={mediaItem}
// //                               alt={`${project.title} - Image ${mediaIdx + 1}`}
// //                               fill
// //                               className="object-cover"
// //                               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
// //                             />
// //                           )}
// //                         </div>
// //                       ))}
// //                     </div>

// //                     {/* Navigation Arrows */}
// //                     {project.media.length > 1 && (
// //                       <>
// //                         <button
// //                           onClick={() => goToPrev(project.id)}
// //                           className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
// //                           aria-label="Previous media"
// //                         >
// //                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// //                           </svg>
// //                         </button>
// //                         <button
// //                           onClick={() => goToNext(project.id)}
// //                           className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
// //                           aria-label="Next media"
// //                         >
// //                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// //                           </svg>
// //                         </button>
// //                       </>
// //                     )}

// //                     {/* Media Indicators */}
// //                     {project.media.length > 1 && (
// //                       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
// //                         {project.media.map((_, mediaIdx) => (
// //                           <button
// //                             key={mediaIdx}
// //                             onClick={() => setMediaIndex(prev => ({ ...prev, [project.id]: mediaIdx }))}
// //                             className={`w-3 h-3 rounded-full transition-all duration-200 ${
// //                               currentIndex === mediaIdx
// //                                 ? 'bg-white scale-110'
// //                                 : 'bg-white bg-opacity-50 hover:bg-opacity-75'
// //                             }`}
// //                             aria-label={`Go to media ${mediaIdx + 1}`}
// //                           />
// //                         ))}
// //                       </div>
// //                     )}

// //                     {/* Media Counter */}
// //                     <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
// //                       {currentIndex + 1} / {project.media.length}
// //                     </div>

// //                     {/* Media Type Indicator */}
// //                     <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
// //                       {isVideo ? '🎥 Video' : '📸 Image'}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }


// "use client";

// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight, X, ArrowRight } from "lucide-react";

// interface ProjectsProps {
//   isDark: boolean;
// }

// // Mock project data - replace with actual import from JSON
// const mockProjectData = [
//   {
//     id: "1",
//     title: "Industrial Metal Gates",
//     location: "Jaipur, Rajasthan",
//     type: "Commercial",
//     description: "Heavy-duty industrial gates with automated systems for manufacturing facility",
//     media: ["/8a1b9ac5f5376d5a1e35f02c654a6763.png", "/13b67d5697f4c9226924058eae6f24e6.jpg", "/31d7b7fc9e18661ad31be10bb17126db.jpg"]
//   },
//   {
//     id: "2", 
//     title: "Residential Rolling Shutters",
//     location: "Delhi, India",
//     type: "Residential",
//     description: "Custom rolling shutters with premium finishing for luxury homes",
//     media: ["VID20240818185218.mp4", "97178d9a2cb9c30866cdd1f5c63a80ac.jpg", "941005d759413b19ae7a434278ce2f01.jpg"]
//   },
//   {
//     id: "3",
//     title: "Commercial Railings",
//     location: "Mumbai, Maharashtra", 
//     type: "Commercial",
//     description: "Decorative and functional railings for corporate office complex",
//     media: ["994733ef131b9cc1f0d4255bed83a8e8.jpg", "VID20250501125445.mp4", "20171116_162231.jpg", "IMG-20250509-WA0017.jpg"]
//   },
//   {
//     id: "4",
//     title: "Factory Fabrication",
//     location: "Ahmedabad, Gujarat",
//     type: "Industrial", 
//     description: "Large-scale structural fabrication for automotive manufacturing unit",
//     // media: ["/api/placeholder/800/600", "/api/placeholder/600/800"]
//     media: ["31fd7e99eeea533f8c0d92108450ed3c.jpg", "97178d9a2cb9c30866cdd1f5c63a80ac.jpg", "VID20250502145823.mp4"]
//   },
//   {
//     id: "5",
//     title: "Custom Grills & Gates",
//     location: "Surat, Gujarat",
//     type: "Residential",
//     description: "Artistic grills and entrance gates with intricate designs",
//     // media: ["/api/placeholder/600/800", "/api/placeholder/800/600", "/api/placeholder/600/800"]
//     media: ["8a1b9ac5f5376d5a1e35f02c654a6763.jpg", "13b67d5697f4c9226924058eae6f24e6.jpg", "31d7b7fc9e18661ad31be10bb17126db.jpg"]

//   },
//   {
//     id: "6",
//     title: "Warehouse Structures", 
//     location: "Pune, Maharashtra",
//     type: "Industrial",
//     description: "Complete warehouse structural work with loading bay solutions",
//     // media: ["/api/placeholder/800/600", "/api/placeholder/600/800"]
//     media: ["994733ef131b9cc1f0d4255bed83a8e8.jpg", "6186731d8ac59e67da59f78184af9289.jpg", "20171116_162231.jpg", "IMG-20250509-WA0017.jpg"]

//   },
//   // Additional projects for "Show More"
//   {
//     id: "7",
//     title: "Shopping Mall Facades",
//     location: "Indore, Madhya Pradesh",
//     type: "Commercial",
//     description: "Modern facade work for multi-story shopping complex",
//     // media: ["/api/placeholder/800/600", "/api/placeholder/600/800", "/api/placeholder/800/600"]
//     media: ["994733ef131b9cc1f0d4255bed83a8e8.jpg", "6186731d8ac59e67da59f78184af9289.jpg", "20171116_162231.jpg", "IMG-20250509-WA0017.jpg"]

//   },
//   {
//     id: "8",
//     title: "Resort Metalwork",
//     location: "Udaipur, Rajasthan", 
//     type: "Hospitality",
//     description: "Decorative metalwork and structures for luxury resort",
//     // media: ["/api/placeholder/600/800", "/api/placeholder/800/600"]
//     media: ["31fd7e99eeea533f8c0d92108450ed3c.jpg", "97178d9a2cb9c30866cdd1f5c63a80ac.jpg", "941005d759413b19ae7a434278ce2f01.jpg"]

//   }
// ];

// export default function Projects({ isDark }: ProjectsProps) {
//   const [visibleProjects, setVisibleProjects] = useState(6);
//   const [selectedProject, setSelectedProject] = useState<any>(null);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [currentMediaIndex, setCurrentMediaIndex] = useState<{[key: string]: number}>({});

//   const scrollRefs = useRef<{[key: string]: HTMLDivElement}>({});

//   // Auto-advance media for each project
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentMediaIndex((prev) => {
//         const updated: {[key: string]: number} = {};
//         mockProjectData.slice(0, visibleProjects).forEach((project) => {
//           const current = prev[project.id] || 0;
//           updated[project.id] = (current + 1) % project.media.length;
//         });
//         return updated;
//       });
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [visibleProjects]);

//   const scrollToImage = (projectId: string, direction: 'left' | 'right') => {
//     const container = scrollRefs.current[projectId];
//     if (!container) return;
    
//     const imageWidth = container.children[0]?.clientWidth || 0;
//     const scrollAmount = direction === 'left' ? -imageWidth : imageWidth;
//     container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//   };

//   const openGallery = (project: any, imageIndex: number = 0) => {
//     setSelectedProject(project);
//     setSelectedImageIndex(imageIndex);
//   };

//   const navigateGallery = (direction: 'prev' | 'next') => {
//     if (!selectedProject) return;
//     const newIndex = direction === 'prev' 
//       ? (selectedImageIndex - 1 + selectedProject.media.length) % selectedProject.media.length
//       : (selectedImageIndex + 1) % selectedProject.media.length;
//     setSelectedImageIndex(newIndex);
//   };

//   const showMoreProjects = () => {
//     setVisibleProjects(prev => Math.min(prev + 4, mockProjectData.length));
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.8, ease: "easeOut" }
//     }
//   };

//   return (
//     <section 
//       id="projects" 
//       className={`relative py-20 px-6 md:px-12 overflow-hidden ${
//         isDark 
//           ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
//           : 'bg-gradient-to-br from-white via-gray-50 to-orange-50'
//       }`}
//     >
//       {/* Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div
//           animate={{ rotate: [0, 360] }}
//           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//           className={`absolute top-20 right-20 w-64 h-64 rounded-full opacity-5 ${
//             isDark ? 'bg-gradient-to-r from-orange-500 to-yellow-500' : 'bg-gradient-to-r from-orange-300 to-yellow-300'
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
//               Our Featured
//             </span>{' '}
//             <span className={isDark ? 'text-white' : 'text-gray-900'}>
//               Projects
//             </span>
//           </motion.h2>
          
//           <motion.div
//             initial={{ width: 0 }}
//             whileInView={{ width: "100%" }}
//             transition={{ duration: 1.5, delay: 0.5 }}
//             viewport={{ once: true }}
//             className="h-1 bg-gradient-to-r from-orange-500 to-yellow-500 max-w-md mx-auto rounded-full"
//           />
//         </motion.div>

//         {/* Projects List */}
//         <div className="space-y-20">
//           {mockProjectData.slice(0, visibleProjects).map((project, index) => {
//             const currentIndex = currentMediaIndex[project.id] || 0;
            
//             return (
//               <motion.div
//                 key={project.id}
//                 variants={itemVariants}
//                 className="relative"
//               >
//                 {/* Project Header */}
//                 <div className="mb-8">
//                   <motion.h3 
//                     className="text-3xl md:text-4xl font-bold mb-6"
//                     whileHover={{ scale: 1.02 }}
//                   >
//                     <span className="bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent">
//                       {project.title}
//                     </span>
//                   </motion.h3>

//                   <motion.p 
//                     className={`text-lg leading-relaxed max-w-4xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     transition={{ delay: 0.3 }}
//                     viewport={{ once: true }}
//                   >
//                     {project.description}
//                   </motion.p>
//                 </div>

//                 {/* Media Gallery - Natural Aspect Ratios */}
//                 <div className="relative">
//                   <div 
//                     ref={(el) => { if (el) scrollRefs.current[project.id] = el; }}
//                     className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
//                     style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//                   >
//                     {project.media.map((media, mediaIndex) => (
//                       <motion.div
//                         key={mediaIndex}
//                         className="relative flex-none snap-center"
//                         whileHover={{ scale: 1.02 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         {media.endsWith('.mp4') ? (
//                           <video
//                             className="h-80 w-auto object-contain cursor-pointer rounded-lg shadow-lg"
//                             muted
//                             autoPlay
//                             loop
//                             onClick={() => openGallery(project, mediaIndex)}
//                           >
//                             <source src={media} type="video/mp4" />
//                           </video>
//                         ) : (
//                           <div
//                             className="h-80 w-auto cursor-pointer relative overflow-hidden rounded-lg shadow-lg bg-gray-200 hover:shadow-xl transition-all duration-300"
//                             onClick={() => openGallery(project, mediaIndex)}
//                             style={{
//                               aspectRatio: media.includes('600/800') ? '3/4' : '4/3',
//                               minWidth: media.includes('600/800') ? '240px' : '320px'
//                             }}
//                           >
//                             <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-500 opacity-10" />
//                             <div className="absolute inset-0 flex items-center justify-center">
//                               <div className="text-center">
//                                 <p className="text-gray-600 font-medium">Project Image</p>
//                                 <p className="text-gray-500 text-sm mt-1">
//                                   {media.includes('600/800') ? 'Portrait' : 'Landscape'}
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         )}
                        
//                         {/* Image indicator */}
//                         <div className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
//                           {mediaIndex + 1} / {project.media.length}
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>

//                   {/* Navigation Arrows */}
//                   {project.media.length > 1 && (
//                     <>
//                       <button
//                         onClick={() => scrollToImage(project.id, 'left')}
//                         className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 z-10"
//                       >
//                         <ChevronLeft className="w-6 h-6" />
//                       </button>
//                       <button
//                         onClick={() => scrollToImage(project.id, 'right')}
//                         className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 z-10"
//                       >
//                         <ChevronRight className="w-6 h-6" />
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Show More Button */}
//         {visibleProjects < mockProjectData.length && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             viewport={{ once: true }}
//             className="text-center mt-16"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={showMoreProjects}
//               className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
//             >
//               Show More Projects
//               <ArrowRight className="w-5 h-5" />
//             </motion.button>
//           </motion.div>
//         )}
//       </motion.div>

//       {/* Gallery Modal */}
//       <AnimatePresence>
//         {selectedProject && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
//             onClick={() => setSelectedProject(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               className="relative max-w-6xl w-full h-full flex items-center justify-center"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Close Button */}
//               <button
//                 onClick={() => setSelectedProject(null)}
//                 className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300"
//               >
//                 <X className="w-6 h-6" />
//               </button>

//               {/* Media Display - Maintain Original Aspect Ratio */}
//               <div className="relative max-w-full max-h-full flex items-center justify-center">
//                 {selectedProject.media[selectedImageIndex]?.endsWith('.mp4') ? (
//                   <video
//                     className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg"
//                     controls
//                     autoPlay
//                   >
//                     <source src={selectedProject.media[selectedImageIndex]} type="video/mp4" />
//                   </video>
//                 ) : (
//                   <div 
//                     className="max-w-full max-h-[85vh] bg-gray-200 rounded-lg flex items-center justify-center"
//                     style={{
//                       aspectRatio: selectedProject.media[selectedImageIndex].includes('600/800') ? '3/4' : '4/3',
//                       width: selectedProject.media[selectedImageIndex].includes('600/800') ? 'auto' : '80vw',
//                       height: selectedProject.media[selectedImageIndex].includes('600/800') ? '85vh' : 'auto'
//                     }}
//                   >
//                     <div className="text-center text-gray-600">
//                       <p className="text-xl font-medium">Project Image</p>
//                       <p className="text-sm mt-2">
//                         {selectedProject.media[selectedImageIndex].includes('600/800') ? 'Portrait 9:16' : 'Landscape 16:9'}
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Navigation */}
//                 {selectedProject.media.length > 1 && (
//                   <>
//                     <button
//                       onClick={() => navigateGallery('prev')}
//                       className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300"
//                     >
//                       <ChevronLeft className="w-6 h-6" />
//                     </button>
//                     <button
//                       onClick={() => navigateGallery('next')}
//                       className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300"
//                     >
//                       <ChevronRight className="w-6 h-6" />
//                     </button>
//                   </>
//                 )}

//                 {/* Image Counter */}
//                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
//                   {selectedImageIndex + 1} / {selectedProject.media.length}
//                 </div>
//               </div>

//               {/* Project Info */}
//               <div className="absolute bottom-4 left-4 text-white max-w-md">
//                 <h3 className="text-xl font-bold mb-2">{selectedProject.title}</h3>
//                 <p className="text-gray-300 text-sm">{selectedProject.description}</p>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ArrowRight } from "lucide-react";

interface ProjectsProps {
  isDark: boolean;
}

// Mock project data - replace with actual import from JSON
const mockProjectData = [
  {
    id: "1",
    title: "Industrial Metal Gates",
    location: "Jaipur, Rajasthan",
    type: "Commercial",
    description: "Heavy-duty industrial gates with automated systems for manufacturing facility",
    media: ["/8a1b9ac5f5376d5a1e35f02c654a6763.png", "/13b67d5697f4c9226924058eae6f24e6.jpg", "/31d7b7fc9e18661ad31be10bb17126db.jpg"]
  },
  {
    id: "2", 
    title: "Residential Rolling Shutters",
    location: "Delhi, India",
    type: "Residential",
    description: "Custom rolling shutters with premium finishing for luxury homes",
    media: ["/IMG-20250509-WA0017.jpg", "/97178d9a2cb9c30866cdd1f5c63a80ac.jpg", "/941005d759413b19ae7a434278ce2f01.jpg"]
  },
  {
    id: "3",
    title: "Commercial Railings",
    location: "Mumbai, Maharashtra", 
    type: "Commercial",
    description: "Decorative and functional railings for corporate office complex",
    media: ["/994733ef131b9cc1f0d4255bed83a8e8.jpg", "/IMG-20250509-WA0017.jpg", "/20171116_162231.jpg", "/IMG-20250509-WA0017.jpg"]
  },
  {
    id: "4",
    title: "Factory Fabrication",
    location: "Ahmedabad, Gujarat",
    type: "Industrial", 
    description: "Large-scale structural fabrication for automotive manufacturing unit",
    media: ["/6186731d8ac59e67da59f78184af9289.jpg", "/97178d9a2cb9c30866cdd1f5c63a80ac.jpg", "/IMG-20250509-WA0017.jpg"]
  },
  {
    id: "5",
    title: "Custom Grills & Gates",
    location: "Surat, Gujarat",
    type: "Residential",
    description: "Artistic grills and entrance gates with intricate designs",
    media: ["/8a1b9ac5f5376d5a1e35f02c654a6763.png", "/13b67d5697f4c9226924058eae6f24e6.jpg", "/31d7b7fc9e18661ad31be10bb17126db.jpg"]
  },
  {
    id: "6",
    title: "Warehouse Structures", 
    location: "Pune, Maharashtra",
    type: "Industrial",
    description: "Complete warehouse structural work with loading bay solutions",
    media: ["/994733ef131b9cc1f0d4255bed83a8e8.jpg", "/6186731d8ac59e67da59f78184af9289.jpg", "/20171116_162231.jpg", "/IMG-20250509-WA0017.jpg"]
  },
  // Additional projects for "Show More"
  {
    id: "7",
    title: "Shopping Mall Facades",
    location: "Indore, Madhya Pradesh",
    type: "Commercial",
    description: "Modern facade work for multi-story shopping complex",
    media: ["/994733ef131b9cc1f0d4255bed83a8e8.jpg", "/6186731d8ac59e67da59f78184af9289.jpg", "/20171116_162231.jpg", "/IMG-20250509-WA0017.jpg"]
  },
  {
    id: "8",
    title: "Resort Metalwork",
    location: "Udaipur, Rajasthan", 
    type: "Hospitality",
    description: "Decorative metalwork and structures for luxury resort",
    media: ["/31fd7e99eeea533f8c0d92108450ed3c.jpg", "/97178d9a2cb9c30866cdd1f5c63a80ac.jpg", "/941005d759413b19ae7a434278ce2f01.jpg"]
  }
];

export default function Projects({ isDark }: ProjectsProps) {
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentMediaIndex, setCurrentMediaIndex] = useState<{[key: string]: number}>({});

  const scrollRefs = useRef<{[key: string]: HTMLDivElement}>({});

  // Auto-advance media for each project
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMediaIndex((prev) => {
        const updated: {[key: string]: number} = {};
        mockProjectData.slice(0, visibleProjects).forEach((project) => {
          const current = prev[project.id] || 0;
          updated[project.id] = (current + 1) % project.media.length;
        });
        return updated;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [visibleProjects]);

  const scrollToImage = (projectId: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[projectId];
    if (!container) return;
    
    const imageWidth = container.children[0]?.clientWidth || 0;
    const scrollAmount = direction === 'left' ? -imageWidth : imageWidth;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const openGallery = (project: any, imageIndex: number = 0) => {
    setSelectedProject(project);
    setSelectedImageIndex(imageIndex);
  };

  const navigateGallery = (direction: 'prev' | 'next') => {
    if (!selectedProject) return;
    const newIndex = direction === 'prev' 
      ? (selectedImageIndex - 1 + selectedProject.media.length) % selectedProject.media.length
      : (selectedImageIndex + 1) % selectedProject.media.length;
    setSelectedImageIndex(newIndex);
  };

  const showMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 4, mockProjectData.length));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="projects" 
      className={`relative py-20 px-6 md:px-12 overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
          : 'bg-gradient-to-br from-white via-gray-50 to-orange-50'
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className={`absolute top-20 right-20 w-64 h-64 rounded-full opacity-5 ${
            isDark ? 'bg-gradient-to-r from-orange-500 to-yellow-500' : 'bg-gradient-to-r from-orange-300 to-yellow-300'
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
              Our Featured
            </span>{' '}
            <span className={isDark ? 'text-white' : 'text-gray-900'}>
              Projects
            </span>
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-orange-500 to-yellow-500 max-w-md mx-auto rounded-full"
          />
        </motion.div>

        {/* Projects List */}
        <div className="space-y-20">
          {mockProjectData.slice(0, visibleProjects).map((project, index) => {
            const currentIndex = currentMediaIndex[project.id] || 0;
            
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Project Header */}
                <div className="mb-8">
                  <motion.h3 
                    className="text-3xl md:text-4xl font-bold mb-6"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent">
                      {project.title}
                    </span>
                  </motion.h3>

                  <motion.p 
                    className={`text-lg leading-relaxed max-w-4xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {project.description}
                  </motion.p>
                </div>

                {/* Media Gallery - Natural Aspect Ratios */}
                <div className="relative">
                  <div 
                    ref={(el) => { if (el) scrollRefs.current[project.id] = el; }}
                    className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {project.media.map((media, mediaIndex) => (
                      <motion.div
                        key={mediaIndex}
                        className="relative flex-none snap-center"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        {media.endsWith('.mp4') ? (
                          <video
                            className="h-80 w-auto object-contain cursor-pointer rounded-lg shadow-lg"
                            muted
                            autoPlay
                            loop
                            onClick={() => openGallery(project, mediaIndex)}
                          >
                            <source src={media} type="video/mp4" />
                          </video>
                        ) : (
                          <img
                            src={media}
                            alt={`${project.title} - Image ${mediaIndex + 1}`}
                            className="h-80 w-auto object-cover cursor-pointer rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            onClick={() => openGallery(project, mediaIndex)}
                          />
                        )}
                        
                        {/* Image indicator */}
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                          {mediaIndex + 1} / {project.media.length}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  {project.media.length > 1 && (
                    <>
                      <button
                        onClick={() => scrollToImage(project.id, 'left')}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 z-10"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => scrollToImage(project.id, 'right')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 z-10"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Show More Button */}
        {visibleProjects < mockProjectData.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={showMoreProjects}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              Show More Projects
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Media Display - Maintain Original Aspect Ratio */}
              <div className="relative max-w-full max-h-full flex items-center justify-center">
                {selectedProject.media[selectedImageIndex]?.endsWith('.mp4') ? (
                  <video
                    className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg"
                    controls
                    autoPlay
                  >
                    <source src={selectedProject.media[selectedImageIndex]} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={selectedProject.media[selectedImageIndex]}
                    alt={`${selectedProject.title} - Image ${selectedImageIndex + 1}`}
                    className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg"
                  />
                )}

                {/* Navigation */}
                {selectedProject.media.length > 1 && (
                  <>
                    <button
                      onClick={() => navigateGallery('prev')}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => navigateGallery('next')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                  {selectedImageIndex + 1} / {selectedProject.media.length}
                </div>
              </div>

              {/* Project Info */}
              <div className="absolute bottom-4 left-4 text-white max-w-md">
                <h3 className="text-xl font-bold mb-2">{selectedProject.title}</h3>
                <p className="text-gray-300 text-sm">{selectedProject.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}