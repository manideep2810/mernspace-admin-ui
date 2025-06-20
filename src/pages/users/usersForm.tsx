import { Card, Col, Form, Input, Row, Select, Space } from 'antd';
import { getTenants } from '../../http/api';
import { useQuery } from '@tanstack/react-query';
import type { Tenant } from '../../types';

const UserForm = ({isEditing = false} : {isEditing : boolean}) => {
    const SelctedRole = Form.useWatch('role');
    const { data: tenants } = useQuery({
        queryKey: ['tenants'],
        queryFn: async () => {
            return getTenants('').then((res) => {return res.data.data});
        },
    });
     
    return (
        <Row>
            <Col span={24}>
                <Space direction="vertical" size="large">
                    <Card title="Basic info">
                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item label="First name" name="firstName" rules={[
                                    {
                                        required : true,
                                        message : "First name Required"
                                    }
                                ]} >
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Last name" name="lastName"rules={[
                                    {
                                        required : true,
                                        message : "Last name Required"
                                    }
                                ]} >
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Email" name="email" rules={[
                                    {
                                        required : true,
                                        message : "email Required"
                                    },{
                                        type : 'email',
                                        message : 'invalid email'
                                    }
                                ]} >
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    {
                        !isEditing && (
                            <Card title="Security info">
                                <Row gutter={20}>
                                    <Col span={12}>
                                        <Form.Item label="Password" name="password" rules={[
                                            {
                                                required : true,
                                                message : "password Required"
                                            }
                                        ]} >
                                            <Input size="large" type="password" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        )
                    }

                    <Card title="Role">
                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item label="Role" name="role" rules={[
                                    {
                                        required : true,
                                        message : "Role Required"
                                    }
                                ]} >
                                    <Select
                                        size="large"
                                        style={{ width: '100%' }}
                                        allowClear={true}
                                        onChange={() => {}}
                                        placeholder="Select role">
                                        <Select.Option value="admin">Admin</Select.Option>
                                        <Select.Option value="manager">Manager</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            {
                                SelctedRole==='manager' && (
                                    <Col span={12}>
                                        <Form.Item label="Restaurant" name="tenantId"  rules={[
                                            {
                                                required : true,
                                                message : "Restaurent Required"
                                            }
                                        ]} >
                                            <Select
                                                size="large"
                                                style={{ width: '100%' }}
                                                allowClear={true}
                                                onChange={() => {}}
                                                placeholder="Select restaurant">
                                                    {
                                                        tenants?.map((tenant: Tenant) => {
                                                            // console.log(tenant);
                                                            return (
                                                                <Select.Option value={tenant.id} key={tenant.id}>
                                                                    {tenant.name}
                                                                </Select.Option>
                                                            )})
                                                    }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                )
                            }
                        </Row>
                    </Card>
                </Space>
            </Col>
        </Row>
    );
};

export default UserForm;