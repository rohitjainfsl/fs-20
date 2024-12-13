import React, { useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import AddBlog from "./AddBlog";

import Book1 from '../assets/shopping (1).webp';
import Book2 from '../assets/shopping (2).webp';
import Book3 from '../assets/shopping (3).webp'; 
import Book4 from '../assets/shopping (4).webp';
import Book5 from '../assets/shopping (5).webp';
import Book6 from '../assets/shopping (6).webp';
import Book7 from '../assets/shopping (7).webp';
import Book8 from '../assets/shopping (8).webp';

const postsData = [
  {
    id: 1,
    title: "How to Learn React",
    author: "John Doe",
    date: "2024-12-01",
    content: "React is a popular JavaScript library for building user interfaces. To get started, you should know JavaScript and HTML.",
    image: Book1
  },
  {
    id: 2,
    title: "Understanding JSX",
    author: "Jane Smith",
    date: "2024-12-02",
    content: "JSX is a syntax extension for JavaScript that looks similar to HTML. It’s used with React to describe the UI.",
    image: Book2
  },
  {
    id: 3,
    title: "Components in React",
    author: "Michael Lee",
    date: "2024-12-03",
    content: "React components allow you to build reusable, self-contained units of UI. They can either be function components or class components.",
    image: Book3
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    date: "2024-12-04",
    content: "The Great Gatsby is a novel set in the Jazz Age that explores themes of wealth, class, and the American Dream.",
    image: Book4
  },
  {
    id: 5,
    title: "1984",
    author: "George Orwell",
    date: "2024-12-05",
    content: "1984 is a dystopian novel that critiques totalitarianism and explores themes of surveillance and control.",
    image: Book5
  },
  {
    id: 6,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    date: "2024-12-06",
    content: "This novel deals with racial injustice in the American South and the loss of innocence.",
    image: Book6
  },
  {
    id: 7,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    date: "2024-12-07",
    content: "A romantic novel that critiques social class and gender roles in early 19th century England.",
    image: Book7
  },
  {
    id: 8,
    title: "Moby-Dick",
    author: "Herman Melville",
    date: "2024-12-08",
    content: "Moby-Dick tells the story of Captain Ahab's obsessive quest to hunt down the white whale that maimed him.",
    image: Book8
  }
];

const Blog = () => {
  const [posts] = useState(postsData);
  const [showAddBlog, setShowAddBlog] = useState(false);

  const handleAddBlogClick = () => {
    setShowAddBlog(!showAddBlog);
  };

  const handleAddBlog = (newBlog) => {
    setPosts([newBlog, ...posts]);
    setShowAddBlog(false); 
  };

  return (
    <Container className="my-4">
      <h1 className=" text-center m-3">Blog</h1>

      <Button variant="success" onAddBlog={handleAddBlog} onClick={handleAddBlogClick} className="mb-3">
        {showAddBlog ? "Cancel" : "Add Blog"}
      </Button>

      {showAddBlog && <AddBlog onAddBlog={handleAddBlog} onClose={handleAddBlogClick} />}

      <Row>
        {posts.map((post) => (
          <Col key={post.id} xs={10} sm={4} md={2} lg={3} className="mb-2">
            <Card style={{ height: "100%" }}> 
              <Card.Img
                variant="top"
                src={post.image}
                alt={post.title}
                style={{
                  objectFit: "cover",
                  height: "200px", 
                  width: "100%", 
                }}
              />
              <Card.Body className="d-flex flex-column" style={{ height: "60%" }}>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="mb-1 text-muted">
                  By {post.author} | {post.date}
                </Card.Subtitle>
                <Card.Text style={{ flexGrow: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
                  {post.content}
                </Card.Text>
                <Button variant="primary" className="mt-2" style={{ marginTop:0 }} >
                  Read more
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Blog;
