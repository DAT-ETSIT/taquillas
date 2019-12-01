import React from 'react';

export default function ErrorView(props) {
	const { location: { pathname }, code } = props;

	let content;
	if (code === 404) {
		content = (
			<div>
				<h3>
					Errrhhh... ¿Cómo has llegado aquí?
				</h3>
				<p>
					La página que has pedido
					(<span className="monospaced">{pathname}</span>) no existe.
				</p>
			</div>
		);
	} else {
		content = (
			<div>
				<h3>
					Ouch. Top Profe no se encuentra muy bien...
				</h3>
				<p>
					Ha habido un problema inesperado al atender tu petición.
					Por favor, avísanos para que podamos arreglarlo enviando un
					correo a <a href="mailto:dat@sscc.etsit.upm.es">dat@sscc.etsit.upm.es</a>.
				</p>
			</div>
		);
	}

	return (
		<div>
			<h2>{code}</h2>
			{content}
		</div>
	);
}
