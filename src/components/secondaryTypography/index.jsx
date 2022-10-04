import { Typography } from "@mui/material";

const SecondaryTypography = (props) => {
    const { value } = props;
    return (
        <Typography gutterBottom className="typography" sx={{ margin: "10px 0px 0px 0px" }} component="div">
            <b>
                {value}
            </b>
        </Typography>
    )
};

export default SecondaryTypography;
