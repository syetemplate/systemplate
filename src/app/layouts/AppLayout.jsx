'use client';

import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    ThemeProvider,
    IconButton,
    List,
    Avatar,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import BoltIcon from '@mui/icons-material/Bolt';
import { poppins, inter } from '@/style/fonts';
import {
    theme,
    StyledDrawer,
    StyledListItem,
    StyledListItemIcon,
    StyledListItemText,
    StyledButton,
} from '@/style/theme';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAppBar, AppBarProvider } from '@/contexts/AppBarContext';

const AppLayoutInner = ({ children }) => {
    const pathname = usePathname();
    const selectedMenuItem = pathname.split('/').pop().charAt(0).toUpperCase() + pathname.split('/').pop().slice(1);
    const { appBarContent, searchBar } = useAppBar();

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', minWidth: '100vw', width: '100%', bgcolor: 'background.default' }}>
            <StyledDrawer
                variant="permanent"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
            >
                <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                    <BoltIcon sx={{
                        mr: 0.5,
                        fontSize: 32,
                        color: '#ffd469',
                        transform: 'rotate(15deg)',
                    }} />
                    <Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.01em' }}>Syetemplate</Typography>
                </Box>
                <StyledButton variant="contained" color="secondary">
                    + Add New Website
                </StyledButton>
                <List sx={{ mt: 2 }}>
                    {[
                        { text: 'Websites', icon: <LanguageIcon />, path: '/app/websites' },
                        { text: 'Analytics', icon: <AnalyticsIcon />, path: '/app/analytics', disabled: true },
                        { text: 'Settings', icon: <SettingsIcon />, path: '/app/settings', disabled: true },
                    ].map((item) => (
                        <Link href={item.path} key={item.text} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                            <StyledListItem
                                selected={selectedMenuItem === item.text}
                                disabled={item.disabled}
                            >
                                <StyledListItemIcon selected={selectedMenuItem === item.text}>
                                    {item.icon}
                                </StyledListItemIcon>
                                <StyledListItemText
                                    primary={item.text}
                                    selected={selectedMenuItem === item.text}
                                />
                            </StyledListItem>
                        </Link>
                    ))}
                </List>
            </StyledDrawer>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', bgcolor: 'inherit' }}>
                <AppBar position="sticky" sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 'none',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
                            {appBarContent}
                            {searchBar}
                        </Box>
                        <IconButton size="small">
                            <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto', bgcolor: 'inherit' }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

const AppLayout = ({ children }) => (
    <html className={`${poppins.variable} ${inter.variable}`}>
        <body>
            <ThemeProvider theme={theme}>
                <AppBarProvider>
                    <AppLayoutInner>
                        {children}
                    </AppLayoutInner>
                </AppBarProvider>
            </ThemeProvider>
        </body>
    </html>
);

export default AppLayout;
