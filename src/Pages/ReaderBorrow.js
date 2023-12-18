import React, { useEffect, useState } from "react";
import { List, Typography, Button, Space } from "antd";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { getReaderBorrow } from "../Api/ReaderController";

const { Text } = Typography;

const ReaderBorrow = () => {
    const location = useLocation()
  const reader = location.state.reader
  const [userBorrows, setReaderBorrow] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getReaderBorrow(reader)
      .then((response) => {
        setReaderBorrow(response.data); // Assuming the response contains an array of reader orders
      })
      .catch((error) => {
        console.error("Error fetching reader orders:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [reader.id]);

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM D, YYYY [at] h:mm A");
  };

  const handleViewBorrow = (borrow) => {
    // Navigate to the borrow detail page with state
    navigate(`/borrow/${borrow.id}`, { state: { borrow: borrow } });
  };
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Your Borrows</h2>
      {loading ? (
        <p>Loading...</p>
      ) : userBorrows.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={userBorrows}
          renderItem={(borrow) => (
            <List.Item style={{ padding: "16px" }}>
              <List.Item.Meta
                title={`Borrow Date: ${formatDate(borrow.orderDate)}`}
                description={`Total: $${borrow.totalAmount.toFixed(2)}`}
              />
              {/* <Space>
                <Button type="primary" onClick={() => handleViewBorrow(borrow)}>
                  View
                </Button>
              </Space> */}
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default ReaderBorrow;
