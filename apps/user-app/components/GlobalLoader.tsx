"use client";
import { motion } from "framer-motion";

export default function GlobalLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-4">
        {/* rotating spinner */}
        <motion.div
          className="w-12 h-12 rounded-full border-4 border-t-purple-600 border-gray-200"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
        />
        {/* simple skeleton bars */}
        <div className="space-y-2 w-48">
          <motion.div
            className="h-3 rounded bg-gray-200"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          />
          <motion.div
            className="h-3 rounded bg-gray-200"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              repeat: Infinity,
              duration: 1.1,
              ease: "easeInOut",
              delay: 0.15,
            }}
          />
          <motion.div
            className="h-3 rounded bg-gray-200 w-3/4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              repeat: Infinity,
              duration: 1.3,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
