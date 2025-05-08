import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-6 mt-auto h-auto min-h-[80px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <span className="font-bold text-xl text-blue-600 dark:text-blue-400">GBVS</span>
              <span className="font-bold text-xl text-gray-800 dark:text-white ml-1">Combo Wiki</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center md:text-left">
              Wiki hướng dẫn combo dành cho người mới chơi Granblue Fantasy Versus
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2 text-center md:text-left">Liên kết</h3>
              <ul className="space-y-1 text-center md:text-left">
                <li>
                  <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link href="/guide" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                    Hướng dẫn
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                    Giới thiệu
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2 text-center md:text-left">Tài nguyên</h3>
              <ul className="space-y-1 text-center md:text-left">
                <li>
                  <a 
                    href="https://www.dustloop.com/w/GBVSR"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                  >
                    Dustloop Wiki
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.youtube.com/c/GranblueFantasyVersus"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                  >
                    GBVS Official
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} GBVS Combo Wiki. Tất cả hình ảnh và nhân vật thuộc về Cygames.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;