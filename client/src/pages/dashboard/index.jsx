import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

import { Box } from "@mui/material";

const Dashboard = () => {
    let { name } = useContext(AuthContext);

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
                        {name}
                    </Box>
                </Box>
            </main>
        </>
    );
};

export default Dashboard;
