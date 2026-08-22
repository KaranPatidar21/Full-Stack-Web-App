import {
  Box,
  Button,
  Alert,
  Chip,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CustomInputField from "../../components/ui-component/inputFields";
import { pageUrl } from "../../constant";
import { setItemInLocalStorage } from "../../utils/localStorage";
import { clearAuthError, setUser } from "./service/authReducer";
import {
  getProfile,
  login as loginAction,
  signup as signupAction,
} from "./service/authAction";

const opportunities = [
  { initials: "ZM", title: "Frontend Developer", company: "Zomato", location: "Remote", tag: "Remote", pay: "Rs18k/mo" },
  { initials: "SW", title: "Weekend Delivery Partner", company: "Swiggy", location: "Mumbai", tag: "Urgent", pay: "Rs700/day" },
  { initials: "BY", title: "Math Tutor (Grades 9-12)", company: "BYJU'S", location: "Delhi", tag: "Part-time", pay: "Rs500/hr" },
];

const metrics = [
  { value: "48K+", label: "Active Jobs" },
  { value: "12K+", label: "Companies" },
  { value: "3.2L+", label: "Job Seekers" },
];

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.auth);
  const [mode, setMode] = useState(location.state?.mode === "register" ? "register" : "login");
  const [form, setForm] = useState({ fullName: "", email: "", password: "", role: "" });
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    dispatch(clearAuthError());
  }

  function handleModeChange(nextMode) {
    setMode(nextMode);
    setShowPassword(false);
    dispatch(clearAuthError());
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (mode === "login") {
      if (!form.email || !form.password) return;
      const result = await dispatch(loginAction({ email: form.email, password: form.password }));
      if (loginAction.fulfilled.match(result)) {
        setItemInLocalStorage("ptjob_token", result.payload.token);
        setItemInLocalStorage("ptjob_user", JSON.stringify(result.payload.user));
        dispatch(setUser(result.payload.user));
        dispatch(getProfile(result.payload.token));
        navigate("/");
      }
      return;
    }

    if (!form.fullName || !form.email || !form.password || !form.role || form.password.length < 8) {
      return;
    }
    const result = await dispatch(signupAction(form));
    if (signupAction.fulfilled.match(result)) {
      setMode("login");
      setForm({ fullName: "", email: form.email, password: "", role: "" });
      navigate(pageUrl.login, { state: { message: "Account created. You can log in now." } });
    }
  }

  return (
    <Box component="form" className="auth-page" onSubmit={handleSubmit}>
      <Box className="auth-layout">
        <Box className="auth-intro">
          <Chip label="•  1,200+ new jobs posted this week" className="auth-badge" />
          <Typography component="h1" className="auth-hero-title">
            Find <span>flexible</span><br />part-time jobs<br />near you.
          </Typography>
          <Typography className="auth-hero-subtitle">
            Work when you want. Hire when you need. Log in to pick up where you left off.
          </Typography>
          <Box className="opportunities-card">
            <Typography className="opportunities-title">HOT OPPORTUNITIES</Typography>
            {opportunities.map((job) => (
              <Box className="opportunity-row" key={job.title}>
                <Box className="opportunity-initials">{job.initials}</Box>
                <Box className="opportunity-info">
                  <Typography className="opportunity-title">{job.title}</Typography>
                  <Typography>{job.company} · {job.location}</Typography>
                </Box>
                <Box className="opportunity-pay">
                  <Chip label={job.tag} className={`opportunity-tag ${job.tag.toLowerCase().replace("-", "-")}`} />
                  <Typography>{job.pay}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box className="auth-metrics">
            {metrics.map((metric) => (
              <Box key={metric.label}><Typography>{metric.value}</Typography><span>{metric.label}</span></Box>
            ))}
          </Box>
        </Box>

        <Box className="auth-card">
          <Tabs value={mode} onChange={(_, value) => handleModeChange(value)} className="auth-tabs" variant="fullWidth">
            <Tab value="login" label="Log in" />
            <Tab value="register" label="Create account" />
          </Tabs>
          <Typography variant="h3" className="auth-title">
            {mode === "login" ? "Welcome back" : "Create account"}
          </Typography>
          <Typography className="auth-subtitle">
            {mode === "login" ? "Log in to manage applications or job posts." : "Register to start applying for jobs and posting opportunities."}
          </Typography>
          {location.state?.message && mode === "login" && <Alert severity="success" className="auth-feedback">{location.state.message}</Alert>}
          {error && <Alert severity="error" className="auth-feedback">{error}</Alert>}

          {mode === "register" && <CustomInputField fullWidth name="fullName" value={form.fullName} onChange={handleChange} label="Full name" placeholder="Your name" className="auth-field" />}
          <CustomInputField fullWidth name="email" value={form.email} onChange={handleChange} label={mode === "login" ? "Email" : "Email address"} placeholder="you@example.com" className="auth-field" InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlinedIcon /></InputAdornment> }} />
          <CustomInputField fullWidth name="password" value={form.password} onChange={handleChange} type={showPassword ? "text" : "password"} label="Password" placeholder={mode === "login" ? "Enter your password" : "Create a password"} className="auth-field" InputProps={{ startAdornment: <InputAdornment position="start"><LockOutlinedIcon /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)}><VisibilityOutlinedIcon /></IconButton></InputAdornment> }} />
          {mode === "register" && <Box className="auth-field auth-role-field"><Typography className="auth-role-label">Account type</Typography><ToggleButtonGroup fullWidth exclusive value={form.role} onChange={(_, role) => role && handleChange({ target: { name: "role", value: role } })} aria-label="Account type"><ToggleButton value="job_seeker" aria-label="Job seeker">Job seeker</ToggleButton><ToggleButton value="employer" aria-label="Employer">Employer</ToggleButton></ToggleButtonGroup></Box>}
          {mode === "login" && <Box className="auth-forgot-row"><Typography className="auth-link">Forgot password?</Typography></Box>}
          <Button type="submit" fullWidth variant="contained" className="auth-button" disabled={isLoading}>{isLoading ? (mode === "login" ? "Logging in..." : "Creating account...") : (mode === "login" ? "Log in" : "Create account")}</Button>
          <Typography align="center" className="auth-subtitle auth-bottom-text">
            {mode === "login" ? "New to PTJOB?" : "Already have an account?"}{" "}
            <Box component={Link} to={pageUrl.login} state={{ mode: mode === "login" ? "register" : "login" }} className="auth-link" onClick={() => handleModeChange(mode === "login" ? "register" : "login")}>
              {mode === "login" ? "Create an account" : "Log in"}
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
