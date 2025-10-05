// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Mail, Phone, MapPin, MessageCircle, Instagram, Facebook, ExternalLink } from "lucide-react";

// interface ContactProps {
//   isDark: boolean;
// }

// export default function Contact({ isDark }: ContactProps) {
//   const shopLocation = {
//     address: "Plot 14, Sitapura Industrial Area, Jaipur, Rajasthan, India",
//     lat: 26.8467,
//     lng: 75.7794,
//     googleMapsUrl: "https://maps.google.com/?q=Plot+14,+Sitapura+Industrial+Area,+Jaipur,+Rajasthan,+India"
//   };

//   const contactInfo = [
//     {
//       icon: MessageCircle,
//       title: "WhatsApp Us",
//       items: ["+91 98765 43210"],
//       action: () => window.open(`https://wa.me/919876543210?text=Hi! I'm interested in your metal fabrication services.`, '_blank'),
//       color: "from-green-500 to-green-600",
//       isClickable: true
//     },
//     {
//       icon: Phone,
//       title: "Call Us",
//       items: ["+91 98765 43210", "+91 99988 11223"],
//       action: (phone: string) => window.open(`tel:${phone.replace(/\s/g, '')}`, '_self'),
//       color: "from-blue-500 to-blue-600",
//       isClickable: true
//     },
//     {
//       icon: Mail,
//       title: "Email Us", 
//       items: ["contact@izhanworks.in", "info@izhanworks.in"],
//       action: (email: string) => window.open(`mailto:${email}`, '_self'),
//       color: "from-orange-500 to-yellow-500",
//       isClickable: true
//     }
//   ];

//   const socialLinks = [
//     {
//       icon: Instagram,
//       name: "Instagram",
//       url: "https://instagram.com/izhanworks",
//       color: "from-pink-500 to-purple-600"
//     },
//     {
//       icon: Facebook,
//       name: "Facebook", 
//       url: "https://facebook.com/izhanworks",
//       color: "from-blue-600 to-blue-700"
//     }
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15,
//         delayChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" }
//     }
//   };

//   return (
//     <section 
//       id="contact" 
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
//           className={`absolute top-20 right-20 w-80 h-80 rounded-full opacity-5 ${
//             isDark ? 'bg-gradient-to-r from-orange-500 to-yellow-500' : 'bg-gradient-to-r from-orange-300 to-yellow-300'
//           }`}
//         />
//         <motion.div
//           animate={{
//             rotate: [360, 0],
//             scale: [1, 0.8, 1]
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//           className={`absolute bottom-20 left-20 w-64 h-64 rounded-full opacity-5 ${
//             isDark ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-yellow-300 to-orange-300'
//           }`}
//         />
//       </div>

//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.1 }}
//         className="relative z-10 max-w-6xl mx-auto"
//       >
//         {/* Section Title */}
//         <motion.div variants={itemVariants} className="text-center mb-16">
//           <motion.h2
//             className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
//             whileHover={{ scale: 1.02 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
//               Get In
//             </span>{' '}
//             <span className={isDark ? 'text-white' : 'text-gray-900'}>
//               Touch
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
//             Ready to start your project? Reach out to us through any of these channels
//           </motion.p>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Contact Methods */}
//           <motion.div variants={itemVariants} className="space-y-6">
//             {contactInfo.map((info, index) => (
//               <motion.div
//                 key={info.title}
//                 initial={{ opacity: 0, x: -30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 whileHover={{ scale: 1.03, x: 10 }}
//                 transition={{ delay: index * 0.1, duration: 0.5 }}
//                 viewport={{ once: true }}
//                 className={`p-6 rounded-2xl backdrop-blur-sm border cursor-pointer transition-all duration-300 ${
//                   isDark
//                     ? 'bg-white/10 border-orange-500/20 hover:bg-white/20 hover:border-orange-400/40'
//                     : 'bg-white/80 border-orange-200/50 hover:bg-white hover:border-orange-300/70 shadow-lg hover:shadow-xl'
//                 }`}
//               >
//                 <div className="flex items-start gap-4">
//                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${info.color} shadow-lg`}>
//                     <info.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <div className="flex-1">
//                     <h4 className={`font-bold text-lg mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
//                       {info.title}
//                     </h4>
//                     <div className="space-y-2">
//                       {info.items.map((item, i) => (
//                         <motion.div
//                           key={i}
//                           whileHover={{ scale: 1.05 }}
//                           className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
//                             isDark 
//                               ? 'text-gray-300 hover:text-white hover:bg-white/10' 
//                               : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
//                           }`}
//                           onClick={() => info.action(item)}
//                         >
//                           <span className="font-medium">{item}</span>
//                           <ExternalLink className="w-4 h-4 opacity-60" />
//                         </motion.div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}

