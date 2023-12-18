import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Modal } from "antd";
import {
  getAuthorList,
  getCategoryList,
  getPublisherList,
  addBook,
  updateBook,
  setEdittingBook
} from "../Api/BookController";

const { Option } = Select;

const AddBookModal = ({
  editBook,
  addNewBook,
  edittingBook,
  fetchBook,
  setEdittingBook,
  setEditBook,
  setAddNewBook,
}) => {
  const [form] = Form.useForm(); // Use form instance to control the form
  const [authorsList, setAuthorsList] = useState([]);
  const [publishersList, setPublishersList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showNewPublisherFields, setShowNewPublisherFields] = useState(false);
  const [showNewAuthorFields, setShowNewAuthorFields] = useState(false);

  useEffect(() => {
    fetchAuthors();
    fetchPublishers();
    fetchCategories();
  
    // Prefill form with existing book details when in "edit" mode
    if (editBook && edittingBook) {
      form.setFieldsValue({
        name: edittingBook.name,
        des: edittingBook.des,
        fee: edittingBook.fee,
        stockQuantity: edittingBook.stockQuantity,
        image: edittingBook.image,
        category: edittingBook.category.name,  // Make sure to get the name property
        publisher: edittingBook.publisher.name,  // Make sure to get the name property
        author: edittingBook.author.name,  // Make sure to get the name property
      });
  
      // Show additional fields if they are new
      if (edittingBook.publisher.new) {
        setShowNewPublisherFields(true);
        form.setFieldsValue({
          newPublisherName: edittingBook.publisher.name,
          newPublisherAddress: edittingBook.publisher.address,
        });
      }
  
      if (edittingBook.author.new) {
        setShowNewAuthorFields(true);
        form.setFieldsValue({
          newAuthorName: edittingBook.author.name,
          newAuthorNational: edittingBook.author.national,
        });
      }
    }
  }, [editBook, edittingBook, form]);

  const fetchAuthors = async () => {
    const res = await getAuthorList();
    setAuthorsList(res.data);
  };

  const fetchPublishers = async () => {
    const res = await getPublisherList();
    setPublishersList(res.data);
  };

  const fetchCategories = async () => {
    const res = await getCategoryList();
    setCategories(res.data);
  };

  const handlePublisherChange = (value) => {
    // If the selected value is 'add-publisher', show the fields for adding a new publisher
    setShowNewPublisherFields(value === "add-publisher");
  };

  const handleAuthorChange = (value) => {
    setShowNewAuthorFields(value === "add-author");
  };

  const handleCloseModal = () => {
    setAddNewBook(false);
    setEditBook(false);
    setEdittingBook();  // Clear the edittingBook state
    form.resetFields();  // Reset the form fields
  };
  
  const onFinish = async (values) => {
    const formData = {
      name: values.name,
      des: values.des,
      fee: values.fee,
      stockQuantity: values.stockQuantity,
      image: values.image,
      category: categories[values.category],
      publisher: publishersList[values.publisher],
      author: authorsList[values.author],
    };
  
    if (values.publisher === "add-publisher") {
      formData.publisher = {
        name: values.newPublisherName,
        address: values.newPublisherAddress,
      };
    }
  
    if (values.author === "add-author") {
      formData.author = {
        name: values.newAuthorName,
        national: values.newAuthorNational,
      };
    }
  console.log(formData)
    try {
      if (editBook) {
        // If in "edit" mode, call updateBook instead of addBook
        const res = await updateBook(edittingBook.id, formData);
        console.log("update book successfully", res.status);
        setEdittingBook();
        fetchBook();
        handleCloseModal();
      } else {
        // If in "add" mode, call addBook
        const res = await addBook(formData);
        console.log("add book successfully", res.status);
        fetchBook();
        handleCloseModal();
      }
    } catch (e) {
      console.log("add/update book failed", e);
    }
  };

  return (
    <div className="container mt-5">
      <Modal
        title={editBook ? "Edit Book" : "Add a New Book"}
        visible={addNewBook||editBook} // Assuming you pass a prop addNewBook to control the modal visibility
        onCancel={() => handleCloseModal()} // Assuming you have a function handleCloseModal to close the modal
        footer={null}
      >
        <Form
          form={form}
          name="add-book-form"
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Category"
            name="category"
            rules={[
              { required: true, message: "Please select the publisher!" },
            ]}
          >
            <Select>
              {categories.map((category, cIndex) => (
                <Option key={category.id} value={cIndex}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="des"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Fee"
            name="fee"
            rules={[{ required: true, message: "Please input the fee!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Stock Quantity"
            name="stockQuantity"
            rules={[
              { required: true, message: "Please input the stock quantity!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "Please input the image URL!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Publisher"
            name="publisher"
            rules={[
              { required: true, message: "Please select the publisher!" },
            ]}
          >
            <Select onChange={handlePublisherChange}>
              {publishersList.map((publisher,pIndex) => (
                <Option key={publisher.id} value={pIndex}>
                  {publisher.name}
                </Option>
              ))}
              <Option value="add-publisher">Add New Publisher</Option>
            </Select>
          </Form.Item>

          {showNewPublisherFields && (
            <>
              <Form.Item
                label="New Publisher Name"
                name="newPublisherName"
                rules={[
                  {
                    required: true,
                    message: "Please enter the new publisher name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="New Publisher Address"
                name="newPublisherAddress"
                rules={[
                  {
                    required: true,
                    message: "Please enter the new publisher address!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </>
          )}

          <Form.Item
            label="Author"
            name="author"
            rules={[{ required: true, message: "Please select the author!" }]}
          >
            <Select onChange={handleAuthorChange}>
              {authorsList.map((author,aIndex) => (
                <Option key={author.id} value={aIndex}>
                  {author.name}
                </Option>
              ))}
              <Option value="add-author">Add New Author</Option>
            </Select>
          </Form.Item>

          {showNewAuthorFields && (
            <>
              <Form.Item
                label="New Author Name"
                name="newAuthorName"
                rules={[
                  {
                    required: true,
                    message: "Please enter the new author name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="New Author National"
                name="newAuthorNational"
                rules={[
                  {
                    required: true,
                    message: "Please enter the new author national!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </>
          )}

          <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
            <Button type="primary" htmlType="submit">
            {editBook ? "Edit Book" : "Add a Book"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddBookModal;
