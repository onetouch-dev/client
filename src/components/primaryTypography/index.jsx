import { Typography } from "@mui/material";

const PrimaryTypography = (props) => {
    const { value } = props;
    return (
        <Typography gutterBottom className="typography" sx={{ margin: "10px 0px 0px 0px" }} variant="h6" component="div">
        <b>
            {value}
        </b>
    </Typography>
    )
};

export default PrimaryTypography;
