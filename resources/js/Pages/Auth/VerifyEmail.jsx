import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { Alert, Button, Card, Col, Form, Row, Typography } from 'antd';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm();

    const submit = () => {
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <Card className='auth-card'>
                <Typography.Paragraph style={{ marginBottom: 30 }}>
                    Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                    link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                </Typography.Paragraph>

                {status === 'verification-link-sent' && (
                    <Alert
                        style={{ marginTop: 10, marginBottom: 10 }}
                        message="A new verification link has been sent to the email address you provided during registration."
                        type='success'
                    />
                )}

                <Form
                    name="basic"
                    layout='vertical'
                    onFinish={submit}
                    autoComplete="off"
                >
                    <Row gutter={10}>
                        <Col span={12}>
                            <Button block type="primary" htmlType="submit" loading={processing}>
                                Resend Verification Email
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="div"
                            >
                                <Button block>
                                    Logout
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </GuestLayout>
    );
}
