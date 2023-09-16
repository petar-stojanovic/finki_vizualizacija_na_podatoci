import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { DatasetService } from "../../repository/datasetRepository";

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
  onAddDataset,
  categories,
}) => {
  const [category, setCategory] = useState("");
  const [datasetName, setDatasetName] = useState("");
  const [file, setFile] = useState(null);

  const handleAddDataset = () => {
    DatasetService.addDataset(category, datasetName, file);
    // onAddDataset(category, datasetName, file);
    setDatasetName("");
    setFile(null);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-dataset-modal-title"
      aria-describedby="add-dataset-modal-description"
    >
      <Box sx={{ ...style }}>
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
          </Select>
        </FormControl>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Button onClick={handleAddDataset}>Import</Button>
      </Box>
    </Modal>
  );
};
