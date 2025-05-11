import React from 'react';
import DefaultLayout from '../../../components/layout/defaultLayout';
import Sidebar from '../../../components/layout/Sidebar';
import CombatNotationGuide from '../../../components/ui/CombatNotationGuide';
import HeaderCharacter from '../../../components/character/common/HeaderCharacter';
import ComboTable from '../../../components/character/common/ComboTable';
import charlottaData from '../../../data/characters/charlotta/charlotta';
import charlottaCombosData from '../../../data/characters/charlotta/combos';
// Giả sử inputGuide và translationRules sẽ được xử lý/truyền vào ComboTable sau
// Hoặc ComboTable tự import chúng nếu chúng là static.
// Hiện tại, ComboTable nhận inputGuide từ charlottaData.

const CharlottaCombosPage = () => {
  const pageTitle = `${charlottaData.name} - Danh sách Combo`;

  // Để Sidebar hoạt động, cần có các div với id tương ứng trong nội dung
  return (
    <div className="space-y-8"> {/* Tăng khoảng cách giữa các khối */}
      <div> {/* Không cần id cho tiêu đề chính của trang */}
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center sm:text-left">
          {pageTitle}
        </h1>
      </div>
      
      <div id="combat-notation-guide-section" className="scroll-mt-20"> {/* scroll-mt để offset scroll khi có sticky header */}
        <CombatNotationGuide />
      </div>
      
      <div id="combo-list-section" className="scroll-mt-20">
        <ComboTable 
          combosData={charlottaCombosData} 
          inputGuide={charlottaData.inputGuide} 
          // translationRules={/* Cần truyền translationRules đã parse */}
        />
      </div>
    </div>
  );
};

CharlottaCombosPage.getLayout = function getLayout(page) {
  const comboPageSections = [
    { id: 'combat-notation-guide-section', title: 'Hướng dẫn ký hiệu' },
    { id: 'combo-list-section', title: 'Danh sách Combo' },
  ];

  const sidebar = <Sidebar sections={comboPageSections} title={`Combo ${charlottaData.name}`} />;
  
  return (
    <DefaultLayout showSidebar={true} sidebar={sidebar}>
      <HeaderCharacter characterData={charlottaData} />
      {page}
    </DefaultLayout>
  );
};

export default CharlottaCombosPage;
