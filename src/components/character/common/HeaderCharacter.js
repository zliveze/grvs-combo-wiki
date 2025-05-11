import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const HeaderCharacter = ({ characterData }) => {
  const router = useRouter()
  const characterPath = `/character/${characterData.name.toLowerCase()}`
  
  const pages = [
    { path: `${characterPath}`, name: 'Tổng Quan' },
    { path: `${characterPath}/combos`, name: 'Combos' },
    { path: `${characterPath}/framedata`, name: 'Frame Data' },
    { path: `${characterPath}/strategy`, name: 'Chiến Lược' }
  ]
  
  // Xác định trang hiện tại
  const currentPath = router.pathname
  
  return (
    <>
      {/* Header với tên nhân vật và icon */}
      <div className="flex items-center mb-6">
        {characterData.icon && (
          <Image
            src={characterData.icon}
            alt={`${characterData.name} Icon`}
            width={48}
            height={48}
            className="mr-3"
          />
        )}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{characterData.name}</h1>
      </div>

      {/* Thanh Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <nav className="flex overflow-x-auto">
          {pages.map((page) => (
            <Link 
              key={page.path}
              href={page.path}
              className={`px-4 py-3 text-sm md:text-base font-medium whitespace-nowrap ${
                (currentPath === page.path || 
                 (currentPath === router.route && page.path === characterPath))
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {page.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default HeaderCharacter 