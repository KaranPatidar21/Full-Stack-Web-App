import {
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    Grid,
    Container,
} from "@mui/material";
import PtJobButton from "../../components/ui-component/PtJobButton";

const jobsData = [
    {
        id: 1,
        logo: "ZO",
        title: "Frontend Developer",
        company: "Zomato Tech",
        location: "Bengaluru",
        badge: "Urgent",
        badgeClass: "urgent-chip",
        tags: ["Part-time", "Remote", "React · JS"],
        salary: "₹18,000/mo",
        posted: "Posted 2 hours ago",
    },
    {
        id: 2,
        logo: "SW",
        title: "Weekend Delivery Partner",
        company: "Swiggy Instamart",
        location: "Mumbai",
        badge: "Verified",
        badgeClass: "verified-chip",
        tags: ["Weekends Only", "Andheri West"],
        salary: "₹700/day",
        posted: "Posted 5 hours ago",
    },
    {
        id: 3,
        logo: "BY",
        title: "Math Tutor – Grades 9 to 12",
        company: "BYJU'S",
        location: "Delhi NCR",
        badge: "Flexible",
        badgeClass: "flexible-chip",
        tags: ["Part-time", "Noida / Online"],
        salary: "₹500/hr",
        posted: "Posted 1 day ago",
    },
    {
        id: 4,
        logo: "DZ",
        title: "UI/UX Designer – Freelance",
        company: "DesignZap Studio",
        location: "Pune",
        badge: "New",
        badgeClass: "new-chip",
        tags: ["Freelance", "Remote", "Figma"],
        salary: "₹25,000/mo",
        posted: "Posted 3 hours ago",
    },
    {
        id: 5,
        logo: "CB",
        title: "Café Counter Staff",
        company: "Chai Breaks",
        location: "Hyderabad",
        badge: "Top Rated",
        badgeClass: "top-chip",
        tags: ["Morning Shift", "Banjara Hills"],
        salary: "₹12,000/mo",
        posted: "Posted 2 days ago",
    },
    {
        id: 6,
        logo: "MK",
        title: "Data Entry Operator",
        company: "MarketKing Analytics",
        location: "Chennai",
        badge: "Walk-in",
        badgeClass: "walkin-chip",
        tags: ["Part-time", "Anna Nagar", "Excel"],
        salary: "₹8,500/mo",
        posted: "Posted today",
    },
    {
        id: 7,
        logo: "MK",
        title: "Data Entry Operator",
        company: "MarketKing Analytics",
        location: "Chennai",
        badge: "Walk-in",
        badgeClass: "walkin-chip",
        tags: ["Part-time", "Anna Nagar", "Excel"],
        salary: "₹8,500/mo",
        posted: "Posted today",
    },
    {
        id: 8,
        logo: "MK",
        title: "Data Entry Operator",
        company: "MarketKing Analytics",
        location: "Chennai",
        badge: "Walk-in",
        badgeClass: "walkin-chip",
        tags: ["Part-time", "Anna Nagar", "Excel"],
        salary: "₹8,500/mo",
        posted: "Posted today",
    },
];

function FeaturedJobs() {
    return (
        <Container maxWidth="xl" className="featured-jobs-container">
            <h3 className="hero-title" style={{ marginBottom: "40px" }}>
                Featured <span > Job </span>
                <br />
                Openings
            </h3>
            <Grid container spacing={1}>
                {jobsData.map((job) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={job.id}>
                        <Card className="job-card">
                            <CardContent>
                                {/* Header */}
                                <div className="card-header">
                                    <div className="logo-box">
                                        {job.logo}
                                    </div>

                                    <Chip
                                        label={job.badge}
                                        className="urgent-chip"
                                        size="small"
                                    />
                                </div>

                                {/* Job Info */}
                                <Typography className="job-title">
                                    {job.title}
                                </Typography>

                                <Typography className="company-text">
                                    {job.company} • {job.location}
                                </Typography>

                                {/* Tags */}
                                <div className="tags">
                                    {job.tags.map((tag) => (
                                        <Chip
                                            label={tag}
                                            className="tag-chip"
                                        />
                                    ))}
                                </div>

                                <div className="divider" />

                                {/* Footer */}
                                <div className="card-footer">
                                    <Box>
                                        <Typography className="salary">
                                            {job.salary}
                                        </Typography>

                                        <Typography className="posted-text">
                                            {job.posted}
                                        </Typography>
                                    </Box>

                                    <PtJobButton
                                        buttons={[
                                            {
                                                actionName: "Apply Now",
                                                onClick: () => {
                                                    console.log(`Apply clicked for ${job.title}`);
                                                },
                                                variant: "contained",
                                            },
                                        ]}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default FeaturedJobs
