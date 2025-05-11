import React from 'react'
import Image from 'next/image'

const Overview = ({ characterData }) => {
  const { name, image, nameplate, icon, overview, stats, pros, cons } = characterData

  return (
    <div className="w-full">
      {/* Header với thông tin cơ bản */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Ảnh và thông số */}
        <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-center mb-3">
            {nameplate && (
              <Image 
                src={nameplate} 
                alt={`${name} Nameplate`} 
                width={150} 
                height={50} 
                className="mx-auto"
              />
            )}
          </div>
          <div className="flex justify-center mb-4">
            {image && (
              <Image 
                src={image} 
                alt={`${name} Portrait`} 
                width={180} 
                height={220} 
                className="mx-auto object-contain"
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="border-t border-gray-200 dark:border-gray-700 py-2">
              <span className="font-medium text-gray-800 dark:text-white">Máu:</span>
              <span className="ml-2 text-gray-600 dark:text-gray-400">{stats.health}</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 py-2">
              <span className="font-medium text-gray-800 dark:text-white">Prejump:</span>
              <span className="ml-2 text-gray-600 dark:text-gray-400">{stats.prejump}</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 py-2">
              <span className="font-medium text-gray-800 dark:text-white">Backdash:</span>
              <span className="ml-2 text-gray-600 dark:text-gray-400">{stats.backdash}</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 py-2">
              <span className="font-medium text-gray-800 dark:text-white">Backshift:</span>
              <span className="ml-2 text-gray-600 dark:text-gray-400">{stats.backshift}</span>
            </div>
          </div>
        </div>

        {/* Tổng quan */}
        <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">Tổng Quan</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{overview}</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            {/* Ưu điểm */}
            <div>
              <h3 className="text-lg font-bold mb-2 text-green-600 dark:text-green-400 border-b border-gray-200 dark:border-gray-700 pb-1">Ưu Điểm</h3>
              <ul className="space-y-2 text-sm">
                {pros.map((pro, index) => (
                  <li key={index} className="mb-2">
                    <div className="font-bold text-gray-800 dark:text-white">{pro.title}</div>
                    <div className="text-gray-600 dark:text-gray-400">{pro.description}</div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Nhược điểm */}
            <div>
              <h3 className="text-lg font-bold mb-2 text-red-600 dark:text-red-400 border-b border-gray-200 dark:border-gray-700 pb-1">Nhược Điểm</h3>
              <ul className="space-y-2 text-sm">
                {cons.map((con, index) => (
                  <li key={index} className="mb-2">
                    <div className="font-bold text-gray-800 dark:text-white">{con.title}</div>
                    <div className="text-gray-600 dark:text-gray-400">{con.description}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview