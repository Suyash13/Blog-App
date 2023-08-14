import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { Box, Typography, Button, InputLabel, TextField } from '@mui/material'
const CreateBlog = () => {
    const id = localStorage.getItem('userId');

    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        image: ""
    })

    const handleChange = (e) => {
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(inputs);
        try {
            // const id = localStorage.getItem("userId");
            const {data} = await axios.post('/api/v1/blog/create-blog', {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id
            })
            if(data?.success) {
                toast.success('Blog Created!')
                navigate("/my-blogs");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form onClick={handleSubmit}>
                <Box width={"45%"}
                    border={3}
                    borderRadius={10}
                    padding={3}
                    margin="auto"
                    boxShadow={"10px 10px 20px #ccc"}
                    display="flex"
                    flexDirection={"column"}
                    marginTop="30px">

                    <Typography
                        variant="h2"
                        textAlign={"center"}
                        fontWeight="bold"
                        padding={3}
                        color="gray"
                    >
                        Create A Post
                    </Typography>
                    <InputLabel
                        sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
                    >
                        Title
                    </InputLabel>
                    <TextField
                        name="title"
                        value={inputs.title}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <InputLabel
                        sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
                    >
                        Description
                    </InputLabel>
                    <TextField
                        name="description"
                        value={inputs.description}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <InputLabel
                        sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
                    >
                        Image URL
                    </InputLabel>
                    <TextField
                        name="image"
                        value={inputs.image}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <Button type="submit" color="primary" variant="contained">
                        SUBMIT
                    </Button>
                </Box>
            </form>
        </>
    )
}

export default CreateBlog
