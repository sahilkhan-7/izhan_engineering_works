"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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
  return (
    <main className="px-6 md:px-12 py-20 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-blue-900 mb-10"
        >
          Meet Our Team
        </motion.h1>

        {/* Owners */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Owners</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {owners.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-gray-50 p-4 rounded shadow border"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="rounded-full mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-blue-700">{member.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{member.role}</p>
                <p className="text-sm text-gray-600 mb-1">📍 {member.location}</p>
                <p className="text-sm text-gray-700"><strong>Experience:</strong> {member.experience}</p>
                <p className="text-sm text-gray-700"><strong>Specialization:</strong> {member.specialization}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Workers */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Workers</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {workers.map((worker, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-gray-50 p-4 rounded shadow-sm border"
              >
                <Image
                  src={worker.image}
                  alt={worker.name}
                  width={180}
                  height={180}
                  className="rounded-full mb-3 object-cover"
                />
                <h4 className="text-lg font-semibold text-blue-700">{worker.name}</h4>
                <p className="text-sm text-gray-600">{worker.role}</p>
                <p className="text-sm text-gray-600">📍 {worker.location}</p>
                <p className="text-sm text-gray-600">🛠 {worker.experience}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
