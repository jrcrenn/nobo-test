import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useStyles, styles } from "./styles";
import { defaultAvatar } from "../../config/const";
import { formatPremieredDate, scoreToColor } from "../../config/helpers";
import { useHistory } from "react-router-dom";

function ShowListItem({ item, setAnchorEl }) {
  const classes = useStyles();
  const history = useHistory();

  const handlePopoverOpen = event => {
    setAnchorEl({
      target: event.currentTarget,
      text: item.show.summary ? item.show.summary : "No summary available!!"
    });
  };

  return (
    <Grid item>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              style={{
                backgroundColor: scoreToColor(parseInt(item.score))
              }}
            >
              <div className={classes.evaluation}>
                {parseInt(item.score) / 2}/10
              </div>
            </Avatar>
          }
          action={
            <IconButton
              style={styles.wightColor.style}
              size="small"
              aria-label="settings"
              onClick={handlePopoverOpen}
            >
              <MoreVertIcon />
            </IconButton>
          }
          titleTypographyProps={styles.wightColor}
          title={item.show.type}
          subheaderTypographyProps={styles.wightColor}
          subheader={formatPremieredDate(item.show.premiered, true)}
        />

        <CardContent
          style={{
            backgroundImage:
              "url(" +
              (item.show.image ? item.show.image.medium : defaultAvatar) +
              ")"
          }}
          className={classes.media}
        ></CardContent>

        <CardActions className={classes.action} disableSpacing>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            style={styles.cardActionBtn}
            onClick={() => {
              history.push("/show/" + item.show.id, item);
            }}
          >
            <div style={styles.btnDiv}>{item.show.name}</div>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ShowListItem;
