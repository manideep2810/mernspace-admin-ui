import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Categories from "./pages/Categories";
import LoginPage from "./pages/login/login";

export const router = createBrowserRouter([
    {
        path : '/',
        element : <Homepage />
    },
     {
        path : '/auth/login',
        element : <LoginPage />
    },
])