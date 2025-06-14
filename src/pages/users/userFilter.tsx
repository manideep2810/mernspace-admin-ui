import {Card, Col, Input, Row, Select } from 'antd'
import type { ReactNode } from 'react';

type filterChangeProp = {
    onFilterChange : (filterName : string , filterValue : string)=>void
    children : ReactNode 
}

const UsersFilter = ({onFilterChange , children} : filterChangeProp ) => {
    return (
        <Card>
            <Row justify="space-between">
                <Col span={16}>
                    <Row gutter={20}>
                        <Col span={8}>
                            <Input.Search placeholder="Search"  onChange={
                            (e)=>{
                                onFilterChange('searchFilter',e.target.value)
                            }
                        }/>
                        </Col>
                        <Col span={8}>
                            <Select
                                style={{ width: '100%' }}
                                allowClear={true}
                                placeholder="Select role"
                                onChange={
                                    (selectedItem)=>{
                                        onFilterChange('RoleFilter',selectedItem)
                                    }
                                }>
                                <Select.Option value="admin">Admin</Select.Option>
                                <Select.Option value="manager">Manager</Select.Option>
                                <Select.Option value="customer">Customer</Select.Option>
                            </Select>
                        </Col>
                        <Col span={8}>
                            <Select
                            style={{ width: '100%' }}
                            placeholder="Status"
                            allowClear={true}
                            onChange={
                                (selectedItem)=>{
                                    onFilterChange('RoleFilter',selectedItem)
                                }
                            }>
                                <Select.Option value="ban">Ban</Select.Option>
                                <Select.Option value="active">Active</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={8} style={{ display: 'flex', justifyContent: 'end' }}>
                    {children}
                </Col>
            </Row>
        </Card>
    );
};

export default UsersFilter;