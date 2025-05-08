import React, { useState } from 'react';
import Link from 'next/link';

// Dữ liệu từ @/data/input_guide.json
const inputGuide = {
  "keyboard": {
    "Di chuyển": "W, A, S, D",
    "Tấn công nhẹ (Light attack)": "U",
    "Tấn công trung bình (Medium attack)": "I",
    "Tấn công mạnh (Heavy attack)": "K",
    "Tấn công đặc biệt (Unique attack)": "J",
    "Kỹ năng (Skill)": "P",
    "Đỡ đòn (Block)": ";",
    "Ném (Throw)": "O",
    "Tấn công trên đầu (Overhead attack)": "L",
    "Ghi lại (Record)": "N",
    "Phát lại (Replay)": "M",
    "Đặt lại vị trí (Reset position)": "1"
  },
  "controller": {
    "Tấn công nhẹ (Light attack)": "X",
    "Tấn công trung bình (Medium attack)": "Y",
    "Tấn công mạnh (Heavy attack)": "B",
    "Tấn công đặc biệt (Unique attack)": "A",
    "Kỹ năng (Skill)": "RB",
    "Đỡ đòn (Block)": "RT",
    "Ném (Throw)": "LB",
    "Tấn công trên đầu (Overhead attack)": "LT",
    "Ghi lại (Record)": "Cần Analog trái",
    "Phát lại (Replay)": "Cần Analog trái",
    "Đặt lại vị trí (Reset position)": "Nút View"
  }
};

// Dữ liệu từ bảng chú thích
const notationData = [
  { symbol: "7", keyboard: "W+A", controller: "Lên-Lùi" },
  { symbol: "8", keyboard: "W", controller: "Lên" },
  { symbol: "9", keyboard: "W+D", controller: "Lên-Tiến" },
  { symbol: "4", keyboard: "A", controller: "Lùi" },
  { symbol: "5", keyboard: "(Không di chuyển)", controller: "(Không di chuyển)" },
  { symbol: "6", keyboard: "D", controller: "Tiến" },
  { symbol: "1", keyboard: "S+A", controller: "Xuống-Lùi" },
  { symbol: "2", keyboard: "S", controller: "Xuống" },
  { symbol: "3", keyboard: "S+D", controller: "Xuống-Tiến" }
];

// Dữ liệu từ bảng chú thích bổ sung
const additionalNotations = [
  { symbol: ">", description: "Thực hiện đòn tiếp theo sau khi đòn trước kết thúc hoàn toàn animation." },
  { symbol: "▷/land", description: "Chỉ ra rằng người chơi phải tiếp đất tại điểm đó trong chuỗi." },
  { symbol: ",", description: "Link đòn trước vào đòn tiếp theo." },
  { symbol: "->/~", description: "Cancel kỹ năng đặc biệt trước đó vào kỹ năng đặc biệt tiếp theo." },
  { symbol: "dl./delay", description: "Trì hoãn đòn tiếp theo." },
  { symbol: "whiff/(whiff)", description: "Đòn đánh phải đánh trượt (không trúng)." },
  { symbol: "c.", description: "Đứng gần (Close)" },
  { symbol: "f.", description: "Đứng xa (Far)" },
  { symbol: "j.", description: "Nhảy/Trên không (Jumping/Aerial)" },
  { symbol: "hj./sj.", description: "Nhảy Cao/Siêu Nhảy (High Jump/Super Jump)" },
  { symbol: "jc", description: "Nhảy Hủy (Jump Cancel)" },
  { symbol: "hjc/sjc", description: "Nhảy Cao Hủy/Siêu Nhảy Hủy (High Jump Cancel/Super Jump Cancel)" },
  { symbol: "dc/adc", description: "Dash Hủy/Air Dash Hủy (Dash Cancel/Air Dash Cancel)" },
  { symbol: "CH", description: "Đòn đánh phản công (Counter Hit)" },
  { symbol: "AA", description: "Chống nhảy (Anti-Air)" },
  { symbol: "IAS", description: "Kỹ năng Đặc biệt Trên Không Tức thời (Instant Air Special)" },
  { symbol: "[X]", description: "Giữ nút X." },
  { symbol: "]X[", description: "Nhả nút X." },
  { symbol: "(move)", description: "Đòn đánh tùy chọn." },
  { symbol: "[X] or [Y]", description: "Thực hiện chuỗi X hoặc Y." },
  { symbol: "[sequence] xN", description: "Lặp lại chuỗi N lần." },
  { symbol: "(N)", description: "Đòn đánh thứ N hoặc đòn đánh phải gây ra N lượt đánh." }
];

