import { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import PieChartIcon from "@mui/icons-material/PieChart";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import ScienceIcon from "@mui/icons-material/Science";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import GppGoodIcon from "@mui/icons-material/GppGood";
import SellIcon from "@mui/icons-material/Sell";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ApartmentIcon from "@mui/icons-material/Apartment";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import WorkIcon from "@mui/icons-material/Work";

const categoryEntries = [
  { name: "Operations", icon: LanguageIcon },
  { name: "Marketing", icon: PieChartIcon },
  { name: "Sales", icon: SellIcon, featured: true },
  { name: "IT & Software", icon: LaptopMacIcon },
  { name: "Data Science", icon: ScienceIcon },
  { name: "Customer Service", icon: HeadsetMicIcon },
  { name: "Insurance", icon: GppGoodIcon },
  { name: "BFSI", icon: BusinessIcon },
  { name: "HR", icon: PersonIcon },
];

const workModeEntries = [
  { name: "Remote", icon: HomeWorkIcon },
  { name: "Hybrid", icon: ApartmentIcon },
  { name: "On-Site", icon: WorkIcon, featured: true },
  { name: "Freelance", icon: AutorenewIcon },
  { name: "Night Shift", icon: NightlightRoundIcon },
];

function JobCategories() {
  const [activeFilter, setActiveFilter] = useState("category");

  const cardsToRender = useMemo(
    () => (activeFilter === "category" ? categoryEntries : workModeEntries),
    [activeFilter],
  );

  const onFilterChange = (_, newValue) => {
    if (newValue) {
      setActiveFilter(newValue);
    }
  };

  return (
    <section className="job-category-section">
      <Container maxWidth="xl">
        <h3 className="hero-title category-title">
          Job <span>Categories</span>
        </h3>

        <Box className="category-toggle-wrap">
          <ToggleButtonGroup
            exclusive
            value={activeFilter}
            onChange={onFilterChange}
            className="category-toggle-group"
          >
            <ToggleButton value="category">By Category</ToggleButton>
            <ToggleButton value="work-mode">By Work Mode</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box
          className={`job-entry-grid ${activeFilter === "category" ? "category-layout" : "workmode-layout"}`}
        >
          {cardsToRender.map(({ name, icon: IconComponent, featured }) => (
            <Card
              key={name}
              className={`job-entry-card ${featured && activeFilter === "category" ? "featured" : ""}`.trim()}
            >
              <CardActionArea className="job-entry-action">
                <IconComponent className="job-entry-icon" />
                <Typography className="job-entry-label">{name}</Typography>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Container>
    </section>
  );
}

export default JobCategories;