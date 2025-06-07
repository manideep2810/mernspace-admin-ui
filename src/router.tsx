import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Categories from "./pages/Categories";

export const router = createBrowserRouter([
    {
        path : '/',
        element : <Homepage />
    },
     {
        path : '/categories',
        element : <Categories />
    },
])