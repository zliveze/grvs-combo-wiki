import React, { useState } from 'react';

const UniqueAction = ({ uniqueActionsData, inputGuide }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeImageTabs, setActiveImageTabs] = useState({});

  if (!uniqueActionsData || uniqueActionsData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mt-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Unique Actions</h3>
        <p className="text-gray-700 dark:text-gray-300">Thông tin về Unique Actions đang được cập nhật.</p>
      </div>
    );
  }

  const getInputMappings = (input) => {
    if (!inputGuide || !inputGuide.keyboard || !inputGuide.controller) {
      return { original: input, keyboard: null, controller: null };
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

  React.useEffect(() => {
    const initialTabs = {};
    uniqueActionsData.forEach(action => {
      if (action.imageTabs && action.imageTabs.length > 0) {
        initialTabs[action.id || action.name] = action.imageTabs[0].label;
      }
    });
    setActiveImageTabs(initialTabs);
  }, [uniqueActionsData]);

  const handleTabClick = (actionId, tabLabel) => {
    setActiveImageTabs(prev => ({ ...prev, [actionId]: tabLabel }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 md:p-6 text-left text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
      >
        <h3 className="text-2xl font-bold">Unique Actions</h3>
        <svg
          className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="p-4 md:p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            {uniqueActionsData.map((action) => {
              const actionKey = action.id || action.name;
              const currentActiveTabLabel = activeImageTabs[actionKey] || (action.imageTabs && action.imageTabs.length > 0 ? action.imageTabs[0].label : null);
              const activeTabData = action.imageTabs && currentActiveTabLabel
                ? action.imageTabs.find(tab => tab.label === currentActiveTabLabel)
                : null;

              return (
                <div key={actionKey} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    {/* Cột Hình Ảnh */}
                    {action.imageTabs && action.imageTabs.length > 0 && (
                      <div className="sm:w-1/4 flex flex-col items-center sm:items-start flex-shrink-0">
                        <div className="flex border-b border-gray-300 dark:border-gray-600 mb-2 self-stretch">
                          {action.imageTabs.map((tab) => (
                            <button
                              key={tab.label}
                              onClick={() => handleTabClick(actionKey, tab.label)}
                              className={`flex-1 px-2 py-1 text-xs sm:text-sm font-medium focus:outline-none text-center ${currentActiveTabLabel === tab.label ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                            >
                              {tab.label} ({tab.urls.length})
                            </button>
                          ))}
                        </div>
                        {activeTabData && activeTabData.urls.length > 0 ? (
                          activeTabData.urls.map((url, index) => (
                            <img
                              key={index} src={url} alt={`${action.name || 'Action'} ${currentActiveTabLabel} ${index + 1}`}
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
                    <div className="sm:w-3/4 flex flex-col md:flex-row md:gap-4">
                      <div className="md:w-2/5 flex flex-col mb-4 md:mb-0">
                        <div>
                          <h4 className="text-md sm:text-lg font-semibold text-blue-600 dark:text-blue-400 mb-0.5">
                            {action.name}
                          </h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                            Input: <span className="font-mono">{action.input}</span>
                          </p>
                          {inputGuide && inputGuide.keyboard && inputGuide.controller && (
                            <div className="text-xs sm:text-sm mb-2 space-y-0.5">
                              {getInputMappings(action.input).keyboard && (
                                <p className="text-gray-600 dark:text-gray-400">
                                  <span className="font-semibold text-purple-600 dark:text-purple-400">Keyboard:</span> {getInputMappings(action.input).keyboard}
                                </p>
                              )}
                              {getInputMappings(action.input).controller && (
                                <p className="text-gray-600 dark:text-gray-400">
                                  <span className="font-semibold text-green-600 dark:text-green-400">Controller:</span> {getInputMappings(action.input).controller}
                                </p>
                              )}
                            </div>
                          )}
                          {action.description && <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-2 mb-2">{renderTextWithTranslatedInputs(action.description, inputGuide)}</p>}
                          {action.notes && (
                            <div className="mt-2">
                              <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400">Ghi chú:</p>
                              <p className="text-xs sm:text-sm italic text-gray-500 dark:text-gray-400">{renderTextWithTranslatedInputs(action.notes, inputGuide)}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="md:w-3/5">
                        {action.damage && ( // Unique actions might not always have full frame data table
                          <div className="overflow-x-auto mb-3">
                            <table className="min-w-full text-xs md:text-sm text-left text-gray-500 dark:text-gray-400">
                              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                                <tr>
                                  {action.damage && <th scope="col" className="px-2 py-1 md:px-3 md:py-2">Damage</th>}
                                  {action.guard && <th scope="col" className="px-2 py-1 md:px-3 md:py-2">Guard</th>}
                                  {action.startup && <th scope="col" className="px-2 py-1 md:px-3 md:py-2">Startup</th>}
                                  {action.active && <th scope="col" className="px-2 py-1 md:px-3 md:py-2">Active</th>}
                                  {action.recovery && <th scope="col" className="px-2 py-1 md:px-3 md:py-2">Recovery</th>}
                                  {action.onBlock && <th scope="col" className="px-2 py-1 md:px-3 md:py-2">On Block</th>}
                                  {action.onHit && <th scope="col" className="px-2 py-1 md:px-3 md:py-2">On Hit</th>}
                                  {action.invuln && <th scope="col" className="px-2 py-1 md:px-3 md:py-2">Invuln</th>}
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                  {action.damage && <td className="px-2 py-1 md:px-3 md:py-2">{action.damage}</td>}
                                  {action.guard && <td className="px-2 py-1 md:px-3 md:py-2">{action.guard}</td>}
                                  {action.startup && <td className="px-2 py-1 md:px-3 md:py-2">{action.startup}</td>}
                                  {action.active && <td className="px-2 py-1 md:px-3 md:py-2">{action.active}</td>}
                                  {action.recovery && <td className="px-2 py-1 md:px-3 md:py-2">{action.recovery}</td>}
                                  {action.onBlock && <td className="px-2 py-1 md:px-3 md:py-2">{action.onBlock}</td>}
                                  {action.onHit && <td className="px-2 py-1 md:px-3 md:py-2">{action.onHit}</td>}
                                  {action.invuln && <td className="px-2 py-1 md:px-3 md:py-2">{action.invuln}</td>}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}
                        {action.properties && action.properties.length > 0 && (
                          <div className="mb-1">
                            <p className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400">Thuộc tính:</p>
                            <ul className="list-disc list-inside text-xs md:text-sm text-gray-500 dark:text-gray-300 ml-4">
                              {action.properties.map((prop, index) => (
                                <li key={index}>{renderTextWithTranslatedInputs(prop, inputGuide)}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UniqueAction;
// End of file
