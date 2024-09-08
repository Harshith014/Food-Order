import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const UpdateMenu = ({ menuItem, token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (menuItem) {
      setName(menuItem.name || "");
      setDescription(menuItem.description || "");
      setPrice(menuItem.price || "");
    }
  }, [menuItem]);

  const handleUpdateMenu = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": token,
        },
      };

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      if (image) {
        formData.append("image", image);
      }

      await axios.put(
        `${import.meta.env.VITE_REACT_APP_URI}/api/menu/updateMenu/${menuItem._id}`,
        formData,
        config
      );

      alert("Menu updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating menu!");
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  if (!menuItem) {
    return (
      <Typography variant="h4" component="h2">
        Please select a menu item to update.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader title="Update Menu" />
            <CardContent>
              <Box sx={{ padding: 2 }}>
                <form>
                  <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    label="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    margin="normal"
                    fullWidth
                  />
                  <Input
                    type="file"
                    onChange={handleImageChange}
                    margin="normal"
                    fullWidth
                  />
                  {imagePreview && (
                    <img src={imagePreview} alt="Selected Image" width="100%" />
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateMenu}
                    fullWidth
                  >
                    Update Menu
                  </Button>
                </form>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

UpdateMenu.propTypes = {
  menuItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  token: PropTypes.string.isRequired,
};

export default UpdateMenu;
