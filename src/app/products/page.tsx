import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import NavbarClient from "./NavbarClient";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-500 flex flex-col">
      <NavbarClient />
      
      <main className="flex-1 px-6 md:px-12 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="text-orange-500">Products</span></h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Browse our premium collection of industrial and residential fabrication products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const mediaArray = JSON.parse(product.media);
              const firstImage = mediaArray.length > 0 ? mediaArray[0] : "https://via.placeholder.com/400x300?text=No+Image";
              
              return (
              <Link key={product.id} href={`/products/${product.id}`} className="group block">
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="aspect-[4/3] relative overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={firstImage}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">{product.name}</h3>
                    <p className="text-orange-600 dark:text-orange-400 font-semibold mb-4">{product.price}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{product.description}</p>
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer isDark={false} />
    </div>
  );
}
