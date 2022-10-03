import { FormControlLabel, Checkbox, Typography } from '@mui/material';

import "./style.scss";

const CustomCheckbox = () => {
    return (
        <div className="checkbox-parent">
            <FormControlLabel control={<Checkbox size="small" sx={{ padding: "0px 10px" }} />} label={<span style={{ fontSize: "small" }}>Remember me</span>} />
            <Typography className="forget-password" sx={{ fontWeight: 700, fontSize: "small" }} >Forget password?</Typography>
        </div>
    )
};

export default CustomCheckbox;
