import DefaultLayout from '@/app/layouts/DefaultLayout';
import AppLayout from '@/app/layouts/AppLayout';

const Layout = ({ children }) => {
    const isLoggedIn = true
    const Layout = (isLoggedIn ? AppLayout : DefaultLayout);

    return <Layout>{children}</Layout>;
};

export default Layout;
