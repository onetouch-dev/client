import { Typography } from "@mui/material";

import "./style.scss";

const FormFooter = (props) => {
    const { onClick, label, value } = props;
    return (
        <div className="footer-parent">
            <Typography className="label" sx={{ fontSize: "small", marginRight: "5px" }}>{label}</Typography>
            <Typography className="value" sx={{ fontWeight: 700, fontSize: "small" }} onClick={onClick} >{value}</Typography>
        </div >
    )
};

export default FormFooter;
