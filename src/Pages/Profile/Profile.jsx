import axios from "axios";
import { useState, useEffect } from "react";

import { Container, Typography, CardActions, Button, Backdrop, CircularProgress } from "@mui/material";

import "./style.scss";

const Profile = (props) => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        profileImaqe: '',
    })
    const [loading, setLoading] = useState(false);
    const { history } = props;


    const getProfile = async () => {
        try {
            setLoading(true)
            const response = await axios({
                method: 'get',
                url: 'http://localhost:9000/api/user/profile',
                headers: {
                    'Authorization': localStorage.getItem("access-token")
                }
            })
            if (response.data.status === 200) {
                setLoading(false);
                setProfile({ email: response.data.data.email, name: response.data.data.name, profileImage: response.data.data.imageUrl })
            } else {
                setLoading(false)
            }
        } catch (err) {
            setLoading(false)
        }
    };

    const handleLogout = async () => {
        try {
            const data = JSON.stringify({
                "refreshToken": localStorage.getItem("refresh-token")
            });

            const config = {
                method: 'delete',
                url: 'http://localhost:9000/api/user/logout',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const response = await axios(config)
            if (response.data.status === 200) {
                localStorage.removeItem("access-token");
                localStorage.removeItem("refresh-token");
                history.push("/login")
            } else {
                alert("logout failed")
            }
        } catch (err) {
            alert("Logout failed");
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        loading ? (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        ) : (
            <Container className="container" sx={{ display: "flex" }}>
                <img
                    className="images"
                    src="/images/one-touch-profile.jpg"
                    alt={`${profile.name}-profile`}
                />

                <Typography gutterBottom className="typography" sx={{ margin: "20px 0px 10px 0px" }} variant="h5" component="div">
                    <b>
                        {profile.name}
                    </b>
                </Typography>
                <Typography gutterBottom className="typography" sx={{ margin: "5px" }} variant="h7" component="div">
                    <b>
                        {profile.email}
                    </b>
                </Typography>

                <CardActions>
                    <Button onClick={handleLogout} color="secondary" size="small">Logout</Button>
                </CardActions>
            </Container>
        )
    )
}

export default Profile;