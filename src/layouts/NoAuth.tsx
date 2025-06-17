import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store';

const NoAuth = () => {
    const { user } = useAuthStore();
    const location = useLocation();

    if(user){   
        const ReturnTo = new URLSearchParams(location.search).get('ReturnTo') || '/'
        return <Navigate to={ReturnTo} />
    }
    return (
        <div>
            <Outlet />
        </div>

    )
}

export default NoAuth