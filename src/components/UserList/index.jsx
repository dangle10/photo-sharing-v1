import React, { useState, useEffect } from "react";
import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData"; 
import "./styles.css";

function UserList () {
    const [users, setUsers] = useState([]);

    
    useEffect(() => {
      fetchModel("http://localhost:3000/user/list")
        .then((data) => setUsers(data)) 
        .catch((err) => console.log(err));
    }, []); 
    
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          User List
        </Typography>
        <List component="nav">
          {users.map((item) => (
            <React.Fragment key={item._id}>
              <ListItem button component={Link} to={`/users/${item._id}`}>
                  <ListItemText primary={`${item.first_name} ${item.last_name}`}/>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </div>
    );
}

export default UserList;