import { Typography } from "@mui/material"

const Heading = ({ value }) => {
    return (
        <Typography align="center" variant="h5" sx={{ margin: "10px 0px 5px 0px" }} >
            <b>
                {value}
            </b>
        </Typography>
    )
};

export default Heading;
