import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./styles";

export default function Loader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  );
}
