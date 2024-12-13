import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const AddBlog = ({ onAddBlog, onClose }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      id: Date.now(), 
      title,
      author,
      date,
      content,
      image,
    };
    onAddBlog(newBlog);
    setTitle("");
    setAuthor("");
    setDate("");
    setContent("");
    setImage("");
    setImagePreview(null);

  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="blogTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              required
            />
          </Form.Group>
          <Form.Group controlId="blogAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author's name"
              required
            />
          </Form.Group>
          <Form.Group controlId="blogDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="blogContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter blog content"
              required
            />
          </Form.Group>
          <Form.Group controlId="blogImage">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange} 
              required
            />
          </Form.Group>
          {imagePreview && (
            <div className="mt-3">
              <img
                src={imagePreview}
                alt="Image preview"
                style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
              />
            </div>
          )}

          <Button variant="primary" type="submit">
            Add Blog
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddBlog;
