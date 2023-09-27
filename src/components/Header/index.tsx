import React, { useState } from "react";
import { Button, SwipeableDrawer  } from "@mui/material";

import "./index.scss";

const Header = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="header">
      Header
      <Button
        variant="outlined"
        sx={{ textTransform: "none" }}
        onClick={() => setOpen(true)}
      >
        Search
      </Button>
      <SwipeableDrawer  anchor="top" open={open} onClose={onClose} onOpen={() => setOpen(true)}>123</SwipeableDrawer >
    </div>
  );
};

export default Header;
