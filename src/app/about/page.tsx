import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

const skillSets = [
    'Java8, 11'
    , 'Javascript'
    , 'React(Redux, Hook), Next.js(Page router, App router)'
]
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
                <Box sx={{ mb: 2 }}>
                    <Typography variant='h2' component={'h1'} gutterBottom>
                        About me
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {'안녕하세요.'}
                    </Typography>
                    <Typography variant="body1">웹 기반 소프트웨어 및 다양한 오픈소스를 활용한 서비스를 구현하고 있습니다.</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography variant='h3' component={'h3'} gutterBottom>
                        History
                    </Typography>
                    <Box sx={{ mb: 1 }}>
                        <Stack direction={'row'} spacing={1}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                IBK System
                            </Typography>
                            <Typography variant="body1" gutterBottom sx={{ alignSelf: 'flex-end' }}>
                                (@2022.03. ~)
                            </Typography>
                        </Stack>
                        <Typography variant="body1" sx={{ mb: 1 }}>솔루션 연구개발 업무를 수행하고 있습니다.</Typography>
                        <Typography variant="h5" component="h3">
                            Skill set
                        </Typography>
                        <List dense={true} sx={{ pt: 0 }}>
                            {skillSets.map((skill, index) => {
                                return (
                                    <ListItem>
                                        <ListItemText
                                            key={index}
                                            primary={(index + 1) + ". " + skill}
                                        />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                    <Box sx={{ mb: 1 }}>
                        <Stack direction={'row'} spacing={1}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                ILJIN C&S
                            </Typography>
                            <Typography variant="body1" gutterBottom sx={{ alignSelf: 'flex-end' }}>
                                (@2014.12. ~ 2022.02.)
                            </Typography>
                        </Stack>
                        <Typography variant="body1" sx={{ mb: 1 }}>프로젝트 지원, 솔루션 개발 및 연구과제 수행</Typography>
                        <Typography variant="h5" component="h3">
                            Skill set
                        </Typography>
                        <List dense={true} sx={{ pt: 0 }}>
                            {skillSets.map((skill, index) => {
                                return (
                                    <ListItem>
                                        <ListItemText
                                            key={index}
                                            primary={(index + 1) + ". " + skill}
                                        />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}
