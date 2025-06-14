import { Breadcrumb, Button, Drawer, Space, Table } from 'antd'
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Link , Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTenants } from '../../http/api';
import { useAuthStore } from '../../../store';
import UsersFilter from './restaurentsFilter';
import { useState } from 'react';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'firstName',
        
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'email',
    },
];

const Restaurents = () => {
    const [tenantDrawer,setTenantDrawer] = useState(false);
    const {
        data: tenants,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['users'],
        queryFn: () => {
            return getTenants().then((res) => res.data.tenants);
        },
    });

    const {user} = useAuthStore();
    if(user && user.role=='manager'){
        return <Navigate to="/"/>
    }

    return (
        <>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Breadcrumb
                    separator={<RightOutlined />}
                    items={[{ title: <Link to="/">Dashboard</Link> }, { title: 'Restaurents' }]}
                />
                {isLoading && <div>Loading...</div>}
                {isError && <div>{error.message}</div>}
                <UsersFilter onFilterChange={
                    (filterName : string , filterValue : string)=>{
                        console.log(filterName);
                        console.log(filterValue);
                    }
                }>
                    <Button type="primary" 
                        icon={<PlusOutlined />} 
                        onClick={
                            ()=>setTenantDrawer(true)
                        }>
                        Add Tenant
                    </Button>
                </UsersFilter>
                <Table columns={columns} dataSource={tenants} rowKey={'id'}/>

                <Drawer
                    title='Create Tenant'
                    width={720}
                    open={tenantDrawer}
                    onClose={
                        ()=>setTenantDrawer(false)
                    }
                    extra = {
                        <Space>
                            <Button>Cancel</Button>
                            <Button type='primary' >Submit</Button>
                        </Space>
                    }
                >

                </Drawer>
            </Space>
        </>
    );
};

export default Restaurents;