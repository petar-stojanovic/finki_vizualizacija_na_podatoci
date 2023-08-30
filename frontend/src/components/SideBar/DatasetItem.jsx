import DataObjectIcon from "@mui/icons-material/DataObject";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

export const DatasetItem = ({ dataset }) => {
  return (
    <Link to={dataset} style={{textDecoration: "none", color: "#4177e6"}}>
      <ListItemButton sx={{ p: 0, pl: 4, pr: 1 }}>
        <ListItemIcon style={{ minWidth: "2.75rem" }}>
          <DataObjectIcon />
        </ListItemIcon>
        <ListItemText primary={dataset} />
      </ListItemButton>
    </Link>
  );
};
