import React from 'react'
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../redux.js/store'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';
const Header = () => {
  let isLogin = useSelector(state => state.isLogin)
  isLogin = isLogin || localStorage.getItem("userId");
  console.log(isLogin)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = React.useState();
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout successful")
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography variant='h4'>
            My Blog App
          </Typography>
          {isLogin && (
            <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab label="Create Blog" LinkComponent={Link} to="/create-blog" />
              </Tabs>
            </Box>
          )}

          {!isLogin && (
            <Box display={'flex'} marginLeft={'auto'}>
              <Button sx={{ margin: 1, color: "White" }} LinkComponent={Link} to="/login">Login</Button>
              <Button sx={{ margin: 1, color: "White" }} LinkComponent={Link} to="/register">Register</Button>
            </Box>
          )}

          {isLogin && (
            <Button onClick={handleLogout} sx={{ margin: 1, color: "White" }}>Logout</Button>
          )}
        </Toolbar>

      </AppBar>
    </>
  )
}

export default Header
