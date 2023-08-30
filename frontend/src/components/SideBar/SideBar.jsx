import { useState } from "react";

import DataObjectIcon from "@mui/icons-material/DataObject";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";

export const SideBar = ({ open, onClose }) => {
  const lgUp = window.innerWidth >= 1200;

  const [openCategory, setOpenCategory] = useState({});

  const handleClick = (category) => {
    setOpenCategory((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const content = (
    <>
      <Toolbar />
      <Divider />
      <List>
        {/* List of all categories */}

        <ListItem disablePadding>
          <ListItemButton onClick={() => handleClick("category.name")}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="categoryme" />
            {openCategory["category.name"] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={openCategory["category.name"]}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {/* List of all datasets in category */}
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <DataObjectIcon />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse>
        </ListItem>
      </List>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
