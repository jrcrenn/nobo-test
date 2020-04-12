import React from "react";
import { AppBar, Toolbar, Typography} from "@material-ui/core";
import useStyles from "./styles";

const Footer = () => {

  const classes = useStyles();
  return(
    <AppBar position="fixed" color="primary" className={classes.appBar}>
    <Toolbar>
    <Typography variant="body1" color="inherit">
            &copy; Jean-Robert CRENN
    </Typography>
    </Toolbar>
  </AppBar>
  );
}

export default Footer;