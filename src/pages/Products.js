import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import { ChevronLeft, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const products_tg = [
  { sNo: 1, itemName: "STD 1000", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 2, itemName: "BUFF TM 500ML(MT)", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 3, itemName: "COW BULK 20 LTR", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 4, itemName: "CURD 1 KG", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 5, itemName: "DTM CURD 1 KG", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 6, itemName: "TM CURD 1 KG BUCKET", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 7, itemName: "B GHEE POUCH 500ML", skuGroup: "By Products", itemGroup: "Buffalo Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 8, itemName: "BUTTER 100G", skuGroup: "By Products", itemGroup: "Butter", image: "https://placehold.co/600x400/FFF59D/028bcc?text=Butter" },
  { sNo: 9, itemName: "LASSI 160", skuGroup: "By Products", itemGroup: "Lassi", image: "https://placehold.co/600x400/F8BBD0/028bcc?text=Lassi" },
  { sNo: 10, itemName: "BADAM DRINK 160", skuGroup: "By Products", itemGroup: "Flav Milk", image: "https://placehold.co/600x400/FFE0B2/028bcc?text=Flavored+Milk" },
  { sNo: 11, itemName: "BUTTER MILK 160", skuGroup: "By Products", itemGroup: "Butter Milk", image: "https://placehold.co/600x400/F1F8E9/028bcc?text=Butter+Milk" },
  { sNo: 12, itemName: "PANEER 1 KG", skuGroup: "By Products", itemGroup: "Paneer", image: "https://placehold.co/600x400/FFFFFF/028bcc?text=Paneer" },
  { sNo: 13, itemName: "STERLIZED FL MILK", skuGroup: "By Products", itemGroup: "Flav Milk", image: "https://placehold.co/600x400/FFE0B2/028bcc?text=Flavored+Milk" },
  { sNo: 14, itemName: "D PEDA 500 G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/600x400/FFECB3/028bcc?text=Sweets" },
  { sNo: 15, itemName: "KALAKHAND 200 G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/600x400/FFECB3/028bcc?text=Sweets" },
];

const groupProducts = (products) => {
  return products.reduce((acc, product) => {
    const group = product.itemGroup || "Other";

    if (!acc[group]) {
      acc[group] = {
        image: product.image || "https://placehold.co/600x400/CCCCCC/white?text=Product",
        items: []
      };
    }

    acc[group].items.push(product);
    return acc;
  }, {});
};

function ProductsTelangana() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState({});
  const router = useRouter();
  const brandBlue = "#028bcc";

  const products = products_tg;

  // QUANTITY + / -
  const increaseQty = (sNo) => {
    setCart(prev => ({ ...prev, [sNo]: (prev[sNo] || 0) + 1 }));
  };

  const decreaseQty = (sNo) => {
    setCart(prev => {
      const current = prev[sNo] || 0;
      if (current <= 1) {
        const updated = { ...prev };
        delete updated[sNo];
        return updated;
      }
      return { ...prev, [sNo]: current - 1 };
    });
  };

  const handleSubmitIndent = () => {
    localStorage.setItem("indentCart", JSON.stringify(cart));
    localStorage.setItem("productList", JSON.stringify(products));
    router.push("/Indent");
  };

  const filteredProducts = products.filter(product =>
    product.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.itemGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedProducts = groupProducts(filteredProducts);
  const totalItems = Object.keys(cart).length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 pt-20 pb-32">
        <div className="p-6">
          <div className="flex">
            <Link href="/Dashboard">
              <ChevronLeft height={40} className="scale-150" color={brandBlue} />
            </Link>

            <h1 className="text-2xl font-bold ml-2" style={{ color: brandBlue }}>
              Products
            </h1>
          </div>

          <div className="relative mb-6 mt-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <div className="space-y-6">
            {Object.keys(groupedProducts).map(groupName => (
              <div key={groupName} className="bg-white rounded-xl shadow-lg overflow-hidden">

                <div className="relative h-32 w-full">
                  <Image
                    src={groupedProducts[groupName].image}
                    alt={groupName}
                    layout="fill"
                    objectFit="cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <h2 className="text-3xl font-bold text-white uppercase tracking-wider">
                      {groupName}
                    </h2>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {groupedProducts[groupName].items.map(product => (
                    <div key={product.sNo} className="p-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-gray-800">{product.itemName}</h3>
                        <p className="text-sm text-gray-500">{product.skuGroup}</p>
                      </div>

                      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-8">
                      <button
                      onClick={() => decreaseQty(product.sNo)}
                      className="px-2 text-sm font-bold text-gray-700"
                      >
                      -
                      </button>

                      <div className="w-8 text-center text-sm">
                      {cart[product.sNo] || 0}
                      </div>

                      <button
                      onClick={() => increaseQty(product.sNo)}
                      className="px-2 text-sm font-bold text-gray-700"
                      >
                      +
                      </button>
                      </div>


                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>
      </main>

      {totalItems > 0 && (
        <div className="fixed bottom-16 left-0 right-0 w-full p-4 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
          <button
            onClick={handleSubmitIndent}
            className="w-full py-3 rounded-xl text-white font-semibold"
            style={{ backgroundColor: brandBlue }}
          >
            Review Indent ({totalItems})
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProductsTelangana;
