import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/login/login";
import Dashboard from "./layouts/Dashboard";
import NoAuth from "./layouts/NoAuth";
import Root from "./layouts/Root";
import Users from "./pages/users/users";

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