"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ArrowRight } from "lucide-react";

interface ProjectsProps {
  isDark: boolean;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  media: string[];
  youtubeUrl?: string | null;
}
export default function Projects({ isDark }: ProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentMediaIndex, setCurrentMediaIndex] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(true);

  const scrollRefs = useRef<{ [key: string]: HTMLDivElement }>({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          // Parse media JSON string into array
          const parsedData = data.map((p: any) => ({
            ...p,
            media: typeof p.media === 'string' ? JSON.parse(p.media) : p.media || []
          }));
          setProjects(parsedData);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);


  // Auto-advance media for each project
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMediaIndex((prev) => {
        const updated: { [key: string]: number } = {};
        projects.slice(0, visibleProjects).forEach((project) => {
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

  const openGallery = (project: Project, imageIndex: number = 0) => {
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
    setVisibleProjects(prev => Math.min(prev + 4, projects.length));
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
      className={`relative py-20 px-6 md:px-12 overflow-hidden ${isDark
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
          : 'bg-gradient-to-br from-white via-gray-50 to-orange-50'
        }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className={`absolute top-20 right-20 w-64 h-64 rounded-full opacity-5 ${isDark ? 'bg-gradient-to-r from-orange-500 to-yellow-500' : 'bg-gradient-to-r from-orange-300 to-yellow-300'
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
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl">No projects found. Add some from the admin dashboard!</p>
            </div>
          ) : (
            projects.slice(0, visibleProjects).map((project, index) => {
              const currentIndex = currentMediaIndex[project.id] || 0;

              // Helper to extract YouTube ID
              const getYouTubeId = (url: string) => {
                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                const match = url.match(regExp);
                return (match && match[2].length === 11) ? match[2] : null;
              };

              const ytId = project.youtubeUrl ? getYouTubeId(project.youtubeUrl) : null;

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
                      {/* Render YouTube Video if exists */}
                      {ytId && (
                        <motion.div
                          className="relative flex-none snap-center h-80 min-w-[320px] md:min-w-[480px] rounded-lg shadow-lg overflow-hidden"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${ytId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </motion.div>
                      )}

                      {/* Render Images */}
                      {project.media.map((media, mediaIndex) => (
                        <motion.div
                          key={mediaIndex}
                          className="relative flex-none snap-center"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          {media.endsWith('.mp4') || media.endsWith('.webm') ? (
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
                            <div
                              className="h-80 w-auto cursor-pointer relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                              onClick={() => openGallery(project, mediaIndex)}
                              style={{
                                minWidth: '320px',
                                backgroundImage: `url(${media})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            >
                              <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors" />
                            </div>
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
            })
          )}
        </div>

        {/* Show More Button */}
        {!isLoading && visibleProjects < projects.length && (
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
                {selectedProject.media[selectedImageIndex]?.endsWith('.mp4') || selectedProject.media[selectedImageIndex]?.endsWith('.webm') ? (
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