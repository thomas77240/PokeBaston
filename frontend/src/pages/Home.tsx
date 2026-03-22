import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<>
			<div className="flex flex-col gap-2 items-center justify-center h-screen">
				<h1 className="text-7xl font-title">Accueil PokeBaston</h1>
				<Link
					className="p-2 px-4 bg-neutral-950 hover:bg-neutral-900 text-white cursor-pointer rounded-sm"
					to={'/setup'}
				>
					Lancer une game
				</Link>
			</div>
		</>
	);
};

export default Home;
