import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
} from "@mui/material";
import PtJobButton from "../../components/ui-component/PtJobButton";
import CustomInputField from "../../components/ui-component/inputFields";

const jobs = [
  {
    logo: "ZM",
    title: "Frontend Developer",
    company: "Zomato • Remote • ₹18k/mo",
    tag: "Remote",
    color: "success",
  },
  {
    logo: "SW",
    title: "Weekend Delivery Partner",
    company: "Swiggy • Mumbai • ₹700/day",
    tag: "Urgent",
    color: "warning",
  },
  {
    logo: "BY",
    title: "Math Tutor (Grades 9-12)",
    company: "BYJU'S • Delhi • ₹500/hr",
    tag: "Part-time",
    color: "primary",
  },
];

function Banner() {
  return (
    <>
      <div className="outer-hero-container">
        <Container maxWidth="xl" className="hero-container">
          <div className="hero-left">
            <div className="badge">
              ● 1,200+ new jobs posted this week
            </div>

            <h1 className="hero-title">
              Find <span>Flexible</span>
              <br />
              Part-Time Jobs Near You
            </h1>

            <p className="hero-subtitle">
              Work when you want. Hire when you need.
            </p>

            <div className="search-box">
              <CustomInputField
                placeholder="Job title or keyword"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                fullWidth
              />

              <CustomInputField
                placeholder="City or Remote"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                fullWidth
              />

              <PtJobButton
                buttons={[
                  {
                    actionName: "Search",
                    onClick: () => {},
                    variant: "contained",
                  },
                ]}
              />
            </div>

            <div className="hero-buttons">
              <PtJobButton
                buttons={[
                  {
                    actionName: "Find Jobs",
                    onClick: () => {},
                    variant: "contained",
                    sx: {
                      bgcolor: "#ff6236",
                      "&:hover": {
                        bgcolor: "#e9552f",
                      },
                    },
                  },
                  {
                    actionName: "Post a Job",
                    onClick: () => {},
                    variant: "outlined",
                  },
                ]}
              />
            </div>

            <div className="stats">
              <div>
                <h3>48K+</h3>
                <p>Active Jobs</p>
              </div>

              <div>
                <h3>12K+</h3>
                <p>Companies</p>
              </div>

              <div>
                <h3>3.2L+</h3>
                <p>Job Seekers</p>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <Card className="jobs-card">
              <CardContent>
                <Typography className="hot-title">
                  Hot Opportunities
                </Typography>

                {jobs.map((job, index) => (
                  <Box className="job-item" key={index}>
                    <div className="job-logo">{job.logo}</div>

                    <div className="job-info">
                      <h4>{job.title}</h4>
                      <p>{job.company}</p>
                    </div>

                    <Chip
                      label={job.tag}
                      color={job.color}
                      size="small"
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Banner;