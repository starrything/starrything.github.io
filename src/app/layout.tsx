import Image from 'next/image'
import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import ChecklistIcon from '@mui/icons-material/Checklist';
import LaunchIcon from '@mui/icons-material/Launch';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import ThemeRegistry from '@/app/components/ThemeRegistry/ThemeRegistry';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton'
import NaverBlogIcon from '/public/image/naver_blog.png'
import YoutubeIcon from '/public/image/youtube.png'
import InstagramIcon from '/public/image/instagram.png'
import CameraIcon from '/public/image/camera.png'

export const metadata = {
  title: 'Jonghyun',
  description: 'Jonghyun\'s page',
};

const DRAWER_WIDTH = 240;

const LINKS = [
  { text: 'Home', href: '/', icon: HomeIcon, collapsable: false },
  { text: 'About', href: '/about', icon: SentimentSatisfiedAltIcon, collapsable: false },
];

const PLACEHOLDER_LINKS = [
  { text: 'Contact', icon: ContactSupportOutlinedIcon },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body>
        <ThemeRegistry>
          <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar sx={{ backgroundColor: 'background.paper', verticalAlign: 'middle' }}>
              <Link color="inherit" href="/">
                <DashboardIcon sx={{ color: 'text.primary', mr: 2, transform: 'translateY(-2px)' }} />
              </Link>
              <Typography variant="h6" noWrap component="div" color="text.primary" sx={{ flexGrow: 1 }}>
                {'Jonghyun Yoon'}
              </Typography>
              <Button color="inherit">Login</Button>
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
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="flex-end"
              spacing={2}
              height={'100%'}
            >
              <Link href={'https://blog.naver.com/starrything'} target='_blank'>
                <Image
                  src={NaverBlogIcon}
                  width={35}
                  height={35}
                  alt="네이버 블로그"
                />
              </Link>
              <Link href={'https://www.instagram.com/starrything'} target='_blank'>
                <Image
                  src={InstagramIcon}
                  width={35}
                  height={35}
                  alt="인스타그램"
                />
              </Link>
              <Link href={'https://www.youtube.com/@ylego89'} target='_blank'>
                <Image
                  src={YoutubeIcon}
                  width={35}
                  height={35}
                  alt="유튜브"
                />
              </Link>
              <Link href={'https://yfotos.tistory.com/'} target='_blank'>
                <Image
                  src={CameraIcon}
                  width={35}
                  height={35}
                  alt="Camera"
                />
              </Link>
            </Stack>
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
