"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useDarkMode } from "@/hooks/useDarkMode";

const owners = [
  {
    name: "Mohammad Izhan",
    role: "Founder & Chief Fabricator",
    specialization: "Structural Steel, CNC Cutting, Custom Gates",
    experience: "12+ Years",
    image: "/team/owner1.jpg",
    location: "Jaipur, Rajasthan"
  },
  {
    name: "Asif Khan",
    role: "Co-Founder & Operations Manager",
    specialization: "Shutters, SS Railings, Project Logistics",
    experience: "10+ Years",
    image: "/team/owner2.jpg",
    location: "Jaipur, Rajasthan"
  }
];

const workers = [
  {
    name: "Ramesh Saini",
    role: "Fabrication Expert",
    experience: "6 Years",
    location: "Sikar, Rajasthan",
    image: "/team/worker1.jpg"
  },
  {
    name: "Akhtar Ali",
    role: "Welding Technician",
    experience: "4 Years",
    location: "Tonk, Rajasthan",
    image: "/team/worker2.jpg"
  },
  {
    name: "Pooja Verma",
    role: "Quality Inspector",
    experience: "3 Years",
    location: "Jaipur, Rajasthan",
    image: "/team/worker3.jpg"
  },
  {
    name: "Vikram Yadav",
    role: "On-site Supervisor",
    experience: "7 Years",
    location: "Alwar, Rajasthan",
    image: "/team/worker4.jpg"
  }
];

export default function TeamPage() {
  const [isDark, toggleDark] = useDarkMode();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Navbar isDark={isDark} toggleDark={toggleDark} />
      
      <main className="px-6 md:px-12 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-4xl md:text-5xl font-bold mb-16 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Meet Our <span className="text-orange-500">Team</span>
          </motion.h1>

          {/* Owners */}
          <section className="mb-20">
            <h2 className={`text-2xl font-semibold mb-8 text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Leadership</h2>
            <div className="grid md:grid-cols-2 gap-10">
              {owners.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`p-6 rounded-2xl border flex flex-col md:flex-row gap-6 items-center md:items-start transition-all hover:scale-[1.02] ${
                    isDark ? 'bg-gray-800/50 border-orange-500/20' : 'bg-gray-50 border-orange-200'
                  }`}
                >
                  <div className="w-40 h-40 shrink-0 rounded-full border-4 border-orange-500 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{member.name}</h3>
                    <p className="text-orange-500 font-medium mb-3">{member.role}</p>
                    <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>📍 {member.location}</p>
                    <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}><strong>Experience:</strong> {member.experience}</p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}><strong>Specialization:</strong> {member.specialization}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Workers */}
          <section>
            <h2 className={`text-2xl font-semibold mb-8 text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Our Experts</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {workers.map((worker, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`p-6 rounded-2xl border text-center transition-all hover:-translate-y-2 ${
                    isDark ? 'bg-gray-800/30 border-gray-700 hover:border-orange-500/50' : 'bg-white border-gray-200 shadow-lg hover:border-orange-300'
                  }`}
                >
                  <div className="w-24 h-24 mx-auto rounded-full border-2 border-orange-400 overflow-hidden mb-4">
                    <Image
                      src={worker.image}
                      alt={worker.name}
                      width={180}
                      height={180}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <h4 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{worker.name}</h4>
                  <p className="text-sm text-orange-500 font-medium mb-2">{worker.role}</p>
                  <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>📍 {worker.location}</p>
                  <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>🛠 {worker.experience}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer isDark={isDark} />
    </div>
  );
}
