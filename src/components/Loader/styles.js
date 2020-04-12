import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2)
      },
      minHeight: "80vh",
      alignItems: "center",
      justifyContent: "center"
    }
  }));

export default useStyles;
