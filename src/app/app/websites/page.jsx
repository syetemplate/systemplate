'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import {
    Typography,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Box,
    IconButton,
    Chip,
    Popover,
    FormControlLabel,
    RadioGroup,
    InputAdornment
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
    StyledTableCell,
    StyledFormControl,
    StyledRadio,
    StyledSettingsBox,
    StyledSettingsSection,
    StyledSettingsSubtitle,
    StyledSelect,
    StyledMenu,
    StyledMenuItem,
    StyledStatusChip,
    StyledTextField
} from '@/style/theme';
import { useAppBar } from '@/contexts/AppBarContext';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const WebsitesPage = () => {
    const [websiteData, setWebsiteData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { setSearchBar } = useAppBar();

    const [orderBy, setOrderBy] = useState('status');
    const [order, setOrder] = useState('desc');
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElActions, setAnchorElActions] = useState(null);

    const fetchWebsites = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/api/websites');
            setWebsiteData(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching websites:', err);
            setError('Failed to fetch websites. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const setupSearchBar = useCallback(() => {
        setSearchBar(
            <StyledTextField
                fullWidth
                variant="outlined"
                placeholder="Search Websites"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                    ),
                }}
                sx={{ mr: 2 }}
            />
        );
    }, [setSearchBar]);

    useEffect(() => {
        fetchWebsites();
    }, [fetchWebsites]);

    useEffect(() => {
        setupSearchBar();
        return () => setSearchBar(null); // Clean up when component unmounts
    }, [setSearchBar, setupSearchBar]);

    const handleSort = (column) => {
        const isAsc = orderBy === column && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(column);
    };

    const handleSettingsClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleSettingsClose = () => {
        setAnchorEl(null);
    };

    const handleActionsClick = (event, website) => {
        setAnchorElActions(event.currentTarget);
    };

    const handleActionsClose = () => {
        setAnchorElActions(null);
    };

    const handleEdit = () => {
        handleActionsClose();
    };

    const handleRemove = () => {
        handleActionsClose();
    };

    const sortedWebsiteData = useMemo(() => {
        const comparator = (a, b) => {
            if (orderBy === 'avgScore') {
                return order === 'asc' ? a.avgScore - b.avgScore : b.avgScore - a.avgScore;
            }
            // Default to sorting by name or status
            return order === 'asc'
                ? a[orderBy].localeCompare(b[orderBy])
                : b[orderBy].localeCompare(a[orderBy]);
        };

        return [...websiteData].sort(comparator);
    }, [websiteData, orderBy, order]);

    const SortIcon = ({ column }) => {
        if (orderBy !== column) return null;
        
        return (
            <Box
                component="span"
                sx={{
                    position: 'absolute',
                    right: -20,
                    top: 'calc(50% - 0.5px)',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {order === 'asc' ? (
                    <ArrowDropUpIcon fontSize="small" />
                ) : (
                    <ArrowDropDownIcon fontSize="small" />
                )}
            </Box>
        );
    };

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Showing {sortedWebsiteData.length} websites</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ mr: 1, color: 'text.secondary' }}>Sort by:</Typography>
                        <StyledSelect
                            value={orderBy}
                            onChange={event => setOrderBy(event.target.value)}
                            size="small"
                        >
                            <StyledMenuItem value="name">Name</StyledMenuItem>
                            <StyledMenuItem value="status">Status</StyledMenuItem>
                            <StyledMenuItem value="avgScore">Average Score</StyledMenuItem>
                        </StyledSelect>
                        <IconButton onClick={handleSettingsClick}>
                            <TuneIcon />
                        </IconButton>
                        <Popover
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={handleSettingsClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <StyledSettingsBox>
                                <StyledSettingsSection>
                                    <StyledSettingsSubtitle>Sort Order</StyledSettingsSubtitle>
                                    <StyledFormControl component="fieldset">
                                        <RadioGroup
                                            aria-label="sort-order"
                                            name="sort-order"
                                            value={order}
                                            onChange={event => setOrder(event.target.value)}
                                        >
                                            <FormControlLabel
                                                value="asc"
                                                control={<StyledRadio />}
                                                label={<Typography variant="caption">Ascending</Typography>}
                                            />
                                            <FormControlLabel
                                                value="desc"
                                                control={<StyledRadio />}
                                                label={<Typography variant="caption">Descending</Typography>}
                                            />
                                        </RadioGroup>
                                    </StyledFormControl>
                                </StyledSettingsSection>
                                {/* You can add more settings sections here in the future */}
                            </StyledSettingsBox>
                        </Popover>
                    </Box>
                </Box>
                <TableContainer component={Paper} sx={{ minWidth: '100%', boxShadow: 'none', borderRadius: '12px' }}>
                    <Table sx={{ minWidth: '100%' }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell onClick={() => handleSort('name')}>
                                    <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                                        WEBSITE
                                        <SortIcon column="name" />
                                    </Box>
                                </StyledTableCell>
                                <StyledTableCell onClick={() => handleSort('status')} sx={{ pl: 3 }}>
                                    <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                                        STATUS
                                        <SortIcon column="status" />
                                    </Box>
                                </StyledTableCell>
                                <StyledTableCell align="center" onClick={() => handleSort('avgScore')}>
                                    <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                        AVG. SCORE
                                        <SortIcon column="avgScore" />
                                    </Box>
                                </StyledTableCell>
                                <StyledTableCell>MAIN KEYWORDS</StyledTableCell>
                                <StyledTableCell>NEXT STEP</StyledTableCell>
                                <StyledTableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedWebsiteData.map((website) => (
                                <TableRow key={website.name} hover>
                                    <StyledTableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar src={website.logo} sx={{ mr: 2, width: 32, height: 32 }} />
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: 700,
                                                    letterSpacing: '-0.02em',
                                                    color: 'text.darkBlue',
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                {website.name}
                                            </Typography>
                                        </Box>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <StyledStatusChip
                                            label={website.status.toUpperCase()}
                                            size="small"
                                            status={website.status}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                color: 'secondary.main',
                                                fontWeight: 700,
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            {website.avgScore}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {website.mainKeywords.map((keyword) => (
                                            <Chip key={keyword} label={keyword} size="small" sx={{ mr: 0.5, mb: 0.5, fontSize: '0.75rem' }} />
                                        ))}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography variant="body2">{website.nextStep}</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton
                                            aria-label="actions"
                                            onClick={(event) => handleActionsClick(event, website)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <StyledMenu
                anchorEl={anchorElActions}
                open={Boolean(anchorElActions)}
                onClose={handleActionsClose}
            >
                <StyledMenuItem onClick={handleEdit}>
                    <EditIcon fontSize="small" sx={{ mr: 1 }} />
                    Edit
                </StyledMenuItem>
                <StyledMenuItem onClick={handleRemove}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                    Remove
                </StyledMenuItem>
            </StyledMenu>
        </>
    );
};

export default WebsitesPage;
