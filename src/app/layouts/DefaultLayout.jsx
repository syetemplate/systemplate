import React from 'react';
import { poppins, inter } from '@/style/fonts';

const DefaultLayout = ({ children }) => {
    return (
        <html className={`${poppins.variable} ${inter.variable}`}>
            <body style={{ margin: 0 }}>{children}</body>
        </html>
    );
};

export default DefaultLayout;
