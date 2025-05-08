import React, { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';

const DefaultLayout = ({ children, showSidebar = false, sidebar = null }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Đóng sidebar khi màn hình quá nhỏ
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <Header />
      
      <main className="flex-grow w-full flex px-24 py-6 ">
        {/* Container chung cho cả nội dung và sidebar */}
        <div className="w-full flex flex-col md:flex-row">
          {/* Nội dung chính */}
          <div className="w-full">
            {children}
          </div>
          
          {/* Sidebar */}
          {showSidebar && (
            <div className="md:w-[320px] flex-shrink-0">
              <div className="md:sticky md:top-20 w-full px-4 py-6 md:py-0">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md">
                  <div className="flex items-center justify-between p-3 font-medium cursor-pointer rounded-t-lg bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  >
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      <span>Mục lục</span>
                    </div>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 transform transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {isSidebarOpen && (
                    <div className="p-4 max-h-[70vh] overflow-y-auto">
                      {sidebar}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Toggle button chỉ hiện trên mobile */}
              <button
                className="md:hidden fixed bottom-4 right-4 z-10 bg-blue-600 text-white p-3 rounded-full shadow-lg"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label="Toggle Sidebar"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  {isSidebarOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DefaultLayout;