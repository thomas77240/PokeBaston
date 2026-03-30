import { useGameSetupContext } from '../hooks/useGameSetupContext';
import Button from '../components/ui/Button';
import { PokemonUtils } from '../utils/pokemon.utils';
import { motion } from 'framer-motion';
import { Swords, ChevronRight, Settings2, Award } from 'lucide-react';
import ConfigHeader from '@/components/TeamConfig/ConfigHeader';

const GameSetupSummary = () => {
    const { trainers, settings, submitSetup, prevStep, isSubmitting, setIsSubmitting } = useGameSetupContext();

    const handleStartBattle = async () => {
        setIsSubmitting(true);
        try {
            await submitSetup();
            // Optionnel : navigate('/battle') si tout s'est bien passé
        } catch (error) {
            console.error('Erreur lors du lancement du combat :', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        show: { opacity: 1, scale: 1, y: 0 },
    };

    return (
        <div className="flex flex-col h-full bg-background-50 overflow-hidden">
            {/* HEADER */}
            <ConfigHeader className="col-span-7" title="Récapitulatif" backButtonAction={prevStep} />

            {/* CONTENU PRINCIPAL - 3 Colonnes */}
            <div className="flex-1 flex overflow-hidden">

                {/* 1. DRESSEUR A (Gauche) */}
                <div className="flex-1 flex flex-col p-8 overflow-y-auto min-h-0 custom-scrollbar bg-background-400">
                    <div className="flex flex-col items-center mb-8 shrink-0">
                        <h2 className="text-4xl font-bold capitalize font-title text-neutral-900 mb-2 text-center">
                            {trainers.trainerA.name}
                        </h2>
                        <span className="px-4 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 rounded-full shadow-sm">
                            Dresseur A
                        </span>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-2 gap-4 max-w-xl mx-auto w-full"
                    >
                        {trainers.trainerA.team.map((member, index) => (
                            <motion.div
                                key={`summary-A-${member.pokemon.id}`}
                                variants={itemVariants}
                                className={`relative row-span-2 bg-white border border-background-300 shadow-sm rounded-xl p-4 flex flex-col items-center justify-center group transition-all duration-300 hover:shadow-md hover:border-blue-300 transform ${index  === 1 && 'row-start-2'} `}
                            >
                                <div className="absolute inset-0 rounded-xl bg-linear-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
								{index === 0 && <Award size={32} className='text-blue-400 absolute top-2 left-2 bg-blue-100 p-1 rounded-full'/>}
                                <img
                                    src={PokemonUtils.getImage(member.pokemon)}
                                    alt={member.pokemon.name}
                                    className="w-24 h-24 object-contain relative z-10 group-hover:scale-110 transition-transform duration-300 mb-2 drop-shadow-md"
                                />
                                <span className="font-bold text-neutral-800 capitalize relative z-10 text-center">
                                    {member.pokemon.name}
                                </span>
                                <div className="absolute top-2 right-2 text-[10px] font-bold text-neutral-400 bg-background-100 px-1.5 py-0.5 rounded border border-background-300">
                                    {member.moves.length} ATK
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* 2. PARAMÈTRES (Centre) */}
                <div className="w-80 shrink-0 flex flex-col bg-background-100 border-x border-background-600 shadow-inner z-10">
                    {/* Contenu défilable si besoin */}
                    <div className="flex-1 flex flex-col p-8 overflow-y-auto min-h-0">
                        <div className="flex flex-col items-center mb-8 shrink-0">
                            <div className="w-16 h-16 rounded-full bg-neutral-900 shadow-xl border-4 border-background-50 flex items-center justify-center mb-4 relative">
                                <Swords className="text-white relative z-10" size={28} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-widest text-neutral-900 font-title text-center">
                                Paramètres
                            </h3>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/* Paramètre : Niveau */}
                            <div className="bg-white border border-background-300 rounded-2xl p-5 flex flex-col items-center shadow-sm relative overflow-hidden">
                                <Settings2
                                    className="absolute -right-4 -bottom-4 text-background-200"
                                    size={80}
                                    strokeWidth={1}
                                />
                                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1 relative z-10">
                                    Niveau Global
                                </span>
                                <span className="text-4xl font-black text-neutral-900 font-title relative z-10">
                                    Lvl {settings.level}
                                </span>
                            </div>
                            {/* Tu pourras ajouter d'autres paramètres ici à l'avenir ! */}
                        </div>
                    </div>

                    {/* Bouton de lancement ancré en bas de la colonne */}
                    <div className="p-6 shrink-0 border-t border-background-300 bg-background-50">
                        <Button
                            onClick={handleStartBattle}
                            disabled={isSubmitting || trainers.trainerA.team.length === 0 || trainers.trainerB.team.length === 0}
                            className="w-full py-4 text-xl font-black uppercase tracking-widest shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 group"
                        >
                            {isSubmitting ? '...' : 'Combattre'}
                            {!isSubmitting && (
                                <ChevronRight
                                    size={24}
                                    className="group-hover:translate-x-1 transition-transform"
                                    strokeWidth={3}
                                />
                            )}
                        </Button>
                    </div>
                </div>

                {/* 3. DRESSEUR B (Droite) */}
                <div className="flex-1 flex flex-col p-8 overflow-y-auto min-h-0 custom-scrollbar bg-background-400">
                    <div className="flex flex-col items-center mb-8 shrink-0">
                        <h2 className="text-4xl font-bold capitalize font-title text-neutral-900 mb-2 text-center">
                            {trainers.trainerB.name}
                        </h2>
                        <span className="px-4 py-1 text-xs font-bold uppercase tracking-wider text-red-700 bg-red-100 rounded-full shadow-sm">
                            Dresseur B
                        </span>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-2 grid-rows-7 gap-4 max-w-xl mx-auto w-full"
                    >
                        {trainers.trainerB.team.map((member, index) => (
                            <motion.div
                                key={`summary-B-${member.pokemon.id}`}
                                variants={itemVariants}
                                className={`relative row-span-2 bg-white border border-background-300 shadow-sm rounded-xl p-4 flex flex-col items-center justify-center group transition-all duration-300 hover:shadow-md hover:border-red-300 transform ${index  === 1 && 'row-start-2'}`}
                            >
                                <div className="absolute inset-0 rounded-xl bg-linear-to-bl from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
								{index === 0 && <Award size={32} className='text-red-400 absolute top-2 left-2 bg-red-100 p-1 rounded-full'/>}
                                <img
                                    src={PokemonUtils.getImage(member.pokemon)}
                                    alt={member.pokemon.name}
                                    className="w-24 h-24 object-contain relative z-10 group-hover:scale-110 transition-transform duration-300 mb-2 drop-shadow-md"
                                />
                                <span className="font-bold text-neutral-800 capitalize relative z-10 text-center">
                                    {member.pokemon.name}
                                </span>
                                <div className="absolute top-2 right-2 text-[10px] font-bold text-neutral-400 bg-background-100 px-1.5 py-0.5 rounded border border-background-300">
                                    {member.moves.length} ATK
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default GameSetupSummary;