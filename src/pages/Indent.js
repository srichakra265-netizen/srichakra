import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

function Indent() {
  const brandBlue = "#028bcc";

  const [status, setStatus] = useState("Pending");
  const [totalQty, setTotalQty] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("indentCart")) || {};
    const products = JSON.parse(localStorage.getItem("productList")) || [];

    const items = products
      .filter((p) => cart[p.sNo])
      .map((p) => ({
        ...p,
        quantity: cart[p.sNo],
      }));

    setTotalQty(items.reduce((sum, item) => sum + Number(item.quantity), 0));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 pt-20 pb-32 px-4">
        <div className="flex items-center mb-6">
          <Link href="/Products">
            <ChevronLeft
              height={32}
              className="scale-125"
              color={brandBlue}
            />
          </Link>
          <h1
            className="text-2xl font-bold ml-2"
            style={{ color: brandBlue }}
          >
            Review Indent
          </h1>
        </div>


        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">

          <div className="mb-4">
            <label className="text-gray-600 font-medium">Date</label>
            <input
              type="date"
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2"
              style={{ borderColor: brandBlue }}
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-600 font-medium">Total Quantity</label>
            <input
              type="text"
              className="w-full mt-1 p-3 border rounded-lg bg-gray-100"
              value={totalQty}
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-600 font-medium">Status</label>
            <select
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2"
              style={{ borderColor: brandBlue }}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Pending</option>
              <option>Approved</option>
              <option>Delivered</option>
            </select>
          </div>

          <button
            className="w-full mt-3 py-3 rounded-xl font-semibold text-white shadow-md"
            style={{ backgroundColor: brandBlue }}
          >
            View Indent Details
          </button>
        </div>


      </main>

      <Footer />
    </div>
  );
}

export default Indent;
