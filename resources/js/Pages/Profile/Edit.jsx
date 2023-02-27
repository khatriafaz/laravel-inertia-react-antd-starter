import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/inertia-react';
import { Col, Row, Typography } from 'antd';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            auth={auth}
        >
            <Head title="Profile" />

            <Typography.Title level={2}>Profile</Typography.Title>

            <div className="py-12">
                <Row gutter={[0, 20]}>
                    <Col span={16}>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </Col>

                    <Col span={16}>
                        <UpdatePasswordForm />
                    </Col>

                    <Col span={16}>
                        <DeleteUserForm />
                    </Col>
                </Row>
            </div>
        </AuthenticatedLayout>
    );
}
