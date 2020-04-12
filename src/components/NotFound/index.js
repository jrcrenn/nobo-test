import React from "react";
import { Link } from "react-router-dom";
import { notFoundImage } from "../../config/const";
import useStyles from "./styles";

function NotFoundPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img alt="" src={notFoundImage} />
      <p className={classes.text}>
        <Link to="/">Go to Home </Link>
      </p>
    </div>
  );
}
export default NotFoundPage;