// Dữ liệu từ bảng viết tắt tên nhân vật
const characterAbbreviations = [
  { abbr: "GRN", fullName: "Gran" },
  { abbr: "KAT", fullName: "Katalina" },
  { abbr: "CHA", fullName: "Charlotta" },
  { abbr: "LAN", fullName: "Lancelot" },
  { abbr: "PER", fullName: "Percival" },
  { abbr: "FER", fullName: "Ferry" },
  { abbr: "ZET", fullName: "Zeta" },
  { abbr: "VAS", fullName: "Vaseraga" },
  { abbr: "LOW", fullName: "Lowain" },
  { abbr: "DJE", fullName: "Djeeta" }
];

const CombatNotationGuide = () => {
  const [activeTab, setActiveTab] = useState('keyboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNotationExpanded, setIsNotationExpanded] = useState(false);

  const renderInputGuide = (device) => {
    const guide = inputGuide[device];
    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Hướng dẫn nhập liệu cơ bản</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {Object.entries(guide).map(([action, keys]) => (
            <div key={action} className="flex items-center justify-between p-1 bg-white text-gray-800 rounded-md shadow-sm border border-gray-200 text-sm hover:bg-gray-50 transition-colors">
              <span className="font-medium">{action}:</span>
              <span className="font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold text-sm border border-blue-200 ml-1">{keys}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderNumpadNotation = () => {
    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Ký hiệu số trên bàn phím số</h3>
        <div className="grid grid-cols-3 gap-0.5 max-w-xs mx-auto mb-4 bg-white p-1 rounded-lg shadow-sm border border-gray-200">
          {notationData.map((item) => (
            <div
              key={item.symbol}
              className={`p-1.5 border border-gray-200 rounded-md text-center ${item.symbol === "5" ? "bg-blue-50" : "bg-white"} text-gray-800 text-sm hover:shadow-md transition-shadow`}
            >
              <div className="font-bold text-blue-600 text-lg">{item.symbol}</div>
              <div className="text-xs mt-0.5 text-gray-600">
                {activeTab === 'keyboard' ? item.keyboard : item.controller}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 italic">Số đại diện cho hướng trên bàn phím số. Ví dụ, 236+L trở thành 236L.</p>
      </div>
    );
  };

  const renderAdditionalNotations = () => {
    return (
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">Chú thích bổ sung</h3>
          <button 
            onClick={() => setIsNotationExpanded(!isNotationExpanded)}
            className="text-blue-600 hover:text-blue-800 focus:outline-none bg-blue-50 px-2 py-1 rounded-md text-sm transition-colors"
          >
            {isNotationExpanded ? 'Thu gọn' : 'Mở rộng'}
          </button>
        </div>
        
        {isNotationExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {additionalNotations.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-1 bg-white text-gray-800 rounded-md shadow-sm border border-gray-200 text-sm hover:bg-gray-50 transition-colors">
                <span className="ml-1">{item.description}</span>
                <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 min-w-14 text-center">{item.symbol}</span>
              </div>
            ))}
          </div>
        )}
        
        {!isNotationExpanded && (
          <div className="p-3 bg-white text-gray-600 rounded-md shadow-sm border border-gray-200 text-center text-sm hover:bg-gray-50 transition-colors">
            Nhấn "Mở rộng" để xem chi tiết các ký hiệu và chú thích bổ sung
          </div>
        )}
      </div>
    );
  };

  const renderCharacterList = () => {
    // Sử dụng dữ liệu từ danh sách nhân vật
    const characters = [
      { name: 'Anre', icon: 'https://www.dustloop.com/wiki/images/1/1f/GBVS_Anre_Icon.png', abbr: 'UN' },
      { name: 'Avatar Belial', icon: 'https://www.dustloop.com/wiki/images/b/b5/GBVS_Avatar_Belial_Icon.png', abbr: 'AB' },
      { name: 'Beelzebub', icon: 'https://www.dustloop.com/wiki/images/f/fd/GBVS_Beelzebub_Icon.png', abbr: 'BB' },
      { name: 'Belial', icon: 'https://www.dustloop.com/wiki/images/b/bb/GBVS_Belial_Icon.png', abbr: 'BL' },
      { name: 'Cagliostro', icon: 'https://www.dustloop.com/wiki/images/c/c7/GBVS_Cagliostro_Icon.png', abbr: 'CA' },
      { name: 'Charlotta', icon: 'https://www.dustloop.com/wiki/images/4/46/GBVS_Charlotta_Icon.png', abbr: 'CL' },
      { name: 'Djeeta', icon: 'https://www.dustloop.com/wiki/images/1/15/GBVS_Djeeta_Icon.png', abbr: 'DJ' },
      { name: 'Eustace', icon: 'https://www.dustloop.com/wiki/images/c/c1/GBVS_Eustace_Icon.png', abbr: 'EU' },
      { name: 'Ferry', icon: 'https://www.dustloop.com/wiki/images/a/a0/GBVS_Ferry_Icon.png', abbr: 'FR' },
      { name: 'Gran', icon: 'https://www.dustloop.com/wiki/images/2/21/GBVS_Gran_Icon.png', abbr: 'GR' },
      { name: 'Katalina', icon: 'https://www.dustloop.com/wiki/images/a/aa/GBVS_Katalina_Icon.png', abbr: 'KT' },
      { name: 'Ladiva', icon: 'https://www.dustloop.com/wiki/images/5/52/GBVS_Ladiva_Icon.png', abbr: 'FT' },
      { name: 'Lancelot', icon: 'https://www.dustloop.com/wiki/images/2/26/GBVS_Lancelot_Icon.png', abbr: 'LN' },
      { name: 'Lowain', icon: 'https://www.dustloop.com/wiki/images/3/3c/GBVS_Lowain_Icon.png', abbr: 'LW' },
      { name: 'Metera', icon: 'https://www.dustloop.com/wiki/images/5/50/GBVS_Metera_Icon.png', abbr: 'MT' },
      { name: 'Narmaya', icon: 'https://www.dustloop.com/wiki/images/5/5e/GBVS_Narmaya_Icon.png', abbr: 'NM' },
      { name: 'Percival', icon: 'https://www.dustloop.com/wiki/images/3/3d/GBVS_Percival_Icon.png', abbr: 'PC' },
      { name: 'Seox', icon: 'https://www.dustloop.com/wiki/images/7/77/GBVS_Seox_Icon.png', abbr: 'SX' },
      { name: 'Soriz', icon: 'https://www.dustloop.com/wiki/images/7/7d/GBVS_Soriz_Icon.png', abbr: 'SO' },
      { name: 'Vaseraga', icon: 'https://www.dustloop.com/wiki/images/5/57/GBVS_Vaseraga_Icon.png', abbr: 'VS' },
      { name: 'Vira', icon: 'https://www.dustloop.com/wiki/images/9/99/GBVS_Vira_Icon.png', abbr: 'VI' },
      { name: 'Yuel', icon: 'https://www.dustloop.com/wiki/images/4/45/GBVS_Yuel_Icon.png', abbr: 'YU' },
      { name: 'Zeta', icon: 'https://www.dustloop.com/wiki/images/f/f0/GBVS_Zeta_Icon.png', abbr: 'ZT' },
      { name: 'Zooey', icon: 'https://www.dustloop.com/wiki/images/f/f5/GBVS_Zooey_Icon.png', abbr: 'ZO' }
    ];

    // Lọc danh sách nhân vật dựa trên từ khóa tìm kiếm
    const filteredCharacters = characters.filter(char => 
      char.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      char.abbr.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-gray-800">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 border-b border-gray-200 pb-2">Nhân vật</h3>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tìm nhân vật..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {filteredCharacters.map((character) => (
            <Link 
              href={`/character/${character.name.toLowerCase().replace(/ /g, '-')}`} 
              key={character.name}
              className="flex flex-col items-center p-2 bg-white text-gray-800 rounded-md hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden mb-1">
                <img 
                  src={character.icon} 
                  alt={character.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-center mt-1">{character.name}</span>
              <span className="text-xs text-center text-gray-500">{character.abbr}</span>
            </Link>
          ))}
        </div>

        {filteredCharacters.length === 0 && (
          <div className="text-center py-4 text-gray-400">
            Không tìm thấy nhân vật phù hợp
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-gray-50">
      {/* Hướng dẫn chú thích */}
      <div className="md:w-2/3 lg:w-3/4 bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-gray-800 order-2 md:order-1">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-2">Hướng dẫn chú thích Combo</h2>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'keyboard' ? 'bg-blue-50 text-blue-800 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'} rounded-t-md transition-colors`}
            onClick={() => setActiveTab('keyboard')}
          >
            Bàn phím
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'controller' ? 'bg-blue-50 text-blue-800 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'} rounded-t-md transition-colors`}
            onClick={() => setActiveTab('controller')}
          >
            Controller
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {/* Display Input Guide and Numpad Notation side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {activeTab === 'keyboard' && renderInputGuide('keyboard')}
              {activeTab === 'controller' && renderInputGuide('controller')}
            </div>
            <div>
              {renderNumpadNotation()}
            </div>
          </div>
          {renderAdditionalNotations()}
        </div>
      </div>
      
      {/* Danh sách nhân vật */}
      <div className="md:w-1/3 lg:w-1/4 order-1 md:order-2">
        {renderCharacterList()}
      </div>
    </div>
  );
};

export default CombatNotationGuide;
