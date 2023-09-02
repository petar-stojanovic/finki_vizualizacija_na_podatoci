import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useState } from "react";
import "./App.css";
import { SideBar } from "./components/SideBar/SideBar";

import AppBar from "@mui/material/AppBar";

import Box from "@mui/material/Box";

import { Route, Routes } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { FetchCharts } from "./components/FetchCharts/FetchCharts";

const drawerWidth = 330;

function App() {
  // const [selectedDataset, setSelectedDataset] = useState(null);

  // const handleDatasetSelect = (datasetName) => {
  //   setSelectedDataset(datasetName);
  // };

  const [openNav, setOpenNav] = useState(window.innerWidth >= 1200);

  useEffect(() => {
    const handleResize = () => {
      setOpenNav(window.innerWidth >= 1200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDrawerToggle = () => {
    setOpenNav(!openNav);
  };

  return (
    <div sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { lg: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, ml: { lg: `${drawerWidth}px` } }}
            >
              <Link to={"/"}>
                <Button variant="contained" color="error">
                  FINKI
                </Button>
              </Link>
            </Typography> */}
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <SideBar
        onClose={() => setOpenNav(false)}
        open={openNav}
        width={drawerWidth}
      />

      <Box
        sx={{
          ml: { lg: `${drawerWidth + 32}px` },
        }}
      >
        <Container maxWidth="xl">
          <Routes>
            {/* <Route path="/" element={<DatasetViewer />} /> */}
            <Route path="/:dataset" element={<FetchCharts />} />
          </Routes>
        </Container>
      </Box>
    </div>
  );
}

export default App;
