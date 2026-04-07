import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swords, Sparkles } from 'lucide-react';

const Home = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-neutral-50 flex flex-col items-center justify-center">

            {/* Décoration de fond : clins d'œil aux versions Rouge et Bleu */}
            <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-red-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: -50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
                className="z-10 flex flex-col items-center gap-12"
            >
                {/* Section Titre */}
                <div className="text-center relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring' }}
                        className="absolute -top-6 -right-8 text-yellow-500"
                    >
                        <Sparkles size={40} />
                    </motion.div>

                    <h1 className="text-7xl md:text-9xl font-title font-black text-neutral-800 drop-shadow-sm tracking-widest uppercase italic">
                        Poke<span className="text-red-500">Baston</span>
                    </h1>
                    <p className="text-neutral-500 font-main text-xl md:text-2xl mt-4 tracking-widest uppercase font-bold">
                        Le simulateur de combat ultime
                    </p>
                </div>

                {/* Section Bouton CTA */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                        to={'/setup'}
                        className="group relative flex items-center gap-6 bg-white border-2 border-neutral-200 px-8 py-4 rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-lg hover:border-red-200 hover:-translate-y-1"
                    >
                        {/* Effet de fond au survol */}
                        <div className="absolute inset-0 bg-red-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />

                        <span className="font-title text-2xl font-bold text-neutral-800 z-10 relative transition-colors group-hover:text-red-600">
                            Lancer une game
                        </span>

                        <div className="bg-neutral-100 p-3 rounded-xl z-10 relative group-hover:bg-red-500 transition-colors duration-300">
                            <Swords className="text-neutral-600 group-hover:text-white transition-colors duration-300" size={28} />
                        </div>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Petit footer discret en bas */}
            <div className="absolute bottom-6 text-neutral-400 font-main text-sm tracking-widest uppercase font-semibold">
                Projet L3 MIAGE • Prêt pour le combat ?
            </div>
        </div>
    );
};

export default Home;