import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: "#2E3B55",
    top: 'auto',
    bottom: 0,
    alignItems: 'center'
  }
}));

export default useStyles;
