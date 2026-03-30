interface TrainerDashboardProps {
    trainer: 'A' | 'B';
}

const TrainerDashboard = ({ trainer }: TrainerDashboardProps) => {
	return <div className="w-full h-full">TrainerDashboard {trainer}</div>;
};

export default TrainerDashboard;
