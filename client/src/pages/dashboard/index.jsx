import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

import { Box, Grid, Paper } from "@mui/material";
import ProfileCard from "../profile";

const Dashboard = () => {
    let { user } = useContext(AuthContext);

    return (
        <>
            {/* <Sidebar /> */}
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
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Grid container rowSpacing={1} width="90vw">
                        <Grid item xs={12} md={4} padding={1}>
                            <Paper elevation={2} sx={{ padding: "15px" }}>
                                <ProfileCard />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={8} padding={1}>
                            <Paper elevation={2} sx={{ padding: "15px" }}>
                                2 - Nice
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} padding={1}>
                            <Paper elevation={2} sx={{ padding: "15px" }}>
                                3 - Nice
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} padding={1}>
                            <Paper elevation={2} sx={{ padding: "15px" }}>
                                4 - Nice
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </main>
        </>
    );
};

export default Dashboard;
