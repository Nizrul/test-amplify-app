import { useAuthenticator } from '@aws-amplify/ui-react';
import React, { useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // default styles
import 'react-date-range/dist/theme/default.css'; // theme styles
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  ListItemButton,
} from '@mui/material';
import {
  Home as HomeIcon,
  Info as InfoIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import Dashboard from './components/dashboard';
import PropertyList from './components/properties/list';
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

const drawerWidth = 240;

function App() {
  const { signOut, authStatus } = useAuthenticator();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isAuthenticated = authStatus === 'authenticated';

  useEffect(() => {
    try {
      const call = async () => {
        const currentUser = await getCurrentUser();
        console.log('This is the current user information', currentUser);
        const authSession = await fetchAuthSession();
        console.log('This is the current auth session information', authSession);
      };

      call();
    } catch (e) {
      console.error('Something went wrong while fetching user/session information', e);
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Properties" />
        </ListItemButton>
        {isAuthenticated && 
        (<>
          <ListItemButton component={Link} to="/dashboard">
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton onClick={signOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItemButton>
        </>)}
      </List>
    </div>
  );

  return (
    <NotificationsProvider>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                Neosolvix Booking System
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar />
            <Routes>
              <Route path="/" element={<PropertyList />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </NotificationsProvider>
  );
}

export default App;
