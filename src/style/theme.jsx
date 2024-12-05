import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import {
    Drawer,
    ListItem,
    ListItemIcon,
    ListItemText,
    TableCell,
    Button,
    TextField,
    FormControl,
    Radio,
    Typography,
    Box,
    Select,
    Menu,
    MenuItem,
    Chip
} from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#7e57c2',
        },
        secondary: {
            main: '#b269ff',
        },
        background: {
            default: '#f3f2f7',
            paper: '#ffffff',
        },
        text: {
            primary: '#3a3541',
            secondary: '#787486',
            darkBlue: '#2c2c44',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h6: {
            fontWeight: 600,
        },
        subtitle1: {
            fontWeight: 600,
            fontSize: '0.9rem',
        },
        body2: {
            fontSize: '0.8rem',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    padding: '8px 16px',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid #f0f0f0',
                    padding: '16px',
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '& .MuiSelect-select': {
                        padding: '4px 8px',
                        fontSize: '0.875rem',
                    },
                },
            },
        },
    },
});

export const drawerWidth = 240;

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        backgroundColor: '#2c2c44',
        color: 'white',
    },
}));

export const StyledListItem = styled(ListItem)(({ theme, selected }) => ({
    margin: '4px 16px',
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
    opacity: 0.5,
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    ...(selected && {
        opacity: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        '&::before': {
            content: '""',
            position: 'absolute',
            left: '-16px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '4px',
            height: '24px',
            backgroundColor: theme.palette.secondary.main,
            borderRadius: '0 4px 4px 0',
        },
    }),
}));

export const StyledListItemIcon = styled(ListItemIcon)(({ theme, selected }) => ({
    color: selected ? '#00bcd4' : 'rgba(255, 255, 255, 0.7)',
    minWidth: 40,
}));

export const StyledListItemText = styled(ListItemText)(({ theme, selected }) => ({
    '& .MuiListItemText-primary': {
        color: selected ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
        fontWeight: 600,
        fontSize: '0.875rem',
    },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    '&.MuiTableCell-head': {
        fontWeight: 600,
        fontSize: '0.75rem',
        color: '#5e5873',
        textTransform: 'uppercase',
        letterSpacing: '-0.01em',
    }
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1, 2),
    textTransform: 'none',
    borderRadius: '4px',
    fontWeight: 600,
    fontSize: '0.815rem',
    padding: theme.spacing(2, 2),
    letterSpacing: '0.01em',
    color: '#ffffff',
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
    },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        backgroundColor: '#f3f2f7',
    },
}));

export const StyledSettingsBox = styled(Box)(({ theme }) => ({
    paddingTop: theme.spacing(1.5),
    paddingRight: theme.spacing(2.5),
    paddingBottom: theme.spacing(1.5),
    paddingLeft: theme.spacing(2.5),
    width: '150px',
}));

export const StyledSettingsSection = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(1),
}));

export const StyledSettingsSubtitle = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    fontSize: '0.75rem',
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
    width: '100%',
    '& .MuiFormGroup-root': {
        gap: '4px',
    },
}));

export const StyledRadio = styled(Radio)(({ theme }) => ({
    color: theme.palette.primary.main,
    '&.Mui-checked': {
        color: theme.palette.primary.main,
    },
    '& .MuiSvgIcon-root': {
        fontSize: '1rem',
    },
    padding: '2px',
}));

export const StyledSettingsTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(1),
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
    minWidth: '140px',
    '& .MuiSelect-select': {
        padding: '8px 12px',
        fontSize: '0.875rem',
    },
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    },
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    fontSize: '0.875rem',
    '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
    },
}));

export const StyledStatusChip = styled(Chip)(({ theme, status }) => ({
    width: '60px',
    backgroundColor: (() => {
        if (status === 'live') {
            return '#1cd933'; // green
        }
        return '#b9b9c3'; // neutral gray
    })(),
    color: '#fff',
    fontWeight: 600,
    fontSize: '0.75rem',
    '& .MuiChip-label': {
        padding: 0,
    },
}));
