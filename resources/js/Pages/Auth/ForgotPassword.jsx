import GuestLayout from '@/Layouts/GuestLayout';

import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { Button, Card, Form, Input, Space, Typography } from 'antd';

export default function ForgotPassword() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = () => {
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <Card className='auth-card'>
                <div style={{ marginBottom: 30 }}>
                    <Typography.Title style={{ fontWeight: 400 }} level={4}>Forgot your password?</Typography.Title>

                    <Typography.Text>No problem. Just let us know your email address and we will email you a password
                    reset link that will allow you to choose a new one.</Typography.Text>
                </div>

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

                    <Space direction='vertical' size={16}>
                        <Button type="primary" htmlType="submit" loading={processing}>
                            Email Password Reset Link
                        </Button>
                        <Link href={window.route('login')}>
                            Back to login
                        </Link>
                    </Space>
                </Form>

            </Card>
        </GuestLayout>
    );
}
