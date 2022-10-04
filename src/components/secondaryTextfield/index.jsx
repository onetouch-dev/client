import { TextField } from "@mui/material";

const SecondaryTextfield = ({ value, label, onChange, disabled }) => {
    return (
        <TextField
            sx={{ margin: "20px 0px 10px 0px" }}
            label={label}
            disabled={disabled}
            value={value}
            onChange={onChange} />
    )
};

export default SecondaryTextfield;
