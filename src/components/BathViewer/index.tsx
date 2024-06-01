"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GlbModel from "./GlbModel";
import styles from "./BathViewer.module.scss";

type propsType = {
  width: number;
  height: number;
};

const BathViewer = ({ width, height }: propsType) => {
  return (
    <>
      <div className={styles.bathViewer}>
        <Suspense>
          <Canvas
            style={{ width: `${width}px`, height: `${height}px` }}
            camera={{
              position: [5, 7, 5],
              fov: 50,
              aspect: width / height,
              near: 0.1,
              far: 2000,
            }}
            shadows
          >
            <ambientLight intensity={1} />
            <directionalLight
              position={[0, 3, 0]}
              intensity={2}
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              castShadow
            />
            <OrbitControls enableRotate={false} />
            <axesHelper args={[5]} />
            <gridHelper />
            <GlbModel />
          </Canvas>
        </Suspense>
      </div>
    </>
  );
};

export default BathViewer;
