'use client';
import { motion } from 'framer-motion';

export default function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
  const yOffset = direction === 'up' ? 20 : direction === 'down' ? -20 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      // CAMBIO CLAVE: Usamos 'animate' para que se ejecute inmediatamente al montarse.
      // Esto evita que se queden ocultos esperando un evento de scroll que quizás no ocurra.
      animate={{ opacity: 1, y: 0 }} 
      transition={{ 
        duration: 0.5, 
        delay: delay, 
        ease: "easeOut" 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}