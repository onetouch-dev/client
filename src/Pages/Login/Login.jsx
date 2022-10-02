import React, { useState } from 'react';
import axios from "axios";
import {
    Box,
    Link,
    FormControlLabel,
    Checkbox,
    Button,
    Typography,
    TextField,
    Container,
    Backdrop,
    CircularProgress
} from '@mui/material'

const Login = (props) => {
    const { history } = props;

    const [state, setState] = useState({
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (input, field) => {
        setState({ ...state, [field]: input.target.value });
    };

    const handleLogin = async () => {
        try {
            setLoading(true);
            const data = {
                username: state.username,
                password: state.password
            };
            const config = {
                method: 'post',
                url: 'http://localhost:9000/api/user/login',
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
                setLoading(false);
                setState({});
            } else {
                alert(response.data.message || "Bad request");
                setLoading(false);
                setState({});
            }
            setState({})

        } catch (err) {
            alert("login failed")
            setLoading(false);
            setState({})

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
                        Login
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={(input) => { handleChange(input, 'username') }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(input) => { handleChange(input, 'password') }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        disabled={!(state.username && state.password)}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLogin}
                    >
                        Sign In
                    </Button>
                    <div onClick={() => history.push('/signup')}>
                        <Link variant="body2" style={{ cursor: "pointer" }}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </div>
                </Box>
            </Container>
    )
}

export default Login;
