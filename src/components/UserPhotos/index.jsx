import React, { useState, useEffect } from "react";
import { Typography, Card, CardHeader, CardMedia, CardContent, Divider, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserPhotos () {
    const { userId } = useParams();
    const [photos, setPhotos] = useState(null);

    useEffect(() => {
      fetchModel(`http://localhost:3000/photosOfUser/${userId}`)
        .then((data) => setPhotos(data))
        .catch((err) => console.log(err));
    }, [userId]);

    if (!photos) {
        return <Typography>Loading photos...</Typography>;
    }

    if (photos.length === 0) {
        return <Typography>No photos found for this user.</Typography>;
    }

    return (
      <Box>
        <Typography variant="h5" gutterBottom>Photos</Typography>
        
        {photos.map((photo) => (
          <Card key={photo._id} sx={{ marginBottom: 4 }}>
            <CardHeader 
                title={`Posted on: ${new Date(photo.date_time).toLocaleString()}`} 
                titleTypographyProps={{ variant: 'subtitle1' }}
            />
            
            <CardMedia
              component="img"
              image={require(`../../images/${photo.file_name}`)} 
              alt="User Upload"
            />
            
            <CardContent>
              <Typography variant="h6" gutterBottom>Comments</Typography>
              <Divider sx={{ marginBottom: 2 }} />
              
              {photo.comments && photo.comments.map((comment) => (
                <Box key={comment._id} sx={{ marginBottom: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>
                      <Link to={`/users/${comment.user._id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                        {comment.user.first_name} {comment.user.last_name}
                      </Link>
                    </strong>
                    {" - "}{new Date(comment.date_time).toLocaleString()}
                  </Typography>
                  <Typography variant="body1">
                    {comment.comment}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        ))}
      </Box>
    );
}

export default UserPhotos;