import { Link, Head } from '@inertiajs/inertia-react';
import { Button, Col, Layout, Row, Space, Typography } from 'antd';

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
                <Row justify="center">
                    <Col>
                        <Typography.Title level={1}>Welcome to Ressy App</Typography.Title>
                        <Link href={window.route('login')}>
                            <Button type="primary">Login</Button>
                        </Link>
                    </Col>
                </Row>
        </>
    );
}