//             {/* Social Media Links */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.6 }}
//               viewport={{ once: true }}
//               className={`p-6 rounded-2xl backdrop-blur-sm border ${
//                 isDark
//                   ? 'bg-white/10 border-purple-500/20'
//                   : 'bg-white/80 border-purple-200/50 shadow-lg'
//               }`}
//             >
//               <h4 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
//                 Follow Us
//               </h4>
//               <div className="flex gap-4">
//                 {socialLinks.map((social, index) => (
//                   <motion.button
//                     key={social.name}
//                     whileHover={{ scale: 1.1, y: -3 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => window.open(social.url, '_blank')}
//                     className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${social.color} shadow-lg hover:shadow-xl transition-all duration-300`}
//                   >
//                     <social.icon className="w-6 h-6 text-white" />
//                   </motion.button>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Location & Map */}
//           <motion.div variants={itemVariants} className="space-y-6">
//             {/* Visit Us Section */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className={`p-6 rounded-2xl backdrop-blur-sm border ${
//                 isDark
//                   ? 'bg-white/10 border-orange-500/20'
//                   : 'bg-white/80 border-orange-200/50 shadow-lg'
//               }`}
//             >
//               <div className="flex items-start gap-4 mb-4">
//                 <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
//                   <MapPin className="w-6 h-6 text-white" />
//                 </div>
//                 <div className="flex-1">
//                   <h4 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
//                     Visit Our Shop
//                   </h4>
//                   <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
//                     {shopLocation.address}
//                   </p>
//                 </div>
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => window.open(shopLocation.googleMapsUrl, '_blank')}
//                 className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
//               >
//                 <ExternalLink className="w-5 h-5" />
//                 Open in Google Maps
//               </motion.button>
//             </motion.div>

//             {/* Embedded Map */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.6 }}
//               viewport={{ once: true }}
//               className={`rounded-2xl overflow-hidden backdrop-blur-sm border ${
//                 isDark
//                   ? 'border-orange-500/20'
//                   : 'border-orange-200/50 shadow-lg'
//               }`}
//             >
//               <div className="h-80 bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center relative overflow-hidden">
//                 {/* Simple Map Placeholder */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-yellow-200 opacity-30"></div>
//                 <motion.div
//                   animate={{ 
//                     scale: [1, 1.1, 1],
//                     rotate: [0, 5, -5, 0]
//                   }}
//                   transition={{ 
//                     duration: 4,
//                     repeat: Infinity,
//                     ease: "easeInOut"
//                   }}
//                   className="relative z-10 text-center"
//                 >
//                   <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
//                     <MapPin className="w-8 h-8 text-white" />
//                   </div>
//                   <p className="font-bold text-gray-800 text-lg">Izhan Works</p>
//                   <p className="text-gray-600 text-sm">Sitapura Industrial Area</p>
//                 </motion.div>
                
//                 {/* Click overlay */}
//                 <motion.button
//                   whileHover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
//                   onClick={() => window.open(shopLocation.googleMapsUrl, '_blank')}
//                   className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors duration-300 group"
//                 >
//                   <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 text-white px-4 py-2 rounded-lg">
//                     Click to open in Maps
//                   </div>
//                 </motion.button>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Quick WhatsApp CTA */}
//         <motion.div
//           variants={itemVariants}
//           className="text-center mt-12"
//         >
//           <motion.button
//             whileHover={{ scale: 1.05, y: -3 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => window.open(`https://wa.me/919876543210?text=Hi! I'm interested in your metal fabrication services.`, '_blank')}
//             className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
//           >
//             <MessageCircle className="w-6 h-6" />
//             Quick WhatsApp Chat
//           </motion.button>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Instagram, Facebook, ExternalLink } from "lucide-react";

interface ContactProps {
  isDark: boolean;
}

