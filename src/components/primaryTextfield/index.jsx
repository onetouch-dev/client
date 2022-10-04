import { TextField } from "@mui/material";

const PrimaryTextfield = (props) => {
    const { label="", type, onChange, InputProps={}, onEnter=()=>{} } = props;
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
            onKeyPress={onEnter}
        />
    )
};

export default PrimaryTextfield;
