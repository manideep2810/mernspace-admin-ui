import {Card, Col, Form, Input, Row } from 'antd'
import type { ReactNode } from 'react';

type filterChangeProp = {
    children : ReactNode 
}

const UsersFilter = ({children} : filterChangeProp ) => {
    return (
        <Card>
            <Row justify="space-between">
                <Col span={16}>
                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item name={'q'}>
                                <Input.Search placeholder="Search"/>
                            </Form.Item>
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