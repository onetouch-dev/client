import { Container, CardContent, Typography, CardActions, Button, IconButton } from "@mui/material";
import { useState } from "react";
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { Box } from "@mui/system";

const Profile = () => {
    const [profile, setProfile] = useState({
        name: 'Nikhil Rawat',
        email: 'nikhil.rawat@gmail.com',
        profileImaqe: '',
    })

    const _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result;
        setProfile({ ...profile, profileImage: btoa(binaryString) })
    }

    const handleImageChange = (input) => {
        const file = input.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = _handleReaderLoaded
            reader.readAsBinaryString(file)
        }
    }

    const getImage = () =>(`data:image/png;base64, ${profile.profileImaqe}`);

    console.log(profile)
    return(
        <Container maxWidth="lg">
            <Box sx={{
                margin: 12,
            }} display="flex">
            <Box display="flex">
                <img
                    style={{ width: '200px', height: '200px', background: '#989898', display: 'block', borderRadius: '5px' }}
                    src={getImage()}
                    alt={`${profile.name}-profile`}
                />
                <Box>
                <IconButton onChange={handleImageChange} color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" />
                    <CreateRoundedIcon />
                </IconButton>
                </Box>
            </Box>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {profile.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {profile.email}
                </Typography>
            </CardContent>
            <CardActions>
                <Button color="secondary" size="small">Change Password</Button>
                <Button onClick={() => localStorage.removeItem('token')} color="secondary" size="small">Logout</Button>
            </CardActions>
            </Box>
        </Container>
    )
}

export default Profile;