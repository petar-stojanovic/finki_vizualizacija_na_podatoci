import "./App.css";
import { CategoryPage } from "./components/MainDashboard/CategoryPage";
import { DatasetPage } from "./components/MainDashboard/DatasetPage";
import { HomePage } from "./components/MainDashboard/HomePage";
import { SideBar } from "./components/SideBar/SideBar";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Toolbar } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

const drawerWidth = 280;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [openNav, setOpenNav] = useState(window.innerWidth >= 1200);

  const location = useLocation();

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
    <Box sx={{ flexGrow: 1 }}>
      <div
        className={`${
          decodeURIComponent(useLocation().pathname).split("/")[3]
            ? ""
            : "background"
        }`}
      >
        <SideBar
          onClose={() => setOpenNav(false)}
          open={openNav}
          width={drawerWidth}
        />

        <Box
          sx={{
            ml: { lg: `${drawerWidth}px` },
          }}
        >
          <Container
            maxWidth="xl"
            style={{
              backgroundColor: `${
                decodeURIComponent(useLocation().pathname).split("/")[3]
                  ? "#eee"
                  : ""
              }`,
            }}
          >
            <Toolbar sx={{ p: 0 }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{ display: { lg: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:code" element={<CategoryPage />} />
              <Route
                path="/category/:categoryName/:code"
                element={<DatasetPage />}
              />
            </Routes>
          </Container>
        </Box>
      </div>
    </Box>
  );
}

export default App;
