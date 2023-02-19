import { createRoot } from 'react-dom/client';
import React from 'react';
import ReduxProvider from './redux/ReduxProvider';
import './public/style.css';

const root = createRoot(document.getElementById('root'));
root.render(
	<ReduxProvider />,
);
