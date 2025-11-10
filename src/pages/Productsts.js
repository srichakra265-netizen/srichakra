'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { Search, Plus, Minus, ShoppingCart, Package } from 'lucide-react';
import Image from 'next/image';

// ALL 70 PRODUCTS — FULL LIST
const products_tg = [
  { sNo: 1, itemName: "STD 1000", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 2, itemName: "STD 130", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 3, itemName: "BUFF TM 500ML(MT)", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 4, itemName: "BUFF FCM 500ML (MT)", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 5, itemName: "COW BULK 20 LTR", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 6, itemName: "COW BULK 40 LTR", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 7, itemName: "BUFFALO FCM 500ML", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 8, itemName: "HFCM 475", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 9, itemName: "HFCM 500", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 10, itemName: "PFCM 1000", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 11, itemName: "DTM 475", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 12, itemName: "HFCM 950", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 13, itemName: "HFCM BULK 20 LTR", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 14, itemName: "BUFFALO TM 500ML", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 15, itemName: "STD 425 ML", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 16, itemName: "STD 475", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 17, itemName: "STD 500", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 18, itemName: "STD 950", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 19, itemName: "STD BULK 20 LTR", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 20, itemName: "STD BULK 40 LTR", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 21, itemName: "TM 1000", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 22, itemName: "TM 475", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 23, itemName: "TM 500", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 24, itemName: "TM 950", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 25, itemName: "TM BULK 20 LTR", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 26, itemName: "TM BULK 40 LTR", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 27, itemName: "STD 1000 ML(MT)", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 28, itemName: "STD 500 ML(MT)", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 29, itemName: "TM 500 ML(MT)", skuGroup: "Milk", itemGroup: "Milk", image: "https://placehold.co/100x100/E0F7FA/028bcc?text=Milk" },
  { sNo: 30, itemName: "CURD 1 KG", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/100x100/C5E1A5/028bcc?text=Curd" },
  { sNo: 31, itemName: "CURD 10 KG BKT", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/100x100/C5E1A5/028bcc?text=Curd" },
  { sNo: 32, itemName: "CURD 130 G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/100x100/C5E1A5/028bcc?text=Curd" },
  { sNo: 33, itemName: "CURD 175 G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/100x100/C5E1A5/028bcc?text=Curd" },
  { sNo: 34, itemName: "CURD 425 G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/100x100/C5E1A5/028bcc?text=Curd" },
  { sNo: 35, itemName: "CURD 90 G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/100x100/C5E1A5/028bcc?text=Curd" },
  { sNo: 36, itemName: "DTM CURD 1 KG", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/100x100/C5E1A5/028bcc?text=Curd" },
  { sNo: 37, itemName: "DTM CURD 10 KG BKT", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/100x100/C5E1A5/028bcc?text=Curd" },
  { sNo: 38, itemName: "DTM CURD 130 G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/100x100/C5E1A5/028bcc?text=Curd" },
  { sNo: 39, itemName: "DTM CURD 425 G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/100x100/C5E1A5/028bcc?text=Curd" },
  { sNo: 40, itemName: "TM CURD 1 KG BUCKET", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/100x100/C5E1A5/028bcc?text=Curd" },
  { sNo: 41, itemName: "TM CURD CAN 20 KG", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/100x100/C5E1A5/028bcc?text=Curd" },
  { sNo: 42, itemName: "DTM CURD 5 KG BKT", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/100x100/C5E1A5/028bcc?text=Curd" },
  { sNo: 43, itemName: "STD CURD 1 KG BKT", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/100x100/C5E1A5/028bcc?text=Curd" },
  { sNo: 44, itemName: "SLIM CURD BKT10 KG", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/100x100/C5E1A5/028bcc?text=Curd" },
  { sNo: 45, itemName: "STD CURD 10 KG BKT", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/100x100/C5E1A5/028bcc?text=Curd" },
  { sNo: 46, itemName: "DTM CURD 900 G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/100x100/C5E1A5/028bcc?text=Curd" },
  { sNo: 47, itemName: "FRESH CURD 1 KG", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/100x100/C5E1A5/028bcc?text=Curd" },
  { sNo: 48, itemName: "DTMCURD10KG BKT G", skuGroup: "Curd", itemGroup: "Curd", image: "https://placehold.co/100x100/C5E1A5/028bcc?text=Curd" },
  { sNo: 49, itemName: "B GHEE POUCH 1000ML", skuGroup: "By Products", itemGroup: "Buffalo Ghee", image: "https://placehold.co/100x100/FFF9C4/028bcc?text=Ghee" },
  { sNo: 50, itemName: "B GHEE POUCH 500ML", skuGroup: "By Products", itemGroup: "Buffalo Ghee", image: "https://placehold.co/100x100/FFF9C4/028bcc?text=Ghee" },
  { sNo: 51, itemName: "C GHEE POUCH 1000ML", skuGroup: "By Products", itemGroup: "Cow Ghee", image: "https://placehold.co/100x100/FFF9C4/028bcc?text=Ghee" },
  { sNo: 52, itemName: "C GHEE POUCH 500ML", skuGroup: "By Products", itemGroup: "Cow Ghee", image: "https://placehold.co/100x100/FFF9C4/028bcc?text=Ghee" },
  { sNo: 53, itemName: "C GHEE POUCH 200ML", skuGroup: "By Products", itemGroup: "Cow Ghee", image: "https://placehold.co/100x100/FFF9C4/028bcc?text=Ghee" },
  { sNo: 54, itemName: "BUTTER 100G", skuGroup: "By Products", itemGroup: "Butter", image: "https://placehold.co/100x100/FFF59D/028bcc?text=Butter" },
  { sNo: 55, itemName: "BUTTER 500G", skuGroup: "By Products", itemGroup: "Butter", image: "https://placehold.co/100x100/FFF59D/028bcc?text=Butter" },
  { sNo: 56, itemName: "LASSI 160", skuGroup: "By Products", itemGroup: "Lassi", image: "https://placehold.co/100x100/F8BBD0/028bcc?text=Lassi" },
  { sNo: 57, itemName: "BADAM DRINK 160", skuGroup: "By Products", itemGroup: "Flav Milk", image: "https://placehold.co/100x100/FFE0B2/028bcc?text=Flav+Milk" },
  { sNo: 58, itemName: "BUTTER MILK 160", skuGroup: "By Products", itemGroup: "Butter Milk", image: "https://placehold.co/100x100/F1F8E9/028bcc?text=Butter+Milk" },
  { sNo: 59, itemName: "PANEER 1 KG", skuGroup: "By Products", itemGroup: "Paneer", image: "https://placehold.co/100x100/FFFFFF/028bcc?text=Paneer" },
  { sNo: 60, itemName: "PANEER 200 G", skuGroup: "By Products", itemGroup: "Paneer", image: "https://placehold.co/100x100/FFFFFF/028bcc?text=Paneer" },
  { sNo: 61, itemName: "PANEER 500 G", skuGroup: "By Products", itemGroup: "Paneer", image: "https://placehold.co/100x100/FFFFFF/028bcc?text=Paneer" },
  { sNo: 62, itemName: "STERLIZED FL MILK", skuGroup: "By Products", itemGroup: "Flav Milk", image: "https://placehold.co/100x100/FFE0B2/028bcc?text=Flav+Milk" },
  { sNo: 63, itemName: "D PEDA 1 KG", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/100x100/FFECB3/028bcc?text=Sweets" },
  { sNo: 64, itemName: "D PEDA 200 G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/100x100/FFECB3/028bcc?text=Sweets" },
  { sNo: 65, itemName: "D PEDA 500 G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/100x100/FFECB3/028bcc?text=Sweets" },
  { sNo: 66, itemName: "KALAKHAND 1000 G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/100x100/FFECB3/028bcc?text=Sweets" },
  { sNo: 67, itemName: "KALAKHAND 200 G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/100x100/FFECB3/028bcc?text=Sweets" },
  { sNo: 68, itemName: "KOVA 250 G", skuGroup: "By Products", itemGroup: "Paneer", image: "https://placehold.co/100x100/FFFFFF/028bcc?text=Paneer" },
  { sNo: 69, itemName: "B GHEE POUCH 200ML", skuGroup: "By Products", itemGroup: "Buffalo Ghee", image: "https://placehold.co/100x100/FFF9C4/028bcc?text=Ghee" },
  { sNo: 70, itemName: "MALAI LADDU 200 G", skuGroup: "By Products", itemGroup: "Sweets", image: "https://placehold.co/100x100/FFECB3/028bcc?text=Sweets" }
];

/* ────────────────────────────── Helpers ────────────────────────────── */
const groupProducts = (products) => {
  return products.reduce((acc, product) => {
    const group = product.itemGroup || 'Other';
    if (!acc[group]) acc[group] = [];
    acc[group].push(product);
    return acc;
  }, {});
};

/* ────────────────────────────── Components ────────────────────────────── */
const CategoryChips = ({ categories, selected, onSelect }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
            selected === cat
              ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-cyan-400'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

const QuantityControl = ({ qty, onChange, onInc, onDec }) => {
  if (qty === 0) {
    return (
      <button
        onClick={onInc}
        className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md flex items-center justify-center"
      >
        <Plus size={18} />
      </button>
    );
  }

  return (
    <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
      <button
        onClick={onDec}
        className="w-9 h-9 flex items-center justify-center text-cyan-600 hover:bg-gray-200 transition"
      >
        <Minus size={16} />
      </button>
      <input
        type="text"
        value={qty}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 text-center font-semibold text-gray-800 bg-transparent outline-none"
        onFocus={(e) => e.target.select()}
      />
      <button
        onClick={onInc}
        className="w-9 h-9 flex items-center justify-center text-cyan-600 hover:bg-gray-200 transition"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

const ProductCard = ({ product, qty, onInc, onDec, onChange }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-200 flex-shrink-0">
        <Image
          src={product.image}
          alt={product.itemName}
          width={64}
          height={64}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{product.itemName}</h3>
        <p className="text-xs text-cyan-600 font-medium">{product.skuGroup}</p>
      </div>
      <QuantityControl qty={qty} onInc={onInc} onDec={onDec} onChange={onChange} />
    </div>
  );
};

/* ────────────────────────────── Main Page ────────────────────────────── */
export default function ProductsTelangana() {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState({});
  const [selectedCat, setSelectedCat] = useState('All');
  const [headerHeight, setHeaderHeight] = useState(64);
  const router = useRouter();

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) setHeaderHeight(header.offsetHeight);
  }, []);

  const categories = useMemo(() => {
    const groups = groupProducts(products_tg);
    return ['All', ...Object.keys(groups)];
  }, []);

  const filteredGroups = useMemo(() => {
    const filtered = products_tg.filter(p => {
      const matchesSearch = p.itemName.toLowerCase().includes(search.toLowerCase()) ||
                            p.skuGroup.toLowerCase().includes(search.toLowerCase());
      const matchesCat = selectedCat === 'All' || p.itemGroup === selectedCat;
      return matchesSearch && matchesCat;
    });
    return groupProducts(filtered);
  }, [search, selectedCat]);

  const updateQty = (sNo, value) => {
    const num = parseInt(value) || 0;
    setCart(prev => {
      const copy = { ...prev };
      if (num > 0) copy[sNo] = num;
      else delete copy[sNo];
      return copy;
    });
  };

  const totalItems = Object.keys(cart).length;
  const totalUnits = Object.values(cart).reduce((a, b) => a + b, 0);

  const handleReview = () => {
    localStorage.setItem('indentCart', JSON.stringify(cart));
    localStorage.setItem('productList', JSON.stringify(products_tg));
    router.push('/Indent');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />

        {/* Sticky Search + Filters */}
        <div
          className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100"
          style={{ top: `${headerHeight}px` }}
        >
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Products (Telangana)
              </h1>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name or category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
                />
              </div>
            </div>
            <CategoryChips
              categories={categories}
              selected={selectedCat}
              onSelect={setSelectedCat}
            />
          </div>
        </div>

        {/* Product List — FIXED: Perfect spacing, no huge gap */}
        <main 
          className="px-4 pb-28 transition-all duration-200" 
          style={{ 
            paddingTop: `${headerHeight + 20}px`  // ← PERFECT GAP (was 140px → now 20px)
          }}
        >
          {Object.keys(filteredGroups).length > 0 ? (
            Object.entries(filteredGroups).map(([group, items]) => (
              <section key={group} className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Package size={18} className="text-cyan-600" />
                  {group} ({items.length})
                </h2>
                <div className="space-y-3">
                  {items.map((p) => (
                    <ProductCard
                      key={p.sNo}
                      product={p}
                      qty={cart[p.sNo] || 0}
                      onInc={() => updateQty(p.sNo, (cart[p.sNo] || 0) + 1)}
                      onDec={() => updateQty(p.sNo, Math.max(0, (cart[p.sNo] || 0) - 1))}
                      onChange={(v) => updateQty(p.sNo, v)}
                    />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="bg-gray-100 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Search size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </main>

        {/* Floating Cart Button */}
        {totalItems > 0 && (
          <div className="fixed bottom-20 left-4 right-4 z-50">
            <button
              onClick={handleReview}
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl flex items-center justify-between backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingCart size={24} />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-bold">{totalItems} Items</p>
                  <p className="text-sm opacity-90">{totalUnits} units</p>
                </div>
              </div>
              <span className="font-bold">Review Indent</span>
            </button>
          </div>
        )}

        <Footer />
      </div>

      {/* Hide Scrollbar */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}