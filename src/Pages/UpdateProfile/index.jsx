import axios from "axios";
import { useState, useEffect } from "react";

import { Container, CardActions, Button, TextField, Backdrop, CircularProgress } from "@mui/material";

import "./style.scss";

const UpdateProfile = (props) => {
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [imageUrl, setImageUrl] = useState();
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
                setEmail(response.data.data.email)
                setName(response.data.data.name)
                setImageUrl(response.data.data.imageUrl)
            } else {
                setLoading(false)
            }
        } catch (err) {
            setLoading(false)
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const data = JSON.stringify({
                "name": "User"
            });

            const config = {
                method: 'put',
                url: 'http://localhost:9000/api/user/update',
                headers: {
                    'Authorization': localStorage.getItem("access-token"),
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const response = await axios(config)

            if (response.data.status === 200) {
                setLoading(false);
                history.push("/profile");
            } else {
                setLoading(false);
                alert("Bad request")
            }
        } catch (err) {
            setLoading(false);
            alert(err.message);
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);
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
        ) :
            <Container className="container" sx={{ display: "flex" }}>
                <img
                    className="images"
                    src="/images/one-touch-profile.jpg"
                    alt={`${name}-profile`}
                />

                <TextField className="typography" sx={{ margin: "20px 0px 10px 0px" }} defaultValue={name} onChange={handleNameChange}>
                    <b>
                        {name}
                    </b>
                </TextField>
                <TextField className="typography" sx={{ margin: "5px" }} defaultValue={email} onChange={handleEmailChange}>
                    <b>
                        {email}
                    </b>
                </TextField>

                <CardActions>
                    <Button onClick={handleSubmit} color="secondary" size="small">Submit</Button>
                </CardActions>

            </Container>
    )
}

export default UpdateProfile;