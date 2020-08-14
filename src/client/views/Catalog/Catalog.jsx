import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getAvailableLocations from '../../utils/api/locations';
import Card from '../../components/Card/Card';
import RequestLocker from '../../components/forms/RequestLocker';
import './styles.css';

const Catalog = () => {
	const locations = useSelector((state) => state.locations);
	const [isFormOpen, setIsFormOpen] = useState({});

	useEffect(() => {
		getAvailableLocations();
	}, []);

	useEffect(() => {
		locations.map((location) => setIsFormOpen(
			{
				...isFormOpen,
				[location.id]: false,
			},
		));
	}, [locations]);

	const closeForm = (location) => setIsFormOpen({ ...isFormOpen, [location.id]: false });
	const openForm = (location) => setIsFormOpen({ ...isFormOpen, [location.id]: true });

	const catalogCards = locations.map(
		(location) => (
			<Card
				key={location.name}
				name={location.name}
				description={location.description}
				stats={{
					name: 'Taquillas libres',
					description: location.Lockers.length,
				}}
				actions={[
					{
						name: 'Solicitar Aquí',
						handler: () => openForm(location),
					},
				]}
			>
				<RequestLocker
					isOpen={isFormOpen[location.id] || false}
					closeForm={() => closeForm(location)}
					location={location}
				/>
			</Card>
		),
	);
	return (
		<div className="catalog">
			{catalogCards}
		</div>
	);
};

export default Catalog;
