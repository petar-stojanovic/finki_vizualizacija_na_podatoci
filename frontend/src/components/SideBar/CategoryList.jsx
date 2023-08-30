import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { DatasetItem } from "./DatasetItem";

export const CategoryList = ({ categories, handleClick, openCategory }) => {
  const flexContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  return (
    <>
      {Object.keys(categories).map((category) => (
        <ListItem key={category} disablePadding style={flexContainer}>
          <ListItemButton onClick={() => handleClick(category)}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText
              primary={category}
              primaryTypographyProps={{ style: { fontWeight: "bold" } }}
            />
            {openCategory[category] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCategory[category]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {categories[category].map((dataset) => (
                <DatasetItem key={dataset} dataset={dataset} />
              ))}
            </List>
          </Collapse>
        </ListItem>
      ))}
    </>
  );
};
