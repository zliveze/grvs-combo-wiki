import React from 'react'
import Overview from '../../../components/character/common/Overview'
import HeaderCharacter from '../../../components/character/common/HeaderCharacter'
import NormalMove from '../../../components/character/common/NormalMove' // Import NormalMove
import charlottaData from '../../../data/characters/charlotta/charlotta'

const CharlottaPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header Component */}
        <HeaderCharacter characterData={charlottaData} />

        {/* Nội dung chính */}
        <div className="w-full">
          <Overview characterData={charlottaData} />
          {/* Normal Moves Component */}
          <NormalMove normalMovesData={charlottaData.normalMoves} inputGuide={charlottaData.inputGuide} />
        </div>
      </div>
    </div>
  )
}

export default CharlottaPage
