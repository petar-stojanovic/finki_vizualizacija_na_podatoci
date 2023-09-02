import { useEffect, useState } from "react";

import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";

import { DatasetService } from "../../repository/datasetRepository";
import { categoryKeywords } from "../categories";
import { CategoryList } from "./CategoryList";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
export const SideBar = ({ open, onClose, width }) => {
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
        categorizeDatasets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching datasets:", error);
      });
  };

  const isPermanent = window.innerWidth >= 1200;

  return (
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
      <Toolbar>
        <Link to={"/"}>
          <Button variant="contained" color="error">
            FINKI
          </Button>
        </Link>
      </Toolbar>
      <Divider />
      <List>
        {categories && (
          <CategoryList
            categories={categories}
            handleClick={handleClick}
            openCategory={openCategory}
          />
        )}
      </List>
    </Drawer>
  );
};
