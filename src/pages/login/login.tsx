import {Layout , Card, Space , Form , Input , Checkbox , Button , Flex, Alert} from 'antd';
import  { LockFilled, LockOutlined, UserOutlined } from '@ant-design/icons'
import Logo from '../../components/icons/Logo';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { userData } from '../../types';
import { login , self } from '../../http/api';
import { useAuthStore } from '../../../store'

const LoginUser = async (UserData : userData)=>{
    const { data  } = await login(UserData);
    return data;
}

const getSelf = async ()=>{
    const { data } = await self();
    return data;
}

const LoginPage = () => {

    const {setUser} = useAuthStore();

    const {refetch} = useQuery({
        queryKey : ['self'],
        queryFn : getSelf,
        enabled : false
    })
    
    const { mutate, isPending , isError , error } = useMutation({
        mutationKey : ['login'],
        mutationFn : LoginUser,
        onSuccess : async ()=>{
            const respose = await refetch();
            setUser(respose.data);
            // console.log(SelfData);
            // console.log('logged in succesfully...')
        }
    })
  
  
    return (
    <>
        <Layout style={{display : 'grid' , height : '100vh' , placeItems : 'center' }}>
            <Space direction='vertical' size={'large'} align='center'>
                <Layout.Content>
                    <Logo />

                </Layout.Content>

                <Card 
                style={ {width : 300}}
                title={
                    <Space style={{width : '100%' , fontSize : 16 , justifyContent : 'center'}}>
                        <LockFilled />
                        Sign In
                    </Space>
                }>
                <Form
                onFinish = {(values)=>{
                    mutate({email : values.UserName , password : values.Password})
                }}
                initialValues={{Remember : true}}>
                    {isError && <Alert style={{marginBottom : 24}} type='error' message={error.message}/> }
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
                        <Input prefix={<UserOutlined />} placeholder='UserName'/>
                    </Form.Item>
                    <Form.Item name='Password' rules={[
                        {
                            required : true,
                            message : 'Password is Required'
                        }
                    ]}>
                        <Input.Password prefix={<LockOutlined />} placeholder='Password' />
                    </Form.Item>
                    <Flex justify='space-between'>
                        <Form.Item name='Remember' valuePropName='checked'>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a href="#" id='login-form-forgot'>Forgot Password</a>
                    </Flex>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' loading={ isPending } style={{width:'100%'}}>Log in</Button>
                    </Form.Item>
                </Form>


                </Card>
            </Space>
        </Layout>
    </>
  )
}

export default LoginPage