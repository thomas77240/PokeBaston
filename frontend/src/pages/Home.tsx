import { Link } from 'react-router-dom';


const Home = () => {
	return (
		<>
			<div className="flex flex-col gap-2 items-center justify-center h-screen">
				<h1 className="text-7xl font-title">Acceuil PokeBaston</h1>
				<Link
					className="p-2 px-4 bg-background-light hover:bg-slate-300 cursor-pointer rounded-sm"
					to={'/setup'}
				>
					Lancer une game
				</Link>
			</div>

			{/* <div className="bg-background-light backdrop-blur-xl border border-white/10 p-6 rounded-[32px] hover:bg-white/5 transition-all duration-500 group relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

				<div className="flex items-center gap-4 mb-6 relative z-10">
					<div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-[2px]">
						<div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
							<img
								src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
								alt="Evoli"
								className="w-12"
							/>
						</div>
					</div>
					<div>
						<h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
							Evoli
						</h3>
						<span className="text-sm text-indigo-300 font-medium">Évolution Instable</span>
					</div>
				</div>

				<div className="flex gap-2 relative z-10">
					<span className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm hover:bg-white/10 transition-colors">
						Normal
					</span>
					<span className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm hover:bg-white/10 transition-colors">
						PV 300
					</span>
				</div>
			</div>

			<button className="relative group overflow-hidden px-8 py-3 rounded-full bg-gradient-to-r from-primary-start to-primary-end text-slate-950 font-bold uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(129,140,248,0.4)] hover:shadow-[0_0_30px_rgba(192,132,252,0.6)] transition-all duration-300 cursor-pointer">
				<div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
				COMBATTRE
			</button>

			<button className="px-6 py-2 rounded-full border border-glass bg-transparent text-text-muted font-medium text-sm hover:bg-white/5 hover:text-text-main hover:border-white/20 transition-all cursor-pointer">
				Détails
			</button>

			<div className="relative w-full max-w-sm">
				<svg
					className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
				<input
					type="text"
					placeholder="Rechercher Mewtwo, Pikachu..."
					className="w-full pl-12 pr-4 py-3 rounded-full bg-background-light border border-transparent text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-start/50 focus:border-glass focus:bg-slate-800/80 transition-all"
				/>
			</div>

			<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold tracking-wide shadow-[0_0_10px_rgba(244,63,94,0.2)]">
				<span className="h-1.5 w-1.5 rounded-full bg-rose-400"></span>
				FEU
			</span>

			<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-start/10 border border-secondary-start/20 text-secondary-start text-xs font-semibold tracking-wide shadow-[0_0_10px_rgba(34,211,238,0.2)]">
				<span className="h-1.5 w-1.5 rounded-full bg-secondary-start"></span>
				EAU
			</span>

			<div className="bg-background-light backdrop-blur-md border border-glass p-6 rounded-lg text-center hover:bg-slate-800 transition-colors duration-300 group">
				<div className="mx-auto w-24 h-24 rounded-full p-[3px] bg-gradient-to-br from-secondary-start to-primary-end shadow-lg mb-4">
					<div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
						<div className="w-16 h-16 rounded-full bg-slate-700"></div>
					</div>
				</div>

				<h4 className="text-xl font-bold text-text-main group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-text-main group-hover:to-secondary-start transition-all">
					Dresseur_Sacha
					<span className="inline-block h-2 w-2 rounded-full bg-success ml-2" title="En ligne"></span>
				</h4>
				<p className="text-sm text-text-muted mb-5">Villes-sur-Mer</p>

				<button className="px-5 py-1.5 rounded-full border border-glass bg-slate-700/50 text-xs font-semibold text-text-main hover:bg-slate-700 cursor-pointer">
					Voir Profil
				</button>
			</div>

			<div className="grid grid-cols-2 gap-3 p-4 bg-slate-800/50 border border-glass rounded-lg w-full max-w-sm">
				<h4 className="col-span-2 text-sm font-bold uppercase tracking-widest text-text-muted mb-1">
					Statistiques
				</h4>

				<div className="bg-background-light border border-glass p-3 rounded-md flex items-center gap-3 hover:bg-slate-700/50 transition-colors">
					<span className="text-2xl">💚</span>
					<div>
						<div className="text-xs text-text-muted">Points de Vie</div>
						<div className="text-xl font-bold text-success">350 HP</div>
					</div>
				</div>

				<div className="bg-background-light border border-glass p-3 rounded-md flex items-center gap-3 hover:bg-slate-700/50 transition-colors">
					<span className="text-2xl">⚔️</span>
					<div>
						<div className="text-xs text-text-muted">Attaque</div>
						<div className="text-xl font-bold text-text-main">110 ATK</div>
					</div>
				</div>

				<div className="col-span-2 mt-2 bg-slate-700/50 p-3 rounded-full border border-glass flex items-center gap-3">
					<span className="text-xs font-bold text-text-muted">LV.</span>
					<span className="text-xl font-bold text-primary-start">42</span>
					<div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
						<div className="h-full bg-gradient-to-r from-primary-start to-primary-end w-[70%] rounded-full shadow-[0_0_10px_rgba(192,132,252,0.5)]"></div>
					</div>
				</div>
			</div> */}
		</>
	);
};

export default Home;
