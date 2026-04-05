import React, { useState, useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserDetail() {
    const { userId } = useParams(); 
    // State lưu thông tin 1 user, mặc định là null
    const [user, setUser] = useState(null);

    useEffect(() => {
      // Fetch dữ liệu của user có ID tương ứng
      fetchModel(`http://localhost:3000/user/${userId}`)
        .then((data) => setUser(data))
        .catch((err) => console.log(err));
    }, [userId]); // Chạy lại hàm fetch nếu userId thay đổi

    // Trong lúc chờ tải dữ liệu thì hiện chữ Loading
    if (!user) {
        return <Typography>Loading user details...</Typography>;
    }

    return (
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Location:</strong> {user.location}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Occupation:</strong> {user.occupation}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Description:</strong> {user.description}
          </Typography>

          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to={`/photos/${user._id}`}
            sx={{ mt: 2 }}
          >
            View Photos
          </Button>
        </Box>
    );
}

export default UserDetail;