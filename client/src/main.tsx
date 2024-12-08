import './index.css'
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import TasksPage from "./pages/tasks.tsx";
import AuthPage from "./pages/auth.tsx";
import { AuthProvider } from './logic/auth.ctx.tsx';
import { TasksProvider } from './logic/tasks.ctx.tsx';
import Root from './components/website/root.tsx';


let router = createBrowserRouter([
    { path: "/", Component: TasksPage, },
    { path: "/auth", Component: AuthPage },
]);

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
        <AuthProvider>
            <TasksProvider>
                <Root>
                    <RouterProvider router={router} />
                </Root>
            </TasksProvider>
        </AuthProvider>
    // </StrictMode>,
)
