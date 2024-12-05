import { Poppins, Inter } from 'next/font/google';

export const poppins = Poppins({
    subsets: ['latin'],
    variable: '--font-poppins',
    weight: ['300', '400', '500', '600', '700', '800'],
    style: ['normal', 'italic'],
    display: 'swap',
});

export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    weight: ['300', '400', '500', '600', '700', '800'],
    style: ['normal', 'italic'],
    display: 'swap',
});
