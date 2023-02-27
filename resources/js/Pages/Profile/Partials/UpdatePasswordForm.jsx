import { useRef } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Button, Card, Form, Input, message, Typography } from 'antd';

export default function UpdatePasswordForm({ className }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const resetFormFields = (...fields) => {
        for (const field of fields) {
            form.setFieldValue(field, '');
        }
    };

    const updatePassword = () => {
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                resetFormFields('current_password', 'password', 'password_confirmation');
                messageApi.success('Your password has been updated.');
            },
            onError: () => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    resetFormFields('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    resetFormFields('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <>
            {contextHolder}
            <Card className={className}>
                <header className='mb-8'>
                    <Typography.Title level={4}>Update Password</Typography.Title>
                    
                    <Typography.Text type='secondary'>
                        Ensure your account is using a long, random password to stay secure.
                    </Typography.Text>
                </header>

                <Form
                    layout='vertical'
                    initialValues={data}
                    form={form}
                    onFieldsChange={(changedFields) => {
                        changedFields.forEach(item => {
                            setData(item.name[0], item.value);
                        })
                    }}
                    onFinish={updatePassword}
                    >
                    <Form.Item
                        label="Current Password"
                        name="current_password"
                        validateStatus={errors.current_password && 'error'}
                        help={errors.current_password}
                        >
                        <Input.Password ref={currentPasswordInput} autoComplete="current-password" />
                    </Form.Item>

                    <Form.Item
                        label="New Password"
                        name="password"
                        validateStatus={errors.password && 'error'}
                        help={errors.password}
                        >
                        <Input.Password ref={passwordInput} autoComplete="new-password" />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="password_confirmation"
                        validateStatus={errors.password_confirmation && 'error'}
                        help={errors.password_confirmation}
                        >
                        <Input.Password autoComplete="new-password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType='submit' loading={processing}>Save</Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
}
