import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

export default function About(props: any) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Container component={'main'} sx={{ mt: 8, mb: 2 }} maxWidth="md">
                <Typography variant='h2' component={'h1'} gutterBottom>
                    About me
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    {'안녕하세요.'}
                </Typography>
                <Typography variant="body1">웹 기반 소프트웨어 및 다양한 오픈소스를 활용한 서비스를 구현하고 있습니다.</Typography>
            </Container>
        </Box>
    )
}
