import Head from 'next/head';

import CombatNotationGuide from '../components/ui/CombatNotationGuide';
import DefaultLayout from '@/components/layout/defaultLayout';
import Sidebar from '@/components/layout/Sidebar';

const sections = [
  { id: 'overview', title: 'Tổng quan' },
  { 
    id: 'normal-moves', 
    title: 'Đòn đánh thường',
    subsections: [
      { id: 'light-attacks', title: 'Đòn đánh nhẹ' },
      { id: 'medium-attacks', title: 'Đòn đánh trung bình' },
      { id: 'heavy-attacks', title: 'Đòn đánh mạnh' }
    ] 
  },
  { 
    id: 'unique-action', 
    title: 'Hành động đặc biệt',
    subsections: [
      { id: 'u-action-ground', title: 'Trên mặt đất' },
      { id: 'u-action-air', title: 'Trên không' }
    ]
  },
  { id: 'universal-mechanics', title: 'Cơ chế chung' },
  { 
    id: 'special-moves', 
    title: 'Đòn đánh đặc biệt',
    subsections: [
      { id: 'specials-ground', title: 'Trên mặt đất' },
      { id: 'specials-air', title: 'Trên không' }
    ]
  },
  { id: 'skybound-art', title: 'Skybound Art' },
  { id: 'super-skybound-art', title: 'Super Skybound Art' },
  { id: 'notation-guide', title: 'Hướng dẫn chú thích' }
];

export default function Home() {
    return (
        <>
            <Head>
                <title>Wiki Combo GBVS</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Granblue Fantasy Versus Combo Wiki" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* Hướng dẫn chú thích */}
            <section id="notation-guide" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Hướng dẫn chú thích</h2>
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <CombatNotationGuide />
                </div>
            </section>
        </>
    );
}

Home.getLayout = function getLayout(page) {
  return (
    <DefaultLayout
      showSidebar={true}
      sidebar={<Sidebar sections={sections} title="Nội dung" />}
    >
      {page}
    </DefaultLayout>
  );
};
