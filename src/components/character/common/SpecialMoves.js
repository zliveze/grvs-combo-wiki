import React, { useState } from 'react';

// Hàm helper này có thể được tách ra file riêng nếu dùng ở nhiều nơi
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


const SpecialMoveCard = ({ move, inputGuide, initialActiveTab }) => {
  const [activeImageTab, setActiveImageTab] = useState(initialActiveTab || (move.imageTabs && move.imageTabs.length > 0 ? move.imageTabs[0].label : null));

  const handleTabClick = (tabLabel) => {
    setActiveImageTab(tabLabel);
  };
  
  const currentActiveTabData = move.imageTabs && activeImageTab ? move.imageTabs.find(tab => tab.label === activeImageTab) : null;
  const inputMap = getInputMappings(move.input, inputGuide);
  const easyInputMap = move.inputEasy ? getInputMappings(move.inputEasy, inputGuide) : null;


  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        {/* Cột Hình Ảnh */}
        {move.imageTabs && move.imageTabs.length > 0 && (
          <div className="sm:w-1/4 flex flex-col items-center sm:items-start flex-shrink-0">
            <div className="flex border-b border-gray-300 dark:border-gray-600 mb-2 self-stretch">
              {move.imageTabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => handleTabClick(tab.label)}
                  className={`flex-1 px-2 py-1 text-xs sm:text-sm font-medium focus:outline-none text-center ${activeImageTab === tab.label ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                >
                  {tab.label} ({tab.urls.length})
                </button>
              ))}
            </div>
            {currentActiveTabData && currentActiveTabData.urls.length > 0 ? (
              currentActiveTabData.urls.map((url, index) => (
                <img
                  key={index} src={url} alt={`${move.name || 'Move'} ${activeImageTab} ${index + 1}`}
                  className="max-w-full h-auto max-h-32 sm:max-h-36 md:max-h-40 rounded border border-gray-300 dark:border-gray-600 object-contain bg-gray-100 dark:bg-gray-700 mb-2 self-center"
                  loading="lazy"
                />
              ))
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-400 self-center">Không có hình ảnh.</p>
            )}
          </div>
        )}

        {/* Cột Thông Tin Chi Tiết */}
        <div className={`sm:w-${move.imageTabs && move.imageTabs.length > 0 ? '3/4' : 'full'} flex flex-col`}>
          <h4 className="text-lg md:text-xl font-semibold text-blue-600 dark:text-blue-400 mb-0.5">
            {move.name} {move.name_suffix || ''}
          </h4>
          
          {move.input && (
            <div className="mb-1">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Input: <span className="font-mono">{move.input}</span>
                {inputMap.keyboard && <span className="text-xs text-gray-600 dark:text-gray-400"> (<span className="font-semibold text-purple-600 dark:text-purple-400">Keyboard:</span> {inputMap.keyboard})</span>}
                {inputMap.controller && <span className="text-xs text-gray-600 dark:text-gray-400"> (<span className="font-semibold text-green-600 dark:text-green-400">Controller:</span> {inputMap.controller})</span>}
              </p>
            </div>
          )}
          {easyInputMap && (
             <div className="mb-1">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Input (Dễ): <span className="font-mono">{move.inputEasy}</span>
                {easyInputMap.keyboard && <span className="text-xs text-gray-600 dark:text-gray-400"> (<span className="font-semibold text-purple-600 dark:text-purple-400">Keyboard:</span> {easyInputMap.keyboard})</span>}
                {easyInputMap.controller && <span className="text-xs text-gray-600 dark:text-gray-400"> (<span className="font-semibold text-green-600 dark:text-green-400">Controller:</span> {easyInputMap.controller})</span>}
              </p>
            </div>
          )}

          {move.description && <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1 mb-2">{renderTextWithTranslatedInputs(move.description, inputGuide)}</p>}
          
          {(move.damage || move.guard || move.startup) && (
            <div className="overflow-x-auto mb-2">
              <table className="min-w-full text-xs md:text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                  <tr>
                    {move.damage && <th scope="col" className="px-2 py-1">Damage</th>}
                    {move.guard && <th scope="col" className="px-2 py-1">Guard</th>}
                    {move.startup && <th scope="col" className="px-2 py-1">Startup</th>}
                    {move.active && <th scope="col" className="px-2 py-1">Active</th>}
                    {move.recovery && <th scope="col" className="px-2 py-1">Recovery</th>}
                    {move.onBlock && <th scope="col" className="px-2 py-1">On Block</th>}
                    {move.onHit && <th scope="col" className="px-2 py-1">On Hit</th>}
                    {move.invuln && <th scope="col" className="px-2 py-1">Invuln</th>}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    {move.damage && <td className="px-2 py-1">{move.damage}</td>}
                    {move.guard && <td className="px-2 py-1">{move.guard}</td>}
                    {move.startup && <td className="px-2 py-1">{move.startup}</td>}
                    {move.active && <td className="px-2 py-1">{move.active}</td>}
                    {move.recovery && <td className="px-2 py-1">{move.recovery}</td>}
                    {move.onBlock && <td className="px-2 py-1">{move.onBlock}</td>}
                    {move.onHit && <td className="px-2 py-1">{move.onHit}</td>}
                    {move.invuln && <td className="px-2 py-1">{move.invuln}</td>}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {move.properties && move.properties.length > 0 && (
            <div className="mb-1">
              <p className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400">Thuộc tính:</p>
              <ul className="list-disc list-inside text-xs md:text-sm text-gray-500 dark:text-gray-300 ml-4">
                {move.properties.map((prop, index) => (
                  <li key={index}>{renderTextWithTranslatedInputs(prop, inputGuide)}</li>
                ))}
              </ul>
            </div>
          )}
          {move.notes && (
            <div className="mt-2">
              <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400">Ghi chú:</p>
              <p className="text-xs sm:text-sm italic text-gray-500 dark:text-gray-400">{renderTextWithTranslatedInputs(move.notes, inputGuide)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const SpecialMoves = ({ specialMovesData, inputGuide }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!specialMovesData || specialMovesData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mt-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Special Moves</h3>
        <p className="text-gray-700 dark:text-gray-300">Thông tin về Special Moves đang được cập nhật.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 md:p-6 text-left text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
      >
        <h3 className="text-2xl font-bold">Special Moves</h3>
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
            {specialMovesData.map((specialMove) => (
              <div key={specialMove.id || specialMove.name} className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-xl md:text-2xl font-bold text-red-600 dark:text-red-400 mb-2">{specialMove.name}</h3>
                {specialMove.inputTechnical && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                    Input (Kỹ thuật): <span className="font-mono">{specialMove.inputTechnical}</span>
                    {getInputMappings(specialMove.inputTechnical, inputGuide).keyboard && <span className="text-xs"> (KB: {getInputMappings(specialMove.inputTechnical, inputGuide).keyboard})</span>}
                    {getInputMappings(specialMove.inputTechnical, inputGuide).controller && <span className="text-xs"> (CT: {getInputMappings(specialMove.inputTechnical, inputGuide).controller})</span>}
                  </p>
                )}
                {specialMove.inputEasy && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    Input (Dễ): <span className="font-mono">{specialMove.inputEasy}</span>
                    {getInputMappings(specialMove.inputEasy, inputGuide).keyboard && <span className="text-xs"> (KB: {getInputMappings(specialMove.inputEasy, inputGuide).keyboard})</span>}
                    {getInputMappings(specialMove.inputEasy, inputGuide).controller && <span className="text-xs"> (CT: {getInputMappings(specialMove.inputEasy, inputGuide).controller})</span>}
                  </p>
                )}
                {specialMove.description && <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{renderTextWithTranslatedInputs(specialMove.description, inputGuide)}</p>}
                
                {specialMove.imageTabs && specialMove.imageTabs.length > 0 && (!specialMove.versions || specialMove.versions.length === 0) && (
                    <SpecialMoveCard move={specialMove} inputGuide={inputGuide} />
                )}

                {specialMove.versions && specialMove.versions.length > 0 && (
                  <div className="space-y-4 mt-4">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Phiên bản:</h4>
                    {specialMove.versions.map(version => (
                      <SpecialMoveCard key={version.id_suffix || version.input} move={{...specialMove, ...version, name: `${specialMove.name} ${version.name_suffix || ''}`}} inputGuide={inputGuide} />
                    ))}
                  </div>
                )}

                {specialMove.followUps && specialMove.followUps.length > 0 && (
                  <div className="space-y-4 mt-6">
                     <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Chiêu Theo Sau (Follow-ups):</h4>
                    {specialMove.followUps.map(followUp => (
                       <SpecialMoveCard key={followUp.id || followUp.name} move={followUp} inputGuide={inputGuide} />
                    ))}
                  </div>
                )}
                 {specialMove.notes && (
                    <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-600">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Ghi chú chung:</p>
                        <p className="text-sm italic text-gray-500 dark:text-gray-400">{renderTextWithTranslatedInputs(specialMove.notes, inputGuide)}</p>
                    </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialMoves;
// End of file
