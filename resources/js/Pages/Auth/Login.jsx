import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { Button, Card, Form, Input, Typography, Checkbox } from 'antd';

export default function Login({ status, canResetPassword }) {
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

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    const onFinish = (values) => {
        post(route('login'));
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <Card className='auth-card'>
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
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Typography.Title level={4}>Login to the application</Typography.Title>

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
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={processing}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>

                <Link href={window.route('register')}>
                    <Typography.Link>
                        Don't have an account ?
                    </Typography.Link>
                </Link>
            </Card>
        </GuestLayout>
    );
}
