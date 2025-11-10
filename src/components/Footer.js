import Link from 'next/link';
import { useRouter } from 'next/router';
// --- 1. Updated the icon imports ---
import { ShoppingBag, ClipboardList, History } from 'lucide-react';

function Footer() {
  const router = useRouter();
  const currentPath = router.pathname;

  const getLinkClass = (path) => {
    // Check if the current path matches
    return currentPath === path
      ? 'text-[#028bcc]' // <-- USE HEX CODE for active link
      : 'text-gray-500';  // Default inactive color
  };

  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 shadow-[0_-2px_6px_rgba(0,0,0,0.06)]">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
        
        {/* --- 2. Changed to Products --- */}
        <Link 
          href="/Products" 
          className={`
            inline-flex flex-col items-center justify-center px-5 
            transition-colors duration-200 ease-in-out 
            ${getLinkClass('/Products')}
            hover:text-[#028bcc]`
          }
        >
          <ShoppingBag className="w-6 h-6 mb-1" />
          <span className="text-sm">Products</span>
        </Link>
        
        {/* --- 3. Kept Indent (was Routes) --- */}
        <Link 
          href="/Indent" 
          className={`
            inline-flex flex-col items-center justify-center px-5 
            transition-colors duration-200 ease-in-out 
            ${getLinkClass('/Indent')}
            hover:text-[#028bcc]`
          }
        >
          <ClipboardList className="w-6 h-6 mb-1" />
          <span className="text-sm">Indent</span>
        </Link>
        
        {/* --- 4. Changed to Order History --- */}
        <Link 
          href="/History" // Using /History as the path
          className={`
            inline-flex flex-col items-center justify-center px-5 
            transition-colors duration-200 ease-in-out 
            ${getLinkClass('/History')}
            hover:text-[#028bcc]`
          }
        >
          <History className="w-6 h-6 mb-1" />
          <span className="text-sm">Order History</span>
        </Link>

      </div>
    </footer>
  );
}

export default Footer;