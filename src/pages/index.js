import Head from 'next/head';

import CombatNotationGuide from '../components/ui/CombatNotationGuide';
import DefaultLayout from '@/components/layout/defaultLayout';
import Sidebar from '@/components/layout/Sidebar';


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
