import Link from 'next/link';
import { useRouter } from 'next/router';

import { ShoppingBag, ClipboardList, Home, User } from 'lucide-react';

function Footer() {
  const router = useRouter();
  const currentPath = router.pathname;

  const getLinkClass = (path) => {
    return currentPath === path
      ? "text-[#028bcc]"
      : "text-gray-500";
  };

  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 shadow-[0_-2px_6px_rgba(0,0,0,0.06)]">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">

        <Link 
          href="/Dashboard"
          className={`
            inline-flex flex-col items-center justify-center px-5
            transition-colors duration-200 ease-in-out
            ${getLinkClass('/Dashboard')}
            hover:text-[#028bcc]`
          }
        >
          <Home className="w-6 h-6 mb-1" />
          <span className="text-sm">Home</span>
        </Link>

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

        <Link 
          href="/Profile"
          className={`
            inline-flex flex-col items-center justify-center px-5
            transition-colors duration-200 ease-in-out
            ${getLinkClass('/Profile')}
            hover:text-[#028bcc]`
          }
        >
          <User className="w-6 h-6 mb-1" />
          <span className="text-sm">Profile</span>
        </Link>

      </div>
    </footer>
  );
}

export default Footer;

