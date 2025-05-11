import React from 'react';
import Sidebar from '../../../components/layout/Sidebar'; // Chỉ cần Sidebar ở đây
import DefaultLayout from '../../../components/layout/defaultLayout'; // Import DefaultLayout để dùng trong getLayout
import Overview from '../../../components/character/common/Overview';
import HeaderCharacter from '../../../components/character/common/HeaderCharacter';
import NormalMove from '../../../components/character/common/NormalMove';
import UniqueAction from '../../../components/character/common/UniqueAction';
import UniversalMechanics from '../../../components/character/common/UniversalMechanics';
import SpecialMoves from '../../../components/character/common/SpecialMoves';
import SkyboundArts from '../../../components/character/common/SkyboundArts';
import SuperSkyboundArts from '../../../components/character/common/SuperSkyboundArts';
import charlottaData from '../../../data/characters/charlotta/charlotta';
import universalMechanicsData from '../../../data/characters/charlotta/universalMechanics';

const CharlottaPage = () => {
  const sections = [
    { id: 'overview', title: 'Tổng quan' },
    { id: 'normal-moves', title: 'Đòn đánh thường' },
    { id: 'unique-actions', title: 'Hành động riêng' },
    { id: 'universal-mechanics', title: 'Cơ chế chung' },
    { id: 'special-moves', title: 'Tuyệt kỹ đặc biệt' },
    { id: 'skybound-arts', title: 'Skybound Arts' },
    { id: 'super-skybound-arts', title: 'Super Skybound Arts' },
  ];

  // Lọc bỏ các section không có dữ liệu
  const availableSections = sections.filter(section => {
    if (section.id === 'unique-actions') {
      return charlottaData.uniqueActions && charlottaData.uniqueActions.length > 0;
    }
    if (section.id === 'special-moves') {
      return charlottaData.specialMoves && charlottaData.specialMoves.length > 0;
    }
    if (section.id === 'skybound-arts') {
      return charlottaData.skyboundArts && charlottaData.skyboundArts.length > 0;
    }
    if (section.id === 'super-skybound-arts') {
      return charlottaData.superSkyboundArts && charlottaData.superSkyboundArts.length > 0;
    }
    return true; // Các section khác luôn hiển thị
  });

  return (
    <>
      {/* Header Component */}
      <HeaderCharacter characterData={charlottaData} />

      {/* Nội dung chính */}
      <div id="overview">
        <Overview characterData={charlottaData} />
      </div>
      <div id="normal-moves">
        <NormalMove normalMovesData={charlottaData.normalMoves} inputGuide={charlottaData.inputGuide} />
      </div>
      {charlottaData.uniqueActions && charlottaData.uniqueActions.length > 0 && (
        <div id="unique-actions">
          <UniqueAction uniqueActionsData={charlottaData.uniqueActions} inputGuide={charlottaData.inputGuide} />
        </div>
      )}
      <div id="universal-mechanics">
        <UniversalMechanics universalMechanicsData={universalMechanicsData} inputGuide={charlottaData.inputGuide} />
      </div>
      {charlottaData.specialMoves && charlottaData.specialMoves.length > 0 && (
        <div id="special-moves">
          <SpecialMoves specialMovesData={charlottaData.specialMoves} inputGuide={charlottaData.inputGuide} />
        </div>
      )}
      {charlottaData.skyboundArts && charlottaData.skyboundArts.length > 0 && (
        <div id="skybound-arts">
          <SkyboundArts skyboundArtsData={charlottaData.skyboundArts} inputGuide={charlottaData.inputGuide} />
        </div>
      )}
      {charlottaData.superSkyboundArts && charlottaData.superSkyboundArts.length > 0 && (
        <div id="super-skybound-arts">
          <SuperSkyboundArts superSkyboundArtsData={charlottaData.superSkyboundArts} inputGuide={charlottaData.inputGuide} />
        </div>
      )}
    </>
  );
};

CharlottaPage.getLayout = function getLayout(page) {
  const sections = [
    { id: 'overview', title: 'Tổng quan' },
    { id: 'normal-moves', title: 'Đòn đánh thường' },
    { id: 'unique-actions', title: 'Hành động riêng' },
    { id: 'universal-mechanics', title: 'Cơ chế chung' },
    { id: 'special-moves', title: 'Tuyệt kỹ đặc biệt' },
    { id: 'skybound-arts', title: 'Skybound Arts' },
    { id: 'super-skybound-arts', title: 'Super Skybound Arts' },
  ];

  // Lọc bỏ các section không có dữ liệu (cần truy cập charlottaData từ props của page nếu cần, hoặc giữ nguyên logic hiện tại nếu charlottaData là global/import)
  // Giả sử charlottaData được import trực tiếp trong file này và có thể truy cập được
  const availableSections = sections.filter(section => {
    if (section.id === 'unique-actions') {
      return charlottaData.uniqueActions && charlottaData.uniqueActions.length > 0;
    }
    if (section.id === 'special-moves') {
      return charlottaData.specialMoves && charlottaData.specialMoves.length > 0;
    }
    if (section.id === 'skybound-arts') {
      return charlottaData.skyboundArts && charlottaData.skyboundArts.length > 0;
    }
    if (section.id === 'super-skybound-arts') {
      return charlottaData.superSkyboundArts && charlottaData.superSkyboundArts.length > 0;
    }
    return true;
  });

  const characterSidebar = <Sidebar sections={availableSections} title={`Mục lục ${charlottaData.name}`} />;
  
  return (
    <DefaultLayout showSidebar={true} sidebar={characterSidebar}>
      {page}
    </DefaultLayout>
  );
};

export default CharlottaPage;
