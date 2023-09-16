import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const AddCategoryModal = ({ open, onClose, onAddCategory }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddCategory = () => {
    onAddCategory(name, description);
    setName('');
    setDescription('');
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-category-modal-title"
      aria-describedby="add-category-modal-description"
    >
      <Box sx={{ ...style }}>
        <h2 id="add-category-modal-title">Add New Category</h2>
        <TextField
          label="Name"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={handleAddCategory}>Add Category</Button>
      </Box>
    </Modal>
  );
};
