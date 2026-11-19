import { postRequest, getRequest } from "../../../services/api";
import { createGenericThunk } from "../../../utils/genericThunk";
import { apiUrl } from "../../../constant";

export const createJob = createGenericThunk(
  "jobs/createJob",
  (job) => postRequest(apiUrl.jobs.create, job),
  (response) => response.data.job
);

export const fetchMyPostedJobs = createGenericThunk(
  "jobs/fetchMyPostedJobs",
  () => getRequest(apiUrl.jobs.myPosted),
  (response) => response.data.jobs
);