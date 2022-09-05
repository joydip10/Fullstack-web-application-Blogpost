import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import useAuth from './../../Hooks/useAuth';
const drawerWidth = 240;

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const currentuser=JSON.parse(localStorage.getItem('blogpost-user'));


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, cursor:"pointer" }} onClick={() => { navigate('/') }}>
        BlogPost- Inspiring healthy blogging
      </Typography>
      <Divider />
      <List>
      <ListItem key="Home" onClick={() => { navigate('/home') }} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem key="AddBlog" onClick={() => { navigate('/addblog') }} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="Addblog" />
          </ListItemButton>
        </ListItem>
        {
          (user) &&
          <ListItem key="Profile" onClick={() => { navigate(`/profile/${currentuser?.id}`) }} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={`Profile (${user?.displayName.split(" ")[0]})`} />
            </ListItemButton>
          </ListItem>
        }
        {
          (user) &&
          <ListItem key="logout" onClick={logOut} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary="Sign out" />
            </ListItemButton>
          </ListItem>
        }
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, cursor:"pointer" }} onClick={() => { navigate('/') }}
          >
            BlogPost- Inspiring healthy blogging
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

            <Button key="Home" onClick={() => { navigate('/home') }} sx={{ color: '#fff' }}>
              Home
            </Button>
            <Button key="Addblog" onClick={() => { navigate('/addblog') }} sx={{ color: '#fff' }}>
              Addblog
            </Button>
            {
              (user) &&
              <Button key="Profile" onClick={() => { navigate(`/profile/${currentuser?.id}`) }} sx={{ color: '#fff' }}>
                {`Profile (${user?.displayName.split(" ")[0]})`}
              </Button>
            }
            {
              (user) &&
              <Button key="Sign Out" onClick={logOut} sx={{ color: '#fff' }}>
                Signout
              </Button>
            }
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
    </Box>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;
