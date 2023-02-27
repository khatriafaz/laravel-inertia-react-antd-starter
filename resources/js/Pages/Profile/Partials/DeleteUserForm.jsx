import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Button, Card, Form, Input, Modal, Typography } from 'antd';

export default function DeleteUserForm({ className }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = () => {
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <Card className={`space-y-6 ${className}`}>
            <header className='mb-8'>
                <Typography.Title level={4}>Delete Account</Typography.Title>
                
                <Typography.Text type='secondary'>
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before
                    deleting your account, please download any data or information that you wish to retain.
                </Typography.Text>
            </header>

            <Button type='primary' danger onClick={confirmUserDeletion}>Delete Account</Button>

            <Modal
                open={confirmingUserDeletion}
                onCancel={closeModal}
                okText='Delete Account'
                onOk={deleteUser}
                okButtonProps={{ danger: 'danger', loading: processing }}
            >
                <Typography.Title level={4}>Are you sure you want to delete your account?</Typography.Title>
                
                <Typography.Text type='secondary'>
                    Once your account is deleted, all of its resources and data will be permanently deleted. Please
                    enter your password to confirm you would like to permanently delete your account.
                </Typography.Text>

                <Form
                    className='mt-6'
                    layout='vertical'
                    initialValues={data}
                    onFieldsChange={(changedFields) => {
                        changedFields.forEach(item => {
                            setData(item.name[0], item.value);
                        })
                    }}
                    onFinish={deleteUser}
                    >
                        <Form.Item
                            label="Password"
                            name="password"
                            validateStatus={errors.password && 'error'}
                            help={errors.password}
                            >
                            <Input.Password ref={passwordInput} autoFocus />
                        </Form.Item>
                    </Form>
            </Modal>
        </Card>
    );
}
