import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';
import { Col, Layout, Row, Typography } from 'antd';

export default function Guest({ children }) {
    return (
        <Layout className='guest-layout'>
            <Layout.Content>
                <Typography.Title level={2}>Ressy App</Typography.Title>
                <div className='guest-content'>
                    {children}
                </div>
            </Layout.Content>
        </Layout>
    );
}
