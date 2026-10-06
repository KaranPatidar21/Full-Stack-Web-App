import { Box, Typography } from "@mui/material";

function MyPostedJob() {
  return (
    <Box className="post-job-page">
      <Box className="post-job-card my-posted-job-page">
        <Typography component="h1" className="post-job-title">My posted jobs</Typography>
        <Typography className="post-job-subtitle">
          Your posted jobs will appear here.
        </Typography>
      </Box>
    </Box>
  );
}

export default MyPostedJob;
