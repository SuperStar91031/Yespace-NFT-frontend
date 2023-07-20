import React, { useEffect, useState } from "react";
import { Container, Stack, useMediaQuery, useTheme } from "@mui/material";
import useWallets from "hooks/useWallets";
import { useLocation, useNavigate } from "react-router-dom";
import { ExploreIcon, PersonIcon } from "ui-component/SvgIcon";

const AppFooter = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:400px)");
  const location = useLocation();

  const [selectedTab, setSelectedTab] = useState(3);
  // const open = Boolean(anchorEl);

  const ActiveTabStyle = {
    "& path": {
      fill: theme.palette.primary.main,
    },
    cursor: "pointer",
    color: theme.palette.primary.main,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  };

  const DefaultTabStyle = {
    "&:hover": {
      "& path": {
        fill: theme.palette.primary.main,
      },
      color: theme.palette.primary.main,
    },
    cursor: "pointer",
    "& path": {
      fill: "white",
    },
    color: "white",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  };

  const { isLoggedIn } = useWallets();

  const handleClickTap = (tab: number) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    if (location.pathname.indexOf("explore") !== -1) {
      setSelectedTab(0);
    } else if (location.pathname.indexOf("myyespace") !== -1) {
      setSelectedTab(1);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      if (selectedTab == 0) navigate("/explore");
      else if (selectedTab == 1) navigate("/myyespace");
    }
  }, [selectedTab]);

  return (
    <>
      <Container sx={{ padding: isMobile ? "8px 0" : "auto" }}>
        <Stack direction="row" alignItems="center">
          <Stack
            onClick={() => handleClickTap(0)}
            sx={selectedTab === 0 ? ActiveTabStyle : DefaultTabStyle}
          >
            <ExploreIcon />
            Explore
          </Stack>
          <Stack
            onClick={() => handleClickTap(1)}
            sx={selectedTab === 1 ? ActiveTabStyle : DefaultTabStyle}
          >
            <PersonIcon />
            My Yespace
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default AppFooter;
