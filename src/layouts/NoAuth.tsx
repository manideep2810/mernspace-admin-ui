import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store';

const NoAuth = () => {
    const { user } = useAuthStore();
    if(user){
        return <Navigate to='/' />
    }
    return (
        <div>
            NoAuth
            <Outlet />
        </div>

    )
}

export default NoAuth