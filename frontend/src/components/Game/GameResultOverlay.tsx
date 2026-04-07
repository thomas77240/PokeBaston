import { useGameStore } from "@/stores/useGameStore";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { Trophy } from "lucide-react"; // Si tu n'utilises pas lucide-react, tu peux retirer l'icône

const GameResultOverlay = () => {
    const { phase, winner } = useGameStore();
    const navigate = useNavigate(); // Par convention, on l'appelle "navigate"

    return (
        <AnimatePresence>
            {/* L'overlay ne s'affiche QUE si la phase est FINISHED */}
            {phase === 'FINISHED' && (
                <motion.div
                    key="result-overlay"
                    // z-[100] pour s'assurer qu'il passe au-dessus de tout le reste
                    // bg-black/80 et backdrop-blur-sm créent un fond sombre flouté très stylé
                    className="absolute inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* La carte de résultat qui rebondit de bas en haut */}
                    <motion.div
                        initial={{ scale: 0.8, y: 50, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.5, duration: 0.7, delay: 0.2 }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col items-center max-w-lg w-full relative overflow-hidden"
                    >
                        {/* Petite bordure décorative en haut de la carte */}

                        <Trophy className="w-20 h-20 text-yellow-500 mb-6 drop-shadow-md" />

                        <h2 className="text-3xl md:text-4xl font-title font-black text-neutral-800 mb-4 text-center uppercase tracking-wider">
                            Fin du Combat !
                        </h2>

                        {winner ? (
                            <div className="text-center mb-10 w-full">
                                <p className="text-lg font-main text-neutral-500 mb-2 font-bold uppercase tracking-widest">
                                    Victoire de
                                </p>
                                <div className="bg-yellow-50 border-2 border-yellow-200 py-3 px-6 rounded-xl w-full">
                                    <p className="text-3xl font-title font-bold text-yellow-700">
                                        {winner.name}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center mb-10 w-full">
                                <div className="bg-neutral-100 border-2 border-neutral-300 py-3 px-6 rounded-xl w-full">
                                    <p className="text-2xl font-title font-bold text-neutral-600">
                                        Égalité Parfaite !
                                    </p>
                                </div>
                            </div>
                        )}

                        <Button
                            onClick={() => navigate("/")}
                            className="w-full py-4 text-lg font-bold shadow-lg transition-transform hover:-translate-y-1"
                        >
                            Retour au Menu Principal
                        </Button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GameResultOverlay;