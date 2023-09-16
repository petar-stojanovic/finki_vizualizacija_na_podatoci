import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { DatasetService } from "../../repository/datasetRepository";
import { AddCategoryModal } from "./AddCategoryModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const AddDatasetModal = ({
  open,
  onClose,
  categories,
  refreshCategories,
}) => {
  const [category, setCategory] = useState("");
  const [datasetName, setDatasetName] = useState("");
  const [file, setFile] = useState(null);

  const [openAddCategory, setOpenAddCategory] = useState(false);

  const closeAddCategoryModal = () => {
    setOpenAddCategory(false);
  };

  const handleAddDataset = () => {
    DatasetService.addDataset(category, datasetName, file);
    // onAddDataset(category, datasetName, file);
    onClose()
    setDatasetName("");
    setCategory("");
    setFile(null);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-dataset-modal-title"
      aria-describedby="add-dataset-modal-description"
    >
      <Box sx={{ ...style, textAlign: "center" }}>
        <h2 id="add-dataset-modal-title">Add Dataset</h2>
        <TextField
          label="Dataset Name"
          fullWidth
          variant="outlined"
          value={datasetName}
          onChange={(e) => setDatasetName(e.target.value)}
        />
        <FormControl sx={{ my: 2, width: "100%" }}>
          <InputLabel htmlFor="label-select">Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="label-select"
            label="Label"
          >
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
            <MenuItem
              key={categories.size + 1}
              value="Add New Category"
              onClick={() => setOpenAddCategory(true)}
            >
              ...Add New Category
            </MenuItem>
          </Select>
        </FormControl>
        <input
          className="form-control"
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Button
          className="my-2"
          variant="contained"
          disabled={!datasetName || !category || !file}
          onClick={handleAddDataset}
        >
          Add Dataset
        </Button>
        <AddCategoryModal
          open={openAddCategory}
          onClose={() => setOpenAddCategory(false)}
          onAddCategory={() => {
            closeAddCategoryModal();
            refreshCategories();
          }}
        />
      </Box>
    </Modal>
  );
};
