import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import socket from "../api/index";

const CreateSession = () => {
  const [playerName, setPlayerName] = useState("");

  const handleForm = (e) => {
    setPlayerName(e.target.value);
  };

  const createSession = (e) => {
    playerName !== ""
      ? socket.emit("create_session", playerName)
      : e.preventDefault();
  };

  return (
    <div className="session-page">
      <Form>
        <Form.Group className="mb-3">
          <Form.Control placeholder="User name" onChange={handleForm} />
        </Form.Group>

        <Button
          className="session-btn"
          variant="primary"
          onClick={createSession}
        >
          Create and Join
        </Button>
      </Form>
    </div>
  );
};

export default CreateSession;
