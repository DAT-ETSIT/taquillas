import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAvailableLocations } from '../../utils/api/locations';
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

	const emptyCatalog = (
			<>
				<h2>Oops, parece que no hay taquillas disponibles ahora mismo.</h2>
				<h4>Si crees que esto puede ser un error, ponte en <a style={{color:"#F65555"}}href="mailto:dat@sscc.etsit.upm.es">contacto</a> con nosotros.</h4>
			</>
			
		);

	const isCatalogEmpty = catalogCards.length === 0;

	return (
		<div className="catalog">
			{isCatalogEmpty ? emptyCatalog : catalogCards}
		</div>
	);
};

export default Catalog;
