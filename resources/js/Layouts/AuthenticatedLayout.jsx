import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
    DownOutlined
} from '@ant-design/icons';
import { Col, Layout, Menu, Row, theme, Typography, Space, Dropdown, Avatar } from 'antd';

const { Header, Sider, Content } = Layout;

const items = [
    {
        key: 'logout',
        label: (
            <Link href={window.route('logout')} method='post'>
                Logout
            </Link>
        ),
        icon: <LogoutOutlined />,
    },
];

export default function Authenticated({ header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const { auth } = usePage().props

    const initial = JSON.parse(localStorage.getItem('sidebarCollapsed')) || false;
    const [collapsed, setCollapsed] = useState(initial);

    const toggleCollapse = () => {
        const updated = !collapsed;
        setCollapsed(updated)
        localStorage.setItem('sidebarCollapsed', JSON.stringify(updated))
    };
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <Typography.Title className='logo-text' level={3}>Ressy App</Typography.Title>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[window.route().current()]}
                    items={[
                        {
                            key: 'dashboard',
                            icon: <UserOutlined />,
                            label: 'Dashboard',
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header style={{ paddingLeft: 20, paddingRight: 20, background: colorBgContainer }}>
                    <Row justify='space-between'>
                        <Col>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: () => toggleCollapse(),
                            })}
                        </Col>
                        <Col>
                            <Dropdown menu={{ items }} trigger={['click']}>
                                <div>
                                    <Typography.Text className='auth-dropdown'>
                                        <Space size={12}>
                                            <Avatar size={36} icon={<UserOutlined />} />
                                            <div>
                                                <div>
                                                    <Typography.Text strong>{auth.user.name}</Typography.Text>
                                                </div>
                                                <div>{auth.user.email}</div>
                                            </div>
                                            <DownOutlined />
                                        </Space>
                                    </Typography.Text>
                                </div>
                            </Dropdown>
                        </Col>
                    </Row>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
