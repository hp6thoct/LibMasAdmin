// ReaderManagement.js

import React, { useState, useEffect } from "react";
import { Button, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { getReaderList } from "../Api/ReaderController";

const { Title } = Typography;

const ReaderManagement = () => {
  const [readers, setReaders] = useState([]);

  const fetchReaders = async () => {
    const res = await getReaderList();
    setReaders(res.data);
  };

  useEffect(() => {
    fetchReaders();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Reader Management</Title>
      <Row gutter={16}>
        {readers.map((reader) => (
          <Col key={reader.id} xs={24} sm={12} md={8} lg={6}>
            <ReaderCard reader={reader} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

const ReaderCard = ({ reader }) => {
  const navigate = useNavigate();

  const handleView = () => {
    // Use navigate to go to the reader's borrow page with state
    navigate(`/reader/${reader.id}/borrow`, { state: { reader } });
  };

  return (
    <div style={{ marginBottom: "16px", border: "1px solid #e8e8e8", padding: "16px", borderRadius: "8px" }}>
      <Title level={4}>
        {reader.name.firstName} {reader.name.midName} {reader.name.lastName}
      </Title>
      <p>Email: {reader.account.email}</p>
      <p>Phone: {reader.phone}</p>
      <Button type="primary" onClick={handleView}>
        View
      </Button>
    </div>
  );
};

export default ReaderManagement;
