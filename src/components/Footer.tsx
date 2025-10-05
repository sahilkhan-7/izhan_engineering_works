// "use client";

// import { motion } from 'framer-motion';
// import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

// interface FooterProps {
//   isDark: boolean;
// }

// export default function Footer({ isDark }: FooterProps) {
//   const phoneNumbers = ['+91 98765 43210', '+91 99988 11223', '+91 88110 22110'];
//   const quickLinks = [
//     { name: 'About', href: '#about' },
//     { name: 'Specializations', href: '#specialization' },
//     { name: 'Projects', href: '#projects' },
//     { name: 'Contact', href: '#contact' },
//     { name: 'Team', href: '/team' }
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         duration: 0.6
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   };

//   return (
//     <footer className={`relative py-20 px-6 mt-20 overflow-hidden ${
//       isDark 
//         ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
//         : 'bg-gradient-to-br from-gray-900 via-orange-900 to-black'
//     }`}>
//       {/* Background decorative elements */}
//       <div className="absolute inset-0">
//         {[...Array(8)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full bg-orange-500/5"
//             style={{
//               width: Math.random() * 200 + 100,
//               height: Math.random() * 200 + 100,
//               left: Math.random() * 100 + '%',
//               top: Math.random() * 100 + '%',
//             }}
//             animate={{
//               x: [0, Math.random() * 50 - 25],
//               y: [0, Math.random() * 50 - 25],
//               scale: [1, Math.random() * 0.5 + 0.8, 1],
//             }}
//             transition={{
//               duration: Math.random() * 20 + 15,
//               repeat: Infinity,
//               repeatType: "reverse",
//               delay: i * 2,
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16"
//         >
//           {/* Logo and About Section */}
//           <motion.div variants={itemVariants} className="space-y-6">
//             {/* Enhanced Logo */}
//             <div className="flex items-center group">
//               <motion.div 
//                 whileHover={{ rotate: 360, scale: 1.1 }}
//                 transition={{ duration: 0.6, ease: "easeInOut" }}
//                 className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-xl flex items-center justify-center shadow-xl shadow-orange-400/30"
//               >
//                 <span className="text-white font-bold text-2xl">I</span>
//               </motion.div>
//               <div className="ml-4">
//                 <motion.h3 
//                   className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   Izhan Engineering
//                 </motion.h3>
//                 <motion.p 
//                   className="text-gray-400 text-sm font-medium"
//                   animate={{ opacity: [0.6, 1, 0.6] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 >
//                   Works
//                 </motion.p>
//               </div>
//             </div>

//             {/* About Text */}
//             <motion.p 
//               className="text-gray-300 leading-relaxed text-sm lg:text-base"
//               whileInView={{ opacity: [0, 1] }}
//               transition={{ duration: 1, delay: 0.3 }}
//             >
//               Izhan Engineering Works is a premium fabrication service provider based in Jaipur,
//               serving clients all across India with excellence, innovation, and dedication.
//             </motion.p>

//             {/* Additional Info */}
//             <motion.div
//               whileInView={{ opacity: [0, 1], y: [20, 0] }}
//               transition={{ duration: 0.8, delay: 0.5 }}
//               className="flex items-center space-x-2 text-orange-400"
//             >
//               <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
//               <span className="text-sm font-medium">Established Excellence Since Foundation</span>
//             </motion.div>
//           </motion.div>

//           {/* Quick Links Section */}
//           <motion.div variants={itemVariants} className="space-y-6">
//             <h4 className="font-bold text-xl text-white flex items-center">
//               Quick Links
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//                 className="ml-2"
//               >
//                 <ExternalLink className="w-5 h-5 text-orange-400" />
//               </motion.div>
//             </h4>
            
//             <ul className="space-y-4">
//               {quickLinks.map((item, index) => (
//                 <motion.li
//                   key={item.name}
//                   variants={itemVariants}
//                   whileHover={{ x: 8, scale: 1.02 }}
//                   transition={{ duration: 0.2 }}
//                   className="group"
//                 >
//                   <a 
//                     href={item.href}
//                     className="flex items-center text-gray-300 hover:text-orange-400 transition-all duration-300"
//                   >
//                     <motion.div
//                       className="w-2 h-2 bg-orange-400 rounded-full mr-4 opacity-0 group-hover:opacity-100"
//                       whileHover={{ scale: 1.5 }}
//                       transition={{ duration: 0.2 }}
//                     />
//                     <span className="relative">
//                       {item.name}
//                       <motion.span
//                         className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 group-hover:w-full transition-all duration-300"
//                       />
//                     </span>
//                   </a>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Contact Information Section */}
//           <motion.div variants={itemVariants} className="space-y-6">
//             <h4 className="font-bold text-xl text-white flex items-center">
//               Contact
//               <motion.div
//                 animate={{ scale: [1, 1.2, 1] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//                 className="ml-2"
//               >
//                 <Phone className="w-5 h-5 text-orange-400" />
//               </motion.div>
//             </h4>

//             <div className="space-y-4">
//               {/* Phone Numbers */}
//               {phoneNumbers.map((phone, index) => (
//                 <motion.div
//                   key={phone}
//                   variants={itemVariants}
//                   whileHover={{ x: 8, scale: 1.02 }}
//                   className="flex items-center group cursor-pointer"
//                 >
//                   <motion.div
//                     whileHover={{ rotate: 360 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     <Phone className="w-4 h-4 mr-3 text-orange-400 group-hover:text-yellow-400 transition-colors duration-300" />
//                   </motion.div>
//                   <span className="text-gray-300 hover:text-orange-400 transition-colors duration-300">
//                     {phone}
//                   </span>
//                 </motion.div>
//               ))}

