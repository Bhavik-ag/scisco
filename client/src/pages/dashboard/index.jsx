import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

import { Box } from "@mui/material";

const Dashboard = () => {
    let { user, authTokens } = useContext(AuthContext);
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
        }
    };

    return (
        <>
            <Sidebar />
            <main className="content">
                <Topbar />
                <Box m="20px">
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Header
                            title="DASHBOARD"
                            subTitle="Welcome to your dashboard"
                        />
                    </Box>
                </Box>
                <Box>{userData && <p>{userData.bio}</p>}</Box>
            </main>
        </>
    );
};

export default Dashboard;
