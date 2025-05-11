import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

const Sidebar = ({ sections = [], title = "Mục lục" }) => {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState({});
  const [activeSectionId, setActiveSectionId] = useState(null);

  const handleScroll = useCallback(() => {
    let currentSectionId = null;
    let minDistance = Infinity;

    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Ưu tiên section nào có phần đầu gần với đỉnh viewport nhất (trong khoảng nhìn thấy)
        // Hoặc section nào chiếm phần lớn viewport
        const distanceToTop = Math.abs(rect.top);
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible) {
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) { // Phần trên của viewport
            if (distanceToTop < minDistance) {
              minDistance = distanceToTop;
              currentSectionId = section.id;
            }
          } else if (!currentSectionId && rect.top < window.innerHeight) { // Nếu chưa có section nào được chọn và section này đang hiển thị
             currentSectionId = section.id; // Chọn section này làm mặc định nếu nó ở nửa dưới
          }
        }
      }
      // Xử lý subsections
      if (section.subsections) {
        section.subsections.forEach(subsection => {
          const subElement = document.getElementById(subsection.id);
          if (subElement) {
            const subRect = subElement.getBoundingClientRect();
            const subDistanceToTop = Math.abs(subRect.top);
            const isSubVisible = subRect.top < window.innerHeight && subRect.bottom >= 0;

            if (isSubVisible) {
              if (subRect.top >=0 && subRect.top < window.innerHeight / 2) {
                if (subDistanceToTop < minDistance) {
                  minDistance = subDistanceToTop;
                  currentSectionId = subsection.id;
                }
              } else if (!currentSectionId && subRect.top < window.innerHeight) {
                 currentSectionId = subsection.id;
              }
            }
          }
        });
      }
    });
    
    // Nếu không có section nào được xác định là active (ví dụ khi cuộn xuống cuối trang, không section nào ở top)
    // thì giữ nguyên activeSectionId trước đó hoặc chọn section đầu tiên nếu chưa có gì active.
    if (currentSectionId) {
        setActiveSectionId(currentSectionId);
    } else if (!activeSectionId && sections.length > 0) {
        // Nếu scroll lên đầu trang, active section đầu tiên
        const firstSectionElement = document.getElementById(sections[0].id);
        if (firstSectionElement && firstSectionElement.getBoundingClientRect().top >=0 && firstSectionElement.getBoundingClientRect().top < window.innerHeight) {
            setActiveSectionId(sections[0].id);
        }
    }

  }, [sections, activeSectionId]); // Thêm activeSectionId vào dependency để có thể giữ lại active section

  useEffect(() => {
    // Set active section ban đầu khi component mount
    if (sections.length > 0) {
        // Ưu tiên hash từ URL nếu có
        const hash = window.location.hash.substring(1);
        if (sections.find(s => s.id === hash) || (sections.some(s => s.subsections && s.subsections.find(sub => sub.id === hash)))) {
            setActiveSectionId(hash);
        } else if (sections[0]?.id) {
             // Nếu không có hash, hoặc hash không hợp lệ, active section đầu tiên
            const firstElement = document.getElementById(sections[0].id);
            if (firstElement && firstElement.getBoundingClientRect().top >=0 && firstElement.getBoundingClientRect().top < window.innerHeight) {
                 setActiveSectionId(sections[0].id);
            } else {
                // Nếu section đầu tiên không visible, thử tìm section visible đầu tiên
                handleScroll();
            }
        }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections, handleScroll]);


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
                  onClick={() => {
                    scrollToSection(section.id);
                    // setActiveSectionId(section.id); // Cập nhật ngay khi click để có phản hồi nhanh
                  }}
                  className={`flex-grow py-1 cursor-pointer transition-colors text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 ${activeSectionId === section.id ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
                >
                  <div className="flex items-start">
                    <span className={`mr-1 w-5 text-right ${activeSectionId === section.id ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>{index + 1}</span>
                    <span className={`${activeSectionId === section.id ? 'font-semibold' : 'font-medium'}`}>{section.title}</span>
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
                        onClick={() => {
                          scrollToSection(subsection.id);
                          // setActiveSectionId(subsection.id); // Cập nhật ngay khi click
                        }}
                        className={`flex py-1 cursor-pointer transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${activeSectionId === subsection.id ? 'text-blue-600 dark:text-blue-400 font-medium' : ''}`}
                      >
                        <span className={`mr-1 w-5 text-right ${activeSectionId === subsection.id ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>{index + 1}.{subIndex + 1}</span>
                        <span className={`${activeSectionId === subsection.id ? 'font-medium' : ''}`}>{subsection.title}</span>
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
