import { Box } from "@mui/material"
import Banner from "./Banner"
import FeaturedJobs from "./FeaturedJobs"
import JobCategories from "./JobCategories"

function Home() {
  return (
    <>
      <Box >
          <Banner />
          <FeaturedJobs />
          <JobCategories />
      </Box>
    </>
  )
}

export default Home
