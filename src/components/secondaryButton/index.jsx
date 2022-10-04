import { Button } from "@mui/material";

const SecondaryButton = (props) => {
    const { onClick, label, isDisabled } = props;
    return (
        <Button
            variant="outlined"
            sx={{ margin: "40px 10px" }}
            size="medium"
            onClick={onClick}
            disabled={isDisabled}
        >
            {label}
        </Button>
    )
};

export default SecondaryButton;
