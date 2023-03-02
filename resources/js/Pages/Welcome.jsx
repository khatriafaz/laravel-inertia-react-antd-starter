import { Link, Head } from '@inertiajs/inertia-react';
import { Button, Col, Row, Typography } from 'antd';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <div className='d-flex justify-center align-center h-100vh'>
                <Row justify="center">
                    <Col className='text-center'>
                        <Typography.Title level={2}>Welcome to Laravel Inertia Starter App</Typography.Title>
                        <Link href={window.route('login')}>
                            <Button type="primary">Login</Button>
                        </Link>
                    </Col>
                </Row>
            </div>
        </>
    );
}
