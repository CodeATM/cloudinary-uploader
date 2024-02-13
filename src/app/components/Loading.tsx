import React from "react";
import { motion } from "framer-motion";
import { IoIosCloudOutline } from "react-icons/io";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        className="text-[8rem]    text-blue-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.25, 0.5, 0.75, 1, 0], scale: [0, 0.2, 0.4, 0.6, .8, 1],}}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      >
        <IoIosCloudOutline />
      </motion.div>
    </div>
  );
};

export default Loading;
