"use client";

import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import Navbar from "../Navbar";
import Bottom from "../Bottom";
// import Header from "../Header";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF"];

export default function AuroraHero() {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);
  const backgroundImage = useMotionTemplate`radial-gradient(100% 100% at 50% 0%, #020617 50%, ${color})`;

  return (
    <div className={styles.main}>
      <motion.section style={{ backgroundImage }} className={styles.section}>
        <div className={styles.stars}>
          <Canvas>
            <Stars radius={50} count={2500} factor={4} fade speed={2} />
          </Canvas>
        </div>
      </motion.section>
    </div>
  );
}
