import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CustomInputField from "../../components/ui-component/inputFields";

function Login() {
  return (
    <Box className="auth-page">
      <Box className="auth-card">
        <Typography variant="h3" className="auth-title">
          Welcome back
        </Typography>

        <Typography className="auth-subtitle">
          Log in to manage applications or job posts.
        </Typography>

        <CustomInputField
          fullWidth
          label="Email"
          placeholder="you@example.com"
          variant="outlined"
          className="auth-field"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />

        <CustomInputField
          fullWidth
          type="password"
          label="Password"
          placeholder="Enter your password"
          className="auth-field"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <VisibilityOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box className="auth-forgot-row">
          <Typography className="auth-link">
            Forgot password?
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          className="auth-button"
        >
          Log in
        </Button>

        <Typography align="center" className="auth-subtitle" sx={{ mt: 5, mb: 0 }}>
          New to PTJOB?{" "}
          <Box component={Link} to="/register" className="auth-link">
            Create an account
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
