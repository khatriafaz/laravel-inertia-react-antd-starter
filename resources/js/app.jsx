import './bootstrap';
import 'antd/dist/reset.css';
import '../css/app.css';
import 'antd-css-utilities/utility.min.css'

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { ConfigProvider } from 'antd';
import theme from './theme';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        let page = pages[`./Pages/${name}.jsx`]
        page.default.layout = page.default.layout || (page => <Layout children={page} />)
        return page
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        const app = <ConfigProvider
            theme={theme}
        >
            <App {...props} />
        </ConfigProvider>;

        root.render(app);
    },
});

InertiaProgress.init({ color: '#4B5563' });
