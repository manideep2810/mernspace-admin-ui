import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from 'antd'
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Link , Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../http/api';
import type { User } from '../../types';
import { useAuthStore } from '../../../store';
import UsersFilter from './userFilter';
import { useState } from 'react';
import UserForm from './usersForm';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'firstName',
        key: 'firstName',
        render: (_text: string, record: User) => {
            return (
                <div>
                    {record.firstName} {record.lastName}
                </div>
            );
        },
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
    },
];

const Users = () => {

    
    const {
        token : {colorBgLayout}
    } = theme.useToken();
    const [userDrawer,setUserDrawer] = useState(false);
    const {
        data: users,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['users'],
        queryFn: () => {
            return getUsers().then((res) => res.data.users);
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
                    items={[{ title: <Link to="/">Dashboard</Link> }, { title: 'Users' }]}
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
                            ()=>setUserDrawer(true)
                        }>
                        Add User
                    </Button>
                </UsersFilter>
                <Table columns={columns} dataSource={users} rowKey={'id'}/>

                <Drawer
                    title='Create User'
                    width={720}
                    open={userDrawer}
                    styles={{body : {backgroundColor : colorBgLayout}}}
                    onClose={
                        ()=>setUserDrawer(false)
                    }
                    extra = {
                        <Space>
                            <Button>Cancel</Button>
                            <Button type='primary' >Submit</Button>
                        </Space>
                    }
                >
                
                    <Form layout='vertical'>
                        <UserForm />
                    </Form>

                </Drawer>
            </Space>
        </>
    );
};

export default Users;