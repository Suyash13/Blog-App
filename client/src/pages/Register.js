import React from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { Box, Typography, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post("https://blog-app-xjhg.onrender.com/api/v1/user/register", {
                username: inputs.name,
                email: inputs.email,
                password: inputs.password
            });
            if(data.success) {
                toast.success("User Registered Successfully");
                navigate('/login');
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    maxWidth={450}
                    display="flex"
                    flexDirection={"column"}
                    alignItems="center"
                    justifyContent={"center"}
                    margin="auto"
                    marginTop={5}
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    borderRadius={5}
                >
                    <Typography
                        variant="h4"
                        sx={{ color: "#1976d2" }}
                        padding={3}
                        textAlign="center"
                    >
                        Register
                    </Typography>
                    <TextField
                        placeholder="Enter your name"
                        value={inputs.name}
                        name="name"
                        margin="normal"
                        type={"text"}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        placeholder="Enter E-mail ID"
                        value={inputs.email}
                        name="email"
                        margin="normal"
                        type={"email"}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        placeholder="Enter your password"
                        value={inputs.password}
                        name="password"
                        margin="normal"
                        type={"password"}
                        onChange={handleChange}
                        required
                    />

                    <Button
                        type="submit"
                        sx={{ borderRadius: 3, marginTop: 3 }}
                        variant="contained"
                        color="primary"
                    >
                        Submit
                    </Button>
                    <Button
                        sx={{ borderRadius: 3, marginTop: 3 }}
                        onClick={() => navigate("/login")}
                    >
                        Already Registered ? Please click here to login
                    </Button>
                </Box>
            </form>
        </div>
    )
}

export default Register
