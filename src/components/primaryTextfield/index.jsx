import { TextField } from "@mui/material";

const PrimaryTextfield = (props) => {
    const { required, label, type, onChange, InputProps } = props;
    return (
        <TextField
            margin="normal"
            required={required}
            fullWidth
            id={label}
            type={type || "text"}
            label={label}
            name={label}
            onChange={onChange}
            InputProps={InputProps}
        />
    )
};

export default PrimaryTextfield;
