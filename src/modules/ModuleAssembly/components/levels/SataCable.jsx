import React, { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import PuntaCableSata1 from "../../../../assets/images/Components/Cables/PuntaCableSata1.png";
import PuntaCableSataConectado from "../../../../assets/images/Components/Cables/PuntaCableSataConectado.png";

export default function SataCable({
  startPoint,
  endPoint,
  isConnected,
  containerRef,
  onConnect,
  // Rotación de las IMÁGENES
  startRotation = 0,
  endRotation = 0,
  // Rotación de SALIDA DEL CABLE (La parte estática)
  startCableRotation = 0,
  endCableRotation = 180,
  // Desplazamientos
  startOffsetX = 0,
  startOffsetY = 0,
  endOffsetX = 0,
  endOffsetY = 0,
  // Curvatura y Estética
  startCurve = { x: 0, y: 0 },
  endCurve = { x: 0, y: 0 },
  rigidLength = 30, // Largo del tramo estático
  strokeWidth = 10
}) {
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const [isPickedUp, setIsPickedUp] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pixelCoords, setPixelCoords] = useState({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 } });

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const updateBasePositions = useCallback(() => {
    if (!containerRef.current) return;
    
    // If startPoint and endPoint are already in pixels (not percentages)
    const sX = startPoint.x;
    const sY = startPoint.y;
    const eX = endPoint.x;
    const eY = endPoint.y;

    setPixelCoords({ start: { x: sX, y: sY }, end: { x: eX, y: eY } });

    if (isConnected) {
      dragX.set(eX);
      dragY.set(eY);
    } else if (!isPickedUp && dragX.get() === 0) {
      dragX.set(sX);
      dragY.set(sY);
    } else if (isPickedUp && dragX.get() === 0) {
      dragX.set(sX);
      dragY.set(sY);
    }
  }, [startPoint, endPoint, containerRef, isConnected, isPickedUp, dragX, dragY]);

  useEffect(() => {
    updateBasePositions();
    window.addEventListener("resize", updateBasePositions);
    return () => window.removeEventListener("resize", updateBasePositions);
  }, [updateBasePositions]);

  useEffect(() => {
    const handlePickup = () => {
      if (!isPickedUp || isConnected) return;
      if (dragX.get() === 0) {
        dragX.set(pixelCoords.start.x);
        dragY.set(pixelCoords.start.y);
      }
    };
    handlePickup();
  }, [isPickedUp, isConnected, pixelCoords.start, dragX, dragY]);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isPickedUp || isConnected || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      dragX.set(x);
      dragY.set(y);
    };

    const handleGlobalTouchMove = (e) => {
      if (!isPickedUp || isConnected || !containerRef.current) return;
      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      dragX.set(x);
      dragY.set(y);
    };

    window.addEventListener("pointermove", handleGlobalMouseMove);
    window.addEventListener("touchmove", handleGlobalTouchMove, { passive: false });
    return () => {
      window.removeEventListener("pointermove", handleGlobalMouseMove);
      window.removeEventListener("touchmove", handleGlobalTouchMove);
    };
  }, [isPickedUp, isConnected, dragX, dragY, containerRef]);

  const pathD = useTransform(
    [dragX, dragY],
    ([x, y]) => {
      const { start } = pixelCoords;

      // --- EXTREMO INICIAL (MB) ---
      const rImgStart = (startRotation * Math.PI) / 180;
      const rCabStart = (startCableRotation * Math.PI) / 180;

      const sX = start.x + (Math.cos(rImgStart + Math.PI/2) * startOffsetX) + (Math.cos(rImgStart) * startOffsetY);
      const sY = start.y + (Math.sin(rImgStart + Math.PI/2) * startOffsetX) + (Math.sin(rImgStart) * startOffsetY);

      const rigidStartX = sX + Math.cos(rCabStart) * rigidLength;
      const rigidStartY = sY + Math.sin(rCabStart) * rigidLength;

      // --- EXTREMO FINAL (Móvil / SSD) ---
      const rImgEnd = (isConnected ? endRotation : 180) * Math.PI / 180;
      const rCabEnd = (isConnected ? endCableRotation : (endCableRotation + (isPickedUp ? 0 : 0))) * Math.PI / 180;

      const fX = x + (Math.cos(rImgEnd + Math.PI/2) * endOffsetX) + (Math.cos(rImgEnd) * endOffsetY);
      const fY = y + (Math.sin(rImgEnd + Math.PI/2) * endOffsetX) + (Math.sin(rImgEnd) * endOffsetY);

      const rigidEndX = fX + Math.cos(rCabEnd) * rigidLength;
      const rigidEndY = fY + Math.sin(rCabEnd) * rigidLength;

      // --- PUNTOS DE CURVATURA ---
      const cp1X = rigidStartX + startCurve.x;
      const cp1Y = rigidStartY + startCurve.y;
      const cp2X = rigidEndX + endCurve.x;
      const cp2Y = rigidEndY + endCurve.y;

      return `M ${sX},${sY} L ${rigidStartX},${rigidStartY} C ${cp1X},${cp1Y} ${cp2X},${cp2Y} ${rigidEndX},${rigidEndY} L ${fX},${fY}`;
    }
  );

  // Mobile: tap to auto-connect
  const handleMobileConnect = () => {
    if (isMobile && !isConnected && isPickedUp) {
      dragX.set(pixelCoords.end.x);
      dragY.set(pixelCoords.end.y);
      onConnect();
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {/* Conector MB */}
      <div style={{ position: "absolute", left: pixelCoords.start.x, top: pixelCoords.start.y, transform: `translate(-50%, -50%) rotate(${startRotation}deg)`, zIndex: 40 }}>
        <img src={PuntaCableSataConectado} alt="" className="w-8 h-8 lg:w-10 lg:h-10 object-contain" />
      </div>

      {/* Conector SSD / Móvil */}
      <motion.div
        onClick={(e) => { 
          e.stopPropagation(); 
          if (isMobile && isPickedUp && !isConnected) {
            handleMobileConnect();
          } else if (!isConnected) {
            setIsPickedUp(!isPickedUp); 
          }
        }}
        onTouchStart={(e) => {
          if (!isConnected) {
            e.stopPropagation();
            setIsPickedUp(true);
          }
        }}
        onTouchEnd={(e) => {
          if (isMobile && isPickedUp && !isConnected) {
            handleMobileConnect();
          }
        }}
        style={{ position: "absolute", left: 0, top: 0, x: dragX, y: dragY, translateX: "-50%", translateY: "-50%", zIndex: isConnected ? 40 : 70 }}
        className="pointer-events-auto cursor-pointer"
      >
        <motion.img
          src={isConnected ? PuntaCableSataConectado : PuntaCableSata1}
          alt=""
          animate={{ scale: isPickedUp ? 1.15 : 1, rotate: isConnected ? endRotation : 180 }}
          className="w-12 h-12 lg:w-14 lg:h-14 object-contain drop-shadow-xl transition-all"
        />
      </motion.div>

      {/* El Cable */}
      <svg className="absolute w-full h-full overflow-visible z-[60]">
        <motion.path d={pathD} stroke="rgba(0,0,0,0.3)" strokeWidth={strokeWidth + 4} fill="transparent" strokeLinecap="butt" />
        <motion.path d={pathD} stroke="#ef4444" strokeWidth={strokeWidth} fill="transparent" strokeLinecap="butt" />
        <motion.path d={pathD} stroke="rgba(255,255,255,0.2)" strokeWidth={strokeWidth / 4} fill="transparent" strokeLinecap="butt" style={{ translate: "0px -1.5px" }} />
      </svg>
    </div>
  );
}
