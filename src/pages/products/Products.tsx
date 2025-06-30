import { Breadcrumb, Button, Flex, Space , Form ,  Image, Table, Tag, Typography, Spin, Drawer, theme} from "antd"
import {LoadingOutlined, PlusOutlined, RightOutlined} from '@ant-design/icons'
import { Link } from "react-router-dom"
import ProductsFilter from "./ProductsFilter"
import type { FeildData, Product } from '../../types'
import React from 'react';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProduct, getProducts } from '../../http/api';
import { format } from 'date-fns';
import { debounce } from "lodash"
import { useAuthStore } from "../../../store"
import ProductForm from "./forms/ProductForm"
import { makeFormData } from "./helper"

const PER_PAGE = 3

const columns = [
    {
        title: 'Product Name',
        dataIndex: 'name',
        key: 'name',
        render: (_text: string, record: Product) => {
            return (
                <div>
                    <Space>
                        <Image width={60} src={record.image} preview={false} />
                        <Typography.Text>{record.name}</Typography.Text>
                    </Space>
                </div>
            );
        },
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Status',
        dataIndex: 'isPublish',
        key: 'isPublish',
        render: (_: boolean, record: Product) => {
            return (
                <>
                    {record.isPublish ? (
                        <Tag color="green">Published</Tag>
                    ) : (
                        <Tag color="red">Draft</Tag>
                    )}
                </>
            );
        },
    },
    {
        title: 'CreatedAt',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text: string) => {
            return <Typography.Text>{format(new Date(text), 'dd/MM/yyyy HH:mm')}</Typography.Text>;
        },
    },
];

const Products = () => {
    const [form] = Form.useForm();
    const [filterForm] = Form.useForm();
    const {user} = useAuthStore();
    const [queryParams, setQueryParams] = React.useState({
        perPage: PER_PAGE,
        currentPage: 1,
        tenantId : user?.role === 'manager' ? user.tenant.id : undefined
    });

    const {
        data: products,
        isFetching,
        isError,
        error,
    } = useQuery({
        queryKey: ['products', queryParams],
        queryFn: () => {
            const filteredParams = Object.fromEntries(
                Object.entries(queryParams).filter((item) => !!item[1])
            );

            const queryString = new URLSearchParams(
                filteredParams as unknown as Record<string, string>
            ).toString();
            return getProducts(queryString).then((res) => {return res.data});
        },
        placeholderData: keepPreviousData,
    });

     const {
            token: { colorBgLayout },
        } = theme.useToken();
        const [drawerOpen, setDrawerOpen] = React.useState(false);

    const debouncedQUpdate = React.useMemo(() => {
        return debounce((value: string | undefined) => {
            setQueryParams((prev) => ({ ...prev, q: value, page: 1 }));
        }, 500);
    }, []);

    const onFilterChange = (changedFields: FeildData[]) => {
        const changedFilterFields = changedFields
            .map((item) => ({
                [item.name[0]]: item.value,
            }))
            .reduce((acc, item) => ({ ...acc, ...item }), {});
        if ('q' in changedFilterFields) {
            debouncedQUpdate(changedFilterFields.q);
        } else {
            setQueryParams((prev) => ({ ...prev, ...changedFilterFields, page: 1 }));
        }
    };

     const queryClient = useQueryClient()
    const { mutate: productMutate } = useMutation({
        mutationKey: ['product'],
        mutationFn: async (data: FormData) => createProduct(data).then((res) => res.data),
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            form.resetFields();
            setDrawerOpen(false);
            return;
        },
    });

    const onHandleSubmit = async () => {
        console.log(form.getFieldsValue());
        console.log('submiting...')
        await form.validateFields();

        const priceConfiguration = form.getFieldValue('priceConfiguration');
        const pricing = Object.entries(priceConfiguration).reduce((acc, [key, value]) => {
            const parsedKey = JSON.parse(key);
            return {
                ...acc,
                [parsedKey.configurationKey]: {
                    priceType: parsedKey.priceType,
                    availableOptions: value,
                },
            };
        }, {});

        const categoryId = JSON.parse(form.getFieldValue('categoryId'))._id;

        const attributes = Object.entries(form.getFieldValue('attributes')).map(([key, value]) => {
            return {
                name: key,
                value: value,
            };
        });

        const postData = {
            ...form.getFieldsValue(),
            isPublish: form.getFieldValue('isPublish') ? true : false,
            image: form.getFieldValue('image'),
            categoryId,
            priceConfiguration: pricing,
            attributes,
        };

        const formData = makeFormData(postData);
        await productMutate(formData);
    };

   
    return (
        <>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Flex justify='space-between'>
                        <Breadcrumb
                        separator={<RightOutlined />}
                        items={[{ title: <Link to="/">Dashboard</Link> }, { title: 'Products' }]}
                    />
                     {isFetching && (
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                    )}
                    {isError && <Typography.Text type="danger">{error.message}</Typography.Text>}
                </Flex>
            </Space>

            <Form form={filterForm} onFieldsChange={onFilterChange}>
                <ProductsFilter>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => {setDrawerOpen(true)}}>
                        Add Product
                    </Button>
                </ProductsFilter>
            </Form>

            <Table
                columns={[
                    ...columns,
                    {
                        title: 'Actions',
                        key : 'Actions',
                        render: () => {
                            return (
                                <Space>
                                    <Button type="link" onClick={() => {}}>
                                        Edit
                                    </Button>
                                </Space>
                            );
                        },
                    },
                ]}
                dataSource={products}
                rowKey={'id'}
                pagination={{
                    total: products?.total,
                    pageSize: queryParams.perPage,
                    current: queryParams.currentPage,
                    onChange: (page) => {
                        console.log(page);
                        setQueryParams((prev) => {
                            return {
                                ...prev,
                                currentPage: page,
                            };
                        });
                    },
                    showTotal: (total: number, range: number[]) => {
                        // console.log(total, range);
                        return `Showing ${range[0]}-${range[1]} of ${total} items`;
                    },
                }}
            />

            <Drawer
                title={'Add Product'}
                width={720}
                styles={{ body: { backgroundColor: colorBgLayout } }}
                destroyOnHidden={true}
                open={drawerOpen}
                onClose={() => {
                    form.resetFields();
                    setDrawerOpen(false);
                }}
                extra={
                    <Space>
                        <Button
                            onClick={() => {
                                form.resetFields();
                                setDrawerOpen(false);
                            }}>
                            Cancel
                        </Button>
                        <Button type="primary" onClick={onHandleSubmit}>
                            Submit
                        </Button>
                    </Space>
                }>
                <Form layout="vertical" form={form}>
                    <ProductForm/>
                </Form>
            </Drawer>
        </>
    )
}

export default Products