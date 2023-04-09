import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';

import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { Button, Card, Form, Input, Typography, Space } from 'antd';

function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = () => {
        post(route('password.store'));
    };

    return (
        <>
            <Head title="Reset Password" />

            <Card className='auth-card'>
                <Typography.Title style={{ fontWeight: 400, marginBottom: 30 }} level={4}>Reset Password</Typography.Title>

                <Form
                    name="basic"
                    layout='vertical'
                    initialValues={{
                        email: data.email,
                        password: data.password,
                        password_confirmation: data.password_confirmation,
                    }}
                    onFieldsChange={(changedFields) => {
                        changedFields.forEach(item => {
                            setData(item.name[0], item.value)
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
                        <Input autoComplete='username' />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        validateStatus={errors.password && 'error'}
                        help={errors.password}
                    >
                        <Input.Password autoComplete="new-password" />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="password_confirmation"
                        validateStatus={errors.password_confirmation && 'error'}
                        help={errors.password_confirmation}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Space size={16}>
                        <Button type="primary" htmlType="submit" loading={processing}>
                            Reset password
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

ResetPassword.layout = page => <GuestLayout children={page} />

export default ResetPassword;