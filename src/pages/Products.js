import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import { Search } from 'lucide-react';
import Image from 'next/image';

// Data from your "Item Name - HYD.csv" (70 items)
const products_tg = [
  { sNo: 1, itemName: "STD 1000", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 2, itemName: "STD 130", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 3, itemName: "BUFF TM 500ML(MT)", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 4, itemName: "BUFF FCM 500ML (MT)", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 5, itemName: "COW BULK 20 LTR", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 6, itemName: "COW BULK 40 LTR", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 7, itemName: "BUFFALO FCM 500ML", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 8, itemName: "HFCM 475", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 9, itemName: "HFCM 500", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 10, itemName: "PFCM 1000", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 11, itemName: "DTM 475", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 12, itemName: "HFCM 950", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 13, itemName: "HFCM BULK 20 LTR", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 14, itemName: "BUFFALO TM 500ML", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 15, itemName: "STD 425 ML", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 16, itemName: "STD 475", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 17, itemName: "STD 500", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 18, itemName: "STD 950", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 19, itemName: "STD BULK 20 LTR", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 20, itemName: "STD BULK 40 LTR", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 21, itemName: "TM 1000", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 22, itemName: "TM 475", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 23, itemName: "TM 500", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 24, itemName: "TM 950", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 25, itemName: "TM BULK 20 LTR", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 26, itemName: "TM BULK 40 LTR", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 27, itemName: "STD 1000 ML(MT)", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 28, itemName: "STD 500 ML(MT)", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 29, itemName: "TM 500 ML(MT)", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/600x400/028bcc/white?text=Milk" },
  { sNo: 30, itemName: "CURD 1 KG", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 31, itemName: "CURD 10 KG BKT", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 32, itemName: "CURD 130 G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 33, itemName: "CURD 175 G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 34, itemName: "CURD 425 G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 35, itemName: "CURD 90 G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 36, itemName: "DTM CURD 1 KG", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 37, itemName: "DTM CURD 10 KG BKT", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 38, itemName: "DTM CURD 130 G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 39, itemName: "DTM CURD 425 G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 40, itemName: "TM CURD 1 KG BUCKET", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 41, itemName: "TM CURD CAN 20 KG", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 42, itemName: "DTM CURD 5 KG BKT", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 43, itemName: "STD CURD 1 KG BKT", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 44, itemName: "SLIM CURD BKT10 KG", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 45, itemName: "STD CURD 10 KG BKT", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 46, itemName: "DTM CURD 900 G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 47, itemName: "FRESH CURD 1 KG", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 48, itemName: "DTMCURD10KG BKT G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/600x400/E0F7FA/028bcc?text=Curd" },
  { sNo: 49, itemName: "B GHEE POUCH 1000ML", skuGroup: "By Products", itemGroup: "Buffalo Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 50, itemName: "B GHEE POUCH 500ML", skuGroup: "By Products", itemGroup: "Buffalo Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 51, itemName: "C GHEE POUCH 1000ML", skuGroup: "By Products", itemGroup: "Cow Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 52, itemName: "C GHEE POUCH 500ML", skuGroup: "By Products", itemGroup: "Cow Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 53, itemName: "C GHEE POUCH 200ML", skuGroup: "By Products", itemGroup: "Cow Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 54, itemName: "BUTTER 100G", skuGroup: "By Products", itemGroup: "Butter", image: "https://placehold.co/600x400/FFF59D/028bcc?text=Butter" },
  { sNo: 55, itemName: "BUTTER 500G", skuGroup: "By Products", itemGroup: "Butter", image: "https://placehold.co/600x400/FFF59D/028bcc?text=Butter" },
  { sNo: 56, itemName: "LASSI 160", skuGroup: "By Products", itemGroup: "Lassi", image: "https://placehold.co/600x400/F8BBD0/028bcc?text=Lassi" },
  { sNo: 57, itemName: "BADAM DRINK 160", skuGroup: "By Products", itemGroup: "Flav Milk", image: "https://placehold.co/600x400/FFE0B2/028bcc?text=Flavored+Milk" },
  { sNo: 58, itemName: "BUTTER MILK 160", skuGroup: "By Products", itemGroup: "Butter Milk", image: "https://placehold.co/600x400/F1F8E9/028bcc?text=Butter+Milk" },
  { sNo: 59, itemName: "PANEER 1 KG", skuGroup: "By Products", itemGroup: "Paneer", image: "https://placehold.co/600x400/FFFFFF/028bcc?text=Paneer" },
  { sNo: 60, itemName: "PANEER 200 G", skuGroup: "By Products", itemGroup: "Paneer", image: "https://placehold.co/600x400/FFFFFF/028bcc?text=Paneer" },
  { sNo: 61, itemName: "PANEER 500 G", skuGroup: "By Products", itemGroup: "Paneer", image: "https://placehold.co/600x400/FFFFFF/028bcc?text=Paneer" },
  { sNo: 62, itemName: "STERLIZED FL MILK", skuGroup: "By Products", itemGroup: "Flav Milk", image: "https://placehold.co/600x400/FFE0B2/028bcc?text=Flavored+Milk" },
  { sNo: 63, itemName: "D PEDA 1 KG", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/600x400/FFECB3/028bcc?text=Sweets" },
  { sNo: 64, itemName: "D PEDA 200 G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/600x400/FFECB3/028bcc?text=Sweets" },
  { sNo: 65, itemName: "D PEDA 500 G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/600x400/FFECB3/028bcc?text=Sweets" },
  { sNo: 66, itemName: "KALAKHAND 1000 G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/600x400/FFECB3/028bcc?text=Sweets" },
  { sNo: 67, itemName: "KALAKHAND 200 G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/600x400/FFECB3/028bcc?text=Sweets" },
  { sNo: 68, itemName: "KOVA 250 G", skuGroup: "By Products", itemGroup: "Paneer", image: "https://placehold.co/600x400/FFFFFF/028bcc?text=Paneer" },
  { sNo: 69, itemName: "B GHEE POUCH 200ML", skuGroup: "By Products", itemGroup: "Buffalo Ghee", image: "https://placehold.co/600x400/FFF9C4/028bcc?text=Ghee" },
  { sNo: 70, itemName: "MALAI LADDU 200 G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/600x400/FFECB3/028bcc?text=Sweets" }
];

// Helper function to group products
const groupProducts = (products) => {
  return products.reduce((acc, product) => {
    const group = product.itemGroup || 'Other';
    if (!acc[group]) {
      acc[group] = {
        image: product.image || 'https://placehold.co/600x400/CCCCCC/white?text=Product',
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
    localStorage.setItem('productList', JSON.stringify(products_tg));
    // --- THIS IS THE FIX ---
    router.push('/Indent');
    // -----------------------
  };

  const filteredProducts = products_tg.filter(product =>
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
          <h1 className={`text-2xl font-bold text-[${brandBlue}] mb-4`}>
            Products (Telangana)
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
                      unoptimized={true}
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

export default ProductsTelangana;