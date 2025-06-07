import {Layout , Card, Space , Form , Input , Checkbox , Button , Flex} from 'antd';
import  { LockFilled, LockOutlined, UserOutlined } from '@ant-design/icons'
import Logo from '../../components/icons/Logo';

const LoginPage = () => {
  return (
    <>
        <Layout style={{display : 'grid' , height : '100vh' , placeItems : 'center' }}>
            <Space direction='vertical' size={'large'} align='center'>
                <Layout.Content>
                    <Logo />

                </Layout.Content>

                <Card 
                bordered={false}
                style={ {width : 300}}
                title={
                    <Space style={{width : '100%' , fontSize : 16 , justifyContent : 'center'}}>
                        <LockFilled />
                        Sign In
                    </Space>
                }>
                <Form initialValues={{Remember : true}}>
                    <Form.Item  name='UserName' rules={[
                        {
                            required : true,
                            message : 'Username is Required'
                        },
                        {
                            type : 'email',
                            message : 'please enter a valid email ID'
                        }
                    ]}>
                        <Input prefix={<UserOutlined />} placeholder='UserName' autoComplete='new-password' />
                    </Form.Item>
                    <Form.Item name='Password' rules={[
                        {
                            required : true,
                            message : 'Password is Required'
                        }
                    ]}>
                        <Input.Password prefix={<LockOutlined />} placeholder='Password' autoComplete='username'/>
                    </Form.Item>
                    <Flex justify='space-between'>
                        <Form.Item name='Remember' valuePropName='checked'>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a href="#" id='login-form-forgot'>Forgot Password</a>
                    </Flex>
                    <Form.Item name='Password'>
                        <Button type='primary' htmlType='submit' style={{width:'100%'} }>Log in</Button>
                    </Form.Item>
                </Form>


                </Card>
            </Space>
        </Layout>
    </>
  )
}

export default LoginPage