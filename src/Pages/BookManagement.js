import "antd/dist/reset.css";
import React, { useEffect, useState } from "react";
import { Button, Row, Col, Typography } from "antd";
import Product from "../Components/Product";
import { getBookList } from "../Api/BookController";
import AddBookModal from "../Components/AddBookModal";

const { Title } = Typography;

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [addNewBook, setAddNewBook] = useState(false);
  const [editBook, setEditBook] = useState(false);
  const [edittingBook, setEdittingBook] = useState(null);

  const fetchBook = async () => {
    const res = await getBookList();
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBook();
  }, []);

  const handleAddBook = () => {
    setAddNewBook(true);
    setEditBook(false);
    setEdittingBook(null);
  };

  const handleEdit = (index) => {
    console.log(books[index])
    setEdittingBook(books[index]);
    setEditBook(true);
    setAddNewBook(false);
  };

  const handleDelete = (index) => {
    // Implement delete logic here
    console.log(`Delete book with ID: ${books[index].id}`);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Book Management</Title>
      <Button type="primary" style={{ marginBottom: "16px" }} onClick={handleAddBook}>
        Create New Book
      </Button>
      <AddBookModal
        editBook={editBook}
        addNewBook={addNewBook}
        edittingBook={edittingBook}
        setAddNewBook={setAddNewBook}
        setEditBook={setEditBook}
        fetchBook={fetchBook}
        setEdittingBook={setEdittingBook}
      />
      <Row gutter={16}>
        {books.map((book, index) => (
          <Col key={book.id} xs={24} sm={12} md={8} lg={6}>
            <Product
              imageUrl={book.image}
              name={book.name}
              price={book.fee}
              handleEdit={() => handleEdit(index)}
              handleDelete={() => handleDelete(index)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BookManagement;
