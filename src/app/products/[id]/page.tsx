"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import NavbarClient from "../NavbarClient";
import Footer from "@/components/Footer";
import CheckoutModal from "@/components/CheckoutModal";

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  features: string;
  media: string;
  youtubeUrl: string | null;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <button onClick={() => router.push('/products')} className="text-orange-500 hover:underline">
            Return to Products
          </button>
        </div>
      </div>
    );
  }

  const featuresList = JSON.parse(product.features);
  const mediaList = JSON.parse(product.media);
  const hasImages = mediaList.length > 0;
  const currentImage = hasImages ? mediaList[activeImage] : "https://via.placeholder.com/800x600?text=No+Image";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white flex flex-col transition-colors duration-500">
      <NavbarClient />
      
      <main className="flex-1 px-6 md:px-12 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => router.push('/products')}
            className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Products
          </button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image & Video Gallery */}
            <div className="space-y-4">
              {product.youtubeUrl ? (
                <div className="aspect-video relative rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                  <iframe 
                    src={product.youtubeUrl.replace("watch?v=", "embed/")} 
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    title={product.name}
                  ></iframe>
                </div>
              ) : (
                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <Image
                    src={currentImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              
              {hasImages && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {mediaList.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                        activeImage === idx ? 'border-orange-500 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt="Thumbnail" fill className="object-cover" unoptimized />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                  {product.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">{product.name}</h1>
                <p className="text-2xl font-semibold text-orange-500">{product.price}</p>
              </div>

              <div className="prose dark:prose-invert max-w-none mb-8">
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {featuresList.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-lg font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Key Features</h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {featuresList.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto pt-8 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all hover:-translate-y-1 text-lg"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer isDark={false} />
      
      <CheckoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={{ name: product.name, price: product.price }} 
      />
    </div>
  );
}
