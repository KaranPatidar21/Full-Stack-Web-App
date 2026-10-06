import { Box } from "@mui/material"
import Banner from "./Banner"
import FeaturedJobs from "./FeaturedJobs"
import JobCategories from "./JobCategories"
import Footer from "../../components/footer"

function Home() {
  return (
    <>
      <Box >
          <Banner />
          <FeaturedJobs />
          <JobCategories />
          <Footer />
      </Box>
    </>
  )
}

export default Home
