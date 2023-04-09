import React from "react";
import { motion } from "framer-motion";
const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <form>
        <div>
          <label htmlFor="email">Full name</label>
          <input type="text" placeholder="Enter name here..." />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Enter email here..." />
        </div>
        <div>
          <label htmlFor="comment">comment</label>
          <textarea name="comment" id="" cols="30" rows="10"></textarea>
        </div>
        <button>Send</button>
      </form>
    </motion.div>
  );
};

export default Contact;
