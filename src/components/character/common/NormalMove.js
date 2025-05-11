import React, { useState } from 'react';

const NormalMove = ({ normalMovesData, inputGuide }) => {
  const [isOpen, setIsOpen] = useState(true);
  // State để quản lý tab active cho từng move card, key là move.id, value là label của tab
  const [activeImageTabs, setActiveImageTabs] = useState({});

  if (!normalMovesData || normalMovesData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mt-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Normal Moves</h3>
        <p className="text-gray-700 dark:text-gray-300">Thông tin về Normal Moves đang được cập nhật.</p>
      </div>
    );
  }

  const translateInput = (input) => {
    if (!inputGuide || !inputGuide.keyboard || !inputGuide.controller) return input;
    const keyboardMapping = inputGuide.keyboard[input];
    const controllerMapping = inputGuide.controller[input];
    let displayInput = input;
    if (keyboardMapping && controllerMapping) {
      displayInput = `${input} (KB: ${keyboardMapping} / CT: ${controllerMapping})`;
    } else if (keyboardMapping) {
      displayInput = `${input} (KB: ${keyboardMapping})`;
    } else if (controllerMapping) {
      displayInput = `${input} (CT: ${controllerMapping})`;
    }
    return displayInput;
  };

  // Khởi tạo tab active mặc định cho mỗi move card là tab đầu tiên trong imageTabs
  // Thực hiện một lần khi component mount hoặc normalMovesData thay đổi
  React.useEffect(() => {
    const initialTabs = {};
    normalMovesData.forEach(move => {
      if (move.imageTabs && move.imageTabs.length > 0) {
        initialTabs[move.id || move.name] = move.imageTabs[0].label;
      }
    });
    setActiveImageTabs(initialTabs);
  }, [normalMovesData]);

  const handleTabClick = (moveId, tabLabel) => {
    setActiveImageTabs(prev => ({ ...prev, [moveId]: tabLabel }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 md:p-6 text-left text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
      >
        <h3 className="text-2xl font-bold">Normal Moves</h3>
        <svg
          className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="p-4 md:p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            {normalMovesData.map((move) => {
              const moveKey = move.id || move.name;
              const currentActiveTabLabel = activeImageTabs[moveKey] || (move.imageTabs && move.imageTabs.length > 0 ? move.imageTabs[0].label : null);
              const activeTabData = move.imageTabs && currentActiveTabLabel 
                ? move.imageTabs.find(tab => tab.label === currentActiveTabLabel) 
                : null;

              return (
                <div key={moveKey} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    {/* Image Column with Tabs */}
                    {move.imageTabs && move.imageTabs.length > 0 && (
                      <div className="sm:w-1/3 md:w-1/4 flex flex-col items-center sm:items-start flex-shrink-0">
                        <div className="flex border-b border-gray-300 dark:border-gray-600 mb-2">
                          {move.imageTabs.map((tab) => (
                            <button
                              key={tab.label}
                              onClick={() => handleTabClick(moveKey, tab.label)}
                              className={`px-3 py-1 text-sm font-medium focus:outline-none
                                ${currentActiveTabLabel === tab.label 
                                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                            >
                              {tab.label} ({tab.urls.length})
                            </button>
                          ))}
                        </div>
                        {activeTabData && activeTabData.urls.length > 0 ? (
                          activeTabData.urls.map((url, index) => (
                            <img 
                              key={index}
                              src={url} 
                              alt={`${move.name || 'Move'} ${currentActiveTabLabel} ${index + 1}`} 
                              className="max-w-full h-auto max-h-36 sm:max-h-40 md:max-h-48 rounded border border-gray-300 dark:border-gray-600 object-contain bg-gray-100 dark:bg-gray-700 mb-2"
                              loading="lazy"
                            />
                          ))
                        ) : (
                          <p className="text-xs text-gray-500 dark:text-gray-400">Không có hình ảnh cho tab này.</p>
                        )}
                      </div>
                    )}
                    {/* Info Column */}
                    <div className="sm:w-2/3 md:w-3/4">
                    <h4 className="text-lg md:text-xl font-semibold text-blue-600 dark:text-blue-400 mb-1">{move.name} - <span className="text-base md:text-lg">{translateInput(move.input)}</span></h4>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-2">{move.description}</p>
                    
                    <div className="overflow-x-auto mb-2">
                      <table className="min-w-full text-xs md:text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                          <tr>
                            {move.damage && <th scope="col" className="px-2 py-1 md:px-3 md:py-2">Damage</th>}
                            {move.guard && <th scope="col" className="px-2 py-1 md:px-3 md:py-2">Guard</th>}
                            {move.startup && <th scope="col" className="px-2 py-1 md:px-3 md:py-2">Startup</th>}
                            {move.active && <th scope="col" className="px-2 py-1 md:px-3 md:py-2">Active</th>}
                            {move.recovery && <th scope="col" className="px-2 py-1 md:px-3 md:py-2">Recovery</th>}
                            {move.onBlock && <th scope="col" className="px-2 py-1 md:px-3 md:py-2">On Block</th>}
                            {move.onHit && <th scope="col" className="px-2 py-1 md:px-3 md:py-2">On Hit</th>}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            {move.damage && <td className="px-2 py-1 md:px-3 md:py-2">{move.damage}</td>}
                            {move.guard && <td className="px-2 py-1 md:px-3 md:py-2">{move.guard}</td>}
                            {move.startup && <td className="px-2 py-1 md:px-3 md:py-2">{move.startup}</td>}
                            {move.active && <td className="px-2 py-1 md:px-3 md:py-2">{move.active}</td>}
                            {move.recovery && <td className="px-2 py-1 md:px-3 md:py-2">{move.recovery}</td>}
                            {move.onBlock && <td className="px-2 py-1 md:px-3 md:py-2">{move.onBlock}</td>}
                            {move.onHit && <td className="px-2 py-1 md:px-3 md:py-2">{move.onHit}</td>}
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {move.properties && move.properties.length > 0 && (
                      <div className="mb-1">
                        <p className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400">Properties:</p>
                        <ul className="list-disc list-inside text-xs md:text-sm text-gray-500 dark:text-gray-300 ml-4">
                          {move.properties.map((prop, index) => (
                            <li key={index}>{prop}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {move.notes && <p className="text-xs md:text-sm italic text-gray-500 dark:text-gray-400"><span className="font-semibold">Notes:</span> {move.notes}</p>}
                  </div>
                </div>
              </div>
            )}) /* Sửa lỗi: ))} thành })} */ }
          </div>
        </div>
      )}
    </div>
  );
};

export default NormalMove;
// End of file
