import React, { useState } from 'react';
import MaterialTable from 'material-table';

function Table(props) {
	const {
		data, title, columns, actions,
		create, update, remove, editable,
		showEmpty, detailPanel,
	} = props;
	const [filterActivated, setFilterActivated] = useState(false);
	let triggers = {};
	if (editable) {
		triggers = {
			onRowAdd: (newData) => create(newData),
			onRowUpdate: (newData, oldData) => update(newData, oldData),
			onRowDelete: (oldData) => remove(oldData),
		};
	}
	if (data.length === 0 && !showEmpty) {
		return (
			<div>
				<hr />
				<div style={{ textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold' }}> No hay {title.toLowerCase()} </div>
				<hr />
			</div>
		);
	}
	return (
		<MaterialTable
			title={title}
			columns={columns}
			data={data}
			editable={triggers}
			options={{
				filtering: filterActivated,
				selection: true,
			}}
			detailPanel={detailPanel}
			actions={[
				...actions,
				{
					icon: 'filter_list',
					tooltip: 'Filtrar datos',
					onClick: () => setFilterActivated(!filterActivated),
					position: 'toolbar',
				},
			]}
		/>
	);
}

export default Table;
