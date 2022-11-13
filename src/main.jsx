import reactDom from 'react-dom/client';
import App from './App';
import {
	createBrowserRouter,
	RouterProvider,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';
import '../styles/index.css';

const router = createBrowserRouter(
	createRoutesFromElements(<Route path={'/'} element={<App />} />)
);
reactDom
	.createRoot(document.getElementById('root'))
	.render(<RouterProvider router={router} />);
