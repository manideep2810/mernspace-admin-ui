import { Navigate, Outlet , NavLink } from "react-router-dom"
import Icon, { UserOutlined } from '@ant-design/icons'
import { useAuthStore } from "../../store"
import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import Logo from "../components/icons/Logo";
import Home from "../components/icons/Home";
import { foodIcon } from "../components/icons/FoodIcon";
import GiftIcon from "../components/icons/GiftIcon";
import BasketIcon from "../components/icons/BasketIcon";

const {Sider , Header , Footer , Content} = Layout
const items = [
    {
        key : '/',
        icon : <Icon component={Home}/>,
        label : <NavLink to='/'>Home</NavLink>
    },
    {
        key : '/users',
        icon : <UserOutlined />,
        label : <NavLink to='/users'>Users</NavLink>
    },
    {
        key : '/orders',
        icon : <Icon component={BasketIcon}/>,
        label : <NavLink to='/orders'>Orders</NavLink>
    },
    {
        key : '/products',
        icon : <Icon component={foodIcon}/>,
        label : <NavLink to='/products'>Products</NavLink>
    },
    {
        key : '/promos',
        icon : <Icon component={GiftIcon}/>,
        label : <NavLink to='/promos'>Promos</NavLink>
    },
]

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { user } = useAuthStore();
    if(!user){
        return <Navigate to='/auth/login' />
    }
    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible theme="light" collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo" >
                    <Logo />
                </div>
                <Menu theme="light" defaultSelectedKeys={['/']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Mernspace Pizza Shop
                </Footer>
            </Layout>
            </Layout>
        </div>
    )
}

export default Dashboard