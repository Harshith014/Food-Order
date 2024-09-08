import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import DescriptionAlerts from "../components/Alert";
import { AuthContext } from "../context/UserContext";

const Input = styled("input")({
  display: "none",
});

const UserProfile = () => {
  const { userId, token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [alertStatus, setAlertStatus] = useState(null);
  const isMobileS = useMediaQuery("(max-width:320px)");

  const fetchUserProfile = useCallback(async () => {
    if (!userId || !token) return;
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_URI}/api/auth/profile/${userId}`,
        {
          headers: { Authorization: token },
        }
      );
      const userData = response.data;
      setUser(userData);
      setName(userData.name);
      setDateOfBirth(
        userData.dateOfBirth ? userData.dateOfBirth.split("T")[0] : ""
      );
      setBio(userData.bio || "");
      setPreviewUrl(userData.avatar || "");
    } catch (err) {
      setError("Failed to fetch user profile", err);
    } finally {
      setLoading(false);
    }
  }, [userId, token]);

  useEffect(() => {
    if (userId && token) {
      fetchUserProfile();
    }
  }, [userId, token, fetchUserProfile]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("bio", bio);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_URI}/api/auth/profile/${userId}`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAlertStatus("success");
      fetchUserProfile();
    } catch (err) {
      setError("Failed to update profile", err);
      setAlertStatus("error");
    } finally {
      setLoading(false);
      setTimeout(() => setAlertStatus(null), 3000);
    }
  };

  if (loading && !user) return <CircularProgress />;
  if (error && !user) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 2, mb: 2 }}>
        {alertStatus && (
          <DescriptionAlerts
            status={alertStatus}
            title={
              alertStatus === "success"
                ? "Profile updated!"
                : "Error updating profile!"
            }
            sx={{
              mt: 1,
              mb: 1,
              px: 1,
              py: 0.5,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              fontSize: isMobileS ? "12px" : "14px",
            }}
          />
        )}
        <Typography
          variant={isMobileS ? "h5" : "h4"}
          gutterBottom
          align="center"
        >
          User Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={isMobileS ? 1 : 2} alignItems="center">
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Avatar
                src={previewUrl}
                sx={{
                  width: isMobileS ? 80 : 100,
                  height: isMobileS ? 80 : 100,
                  mb: 1,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <label htmlFor="avatar-input">
                <Input
                  id="avatar-input"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <Button
                  variant="contained"
                  component="span"
                  size={isMobileS ? "small" : "medium"}
                >
                  Change Avatar
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="dense"
                required
                size={isMobileS ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                margin="dense"
                InputLabelProps={{ shrink: true }}
                size={isMobileS ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                margin="dense"
                multiline
                rows={3}
                size={isMobileS ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                size={isMobileS ? "small" : "medium"}
              >
                {loading ? <CircularProgress size={20} /> : "Update Profile"}
              </Button>
            </Grid>
          </Grid>
        </form>
        {error && (
          <Typography
            color="error"
            sx={{ mt: 1, fontSize: isMobileS ? "12px" : "14px" }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default UserProfile;
