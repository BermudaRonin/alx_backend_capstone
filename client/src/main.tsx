import './website/styles.css'
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import TasksPage from "./tasks/pages/TasksPage.tsx";
import AuthPage from "./auth/pages/AuthPage.tsx";
import Layout from './website/components/Layout.tsx';
import Services from './website/Services.tsx';
import { PrivateRoute, PublicRoute } from './auth/AuthRoutes.tsx';

const ErrorPage = () => <div>Page not found!</div>;

let router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: <Layout />,
        children: [
            { path: "/", element: <PrivateRoute><TasksPage /></PrivateRoute> },
            { path: "/auth", element: <PublicRoute><AuthPage /></PublicRoute> },
        ]
    },
]);

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <Services>
        <RouterProvider router={router} />
    </Services>
    // </StrictMode>,
)
