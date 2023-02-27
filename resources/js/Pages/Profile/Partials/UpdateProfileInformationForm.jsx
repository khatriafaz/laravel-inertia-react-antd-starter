import { useForm, usePage } from '@inertiajs/inertia-react';
import { Alert, Button, Card, Form, Input, message, Space, Typography } from 'antd';

import { CheckCircleFilled } from '@ant-design/icons';
import { Inertia } from '@inertiajs/inertia';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className }) {
    const [messageApi, contextHolder] = message.useMessage();

    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = () => {
        patch(route('profile.update'), {
            onSuccess: () => {
                messageApi.success('Your profile has been updated.');
            }
        });
    };

    const resendVerification = () => {
        Inertia.post(route('verification.send'));
    }

    return (
        <>
            {contextHolder}
            <Card className={className}>
                <header className='mb-8'>
                    <Typography.Title level={4}>Profile Information</Typography.Title>
                    
                    <Typography.Text type='secondary'>
                        Update your account's profile information and email address.
                    </Typography.Text>
                </header>

                <Form
                    layout='vertical'
                    initialValues={data}
                    onFieldsChange={(changedFields) => {
                        changedFields.forEach(item => {
                            setData(item.name[0], item.value);
                        })
                    }}
                    onFinish={submit}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            validateStatus={errors.name && 'error'}
                            help={errors.name}
                        >
                            <Input autoFocus />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            validateStatus={errors.email && 'error'}
                            help={errors.email}
                        >
                            <Input />
                        </Form.Item>

                        {mustVerifyEmail && user.email_verified_at === null && (
                            <Space size={12} className='mb-4' direction='vertical'>
                                <Typography.Text>
                                    Your email address is unverified. &nbsp;
                                    <Typography.Link
                                        onClick={resendVerification}
                                    >
                                        Click here to re-send the verification email.
                                    </Typography.Link>
                                </Typography.Text>

                                {status === 'verification-link-sent' && (
                                    <Alert type='success'
                                        message='A new verification link has been sent to your email address.'
                                        icon={<CheckCircleFilled />}
                                        showIcon={true} />
                                )}
                            </Space>
                        )}

                        <Form.Item>
                            <Button type='primary' htmlType='submit' loading={processing}>Save</Button>
                        </Form.Item>
                </Form>
            </Card>
        </>
    );
}