//               {/* Email */}
//               <motion.div
//                 variants={itemVariants}
//                 whileHover={{ x: 8, scale: 1.02 }}
//                 className="flex items-center group cursor-pointer"
//               >
//                 <motion.div
//                   whileHover={{ scale: 1.2 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <Mail className="w-4 h-4 mr-3 text-orange-400 group-hover:text-yellow-400 transition-colors duration-300" />
//                 </motion.div>
//                 <span className="text-gray-300 hover:text-orange-400 transition-colors duration-300">
//                   contact@izhanworks.in
//                 </span>
//               </motion.div>

//               {/* Address */}
//               <motion.div
//                 variants={itemVariants}
//                 whileHover={{ x: 8, scale: 1.02 }}
//                 className="flex items-start group cursor-pointer"
//               >
//                 <motion.div
//                   whileHover={{ scale: 1.2 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <MapPin className="w-4 h-4 mr-3 mt-1 text-orange-400 group-hover:text-yellow-400 transition-colors duration-300 flex-shrink-0" />
//                 </motion.div>
//                 <span className="text-gray-300 hover:text-orange-400 transition-colors duration-300">
//                   Plot 14, Sitapura Industrial Area,<br />Jaipur, Rajasthan, India
//                 </span>
//               </motion.div>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* Bottom Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           viewport={{ once: true }}
//           className="border-t border-gray-700/50 mt-16 pt-8"
//         >
//           {/* Social proof or certifications */}
//           <motion.div
//             className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
//             variants={containerVariants}
//           >
//             <motion.div 
//               variants={itemVariants}
//               className="flex items-center space-x-4"
//             >
//               <div className="flex items-center space-x-2">
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//                   className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center"
//                 >
//                   <span className="text-white font-bold text-xs">✓</span>
//                 </motion.div>
//                 <span className="text-gray-400 text-sm">ISO Certified Quality</span>
//               </div>
//               <div className="hidden md:block w-px h-6 bg-gray-600"></div>
//               <span className="text-gray-400 text-sm">12+ Years Excellence</span>
//             </motion.div>

//             <motion.p 
//               variants={itemVariants}
//               className="text-gray-400 text-sm text-center"
//             >
//               © {new Date().getFullYear()} Izhan Engineering Works. All rights reserved.
//             </motion.p>
//           </motion.div>
//         </motion.div>
//       </div>
//     </footer>
//   );
// }

"use client";

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUp, Zap } from 'lucide-react';

interface FooterProps {
  isDark: boolean;
}

export default function Footer({ isDark }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const contactInfo = [
    { icon: Phone, text: "+91 98765 43210", href: "tel:+919876543210" },
    { icon: Phone, text: "+91 99988 11223", href: "tel:+919998811223" },
    { icon: Phone, text: "+91 88110 22110", href: "tel:+918811022110" },
    { icon: Mail, text: "contact@izhanworks.in", href: "mailto:contact@izhanworks.in" },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Specializations', href: '#specialization' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
    { name: 'Team', href: '/team' }
  ];

  return (
    <footer className={`relative mt-20 ${
      isDark 
        ? 'bg-gradient-to-br from-black via-gray-900 to-black' 
        : 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
    }`}>
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-orange-500 rounded-full"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-yellow-500 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-orange-500 rounded-full"></div>
      </div>

      <div className="relative z-10 py-16 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Company Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">I</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                    Izhan Engineering
                  </h3>
                  <p className="text-gray-400 text-sm">Works</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed max-w-md">
                A premium fabrication service provider based in Jaipur, serving clients across India 
                with excellence, innovation, and unwavering dedication to quality craftsmanship.
              </p>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-orange-500" />
                <span className="text-gray-300 font-medium">Powered by Innovation</span>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-xl font-bold text-white relative">
                Quick Links
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 mt-2"></div>
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-orange-400 transition-all duration-300 group flex items-center"
                    >
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-xl font-bold text-white relative">
                Get In Touch
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 mt-2"></div>
              </h4>
              <ul className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <a 
                      href={contact.href}
                      className="flex items-center text-gray-300 hover:text-orange-400 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                        <contact.icon className="w-5 h-5 text-orange-400" />
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {contact.text}
                      </span>
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: contactInfo.length * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start text-gray-300 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-5 h-5 text-orange-400" />
                    </div>
                    <div className="group-hover:translate-x-1 transition-transform duration-300">
                      <span className="block">Plot 14, Sitapura Industrial Area,</span>
                      <span className="block">Jaipur, Rajasthan, India</span>
                    </div>
                  </div>
                </motion.li>
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent mb-8"
          />

          {/* Bottom Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Izhan Engineering Works. All rights reserved. | 
              <span className="text-orange-400 ml-1">Crafted with precision</span>
            </p>
            
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-xs text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700"
              >
                Made in India 🇮🇳
              </motion.div>
              
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </motion.button>
            </div>
          </motion.div>

          {/* Additional Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-yellow-500/5 to-orange-500/5 rounded-full blur-2xl"></div>
        </motion.div>
      </div>
    </footer>
  );
}