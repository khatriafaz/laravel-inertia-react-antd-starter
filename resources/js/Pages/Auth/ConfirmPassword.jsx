import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import { Button, Card, Form, Input, Typography } from 'antd';

function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = () => {
        post(route('password.confirm'));
    };

    return (
        <>
            <Head title="Confirm Password" />

            <Card className='auth-card'>
                <Typography.Title level={4}>
                    Confirm Password
                </Typography.Title>

                <Typography.Paragraph style={{ marginBottom: 30 }}>
                    This is a secure area of the application. Please confirm your password before continuing.
                </Typography.Paragraph>

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
                            label="Password"
                            name="password"
                            validateStatus={errors.password && 'error'}
                            help={errors.password}
                        >
                            <Input.Password />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" loading={processing}>
                        Confirm
                    </Button>
                </Form>
            </Card>
        </>
    );
}

ConfirmPassword.layout = page => <GuestLayout children={page} showTitle={false} />

export default ConfirmPassword;