import { Box, Container } from '@mui/material'

import "./style.scss";

const PublicFormHoc = (WrappedComponent) => {
    const PublicContainer = (props) => {
        return (
            <Container maxWidth="sm">
                <Box
                    className="box"
                    sx={{
                        marginTop: 12,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <WrappedComponent {...props} />
                </Box>
            </Container>
        )
    }
    return PublicContainer;
};

export default PublicFormHoc;
