import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import { Search } from 'lucide-react';
import Image from 'next/image'; // Import Next.js Image component

// Data from your "Item Name -AVP.csv" with category images
const products_ap = [
  { sNo: 1, itemName: "COW BULK 40 LTR", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 2, itemName: "HFCM 500", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 3, itemName: "TM 1000", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 4, itemName: "TM 500", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 5, itemName: "SPL GOLD 140", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 6, itemName: "SPL GOLD 500", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 7, itemName: "SPL GOLD 1000", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 8, itemName: "HFCM 1000", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 9, itemName: "HFCM 130", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 10, itemName: "HFCM 450", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 11, itemName: "TM 150", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 12, itemName: "TM BULK 40 LTR", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 13, itemName: "HFCM BULK 40 LTR", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 14, itemName: "B MILK BULK", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 15, itemName: "DTM 150", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 16, itemName: "DTM 200", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 17, itemName: "DTM 500", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 18, itemName: "SLIM CURD 10 KG BKT", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 19, itemName: "DTM CURD CAN 40KG", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 20, itemName: "FCM CURD 10 KG", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 21, itemName: "FCM CURD 1 KG", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 22, itemName: "FCM CURD 130 G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 23, itemName: "FCM CURD 175 G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 24, itemName: "FCM CURD 450 G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 25, itemName: "FCM CURD 5 KG", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 26, itemName: "FCM CURD 90 G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 27, itemName: "SLIM CURD 175 G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 28, itemName: "SLIM CURD 450 G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 29, itemName: "B GHEE POUCH 1000ML", skuGroup: "By Products", itemGroup: "Buffalo Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 30, itemName: "B GHEE POUCH 500ML", skuGroup: "By Products", itemGroup: "Buffalo Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 31, itemName: "BADAM DRINK 160", skuGroup: "By Products", itemGroup: "Flav Milk", image: "https://placehold.co/600x400/FFE0B2/028bcc?text=Flavored+Milk" },
  { sNo: 32, itemName: "BUTTER 100G", skuGroup: "By Products", itemGroup: "Butter", image: "https://placehold.co/600x400/FFF59D/028bcc?text=Butter" },
  { sNo: 33, itemName: "BUTTER 500G", skuGroup: "By Products", itemGroup: "Butter", image: "https://placehold.co/600x400/FFF59D/028bcc?text=Butter" },
  { sNo: 34, itemName: "C GHEE POUCH 1000ML", skuGroup: "By Products", itemGroup: "Cow Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 35, itemName: "C GHEE POUCH 500ML", skuGroup: "By Products", itemGroup: "Cow Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 36, itemName: "C GHEE POUCH 200ML", skuGroup: "By Products", itemGroup: "Cow Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 37, itemName: "C GHEE POUCH 100ML", skuGroup: "By Products", itemGroup: "Cow Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 38, itemName: "BUTTER MILK 160", skuGroup: "By Products", itemGroup: "Butter Milk", image: "https://placehold.co/600x400/F1F8E9/028bcc?text=Butter+Milk" },
  { sNo: 39, itemName: "PANEER 1 KG", skuGroup: "By Products", itemGroup: "Paneer", image: "https://placehold.co/600x400/FFFFFF/028bcc?text=Paneer" },
  { sNo: 40, itemName: "PANEER 200 G", skuGroup: "By Products", itemGroup: "Paneer", image: "https://placehold.co/600x400/FFFFFF/028bcc?text=Paneer" },
  { sNo: 41, itemName: "PANEER 500 G", skuGroup: "By Products", itemGroup: "Paneer", image: "https://placehold.co/600x400/FFFFFF/028bcc?text=Paneer" },
  { sNo: 42, itemName: "PANEER 100G", skuGroup: "By Products", itemGroup: "Paneer", image: "https://placehold.co/600x400/FFFFFF/028bcc?text=Paneer" },
  { sNo: 43, itemName: "KOVA 500 G", skuGroup: "By Products", itemGroup: "Paneer", image: "https://placehold.co/600x400/FFFFFF/028bcc?text=Paneer" },
  { sNo: 44, itemName: "D PEDA 500G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/600x400/FFECB3/028bcc?text=Sweets" },
  { sNo: 45, itemName: "D PEDA 1000 G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/600x400/FFECB3/028bcc?text=Sweets" },
  { sNo: 46, itemName: "D PEDA 200G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/600x400/FFECB3/028bcc?text=Sweets" },
  { sNo: 47, itemName: "D PEDA 20G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/600x400/FFECB3/028bcc?text=Sweets" },
  { sNo: 48, itemName: "BASUNDI 40 GMS", skuGroup: "By Products", itemGroup: "BASUNDI", image: "https://placehold.co/600x400/FFD180/028bcc?text=Basundi" },
  { sNo: 49, itemName: "COW GHEE 12ML SACHET", skuGroup: "By Products", itemGroup: "Cow Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 50, itemName: "CREAM RAW BULK (C)", skuGroup: "By Products", itemGroup: "Cream", image: "https://placehold.co/600x400/F9FBE7/028bcc?text=Cream" },
  { sNo: 51, itemName: "LASSI 160", skuGroup: "By Products", itemGroup: "Lassi", image: "https://placehold.co/600x400/F8BBD0/028bcc?text=Lassi" },
  { sNo: 52, itemName: "LASSI CUP180 ML", skuGroup: "By Products", itemGroup: "Lassi", image: "https://placehold.co/600x400/F8BBD0/028bcc?text=Lassi" },
  { sNo: 53, itemName: "M CAKE 200G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/600x400/FFECB3/028bcc?text=Sweets" },
  { sNo: 54, itemName: "MALAI LADDU 150G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/600x400/FFECB3/028bcc?text=Sweets" },
  { sNo: 55, itemName: "MANGO LASSI CUP180", skuGroup: "By Products", itemGroup: "Lassi", image: "https://placehold.co/600x400/F8BBD0/028bcc?text=Lassi" },
  { sNo: 56, itemName: "ORANGE LASSI CUP 180", skuGroup: "By Products", itemGroup: "Lassi", image: "https://placehold.co/600x400/F8BBD0/028bcc?text=Lassi" },
  { sNo: 57, itemName: "BUFF GHEE 200 ML N", skuGroup: "By Products", itemGroup: "Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 58, itemName: "BUFF GHEE 500 ML N", skuGroup: "By Products", itemGroup: "Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 59, itemName: "COW GHEE 100 ML N", skuGroup: "By Products", itemGroup: "Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 60, itemName: "COW GHEE 200 ML N", skuGroup: "By Products", itemGroup: "Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 61, itemName: "COW GHEE 500 ML N", skuGroup: "By Products", itemGroup: "Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 62, itemName: "GHEE 1000ML N JAR", skuGroup: "By Products", itemGroup: "Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 63, itemName: "D PEDA 100 G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/600x400/FFECB3/028bcc?text=Sweets" },
  { sNo: 64, itemName: "KOVA 250 G", skuGroup: "By Products", itemGroup: "Paneer", image: "https://placehold.co/600x400/FFFFFF/028bcc?text=Paneer" },
  { sNo: 65, itemName: "MYSORE PAK 200 G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/600x400/FFECB3/028bcc?text=Sweets" },
  { sNo: 66, itemName: "PISTA DRINK 160", skuGroup: "By Products", itemGroup: "Flav Milk", image: "https://placehold.co/600x400/FFE0B2/028bcc?text=Flavored+Milk" },
  { sNo: 67, itemName: "SPL GHEE 1000ML", skuGroup: "By Products", itemGroup: "Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 68, itemName: "SPL GHEE 500ML", skuGroup: "By Products", itemGroup: "Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 69, itemName: "B GHEE POUCH 200ML", skuGroup: "By Products", itemGroup: "Buffalo Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 70, itemName: "B GHEE POUCH 100ML", skuGroup: "By Products", itemGroup: "Buffalo Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 71, itemName: "KOVA 1 KG", skuGroup: "By Products", itemGroup: "Paneer", image: "https://placehold.co/600x400/FFFFFF/028bcc?text=Paneer" },
  { sNo: 72, itemName: "KOVA 100G", skuGroup: "By Products", itemGroup: "Paneer", image: "https://placehold.co/600x400/FFFFFF/028bcc?text=Paneer" },
  { sNo: 73, itemName: "KOVA 200G", skuGroup: "By Products", itemGroup: "Paneer", image: "https://placehold.co/600x400/FFFFFF/028bcc?text=Paneer" },
  { sNo: 74, itemName: "MALAI LADDU 200G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/600x400/FFECB3/028bcc?text=Sweets" },
  { sNo: 75, itemName: "S KHAND 200G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/600x400/FFECB3/028bcc?text=Sweets" },
  { sNo: 76, itemName: "S KHAND 400G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/600x400/FFECB3/028bcc?text=Sweets" },
  { sNo: 77, itemName: "S KHAND 800G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/600x400/FFECB3/028bcc?text=Sweets" }
];

// Helper function to group products by 'itemGroup'
const groupProducts = (products) => {
  return products.reduce((acc, product) => {
    const group = product.itemGroup || 'Other';
    if (!acc[group]) {
      acc[group] = {
        image: product.image || 'https://placehold.co/600x400/CCCCCC/white?text=Product', // Default image
        items: []
      };
    }
    acc[group].items.push(product);
    return acc;
  }, {});
};


function ProductsAndhra() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState({});
  const router = useRouter();
  const brandBlue = '#028bcc';

  const handleQuantityChange = (sNo, quantity) => {
    const numQuantity = parseInt(quantity, 10);
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (!isNaN(numQuantity) && numQuantity > 0) {
        newCart[sNo] = numQuantity;
      } else {
        delete newCart[sNo];
      }
      return newCart;
    });
  };

  const handleSubmitIndent = () => {
    localStorage.setItem('indentCart', JSON.stringify(cart));
    localStorage.setItem('productList', JSON.stringify(products_ap));
    router.push('/Indent');
  };

  const filteredProducts = products_ap.filter(product =>
    product.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.itemGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group the filtered products
  const groupedProducts = groupProducts(filteredProducts);
  const totalItems = Object.keys(cart).length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-20 pb-32">
        <div className="p-6">
          <h1 className={`text-2xl font-bold text-[${brandBlue}] mb-4`}>
            Products (Andhra Pradesh)
          </h1>

          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[${brandBlue}]"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {/* Product List with Categories */}
          <div className="space-y-6">
            {Object.keys(groupedProducts).length > 0 ? (
              Object.keys(groupedProducts).map(groupName => (
                <div key={groupName} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  {/* Category Header with Image */}
                  <div className="relative h-32 w-full">
                    <Image
                      src={groupedProducts[groupName].image}
                      alt={groupName}
                      layout="fill"
                      objectFit="cover"
                      unoptimized={true} // Use this for placehold.co images
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <h2 className="text-3xl font-bold text-white uppercase tracking-wider">{groupName}</h2>
                    </div>
                  </div>
                  
                  {/* Items in this category */}
                  <div className="divide-y divide-gray-100">
                    {groupedProducts[groupName].items.map(product => (
                      <div key={product.sNo} className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-semibold text-gray-800">{product.itemName}</h3>
                          <p className="text-sm text-gray-500">{product.skuGroup}</p>
                        </div>
                        <div>
                          <input
                            type="number"
                            min="0"
                            aria-label={`Quantity for ${product.itemName}`}
                            value={cart[product.sNo] || ''}
                            onChange={(e) => handleQuantityChange(product.sNo, e.target.value)}
                            className="w-20 rounded-lg border border-gray-300 text-center py-2 focus:outline-none focus:ring-2 focus:ring-[${brandBlue}]"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No products found matching your search.</p>
            )}
          </div>
        </div>
      </main>

      {/* Floating "Review Indent" Button */}
      {totalItems > 0 && (
        <div className="fixed bottom-16 left-0 right-0 w-full p-4 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
          <button
            onClick={handleSubmitIndent}
            className={`w-full py-3 px-4 rounded-xl text-white font-semibold bg-[${brandBlue}] hover:bg-blue-700 transition-colors`}
          >
            Review Indent ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProductsAndhra;