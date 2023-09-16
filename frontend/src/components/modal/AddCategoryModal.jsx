import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import { DatasetService } from "../../repository/datasetRepository";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const AddCategoryModal = ({ open, onClose, onAddCategory }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddCategory = () => {
    DatasetService.addCategory(name, description)
      .then(() => {
        onAddCategory();
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });

    setName("");
    setDescription("");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-category-modal-title"
      aria-describedby="add-category-modal-description"
    >
      <Box sx={{ ...style, textAlign: "center" }}>
        <h2 id="add-category-modal-title" className="my-2">
          Add New Category
        </h2>
        <TextField
          className="my-2"
          label="Name"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className="my-2"
          label="Description"
          fullWidth
          multiline
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          className="my-2"
          variant="contained"
          disabled={!name || !description}
          onClick={handleAddCategory}
        >
          Add Category
        </Button>
      </Box>
    </Modal>
  );
};
