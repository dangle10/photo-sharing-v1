import './App.css';

import React, { useState } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister";

const App = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
      <Router>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TopBar loggedInUser={loggedInUser} />
            </Grid>
            <div className="main-topbar-buffer" />
            
            <Grid item sm={3}>
              <Paper className="main-grid-item" style={{ padding: "20px" }}>
                {loggedInUser ? (
                  <UserList /> 
                ) : (
                  <Typography variant="body1">Vui lòng đăng nhập</Typography> 
                )}
              </Paper>
            </Grid>

            <Grid item sm={9}>
              <Paper className="main-grid-item">
                <Routes>
                  {loggedInUser ? (
                    
                    <>
                      <Route
                          path="/users/:userId"
                          element={<UserDetail />}
                      />
                      <Route
                          path="/photos/:userId"
                          element={<UserPhotos />}
                      />
                      <Route 
                          path="/users" 
                        
                      />
                      <Route path="*" element={<Navigate to="/users" replace />} />
                    </>

                  ) : (

                    <>
                      <Route 
                        path="/login" 
                        element={<LoginRegister setLoggedInUser={setLoggedInUser} />} 
                      />
                      
                      <Route path="*" element={<Navigate to="/login" replace />} />
                    </>

                  )}
                </Routes>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Router>
  );
}

export default App;