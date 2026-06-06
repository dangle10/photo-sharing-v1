import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function TopBar ({ loggedInUser }) {
    const location = useLocation();
    const [contextText, setContextText] = useState("Home");

    useEffect(() => {
      const pathParts = location.pathname.split("/");
      
      if (pathParts.length === 3) {
        const type = pathParts[1];
        const id = pathParts[2];
        
        fetchModel(`http://localhost:3000/user/${id}`)
          .then((user) => {
            if (type === "users") {
              setContextText(`${user.first_name} ${user.last_name}`);
            } else if (type === "photos") {
              setContextText(`Photos of ${user.first_name} ${user.last_name}`);
            }
          })
          .catch(() => setContextText("Error loading context"));
      } else {
        setContextText("Home");
      }
    }, [location.pathname]); 

    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6" color="inherit">
                
                {loggedInUser ? `Hi, ${loggedInUser.first_name}` : "Please Login"}
              </Typography>
            </Grid>
            <Grid item>
              
              {loggedInUser && (
                <Typography variant="h6" color="inherit">
                  {contextText}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
}

export default TopBar;