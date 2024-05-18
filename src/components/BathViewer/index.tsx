"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GlbModel from "./GlbModel";

type propsType = {
  width: string;
  height: string;
};

const BathViewer = ({ width, height }: propsType) => {
  return (
    <>
      <div>
        <Suspense>
          <Canvas
            style={{ width, height }}
            camera={{
              position: [5, 7, 5],
              fov: 50,
              aspect:700 / 400,
              near: 0.1,
              far: 2000,
            }}
            shadows
          >
            {/* canvasの背景色 */}
            <ambientLight intensity={1} />
            <directionalLight
              position={[0, 3, 0]}
              intensity={2}
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              castShadow
            />
            <OrbitControls />
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
