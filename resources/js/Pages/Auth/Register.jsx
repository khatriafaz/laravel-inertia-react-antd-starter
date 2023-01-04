import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';

import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { Button, Card, Form, Input, Typography, Checkbox, Space } from 'antd';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = () => {
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <Card className='auth-card'>
                <Typography.Title style={{ fontWeight: 400, marginBottom: 30 }} level={4}>Register with Ressy</Typography.Title>

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
                        label="Name"
                        name="name"
                        validateStatus={errors.name && 'error'}
                        help={errors.name}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        validateStatus={errors.email && 'error'}
                        help={errors.email}
                    >
                        <Input type='email' />
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
                        label="Confirm Password"
                        name="password_confirmation"
                        validateStatus={errors.password_confirmation && 'error'}
                        help={errors.password_confirmation}
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
                            Register
                        </Button>
                        <Link href={window.route('login')}>
                            Already have an account ?
                        </Link>
                    </Space>
                </Form>
            </Card>
        </GuestLayout>
    );
}
