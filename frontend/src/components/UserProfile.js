import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import { Avatar, Box, Button, Container, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
import { useTheme } from '../context/ThemeContext'; // Adjust the import path if necessary

const UserProfile = () => {
    const { theme } = useTheme();
    const [userId, setUserId] = useState('');
    const [profile, setProfile] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dateOfBirth: '',
        bio: '',
        avatar: null
    });

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token
        }
    };

    useEffect(() => {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        setUserId(userId);

        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/profile/${userId}`, config);
                const profileData = response.data;
                const formattedDateOfBirth = moment(profileData.dateOfBirth).format('YYYY-MM-DD');
                setProfile({ ...profileData, dateOfBirth: formattedDateOfBirth });
                setFormData({ ...profileData, dateOfBirth: formattedDateOfBirth });
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchProfile();
        // eslint-disable-next-line
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreviewImage(previewUrl);
            setFormData({ ...formData, avatar: file });
        } else {
            setPreviewImage(null);
            setFormData({ ...formData, avatar: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataObj = new FormData();
            Object.keys(formData).forEach(key => {
                formDataObj.append(key, formData[key]);
            });
            await axios.put(`http://localhost:5000/api/auth/profile/${userId}`, formDataObj, config);
            setEditMode(false);

            // Fetch the updated profile data
            const response = await axios.get(`http://localhost:5000/api/auth/profile/${userId}`, config);
            const profileData = response.data;
            const formattedDateOfBirth = moment(profileData.dateOfBirth).format('YYYY-MM-DD');
            setProfile({ ...profileData, dateOfBirth: formattedDateOfBirth });
            setFormData({ ...profileData, dateOfBirth: formattedDateOfBirth });
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    const textFieldStyles = {
        '& .MuiInputBase-input': {
            color: theme === 'light' ? '#000' : '#fff',
        },
        '& .MuiInputLabel-root': {
            color: theme === 'light' ? '#000' : '#fff',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme === 'light' ? '#000' : '#fff',
            },
            '&:hover fieldset': {
                borderColor: theme === 'light' ? '#000' : '#fff',
            },
            '&.Mui-focused fieldset': {
                borderColor: theme === 'light' ? '#000' : '#fff',
            },
        },
    };

    return (
        <Container maxWidth="md" sx={{ paddingTop: '50px' }}>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={4}>
                    <Box sx={{ position: 'relative', display: 'inline-block' }}>
                        {previewImage ? (
                            <Avatar
                                sx={{
                                    width: 200,
                                    height: 200,
                                    border: '5px solid #3f51b5',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
                                }}
                                src={previewImage}
                                alt="Avatar Preview"
                            />
                        ) : (
                            <Avatar
                                sx={{
                                    width: 200,
                                    height: 200,
                                    border: '5px solid #3f51b5',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
                                }}
                                src={`http://localhost:5000/${profile.avatar}`}
                                alt="Avatar"
                            />
                        )}
                        {editMode && (
                            <IconButton
                                component="label"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    backgroundColor: 'white',
                                    '&:hover': { backgroundColor: '#ddd' }
                                }}
                            >
                                <input accept="image/*" type="file" hidden onChange={handleFileChange} />
                                <AiOutlineCloudUpload style={{ fontSize: '2rem', color: '#3f51b5' }} />
                            </IconButton>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                    {!editMode ? (
                        <>
                            <Typography
                                variant="h4"
                                gutterBottom
                                sx={{
                                    fontFamily: 'cursive',
                                    color: '#3f51b5',
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                                }}
                            >
                                {profile.name}
                            </Typography>
                            <Typography variant="body1" gutterBottom sx={{ marginBottom: '10px' }}>
                                <strong style={{ color: '#666' }}>Email:</strong> {profile.email}
                            </Typography>
                            <Typography variant="body1" gutterBottom sx={{ marginBottom: '10px' }}>
                                <strong style={{ color: '#666' }}>Date of Birth:</strong> {profile.dateOfBirth}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong style={{ color: '#666' }}>Bio:</strong> {profile.bio}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => setEditMode(true)}
                                startIcon={<BsPencilSquare />}
                                sx={{
                                    marginTop: '20px',
                                    backgroundColor: '#3f51b5',
                                    color: 'white',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': { backgroundColor: '#303f9f' }
                                }}
                                disableElevation
                            >
                                Edit Profile
                            </Button>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ marginTop: '20px' }}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{ marginBottom: '20px', ...textFieldStyles }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleIcon style={{ color: theme === 'light' ? '#666' : '#fff' }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{ marginBottom: '20px', ...textFieldStyles }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon style={{ color: theme === 'light' ? '#666' : '#fff' }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Date of Birth"
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                sx={{ marginBottom: '20px', ...textFieldStyles }}
                            />
                            <TextField
                                fullWidth
                                label="Bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                variant="outlined"
                                sx={{ marginBottom: '20px', ...textFieldStyles }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={<AiOutlineCloudUpload />}
                                sx={{ marginTop: '10px', backgroundColor: '#3f51b5', color: 'white', '&:hover': { backgroundColor: '#303f9f' } }}
                            >
                                Save Changes
                            </Button>
                        </form>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserProfile;
