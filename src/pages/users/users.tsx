import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from 'antd'
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Link , Navigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUser, getUsers } from '../../http/api';
import type { CreateUserData, User } from '../../types';
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
    const [form] = Form.useForm();
    const queryClient = useQueryClient();

    const [queryParams , setQueryParams] = useState({
        perPage : 3,
        currentPage : 1
    })
    
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
        queryKey: ['users',queryParams],
        queryFn: () => {
            const queryString = new URLSearchParams(
                queryParams as unknown as Record<string,string>
            ).toString();
            console.log(queryString);
            return getUsers(queryString).then((res) => res.data);
        },
    });

    const { mutate: userMutate } = useMutation({
        mutationKey: ['user'],
        mutationFn: async (data: CreateUserData) => createUser(data).then((res) => res.data),
        onSuccess: async () => {
            queryClient.invalidateQueries({queryKey : ['users']})
            return;
        },
    });

    const {user} = useAuthStore();

    const onSubmitHandle = async ()=>{
        form.validateFields();
        userMutate(form.getFieldsValue());
        form.resetFields();
    }

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
                <Table 
                columns={columns} 
                dataSource={users?.data} 
                rowKey={'id'}
                pagination={
                    {
                        pageSize : queryParams.perPage,
                        total : users?.total,
                        current : queryParams.currentPage,
                        onChange : (page)=>{
                            setQueryParams((prev)=>{
                                return {
                                    ...prev,
                                    currentPage : page
                                }
                            })
                        }
                    }
                }
                />

                <Drawer
                    title='Create User'
                    width={720}
                    open={userDrawer}
                    styles={{body : {backgroundColor : colorBgLayout}}}
                    onClose={
                        ()=>{
                            setUserDrawer(false)
                            form.resetFields();
                        }
                    }
                    extra = {
                        <Space>
                            <Button onClick={
                                ()=>{
                                    form.resetFields();
                                    setUserDrawer(false);
                                }
                            }>Cancel</Button>
                            <Button type='primary' onClick={onSubmitHandle} >Submit</Button>
                        </Space>
                    }
                >
                
                    <Form layout='vertical' form={form}>
                        <UserForm />
                    </Form>

                </Drawer>
            </Space>
        </>
    );
};

export default Users;