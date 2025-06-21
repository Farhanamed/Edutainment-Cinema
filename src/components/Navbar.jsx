import { Stack, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { logo } from '../utils/constants';
import SearchBar from './SearchBar';

const Navbar = () => (
  <Stack
    direction="row"
    alignItems="center"
    p={2}
    sx={{
      position: 'sticky',
      background: '#f0f0f0',
      top: 0,
      zIndex: 1000,
      justifyContent: 'space-between',
    }}
  >
    {/* Left Logo + Edutainment Cinema */}
    <Link
      to="/"
      style={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
      }}
    >
      <img src={logo} alt="logo" height={45} />
      <Typography
        variant="h6"
        sx={{
          ml: 1.5,
          fontWeight: 600,
          fontSize: { xs: 16, sm: 20, md: 24, lg: 28 },
          color: 'black',
          display: { xs: 'none', sm: 'block' }, // hides on extra small screens
        }}
      >
        Edutainment Cinema
      </Typography>
    </Link>

    {/* Centered SearchBar using absolute positioning */}
    <Box
      sx={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        width: { xs: '60%', sm: '40%', md: '30%' },
      }}
    >
      <SearchBar />
    </Box>
  </Stack>
);

export default Navbar;
