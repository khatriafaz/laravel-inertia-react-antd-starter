import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';

import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { Button, Card, Form, Input, Typography, Checkbox, Space } from 'antd';

function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = () => {
        post(route('login'));
    };

    return (
        <>
            <Head title="Log in" />

            <Card className='auth-card'>
                <Typography.Title style={{ fontWeight: 400, marginBottom: 30 }} level={4}>Login to the application</Typography.Title>

                <Form
                    name="basic"
                    layout='vertical'
                    initialValues={data}
                    onFieldsChange={(changedFields) => {
                        changedFields.forEach(item => {
                            setData(item.name[0], item.value);
                        })
                    }}
                    onFinish={submit}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        validateStatus={errors.email && 'error'}
                        help={errors.email}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        validateStatus={errors.password && 'error'}
                        help={errors.password}
                        extra={
                            <Link style={{ display: 'inline-block', margin: '5px 0' }} href={window.route('password.request')}>
                                Forgot password ?
                            </Link>
                        }
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Space size={16}>
                        <Button type="primary" htmlType="submit" loading={processing}>
                            Login
                        </Button>
                        <Link href={window.route('register')}>
                            Don't have an account ?
                        </Link>
                    </Space>
                </Form>

            </Card>
        </>
    );
}

Login.layout = page => <GuestLayout children={page} />

export default Login;