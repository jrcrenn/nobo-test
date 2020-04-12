import { makeStyles } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";

export const useStyles = makeStyles(theme => ({
  card: {
    width: 190,
    height: 380,
    backgroundColor: blueGrey[700]
  },
  media: {
    height: 230,
    backgroundSize: "cover",
    backgroundPosition: "center center"
  },
  evaluation: { fontSize: 11, color: blueGrey[900] },
  action: { background: blueGrey[900], justifyContent: "center" }
}));

export const styles = {
  wightColor: { style: { color: "#fff" } },
  cardActionBtn: {
    width: "100%",
    height: "100%",
    borderColor: "#fff",
    color: "#fff",
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
    }
  },

  btnDiv: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  }
};
