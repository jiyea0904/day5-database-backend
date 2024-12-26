import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";

export default function Comment(props) {
  const { id, customer, content } = props.comment;
  const firstName = customer.first_name;
  const lastName = customer.last_name;
  const commentor = firstName + ' ' + lastName;

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleEdit = async () => {
    try {
      await axios.patch(`/comments/${id}`, { content: editedContent });
      setIsEditing(false);
      props.onUpdate(); // Refresh parent component's data
    } catch (error) {
      console.error("Failed to update comment", error);
    }
  };
  
  const handleDelete = async () => {
    try {
      await axios.delete(`/comments/${id}`);
      props.onUpdate(); // Refresh parent component's data
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };
  

  return (
    <Box sx={{ mb: 1 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {commentor}
          </Typography>
          {isEditing ? (
            <TextField
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          ) : (
            <Typography variant="body2">{content}</Typography>
          )}
          <Box sx={{ mt: 1 }}>
            {isEditing ? (
              <Button
                variant="contained"
                size="small"
                onClick={handleEdit}
                sx={{ mr: 1 }}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="small"
                onClick={() => setIsEditing(true)}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
            )}
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
