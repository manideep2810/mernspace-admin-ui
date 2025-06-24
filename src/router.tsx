import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/login/login";
import Dashboard from "./layouts/Dashboard";
import NoAuth from "./layouts/NoAuth";
import Root from "./layouts/Root";
import Users from "./pages/users/users";
import Restaurents from "./pages/restaurents/restaurents";
import Products from "./pages/products/Products";

export const router = createBrowserRouter([
    {
        path : '',
        element : <Root />,
        children : [
            {
                path : '',
                element : <Dashboard />,
                children : [
                    {
                        path : '',
                        element : <Homepage />
                    },
                    {
                        path : '/users',
                        element : <Users />
                    },
                    {
                        path : '/restaurents',
                        element : <Restaurents />
                    },
                    {
                        path : '/products',
                        element : <Products />
                    }
                ]
            },
            {
                path : '/auth',
                element : <NoAuth />,
                children : [
                    {
                        path : 'login',
                        element : <LoginPage />
                    },
                ]
            },
        ]
    },
  
])