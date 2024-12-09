import './index.css'
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import TasksPage from "./components/pages/TasksPage.tsx";
import AuthPage from "./components/pages/AuthPage.tsx";
import { AuthProvider } from './logic/auth.ctx.tsx';
import { TasksProvider } from './logic/tasks.ctx.tsx';
import RootLayout from './components/RootLayout.tsx';


let router = createBrowserRouter([
    { path: "/", Component: TasksPage, },
    { path: "/auth", Component: AuthPage },
]);

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
        <AuthProvider>
            <TasksProvider>
                <RootLayout>
                    <RouterProvider router={router} />
                </RootLayout>
            </TasksProvider>
        </AuthProvider>
    // </StrictMode>,
)
