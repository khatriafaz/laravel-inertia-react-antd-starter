import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';

import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { Button, Card, Form, Input, Typography, Checkbox, Space } from 'antd';

export default function Login() {
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
        <GuestLayout>
            <Head title="Log in" />

            <Card className='auth-card'>
                <Typography.Title style={{fontWeight: 400, marginBottom: 30 }} level={4}>Login to the application</Typography.Title>

                <Form
                    name="basic"
                    layout='vertical'
                    initialValues={data}
                    onFieldsChange={(_, allFields) => {
                        const fieldData = {};
                        allFields.forEach(item => {
                            fieldData[item.name] = item.value
                        })
                        setData(fieldData);
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
                            <Typography.Link>
                                Don't have an account ?
                            </Typography.Link>
                        </Link>
                    </Space>
                </Form>

            </Card>
        </GuestLayout>
    );
}
