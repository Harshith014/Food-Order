import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Input,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/UserContext";
import UpdateMenu from "./UpdateMenu";

const MenuAdmin = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { token, userRole } = useContext(AuthContext);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URI}/api/menu/allMenu`,
          {
            headers: {
              "Authorization": token,
            },
          }
        );
        setMenuItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMenuItems();
  }, [token]);

  const handleSelectMenuItem = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const handleDeleteMenuItem = async (menuItemId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_REACT_APP_URI}/api/menu/deleteMenu/${menuItemId}`,
        {
          headers: {
            "Authorization": token,
          },
        }
      );
      const updatedMenuItems = menuItems.filter(
        (menuItem) => menuItem._id !== menuItemId
      );
      setMenuItems(updatedMenuItems);
      alert("Menu item deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error deleting menu item!");
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

  if (userRole !== "admin") {
    return (
      <Typography variant="h4" component="h2">
        You do not have permission to access this page.
      </Typography>
    );
  }

  const handleAddMenu = async () => {
    try {
      const config = {
        headers: {
          "Authorization": token,
        },
      };

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", image);

      await axios.post(
        `${import.meta.env.VITE_REACT_APP_URI}/api/menu/addMenu`,
        formData,
        config
      );

      setName("");
      setDescription("");
      setPrice("");
      setImage(null);
      setImagePreview(null);
      alert("Menu added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding menu!");
    }
  };


  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader title="Add Menu Item" />
            <CardContent>
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
                  sx={{ margin: 1 }}
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Selected Image" width="100%" />
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddMenu}
                  fullWidth
                >
                  Add Menu Item
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Card>
            <CardHeader title="Menu Items" />
            <CardContent>
              <ul>
                {menuItems.map((menuItem) => (
                  <ListItem key={menuItem._id}>
                    <ListItemAvatar>
                      <img
                        src={menuItem.image}
                        alt={menuItem.name}
                        width="50"
                        height="50"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={menuItem.name}
                      secondary={`Price: ${menuItem.price}`}
                    />
                    <IconButton onClick={() => handleSelectMenuItem(menuItem)}>
                      <CheckCircleIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteMenuItem(menuItem._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </ul>
              {selectedMenuItem && (
                <UpdateMenu menuItem={selectedMenuItem} token={token} />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MenuAdmin;
