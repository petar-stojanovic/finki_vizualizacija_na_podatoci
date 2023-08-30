import { useEffect, useState } from "react";

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
import Typography from "@mui/material/Typography";

import { DatasetService } from "../../repository/datasetRepository";
import { categoryKeywords } from "../categories";

export const SideBar = ({ open, onClose, width }) => {
  const lgUp = window.innerWidth >= 1200;

  const [jsonData, setJsonData] = useState(null);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [datasets, setDatasets] = useState([]);
  const [categories, setCategories] = useState({});

  const [openCategory, setOpenCategory] = useState({});

  const handleClick = (category) => {
    setOpenCategory((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  useEffect(() => {
    fetchDatasets();
    // eslint-disable-next-line
  }, []);

  const categorizeDatasets = (datasetNames) => {
    const categorized = {};

    datasetNames.forEach((datasetName) => {
      for (const keyword in categoryKeywords) {
        if (datasetName.startsWith(keyword)) {
          // console.log(categorized);
          const category = categoryKeywords[keyword];
          categorized[category] = categorized[category] || [];
          categorized[category].push(datasetName);
          break;
        }
      }
    });
    setCategories(categorized);
  };

  const fetchDatasets = async () => {
    DatasetService.fetchDatasets()
      .then((response) => {
        setDatasets(response.data);
        categorizeDatasets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching datasets:", error);
      });
  };

  const fetchDatasetData = async (datasetName) => {
    DatasetService.getData(datasetName)
      .then((response) => {
        setJsonData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dataset data:", error);
      });
  };

  const handleDatasetClick = (datasetName) => {
    console.log(categories);
    setSelectedDataset(datasetName);
    fetchDatasetData(datasetName);
  };

  const clearData = () => {
    setSelectedDataset(null);
    setJsonData([]);
  };

  const flexContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  //   console.log(jsonData, selectedDataset, datasets, categories);
  const content = (
    <>
      <Toolbar />
      <Divider />
      <List>
        {/* List of all categories */}
        {categories &&
          Object.keys(categories).map((category) => {
            // console.log(categories[category]);
            return (
              <ListItem disablePadding key={category} style={flexContainer}>
                <ListItemButton onClick={() => handleClick(category)}>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary={category} />
                  {openCategory[category] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={openCategory[category]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {/* List of all datasets in category */}

                    {categories[category].map((dataset) => {
                      return (
                        <ListItemButton
                          key={dataset}
                          sx={{ p: 0, pl: 4, pr: 1 }}
                        >
                          <ListItemIcon style={{ minWidth: "2.75rem" }}>
                            <DataObjectIcon />
                          </ListItemIcon>
                          <ListItemText primary={dataset} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </ListItem>
            );
          })}
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
            width: width,
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
          width: width,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
