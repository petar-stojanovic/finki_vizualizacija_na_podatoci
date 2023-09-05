import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { DatasetService } from "../../repository/datasetRepository";
import { CategoryList } from "./CategoryList";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

export const SideBar = ({ open, onClose, width }) => {
  const [categories, setCategories] = useState([]);

  const currentPath =
    decodeURIComponent(useLocation().pathname).split("/")[2] ?? "";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await DatasetService.fetchCategories();
      if (response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const isPermanent = window.innerWidth >= 1200;

  return (
    <div className="navigation">
      <Drawer
        anchor="left"
        open={open || isPermanent}
        onClose={!isPermanent && onClose}
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            width: width,
          },
        }}
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
        variant={isPermanent ? "permanent" : "temporary"}
      >
        <div style={{ marginInline: "0.5rem" }}>
          <Toolbar />
          <CategoryList categories={categories} currentPath={currentPath} />
        </div>
      </Drawer>
    </div>
  );
};
