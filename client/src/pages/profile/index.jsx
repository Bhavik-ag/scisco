import {
    Box,
    Avatar,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";

const ProfileCard = () => {
    let { user, logoutUser } = useContext(AuthContext);
    let [userData, setUserData] = useState(null);

    useEffect(() => {
        getUserData();
    }, []);

    let getUserData = async () => {
        let response = await fetch(
            "https://scisco.onrender.com/users?user_name=" + user.user_name,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        let data = await response.json();

        if (response.status === 200) {
            console.log(data);
            setUserData(data.user);
        } else if (response.statusText == "Unauthorized") {
            logoutUser();
        }
    };

    return (
        <Box
            m="5px"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Avatar
                src="./hello.png"
                sx={{
                    width: "12vw",
                    maxWidth: "100px",
                    height: "12vw",
                    maxHeight: "100px",
                }}
            ></Avatar>
            <List>
                <ListItem>
                    <ListItemText
                        primary={
                            userData?.first_name + " " + userData?.last_name
                        }
                        primaryTypographyProps={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                        }}
                        secondary={userData?.user_name}
                        secondaryTypographyProps={{
                            fontSize: "1rem",
                            fontWeight: "semibold",
                        }}
                    />
                </ListItem>
                <ListItem>
                    <Typography variant="p">{userData?.bio}</Typography>
                </ListItem>
            </List>
        </Box>
    );
};

export default ProfileCard;
