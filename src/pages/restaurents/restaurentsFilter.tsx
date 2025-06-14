import {Card, Col, Input, Row } from 'antd'
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
                        <Col span={12}>
                            <Input.Search placeholder="Search"  onChange={
                            (e)=>{
                                onFilterChange('searchFilter',e.target.value)
                            }
                        }/>
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