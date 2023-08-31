import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import StarIcon from '@mui/icons-material/Star';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportIcon from '@mui/icons-material/Support';
import LogoutIcon from '@mui/icons-material/Logout';
import ThemeRegistry from '@/app/components/ThemeRegistry/ThemeRegistry';

export const metadata = {
  title: 'Jonghyun',
  description: 'Jonghyun\'s page',
};

const DRAWER_WIDTH = 240;

const LINKS = [
  { text: 'Home', href: '/', icon: HomeIcon },
  { text: 'About', href: '/about', icon: SentimentSatisfiedAltIcon },
  { text: 'Tasks', href: '/tasks', icon: ChecklistIcon },
];

const PLACEHOLDER_LINKS = [
  { text: 'Contact', icon: ContactSupportOutlinedIcon },
  /* { text: 'Support', icon: SupportIcon },
  { text: 'Logout', icon: LogoutIcon }, */
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar sx={{ backgroundColor: 'background.paper' }}>
              <DashboardIcon sx={{ color: '#444', mr: 2, transform: 'translateY(-2px)' }} />
              <Typography variant="h6" noWrap component="div" color="black">
                윤종현 페이지
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: DRAWER_WIDTH,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH,
                boxSizing: 'border-box',
                top: ['48px', '56px', '64px'],
                height: 'auto',
                bottom: 0,
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Divider />
            <List>
              {LINKS.map(({ text, href, icon: Icon }) => (
                <ListItem key={href} disablePadding>
                  <ListItemButton component={Link} href={href}>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ mt: 'auto' }} />
            <List>
              {PLACEHOLDER_LINKS.map(({ text, icon: Icon }) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              ml: `${DRAWER_WIDTH}px`,
              mt: ['48px', '56px', '64px'],
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            {children}
          </Box>
          <Box
            component="footer"
            sx={{
              py: 3,
              px: 2,
              mt: 'auto',
              /* backgroundColor: theme.palette.mode === 'light'
                  ? theme.palette.grey[200]
                  : theme.palette.grey[800], */
            }}
          >
            <Container maxWidth="sm">
              <Typography variant="body1">
                My sticky footer can be found here.
              </Typography>
              <Copyright />
            </Container>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://jh-yoon.tistory.com/">
        Jonghyun
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}