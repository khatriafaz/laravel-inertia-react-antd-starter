import { Layout, Typography } from 'antd';

export default function Guest({ children }) {
    return (
        <Layout className='guest-layout'>
            <Layout.Content>
                <Typography.Title level={2}>Laravel Inertia Starter App</Typography.Title>
                <div className='guest-content'>
                    {children}
                </div>
            </Layout.Content>
        </Layout>
    );
}
