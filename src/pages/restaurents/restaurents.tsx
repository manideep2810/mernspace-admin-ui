import { Breadcrumb, Button, Drawer, Space, Table ,Form} from 'antd'
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import {  Link , Navigate } from 'react-router-dom';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTenant, getTenants } from '../../http/api';
import { useAuthStore } from '../../../store';
import UsersFilter from './restaurentsFilter';
import { useMemo, useState } from 'react';
import RestaurentForm from './restaurentForm';
import type { CreateRestaurentData, FeildData } from '../../types';
import { debounce } from 'lodash';

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
    const [form] = Form.useForm()
    const [filterForm] = Form.useForm()

    const [tenantDrawer,setTenantDrawer] = useState(false);

    const [queryParams , setQueryParams] = useState({
        perPage : 3,
        currentPage : 1
    })

    const queryClient = useQueryClient();
    const {
        data: tenants,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['Restaurents',queryParams],
        queryFn: async () => {
            const filteredParams = Object.fromEntries(
                Object.entries(queryParams).filter((item) => !!item[1])
            );
            const queryString = new URLSearchParams(
                filteredParams as unknown as Record<string,string>
            ).toString();
            // console.log(queryString);
            // console.log(queryParams);
            return getTenants(queryString).then((res) => res.data);
        },
        placeholderData : keepPreviousData
    });

    const { mutate: RestaurentMutate } = useMutation({
        mutationKey: ['user'],
        mutationFn: async (data: CreateRestaurentData) => createTenant(data).then((res) => res.data),
        onSuccess: async () => {
            queryClient.invalidateQueries({queryKey : ['Restaurents']})
            return;
        },
    });

    const onHandleSubmit = ()=>{
        form.validateFields();
        RestaurentMutate(form.getFieldsValue());
        form.resetFields();
        setTenantDrawer(false);
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

        console.log(changedFilterFeilds);
        
        debouncedQUpdate(changedFilterFeilds.q)

    }

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
                <Form form={filterForm} onFieldsChange={onFilterChange}>
                    <UsersFilter>
                        <Button type="primary" 
                            icon={<PlusOutlined />} 
                            onClick={
                                ()=>setTenantDrawer(true)
                            }>
                            Add Tenant
                        </Button>
                    </UsersFilter>
                </Form>
                <Table 
                columns={columns} 
                dataSource={tenants?.data} 
                rowKey={'id'}
                pagination={
                    {
                        pageSize : queryParams.perPage,
                        current : queryParams.currentPage,
                        total : tenants?.total,
                        onChange : (page) => {
                            setQueryParams((prev)=>{
                                // console.log('hi');  
                                return {
                                    ...prev,
                                    currentPage : page
                                }
                                
                            })
                        },
                        showTotal : (total : number , range : number[]) => {
                            return `Showing ${range[0]}-${range[1]} of ${total} items`
                        }
                    }
                }
                />

                <Drawer
                    title='Create Tenant'
                    width={720}
                    open={tenantDrawer}
                    onClose={
                        ()=>setTenantDrawer(false)
                    }
                    extra = {
                        <Space>
                            <Button onClick={
                                ()=>setTenantDrawer(false)
                            }>Cancel</Button>
                            <Button type='primary' onClick={onHandleSubmit}>Submit</Button>
                        </Space>
                    }
                >
                    <Form form={form} layout='vertical'>
                        <RestaurentForm />
                    </Form>

                </Drawer>
            </Space>

            
        </>
    );
};

export default Restaurents;