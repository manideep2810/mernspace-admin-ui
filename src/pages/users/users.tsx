import { Breadcrumb, Button, Drawer, Flex, Form, Space, Spin, Table, theme } from 'antd'
import { LoadingOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Link , Navigate } from 'react-router-dom';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUser, getUsers } from '../../http/api';
import type { CreateUserData, FeildData, User } from '../../types';
import { useAuthStore } from '../../../store';
import UsersFilter from './userFilter';
import { useMemo, useState } from 'react';
import UserForm from './usersForm';
import { debounce } from 'lodash';

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
    {
        title: 'Restaurant',
        dataIndex: 'tenant',
        key: 'tenant',
        render: (_text: string, record: User) => {
            return <div>{record.tenant?.name}</div>;
        },
    },
];

const Users = () => {
    const [form] = Form.useForm();
    const [filterform] = Form.useForm();
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
        isFetching,
        isError,
        error,
    } = useQuery({
        queryKey: ['users',queryParams],
        queryFn: async () => {
            const filteredParams = Object.fromEntries(
                Object.entries(queryParams).filter((item) => !!item[1])
            );
            const queryString = new URLSearchParams(
                filteredParams as unknown as Record<string,string>
            ).toString();
            console.log(queryString);
            return getUsers(queryString).then((res) => res.data);
        },
        placeholderData : keepPreviousData
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

    const debouncedQUpdate = useMemo(() => {
        return debounce((value: string | undefined) => {
            setQueryParams((prev) => ({ ...prev, q: value , currentPage : 1}));
        }, 500);
    }, []);

    const onFilterChange = async (changedFeilds : FeildData[])=>{

        const changedFilterFeilds = changedFeilds.map((item)=>(
            {
                [item.name[0]] : item.value
            }
        )).reduce((acc,item)=>({...acc,...item}),{})
        
        if('q' in changedFilterFeilds){
            debouncedQUpdate(changedFilterFeilds.q)
        }else{
            setQueryParams((prev)=>({...prev,...changedFilterFeilds , currentPage : 1}))
        }

    }

    if(user && user.role=='manager'){
        return <Navigate to="/"/>
    }

    return (
        <>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Flex justify='space-between'>
                    <Breadcrumb
                    separator={<RightOutlined />}
                    items={[{ title: <Link to="/">Dashboard</Link> }, { title: 'Users' }]}
                />
                    {isFetching && <Spin indicator={<LoadingOutlined spin />} />}
                    {isError && <div>{error.message}</div>}
                </Flex>
                
                <Form form={filterform} onFieldsChange={onFilterChange}>
                    <UsersFilter>
                        <Button type="primary" 
                            icon={<PlusOutlined />} 
                            onClick={
                                ()=>setUserDrawer(true)
                            }>
                            Add User
                        </Button>
                    </UsersFilter>
                </Form>

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