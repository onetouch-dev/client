import { Button } from "@mui/material";

const PrimaryButton = (props) => {
    const { onClick, label, isDisabled } = props;
    return (
        <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: "50px" }}
            onClick={onClick}
            disabled={isDisabled}
        >
            {label}
        </Button>
    )
};

export default PrimaryButton
