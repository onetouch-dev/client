import { TextField } from "@mui/material";

const PrimaryTextfield = (props) => {
    const { label, type, onChange, InputProps } = props;
    return (
        <TextField
            margin="normal"
            required
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
