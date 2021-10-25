import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import socket from "../api";

const JoinSession = () => {
  const [joinData, setJoinData] = useState({
    playerName: "",
    joiningCode: "",
    joiningCodeIsInvalid: false,
  });

  const handleForm = (e) => {
    setJoinData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = () => {
    if (joinData.joiningCode !== "" && joinData.playerName !== "") {
      socket.emit("join_session", joinData.joiningCode, joinData.playerName);
    } else {
      alert("Enter username and session code");
    }
  };

  useEffect(() => {
    socket.on("invalid_joiningCode", () => {
      setJoinData((prevData) => {
        return {
          ...prevData,
          joiningCodeIsInvalid: true,
        };
      });
    });
  }, []);

  return (
    <div className="sessions-page">
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            name="playerName"
            placeholder="User name"
            type="text"
            onChange={handleForm}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            name="joiningCode"
            placeholder="Session code"
            type="text"
            onChange={handleForm}
          />
        </Form.Group>
        <Button
          className="session-btn"
          variant="primary"
          type="button"
          onClick={handleSubmit}
        >
          Join Session
        </Button>
      </Form>

      {joinData.joiningCodeIsInvalid && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p style={{ color: "red" }}>Invalid Session Code</p>
        </motion.div>
      )}
    </div>
  );
};

export default JoinSession;
