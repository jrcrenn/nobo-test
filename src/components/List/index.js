import React from "react";
import { Container, Button } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import Grid from "@material-ui/core/Grid";
import ShowListItem from "../ListItem";
import useStyles from "./styles";
import { fetchShows } from "../../config/api";
import Loader from "../Loader";

function App(props) {
  const classes = useStyles();
  const [shows, setShows] = React.useState(undefined);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  React.useEffect(() => {
    getShows();
  }, []);

  function getShows() {
    setLoading(true);
    setError(false);
    fetchShows()
      .then(shows => {
        setShows(shows);
      })
      .catch(error => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh"
        }}
      >
        <Button onClick={getShows} variant="contained" color="secondary">
          Retry
        </Button>
      </div>
    );
  }

  if (shows.length === 0) {
    return (
      <div className={classes.root}>
        <Grid container justify="center">
          Pas de show disponible pour l'instant.
        </Grid>
      </div>
    );
  }

  return (
    <Container className={classes.root}>
      <Grid container justify="center" spacing={2}>
        {shows.map((item, index) => {
          const filter = props.useFilter;

          if (!filter) {
            return (
              <ShowListItem
                key={index}
                item={item}
                setAnchorEl={setAnchorEl}
              ></ShowListItem>
            );
          } else {
            const name = item.show.name.toLowerCase();
            if (name.includes(filter)) {
              return (
                <ShowListItem
                  key={index}
                  item={item}
                  setAnchorEl={setAnchorEl}
                ></ShowListItem>
              );
            }
          }
          return null;
        })}

        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper
          }}
          open={open}
          anchorEl={anchorEl ? anchorEl.target : anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <div
            dangerouslySetInnerHTML={{
              __html: anchorEl ? anchorEl.text : null
            }}
          ></div>
        </Popover>
      </Grid>
    </Container>
  );
}

export default App;
