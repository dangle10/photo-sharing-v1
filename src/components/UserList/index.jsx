import React, { useState, useEffect } from "react";
import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData"; // Import hàm fetch vừa tạo
import "./styles.css";

function UserList () {
    // Tạo state lưu danh sách user, mặc định là mảng rỗng
    const [users, setUsers] = useState([]);

    // useEffect sẽ tự động chạy 1 lần khi component được render lên màn hình
    useEffect(() => {
      fetchModel("http://localhost:3000/user/list")
        .then((data) => setUsers(data)) // Khi có dữ liệu, cập nhật vào state 'users'
        .catch((err) => console.log(err));
    }, []); // Mảng rỗng [] giúp effect chỉ chạy 1 lần duy nhất
    
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