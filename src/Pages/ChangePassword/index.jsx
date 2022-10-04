import { useState } from 'react';
import LockClockIcon from '@mui/icons-material/LockClock';
import { IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { PrimaryTextfield, PublicFormHoc, PrimaryButton, PrimaryTypography, Loader } from "../../components"
import "./style.scss";
import { changePassword } from '../../apis';

const ChangePassword = (props) => {
    const { history } = props;
    const [visible, setVisible] = useState(false);
    const [loader, setLoader] = useState(false);
    const [password, setPassword] = useState({
        current: "",
        newP: "",
        confirm: "",
    });

    const handleVisible = () => {
        setVisible(!visible);
    };

    const handleOnChange = (e, field) => {
        setPassword({ ...password, [field]: e.target.value });
    };

    const onSubmit = async () => {
        try {
            const { current, newP } = password;
            setLoader(true);
            const response = await changePassword(current, newP);
            if (response.data.status === 200) {
                history.push("/profile");
            } else {
                alert("Request Failed")
                setLoader(false);
            }
        } catch (err) {
            alert("Request Failed");
            setLoader(false);
        }
    }

    const handleEnter = (e) => {
        const { current, newP, confirm } = password;
        if (e.key === "Enter" && current && newP && confirm) {
            onSubmit();
        }
    };

    return (
        loader ? (<Loader />) : (
            <>
                <div className="typography-parent">
                    <PrimaryTypography value="Change Password" />
                </div >
                <PrimaryTextfield
                    label="Current password"
                    type="text"
                    onChange={(e) => handleOnChange(e, "current")}
                    onEnter={handleEnter}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton className="icon-button">
                                    <LockClockIcon className="icon" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }} />
                <PrimaryTextfield
                    label="New password"
                    type={visible ? "text" : "password"}
                    onEnter={handleEnter}
                    onChange={(e) => handleOnChange(e, "newP")}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton onClick={handleVisible} className="icon-button">
                                    {visible ? <VisibilityOffIcon className="icon" /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }} />
                <PrimaryTextfield
                    label="Confirm password"
                    type={visible ? "text" : "password"}
                    onEnter={handleEnter}
                    onChange={(e) => handleOnChange(e, "confirm")}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton onClick={handleVisible} className="icon-button">
                                    {visible ? <VisibilityOffIcon className="icon" /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }} />

                <div style={{ display: "flex", justifyContent: "space-between" }} >
                    <PrimaryButton onClick={() => history.push("/profile")} label="Cancel" />
                    <PrimaryButton onClick={onSubmit} label="Submit" />
                </div>
            </>
        )
    )
};

export default PublicFormHoc(ChangePassword);
