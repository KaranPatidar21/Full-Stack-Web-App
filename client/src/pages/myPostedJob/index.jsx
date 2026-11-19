import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { fetchMyPostedJobs } from "../jobs/service/jobAction";

function MyPostedJob() {
  const dispatch = useDispatch();
  const { items: jobs, isLoading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchMyPostedJobs());
  }, [dispatch]);

  return (
    <Box className="post-job-page">
      <Box className="post-job-card my-posted-job-page">
        <Typography component="h1" className="post-job-title">My posted jobs</Typography>
        <Typography className="post-job-subtitle">
          Manage the opportunities you have published.
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {isLoading && <CircularProgress size={24} />}
        {!isLoading && !error && jobs.length === 0 && (
          <Typography>No jobs have been posted yet.</Typography>
        )}
        <Box className="my-posted-job-list">
          {jobs.map((job) => (
            <Box className="my-posted-job-item" key={job._id}>
              <Typography className="my-posted-job-item-title">{job.jobTitle}</Typography>
              <Typography>{job.companyName} · {job.location}</Typography>
              <Typography>{job.pay} {job.payPeriod}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default MyPostedJob;
