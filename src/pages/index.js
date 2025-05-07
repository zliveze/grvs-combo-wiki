import Head from 'next/head';
import Link from 'next/link';
import CombatNotationGuide from '../components/ui/CombatNotationGuide'; 

const characters = [
    { name: 'Anre', icon: 'https://www.dustloop.com/wiki/images/1/1f/GBVS_Anre_Icon.png' },
    { name: 'Avatar Belial', icon: 'https://www.dustloop.com/wiki/images/b/b5/GBVS_Avatar_Belial_Icon.png' },
    { name: 'Beelzebub', icon: 'https://www.dustloop.com/wiki/images/f/fd/GBVS_Beelzebub_Icon.png' },
    { name: 'Belial', icon: 'https://www.dustloop.com/wiki/images/b/bb/GBVS_Belial_Icon.png' },
    { name: 'Cagliostro', icon: 'https://www.dustloop.com/wiki/images/c/c7/GBVS_Cagliostro_Icon.png' },
    { name: 'Charlotta', icon: 'https://www.dustloop.com/wiki/images/4/46/GBVS_Charlotta_Icon.png' },
    { name: 'Djeeta', icon: 'https://www.dustloop.com/wiki/images/1/15/GBVS_Djeeta_Icon.png' },
    { name: 'Eustace', icon: 'https://www.dustloop.com/wiki/images/c/c1/GBVS_Eustace_Icon.png' },
    { name: 'Ferry', icon: 'https://www.dustloop.com/wiki/images/a/a0/GBVS_Ferry_Icon.png' },
    { name: 'Gran', icon: 'https://www.dustloop.com/wiki/images/2/21/GBVS_Gran_Icon.png' },
    { name: 'Katalina', icon: 'https://www.dustloop.com/wiki/images/a/aa/GBVS_Katalina_Icon.png' },
    { name: 'Ladiva', icon: 'https://www.dustloop.com/wiki/images/5/52/GBVS_Ladiva_Icon.png' },
    { name: 'Lancelot', icon: 'https://www.dustloop.com/wiki/images/2/26/GBVS_Lancelot_Icon.png' },
    { name: 'Lowain', icon: 'https://www.dustloop.com/wiki/images/3/3c/GBVS_Lowain_Icon.png' },
    { name: 'Metera', icon: 'https://www.dustloop.com/wiki/images/5/50/GBVS_Metera_Icon.png' },
    { name: 'Narmaya', icon: 'https://www.dustloop.com/wiki/images/5/5e/GBVS_Narmaya_Icon.png' },
    { name: 'Percival', icon: 'https://www.dustloop.com/wiki/images/3/3d/GBVS_Percival_Icon.png' },
    { name: 'Seox', icon: 'https://www.dustloop.com/wiki/images/7/77/GBVS_Seox_Icon.png' },
    { name: 'Soriz', icon: 'https://www.dustloop.com/wiki/images/7/7d/GBVS_Soriz_Icon.png' },
    { name: 'Vaseraga', icon: 'https://www.dustloop.com/wiki/images/5/57/GBVS_Vaseraga_Icon.png' },
    { name: 'Vira', icon: 'https://www.dustloop.com/wiki/images/9/99/GBVS_Vira_Icon.png' },
    { name: 'Yuel', icon: 'https://www.dustloop.com/wiki/images/4/45/GBVS_Yuel_Icon.png' },
    { name: 'Zeta', icon: 'https://www.dustloop.com/wiki/images/f/f0/GBVS_Zeta_Icon.png' },
    { name: 'Zooey', icon: 'https://www.dustloop.com/wiki/images/f/f5/GBVS_Zooey_Icon.png' },
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

            {/* Tailwind CSS classes are applied directly */}
            <header className="bg-gray-800 text-white pt-8 min-h-[70px] border-b-4 border-blue-600 text-center">
                <h1 className="text-2xl font-bold mb-2.5">Wiki Combo Granblue Fantasy Versus</h1>
            </header>

            <div className="container mx-auto w-11/12 overflow-hidden py-5">
                <div className="mb-6 text-center">
                  <CombatNotationGuide />
                </div>
             </div>

            <footer className="text-center py-5 mt-10 text-white bg-gray-800">
                <p>&copy; 2023 Wiki Combo GBVS</p>
            </footer>
        </>
    );
}
