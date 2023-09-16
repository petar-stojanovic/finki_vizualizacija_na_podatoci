import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { DatasetService } from "../../repository/datasetRepository";
import { CategoryList } from "./CategoryList";

import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import QueueIcon from "@mui/icons-material/Queue";

import { AddDatasetModal } from "../modal/AddDatasetModal";

export const SideBar = ({ open, onClose, width }) => {
  const [openAddDataset, setOpenAddDataset] = useState(false);
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          },
        }}
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
        variant={isPermanent ? "permanent" : "temporary"}
      >
        <div style={{ marginInline: "0.5rem" }}>
          <CategoryList categories={categories} currentPath={currentPath} />
        </div>
        <div className="ms-4">
          <Button
            style={{ textTransform: "none" }}
            className="mb-3"
            variant="contained"
            startIcon={<QueueIcon />}
            onClick={() => setOpenAddDataset(true)}
          >
            Add Dataset
          </Button>
          <AddDatasetModal
            open={openAddDataset}
            categories={categories}
            refreshCategories={fetchCategories}
            onClose={() => {
              setOpenAddDataset(false);
              fetchCategories();
            }}
          />
        </div>
      </Drawer>
    </div>
  );
};
