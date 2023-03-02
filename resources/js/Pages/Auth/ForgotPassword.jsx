import GuestLayout from '@/Layouts/GuestLayout';

import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { Button, Card, Form, Input, Space, Typography } from 'antd';

function ForgotPassword() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = () => {
        post(route('password.email'));
    };

    return (
        <>
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
        </>
    );
}

ForgotPassword.layout = page => <GuestLayout children={page} />;

export default ForgotPassword;