export default function Contact({ isDark }: ContactProps) {
  const shopLocation = {
    address: "56, Aulia Masjid, Khatipura Road, Jaipur, Rajasthan, India",
    lat: 26.8467,
    lng: 75.7794,
    googleMapsUrl: "https://www.google.com/maps/place/Izhan+Engineering+Works/@26.9154205,75.7686597,17z/data=!3m1!4b1!4m6!3m5!1s0x396db5d4113be3cf:0x7126a96f1b4fb39d!8m2!3d26.9154157!4d75.7712346!16s%2Fg%2F11qfpzw__y"
  };

  const contactInfo = [
    {
      icon: MessageCircle,
      title: "WhatsApp Us",
      items: ["+91 98765 43210"],
      action: () => window.open(`https://wa.me/919876543210?text=Hi! I'm interested in your metal fabrication services.`, '_blank'),
      color: "from-green-500 to-green-600",
      isClickable: true
    },
    {
      icon: Phone,
      title: "Call Us",
      items: ["+91 98765 43210", "+91 99988 11223"],
      action: (phone: string) => window.open(`tel:${phone.replace(/\s/g, '')}`, '_self'),
      color: "from-blue-500 to-blue-600",
      isClickable: true
    },
    {
      icon: Mail,
      title: "Email Us", 
      items: ["contact@izhanworks.in", "info@izhanworks.in"],
      action: (email: string) => window.open(`mailto:${email}`, '_self'),
      color: "from-orange-500 to-yellow-500",
      isClickable: true
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://instagram.com/izhanworks",
      color: "from-pink-500 to-purple-600"
    },
    {
      icon: Facebook,
      name: "Facebook", 
      url: "https://facebook.com/izhanworks",
      color: "from-blue-600 to-blue-700"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
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
      id="contact" 
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
          className={`absolute top-20 right-20 w-80 h-80 rounded-full opacity-5 ${
            isDark ? 'bg-gradient-to-r from-orange-500 to-yellow-500' : 'bg-gradient-to-r from-orange-300 to-yellow-300'
          }`}
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute bottom-20 left-20 w-64 h-64 rounded-full opacity-5 ${
            isDark ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-yellow-300 to-orange-300'
          }`}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
              Get In
            </span>{' '}
            <span className={isDark ? 'text-white' : 'text-gray-900'}>
              Touch
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
            Ready to start your project? Reach out to us through any of these channels
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <motion.div variants={itemVariants} className="space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={`p-6 rounded-2xl backdrop-blur-sm border ${
                  isDark
                    ? 'bg-white/10 border-orange-500/20'
                    : 'bg-white/80 border-orange-200/50 shadow-lg'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${info.color} shadow-lg flex-shrink-0`}>
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-lg mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {info.title}
                    </h4>
                    <div className="flex flex-col gap-2">
                      {info.items.map((item, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-left ${
                            isDark 
                              ? 'text-gray-300 hover:text-white hover:bg-white/10' 
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                          onClick={() => info.action(item)}
                        >
                          <span className="font-medium truncate">{item}</span>
                          <ExternalLink className="w-4 h-4 opacity-60 flex-shrink-0" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className={`p-6 rounded-2xl backdrop-blur-sm border ${
                isDark
                  ? 'bg-white/10 border-purple-500/20'
                  : 'bg-white/80 border-purple-200/50 shadow-lg'
              }`}
            >
              <h4 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Follow Us
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.button
                    key={social.name}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(social.url, '_blank')}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${social.color} shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <social.icon className="w-6 h-6 text-white" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Location & Map */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Visit Us Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`p-6 rounded-2xl backdrop-blur-sm border ${
                isDark
                  ? 'bg-white/10 border-orange-500/20'
                  : 'bg-white/80 border-orange-200/50 shadow-lg'
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Visit Our Shop
                  </h4>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed text-sm`}>
                    {shopLocation.address}
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open(shopLocation.googleMapsUrl, '_blank')}
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                Open in Google Maps
              </motion.button>
            </motion.div>

            {/* Embedded Google Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className={`rounded-2xl overflow-hidden backdrop-blur-sm border ${
                isDark
                  ? 'border-orange-500/20'
                  : 'border-orange-200/50 shadow-lg'
              }`}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.6241634638686!2d75.76865967448933!3d26.91542045997581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5d4113be3cf%3A0x7126a96f1b4fb39d!2sIzhan%20Engineering%20Works!5e0!3m2!1sen!2sin!4v1759666974307!5m2!1sen!2sin" 
                width="100%" 
                height="320" 
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Quick WhatsApp CTA */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(`https://wa.me/919876543210?text=Hi! I'm interested in your metal fabrication services.`, '_blank')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageCircle className="w-6 h-6" />
            Quick WhatsApp Chat
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}