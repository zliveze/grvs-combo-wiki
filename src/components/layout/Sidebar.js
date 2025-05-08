import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Sidebar = ({ sections = [], title = "Mục lục" }) => {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState({});

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="w-full h-full flex flex-col">
      <a 
        onClick={scrollToTop}
        className="flex items-center mb-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        Quay lại đầu trang
      </a>
      
      <div className="font-medium text-gray-800 dark:text-white mb-2 border-b border-gray-200 dark:border-gray-700 pb-2">
        {title}
      </div>
      
      <nav className="text-sm flex-1 overflow-y-auto pr-1">
        <ul className="space-y-1">
          {sections.map((section, index) => (
            <li key={section.id} className="mb-1">
              <div className="flex items-start">
                <a 
                  onClick={() => scrollToSection(section.id)}
                  className="flex-grow py-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-gray-800 dark:text-gray-200"
                >
                  <div className="flex items-start">
                    <span className="mr-1 text-gray-500 dark:text-gray-400 w-5 text-right">{index + 1}</span>
                    <span className="font-medium">{section.title}</span>
                  </div>
                </a>
                
                {section.subsections && section.subsections.length > 0 && (
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="p-1 text-gray-400"
                    aria-expanded={!!expandedSections[section.id]}
                    aria-controls={`${section.id}-sublist`}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-4 w-4 transform transition-transform ${expandedSections[section.id] ? 'rotate-180' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
              
              {section.subsections && section.subsections.length > 0 && expandedSections[section.id] && (
                <ul className="pl-6 mt-1 space-y-1" id={`${section.id}-sublist`}>
                  {section.subsections.map((subsection, subIndex) => (
                    <li key={subsection.id}>
                      <a 
                        onClick={() => scrollToSection(subsection.id)}
                        className="flex py-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-gray-700 dark:text-gray-300"
                      >
                        <span className="mr-1 text-gray-500 dark:text-gray-400 w-5 text-right">{index + 1}.{subIndex + 1}</span>
                        <span>{subsection.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 