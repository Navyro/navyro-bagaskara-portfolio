"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export type CursorMode = "default" | "link" | "project" | "cta" | "email";

export default function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");
  const [cursorText, setCursorText] = useState("");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    // Touch device detection
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check for data-cursor attributes on hovered element or parent
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const mode = (cursorTarget.getAttribute("data-cursor") as CursorMode) || "link";
        const customText = cursorTarget.getAttribute("data-cursor-text") || "";
        setCursorMode(mode);
        setCursorText(customText);
      } else if (target.closest("a, button, input, textarea")) {
        setCursorMode("link");
        setCursorText("");
      } else {
        setCursorMode("default");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted || isTouch || shouldReduceMotion) return null;

  const isProject = cursorMode === "project";
  const isCta = cursorMode === "cta";
  const isLink = cursorMode === "link";

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full font-heading font-extrabold text-[10px] tracking-wider transition-colors duration-200"
      animate={{
        width: isProject ? 76 : isCta ? 64 : isLink ? 32 : 10,
        height: isProject ? 76 : isCta ? 64 : isLink ? 32 : 10,
        backgroundColor: isProject
          ? "rgba(31, 79, 255, 0.95)"
          : isCta
          ? "rgba(23, 23, 23, 0.9)"
          : isLink
          ? "transparent"
          : "var(--accent)",
        borderColor: isLink ? "var(--accent)" : "transparent",
        borderWidth: isLink ? 1.5 : 0,
        color: "#FFFFFF",
      }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    >
      {(isProject || isCta) && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="text-center font-bold tracking-widest leading-none uppercase text-white"
        >
          {cursorText || (isProject ? "VIEW ↗" : "OPEN ↗")}
        </motion.span>
      )}
    </motion.div>
  );
}
