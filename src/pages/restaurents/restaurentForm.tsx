import { Card, Col, Form, Input, Row, Space } from 'antd';

const RestaurentForm = () => {
    
     
    return (
        <Row>
            <Col span={24}>
                <Space direction="vertical" size="large">
                    <Card title="Basic info">
                        <Row gutter={20}>
                            <Col span={24}>
                                <Form.Item label="Name" name="name" rules={[
                                    {
                                        required : true,
                                        message : "Name Required"
                                    }
                                ]} >
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Address" name="address" rules={[
                                    {
                                        required : true,
                                        message : "Address Required"
                                    }
                                ]} >
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Space>
            </Col>
        </Row>
    );
};

export default RestaurentForm;