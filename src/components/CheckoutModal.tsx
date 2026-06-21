"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, MapPin } from "lucide-react";
import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("./MapPicker"), { ssr: false });

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: string;
  };
}

export default function CheckoutModal({ isOpen, onClose, product }: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pincode: ""
  });
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [showMap, setShowMap] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the WhatsApp message
    const adminNumber = "919887260947";
    const mapLink = location ? `\n*Location Map:* https://www.google.com/maps?q=${location.lat},${location.lng}` : "";
    const text = `*New Order Inquiry* 🛍️\n\n*Product:* ${product.name}\n*Price:* ${product.price}\n\n*Customer Details:*\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Address:* ${formData.address}\n*PIN Code:* ${formData.pincode}${mapLink}\n\nPlease let me know the next steps!`;
    
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodedText}`;
    
    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg pointer-events-auto overflow-y-auto max-h-[90vh] border border-gray-200 dark:border-gray-700 custom-scrollbar"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                <h2 className="text-xl font-bold dark:text-white">Complete Your Order</h2>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors dark:text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800/30">
                  <p className="text-sm text-orange-600 dark:text-orange-400 font-semibold uppercase tracking-wide mb-1">Selected Product</p>
                  <p className="font-bold text-gray-900 dark:text-white">{product.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{product.price}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                    <input 
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone *</label>
                      <input 
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                        placeholder="+91"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Delivery Address *</label>
                      <button 
                        type="button" 
                        onClick={() => setShowMap(!showMap)}
                        className="text-xs font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-1 hover:underline"
                      >
                        <MapPin size={12} />
                        {showMap ? "Hide Map" : "Pin on Map"}
                      </button>
                    </div>
                    {showMap && (
                      <div className="mb-3">
                        <MapPicker onLocationSelect={(lat, lng) => setLocation({lat, lng})} />
                        {location && (
                          <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                            ✓ Location pinned successfully!
                          </p>
                        )}
                      </div>
                    )}
                    <textarea 
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
                      placeholder="Complete street address..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">PIN Code *</label>
                    <input 
                      required
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                      placeholder="e.g., 400001"
                      maxLength={6}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-green-500/30 transition-all hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <MessageCircle size={20} />
                    Checkout via WhatsApp
                  </button>
                  <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                    You will be redirected to WhatsApp to confirm your order directly with our team.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
