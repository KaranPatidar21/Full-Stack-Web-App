import { Box, Button, Typography } from "@mui/material";
import CustomInputField from "../../components/ui-component/inputFields";

function Register() {
  return (
    <Box className="auth-page">
      <Box className="auth-card">
        <Typography variant="h3" className="auth-title">
          Create account
        </Typography>

        <Typography className="auth-subtitle">
          Register to start applying for jobs and posting opportunities.
        </Typography>

        <CustomInputField fullWidth label="Full name" placeholder="Your name" className="auth-field" />

        <CustomInputField fullWidth label="Email address" placeholder="you@example.com" className="auth-field" />

        <CustomInputField
          fullWidth
          type="password"
          label="Password"
          placeholder="Create a password"
          className="auth-field"
        />

        <Button
          fullWidth
          variant="contained"
          className="auth-button"
        >
          Create account
        </Button>
      </Box>
    </Box>
  );
}

export default Register;
