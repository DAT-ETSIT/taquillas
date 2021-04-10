import React, { useState } from 'react';
import Card from '../../components/Card/Card';
import EditProfile from '../../components/forms/EditProfile';
import './styles.css';

const Profile = (props) => {
	const { user } = props;
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="profile">
			<Card
				name={user.name}
				description={user.dni}
				stats={{
					name: 'E-mail',
					description: user.email,
				}}
				actions={[
					{
						name: 'Modificar Datos',
						handler: () => setIsOpen(true),
					},
				]}
			/>
			<EditProfile
				isOpen={isOpen}
				closeForm={() => setIsOpen(false)}
				user={user}
			/>
		</div>
	);
};

export default Profile;
