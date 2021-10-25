import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner, Button } from "react-bootstrap";

const Waiting = (props) => {
  return (
    <AnimatePresence>
      <motion.div
        className="waiting-lobby"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h5>Waiting for someone to join</h5>
        <Spinner animation="border" variant="dark" />
        <h6>Click to Copy Session Code:</h6>
        <Button
          onClick={() => navigator.clipboard.writeText(props.joiningCode)}
        >
          {props.joiningCode}
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Waiting;
