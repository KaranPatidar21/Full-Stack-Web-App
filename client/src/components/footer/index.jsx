import { Box, IconButton, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer() {
  return (
    <Box component="footer" className="site-footer">
      <Box className="site-footer-inner">
        <Box className="site-footer-top">
          <Box className="site-footer-brand">
            <Typography component="span" className="site-footer-logo">
              PT<span>JOB</span>
            </Typography>
            <Box className="site-footer-divider" />
            <Typography className="site-footer-tagline">Flexible work, found fast.</Typography>
          </Box>

          <Box className="site-footer-socials" aria-label="Social media links">
            <IconButton aria-label="Twitter" className="site-footer-social-link">
              <TwitterIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="Instagram" className="site-footer-social-link">
              <InstagramIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="LinkedIn" className="site-footer-social-link">
              <LinkedInIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Box className="site-footer-bottom">
          <Typography>© 2026 PTJOB. All rights reserved.</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
