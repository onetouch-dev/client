import React, { useState } from 'react';
import { Box, Link, FormControlLabel, Checkbox, Button, Typography, TextField, Container } from '@mui/material'

const Login = (props) => {
    const { history } = props;

    const [state, setState] = useState({
        username: "",
        password: "",
    });

    const handleChange = (input, field) => {
        setState({ ...state, [field]: input.target.value });
    };

    const handleLogin = () => {
        localStorage.setItem('token', 'ktghrjkhwgrkjwegrqjwhgerkjw')
        history.push('/profile')
    }

    return(
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
                Sign in
            </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(input) => {handleChange(input, 'email')}}
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
                    onChange={(input) => {handleChange(input, 'password')}}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleLogin}
                >
                    Sign In
                </Button>
                <div onClick={() => history.push('/signup')}>
                    <Link variant="body2">
                    {"Don't have an account? Sign Up"}
                    </Link>
                </div>
            </Box>
        </Container>
    )
}

export default Login;
