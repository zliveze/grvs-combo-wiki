import React from 'react'
import HeaderCharacter from '../../../components/character/common/HeaderCharacter'
import charlottaData from '../../../data/characters/charlotta/charlotta'

const CharlottaStrategy = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header Component */}
        <HeaderCharacter characterData={charlottaData} />

        {/* Nội dung chính */}
        <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Chiến Lược</h2>
          <p className="text-gray-700 dark:text-gray-300">Trang chiến lược của Charlotta đang được phát triển...</p>
        </div>
      </div>
    </div>
  )
}

export default CharlottaStrategy 