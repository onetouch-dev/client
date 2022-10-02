import React, { useState } from 'react';
import { Box, Link, Button, Typography, TextField, Container } from '@mui/material'

const Signup = (props) => {
    const { history } = props;
    const [state, setState] = useState({});

    const handleChange = (input, field) => {
        setState({ ...state, [field]: input.target.value });
    };

    const handleSignup = () => {
        console.log('state', state);
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
                    id="fullname"
                    label="Full Name"
                    name="name"
                    onChange={(input) => {handleChange(input, 'name')}}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
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
                    onChange={(input) => {handleChange(input, 'password')}}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSignup}
                >
                    Sign In
                </Button>
                <Link onClick={() => history.push('/login')} variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
            </Box>
        </Container>
    )
}

export default Signup;
