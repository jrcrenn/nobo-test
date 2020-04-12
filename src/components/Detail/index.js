import React from "react";
import { fetchShows } from "../../config/api";
import Loader from "../Loader";
import {
  Button,
  Container,
  Grid,
  Typography,
  CardHeader,
  Avatar
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { defaultAvatar } from "../../config/const";
import { formatPremieredDate, scoreToColor } from "../../config/helpers";
import { fetchEpisode } from "../../config/api";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import useStyles from "./styles";

function ShowDetail() {
  const location = useLocation();
  const classes = useStyles();
  const state = location.state;

  const [show, setShow] = React.useState(state);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [episodes, setEpisodes] = React.useState(null);

  const getShows = React.useCallback(() => {
    setLoading(true);
    setError(false);

    fetchShows()
      .then(shows => {
        // eslint-disable-next-line eqeqeq
        const show = shows.find(
          item => item.show.id === location.pathname.split("/")[2]
        );
        getEpisodes(show.show._links);
        setShow(show);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location.pathname]);

  React.useEffect(() => {
    if (!show) getShows();
    else {
      setLoading(false);
      setError(false);
      if (show && episodes === null) getEpisodes(show.show._links);
    }
  }, [show, getShows, episodes]);

  async function getEpisodes(links) {
    const ep = [];
    Object.keys(links).forEach(function(item) {
      fetchEpisode(links[item].href)
        .then(s => {
          ep[item] = s;
        })
        .catch(err => {
          setError(true);
        });
    });
    setEpisodes(ep);
  }

  function typography(variant, item, value) {
    return (
      <Typography variant={variant} color="textSecondary">
        {item + value}
      </Typography>
    );
  }

  function controlButton(index) {
    return (
      <IconButton
        disabled={episodes[index] ? true : false}
        onClick={() =>
          episodes[index] ? window.open(episodes[index].url, "_blank") : null
        }
      >
        {index === "previousepisode" ? (
          <SkipPreviousIcon />
        ) : index === "self" ? (
          <PlayArrowIcon className={classes.playIcon} />
        ) : (
          <SkipNextIcon />
        )}
      </IconButton>
    );
  }

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return (
      <div className={classes.errorDiv}>
        <Button onClick={getShows} variant="contained" color="secondary">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      <Container className={classes.container}>
        <Grid container spacing={1}>
          <Grid item>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cover}
                image={
                  show.show.image ? show.show.image.original : defaultAvatar
                }
                title="Live from space album cover"
              />
              <div className={classes.details}>
                <CardHeader
                  action={
                    <Avatar
                      aria-label="recipe"
                      style={{
                        backgroundColor: scoreToColor(parseInt(show.score))
                      }}
                      className={classes.avatar}
                    >
                      <div className={classes.evaluation}>
                        {show.show ? parseInt(show.score) / 2 : 0}/10
                      </div>
                    </Avatar>
                  }
                  title={show.show.name}
                />
                <CardContent className={classes.content}>
                  {typography("subtitle1", "Type : ", show.show.type)}
                  {typography(
                    "subtitle2",
                    "Premiered : ",
                    formatPremieredDate(show.show.premiered, false)
                  )}
                  {typography(
                    "subtitle2",
                    "Language : ",
                    show.show.language,
                    false
                  )}
                  {typography("subtitle2", "Status : ", show.show.status)}
                  {typography(
                    "subtitle2",
                    "Schedule : ",
                    show.show.schedule.days.join(",") +
                      " at " +
                      show.show.schedule.time
                  )}
                  {typography(
                    "subtitle2",
                    "Network name : ",
                    show.show.network
                      ? show.show.network.name
                      : "No Information"
                  )}
                  {typography(
                    "subtitle2",
                    "Country : ",
                    show.show.network
                      ? show.show.network.country.name
                      : "No Information"
                  )}
                  {typography(
                    "subtitle2",
                    "Time zone : ",
                    show.show.network
                      ? show.show.network.country.timezone
                      : "No Information"
                  )}
                </CardContent>

                <div className={classes.controls}>
                  {controlButton("previousepisode")}
                  {controlButton("self")}
                  {controlButton("nextepisode")}
                </div>
              </div>
            </Card>
          </Grid>
          <Grid xs={6} item>
            <Card className={classes.summary}>
              <div className={classes.secondDiv}>
                <CardHeader title="Summary" />
                <CardContent className={classes.content}>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    dangerouslySetInnerHTML={{
                      __html: show.show.summary
                    }}
                  ></Typography>
                </CardContent>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ShowDetail;
