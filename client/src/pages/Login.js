import React from 'react'
import axios from 'axios'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../redux.js/store'
import { toast } from 'react-hot-toast';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputs, setInputs] = React.useState({
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
            const {data} = await axios.post("/api/v1/user/login", {
                email: inputs.email,
                password: inputs.password
            });
            if(data.success) {
                localStorage.setItem("userId", data?.user._id);
                dispatch(authActions.login());
                toast.success("User Logged In Successfully");
                navigate('/blogs');
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
                        Login
                    </Typography>
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
                        onClick={() => navigate("/register")}
                    >
                        Not a user ? Please click here to register
                    </Button>
                </Box>
            </form>
        </div>
    )
}

export default Login
