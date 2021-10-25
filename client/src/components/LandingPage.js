import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Modal } from "react-bootstrap";

import CreateSession from "./CreateSession";
import JoinSession from "./JoinSession";

const LandingPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleShowJoinModal = () => setShowJoinModal(true);
  const handleCloseJoinModal = () => setShowJoinModal(false);

  return (
    <AnimatePresence>
      <motion.div
        className="landing"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="title">Tic-Tac-Toe</h1>

        <div className="mb-2">
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create session
          </Button>
        </div>

        <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Session</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateSession />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCreateModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="mb-2">
          <Button variant="primary" onClick={handleShowJoinModal}>
            Join session
          </Button>
        </div>
        <Modal show={showJoinModal} onHide={handleCloseJoinModal}>
          <Modal.Header closeButton>
            <Modal.Title>Join Session</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <JoinSession />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseJoinModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </motion.div>
    </AnimatePresence>
  );
};

export default LandingPage;
