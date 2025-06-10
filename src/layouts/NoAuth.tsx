import { Outlet } from 'react-router-dom'

const NoAuth = () => {
  return (
    <div>
        NoAuth
        <Outlet />
    </div>

  )
}

export default NoAuth