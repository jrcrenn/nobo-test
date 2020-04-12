import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";

import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import logo from '../logo192.png';

export default props => {
  const classes = useStyles();
  const history = useHistory();
  const [searchValue, setSearchValue] = React.useState(null);
  function handleInputChange(event) {
    const f = event.target.value.trim();
    if (f.length > 0) setSearchValue(f.toLowerCase());
    else setSearchValue(null);
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      props.setShowsFilter(searchValue);
      history.push("/");
    }
  }
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <td className={classes.title}>
                <img alt="app icon" width="50" src={logo}/>
          </td>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
