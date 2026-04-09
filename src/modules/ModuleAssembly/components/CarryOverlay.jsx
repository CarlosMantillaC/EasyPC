import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CarryOverlay({ isCarrying, mousePos, isMobile }) {
  if (isMobile || !isCarrying) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0, opacity: 0 }} 
        style={{ 
          position: 'fixed', 
          left: mousePos.x, 
          top: mousePos.y, 
          translateX: '-50%', 
          translateY: '-50%', 
          zIndex: 9999, 
          pointerEvents: 'none' 
        }}
      >
        {typeof isCarrying.image === 'string' ? (
          <img 
            src={isCarrying.image} 
            alt="" 
            className={`object-contain drop-shadow-xl ${isCarrying.className || 'w-16 h-16 lg:w-24 lg:h-24'}`} 
          />
        ) : (
          isCarrying.image
        )}
      </motion.div>
    </AnimatePresence>
  );
}
