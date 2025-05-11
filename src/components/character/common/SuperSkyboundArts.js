import React, { useState } from 'react';

// Hàm helper (có thể đã tồn tại ở các file component khác, cân nhắc tách ra file riêng)
const getInputMappings = (input, inputGuide) => {
  if (!input || !inputGuide || !inputGuide.keyboard || !inputGuide.controller) {
    return { original: input || "N/A", keyboard: null, controller: null };
  }
  const keyboardMapping = inputGuide.keyboard[input];
  const controllerMapping = inputGuide.controller[input];
  return {
    original: input,
    keyboard: keyboardMapping || null,
    controller: controllerMapping || null,
  };
};

const renderTextWithTranslatedInputs = (text, guide) => {
  if (!text || !guide || !guide.keyboard || !guide.controller) {
    return text;
  }
  const inputKeys = Object.keys(guide.keyboard).sort((a, b) => b.length - a.length);
  if (inputKeys.length === 0) {
    return text;
  }
  const escapedInputKeys = inputKeys.map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escapedInputKeys.join('|')})`, 'g');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (inputKeys.includes(part)) {
      const kb = guide.keyboard[part];
      const ct = guide.controller[part];
      return (
        <span key={index} className="font-mono mx-0.5">
          <strong className="text-gray-700 dark:text-gray-300">{part}</strong>
          {' ('}
          {kb && (
            <>
              <span className="font-semibold text-purple-600 dark:text-purple-400">Keyboard:</span>
              <span className="text-purple-700 dark:text-purple-300"> {kb}</span>
            </>
          )}
          {kb && ct && <span className="text-gray-500 dark:text-gray-400"> / </span>}
          {ct && (
            <>
              <span className="font-semibold text-green-600 dark:text-green-400">Controller:</span>
              <span className="text-green-700 dark:text-green-300"> {ct}</span>
            </>
          )}
          {')'}
        </span>
      );
    }
    return part;
  });
};

// Card chung cho mỗi chiêu (SBA/SSBA) - Tái sử dụng từ SkyboundArts.js hoặc tạo mới nếu cần tùy chỉnh
// Để đơn giản, tạm thời copy cấu trúc SkyboundArtCard và đổi tên props
const SuperSkyboundArtCard = ({ art, inputGuide, initialActiveTab }) => {
  const [activeImageTab, setActiveImageTab] = useState(initialActiveTab || (art.imageTabs && art.imageTabs.length > 0 ? art.imageTabs[0].label : null));

  const handleTabClick = (tabLabel) => {
    setActiveImageTab(tabLabel);
  };
  
  const currentActiveTabData = art.imageTabs && activeImageTab ? art.imageTabs.find(tab => tab.label === activeImageTab) : null;
  const techInputMap = getInputMappings(art.inputTechnical, inputGuide);
  const easyInputMap = art.inputEasy ? getInputMappings(art.inputEasy, inputGuide) : null;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        {art.imageTabs && art.imageTabs.length > 0 && (
          <div className="sm:w-1/4 flex flex-col items-center sm:items-start flex-shrink-0">
            <div className="flex border-b border-gray-300 dark:border-gray-600 mb-2 self-stretch">
              {art.imageTabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => handleTabClick(tab.label)}
                  className={`flex-1 px-2 py-1 text-xs sm:text-sm font-medium focus:outline-none text-center ${activeImageTab === tab.label ? 'border-b-2 border-red-500 text-red-600 dark:text-red-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                >
                  {tab.label} ({tab.urls.length})
                </button>
              ))}
            </div>
            {currentActiveTabData && currentActiveTabData.urls.length > 0 ? (
              currentActiveTabData.urls.map((url, index) => (
                <img
                  key={index} src={url} alt={`${art.name || 'Super Skybound Art'} ${activeImageTab} ${index + 1}`}
                  className="max-w-full h-auto max-h-32 sm:max-h-36 md:max-h-40 rounded border border-gray-300 dark:border-gray-600 object-contain bg-gray-100 dark:bg-gray-700 mb-2 self-center"
                  loading="lazy"
                />
              ))
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-400 self-center">Không có hình ảnh.</p>
            )}
          </div>
        )}
        <div className={`sm:w-${art.imageTabs && art.imageTabs.length > 0 ? '3/4' : 'full'} flex flex-col`}>
          <h4 className="text-xl md:text-2xl font-bold text-red-500 dark:text-red-400 mb-1">
            {art.name} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">({art.type || 'Super Skybound Art'})</span>
          </h4>
          {art.inputTechnical && (
            <div className="mb-1">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Input (Kỹ thuật): <span className="font-mono">{art.inputTechnical}</span>
                {techInputMap.keyboard && <span className="text-xs text-gray-600 dark:text-gray-400"> (KB: {techInputMap.keyboard})</span>}
                {techInputMap.controller && <span className="text-xs text-gray-600 dark:text-gray-400"> (CT: {techInputMap.controller})</span>}
              </p>
            </div>
          )}
          {easyInputMap && (
             <div className="mb-1">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Input (Dễ): <span className="font-mono">{art.inputEasy}</span>
                {easyInputMap.keyboard && <span className="text-xs text-gray-600 dark:text-gray-400"> (KB: {easyInputMap.keyboard})</span>}
                {easyInputMap.controller && <span className="text-xs text-gray-600 dark:text-gray-400"> (CT: {easyInputMap.controller})</span>}
              </p>
            </div>
          )}
          {art.description && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-3">{renderTextWithTranslatedInputs(art.description, inputGuide)}</p>}
          {(art.damage || art.guard || art.startup) && (
            <div className="overflow-x-auto mb-3">
              <table className="min-w-full text-xs md:text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                  <tr>
                    {art.damage && <th scope="col" className="px-2 py-1">Damage</th>}
                    {art.guard && <th scope="col" className="px-2 py-1">Guard</th>}
                    {art.startup && <th scope="col" className="px-2 py-1">Startup</th>}
                    {art.active && <th scope="col" className="px-2 py-1">Active</th>}
                    {art.recovery && <th scope="col" className="px-2 py-1">Recovery</th>}
                    {art.onBlock && <th scope="col" className="px-2 py-1">On Block</th>}
                    {art.onHit && <th scope="col" className="px-2 py-1">On Hit</th>}
                    {art.invuln && <th scope="col" className="px-2 py-1">Invuln</th>}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    {art.damage && <td className="px-2 py-1">{art.damage}</td>}
                    {art.guard && <td className="px-2 py-1">{art.guard}</td>}
                    {art.startup && <td className="px-2 py-1">{art.startup}</td>}
                    {art.active && <td className="px-2 py-1">{art.active}</td>}
                    {art.recovery && <td className="px-2 py-1">{art.recovery}</td>}
                    {art.onBlock && <td className="px-2 py-1">{art.onBlock}</td>}
                    {art.onHit && <td className="px-2 py-1">{art.onHit}</td>}
                    {art.invuln && <td className="px-2 py-1">{art.invuln}</td>}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {art.properties && art.properties.length > 0 && (
            <div className="mb-1">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Thuộc tính:</p>
              <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-300 ml-4">
                {art.properties.map((prop, index) => (
                  <li key={index}>{renderTextWithTranslatedInputs(prop, inputGuide)}</li>
                ))}
              </ul>
            </div>
          )}
          {art.notes && (
            <div className="mt-2">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Ghi chú:</p>
              <p className="text-sm italic text-gray-500 dark:text-gray-400">{renderTextWithTranslatedInputs(art.notes, inputGuide)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SuperSkyboundArts = ({ superSkyboundArtsData, inputGuide }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!superSkyboundArtsData || superSkyboundArtsData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mt-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Super Skybound Arts</h3>
        <p className="text-gray-700 dark:text-gray-300">Thông tin về Super Skybound Arts đang được cập nhật.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 md:p-6 text-left text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
      >
        <h3 className="text-2xl font-bold">Super Skybound Arts</h3>
        <svg
          className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="p-4 md:p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-8">
            {superSkyboundArtsData.map((art) => (
              <SuperSkyboundArtCard key={art.id || art.name} art={art} inputGuide={inputGuide} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperSkyboundArts;
// End of file
