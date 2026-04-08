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
  const [pixelCoords, setPixelCoords] = useState({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 } });

  const updateBasePositions = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const sX = (startPoint.x / 100) * rect.width;
    const sY = (startPoint.y / 100) * rect.height;
    const eX = (endPoint.x / 100) * rect.width;
    const eY = (endPoint.y / 100) * rect.height;

    setPixelCoords({ start: { x: sX, y: sY }, end: { x: eX, y: eY } });

    if (isConnected) {
      dragX.set(eX);
      dragY.set(eY);
    } else if (!isPickedUp && dragX.get() === 0) {
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
    const handleGlobalMouseMove = (e) => {
      if (!isPickedUp || isConnected || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      dragX.set(x);
      dragY.set(y);

      const distance = Math.sqrt(Math.pow(x - pixelCoords.end.x, 2) + Math.pow(y - pixelCoords.end.y, 2));
      if (distance < 40) {
        setIsPickedUp(false);
        onConnect();
      }
    };
    window.addEventListener("pointermove", handleGlobalMouseMove);
    return () => window.removeEventListener("pointermove", handleGlobalMouseMove);
  }, [isPickedUp, isConnected, pixelCoords.end, onConnect, dragX, dragY, containerRef]);

  const pathD = useTransform(
    [dragX, dragY],
    ([x, y]) => {
      const { start } = pixelCoords;
      
      // --- EXTREMO INICIAL (MB) ---
      const rImgStart = (startRotation * Math.PI) / 180;
      const rCabStart = (startCableRotation * Math.PI) / 180;
      
      // Posición de la punta ajustada por offsets de la imagen
      const sX = start.x + (Math.cos(rImgStart + Math.PI/2) * startOffsetX) + (Math.cos(rImgStart) * startOffsetY);
      const sY = start.y + (Math.sin(rImgStart + Math.PI/2) * startOffsetX) + (Math.sin(rImgStart) * startOffsetY);
      
      // Tramo rígido usando su propia rotación
      const rigidStartX = sX + Math.cos(rCabStart) * rigidLength;
      const rigidStartY = sY + Math.sin(rCabStart) * rigidLength;

      // --- EXTREMO FINAL (Móvil / SSD) ---
      const rImgEnd = (isConnected ? endRotation : 180) * Math.PI / 180;
      const rCabEnd = (isConnected ? endCableRotation : (endCableRotation + (isPickedUp ? 0 : 0))) * Math.PI / 180;
      
      // Posición de la punta móvil ajustada
      const fX = x + (Math.cos(rImgEnd + Math.PI/2) * endOffsetX) + (Math.cos(rImgEnd) * endOffsetY);
      const fY = y + (Math.sin(rImgEnd + Math.PI/2) * endOffsetX) + (Math.sin(rImgEnd) * endOffsetY);
      
      // Tramo rígido final (Siempre sale de la punta según endCableRotation)
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

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {/* Conector MB */}
      <div style={{ position: "absolute", left: pixelCoords.start.x, top: pixelCoords.start.y, transform: `translate(-50%, -50%) rotate(${startRotation}deg)`, zIndex: 40 }}>
        <img src={PuntaCableSataConectado} alt="" className="w-10 h-10 object-contain" />
      </div>

      {/* Conector SSD / Móvil */}
      <motion.div
        onClick={(e) => { e.stopPropagation(); if(!isConnected) setIsPickedUp(!isPickedUp); }}
        style={{ position: "absolute", left: 0, top: 0, x: dragX, y: dragY, translateX: "-50%", translateY: "-50%", zIndex: isConnected ? 40 : 70 }}
        className="pointer-events-auto cursor-pointer"
      >
        <motion.img
          src={isConnected ? PuntaCableSataConectado : PuntaCableSata1}
          alt=""
          animate={{ scale: isPickedUp ? 1.15 : 1, rotate: isConnected ? endRotation : 180 }}
          className="w-14 h-14 object-contain drop-shadow-xl transition-all"
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
