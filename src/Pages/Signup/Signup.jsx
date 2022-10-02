import React, { useState } from 'react';
import { Box, Link, Button, Typography, TextField, Container, Backdrop, CircularProgress } from '@mui/material'
import axios from "axios";

const Signup = (props) => {
    const { history } = props;
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (input, field) => {
        setState({ ...state, [field]: input.target.value });
    };

    const handleSignup = async () => {
        try {
            setLoading(true);
            const data = JSON.stringify({
                "name": state.name,
                "email": state.email,
                "password": state.password,
            });

            const config = {
                method: 'post',
                url: 'http://localhost:9000/api/user/signup',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const response = await axios(config)

            if (response.data.status === 200) {
                localStorage.setItem("access-token", response.data.accessToken);
                localStorage.setItem("refresh-token", response.data.refreshToken);
                history.push('/profile')
                setLoading(false)
                setState({});
            } else {
                alert(response.data.message || "Bad request");
                setLoading(false)
                setState({});
            }
        } catch (err) {
            alert("login failed");
            setState({});
            setLoading(false);
        }

    }

    return (
        loading ? (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        ) :
            <Container maxWidth="sm">
                <Box
                    style={{ border: '1px solid #efefef', boxShadow: '1px 1px 10px #efefef', padding: '100px 30px' }}
                    sx={{
                        marginTop: 12,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography align="center" component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fullname"
                        label="Full Name"
                        name="name"
                        onChange={(input) => { handleChange(input, 'name') }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        onChange={(input) => { handleChange(input, 'email') }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={(input) => { handleChange(input, 'password') }}
                    />
                    <Button
                        disabled={!(state.name && state.email && state.password)}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSignup}
                    >
                        Sign In
                    </Button>
                    <div onClick={() => history.push('/login')}>
                        <Link variant="body2" style={{ cursor: "pointer" }}>
                            {"Already have an account? Sign In"}
                        </Link>
                    </div>
                </Box>
            </Container>
    )
}

export default Signup;
