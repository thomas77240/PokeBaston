import { useState } from 'react';
import { Link } from 'react-router-dom';

interface User {
	id: number;
	pseudo: string;
	email: string;
}

const Home = () => {
	const [user, setUser] = useState<User | null>(null);
	const getUser = () => {
		fetch('/api/test')
			.then((res) => res.json())
			.then(setUser);
	};
	return (
		<div className="flex flex-col gap-2 items-center justify-center h-screen">
			<h1 className='text-2xl'>Acceuil PokeBaston</h1>
			<button className='p-2 px-4 bg-slate-200 hover:bg-slate-300 cursor-pointer rounded-sm' onClick={() => getUser()}>Exemple Call API</button>
			{user && (
				<div>
					<h2>{user.pseudo}</h2>
					<h2>{user.id}</h2>
					<h2>{user.email}</h2>
				</div>
			)}
			<Link className='p-2 px-4 bg-slate-200 hover:bg-slate-300 cursor-pointer rounded-sm' to={'/game'}>Lancer une game</Link>
		</div>
	);
};

export default Home;
