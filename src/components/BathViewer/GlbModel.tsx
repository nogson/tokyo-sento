import { Vector3, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Bath022 from "@/assets/model/Bath022";

const GlbModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>();
  const [defaultScale, setDefaultScale] = useState<Vector3>([1, 1, 1]);
  const [defaultPosition, setDefaultPosition] = useState<Vector3>([0, 0, 0]);

  const getDefaultObjectVal = (
    object: any
  ): {
    scale: Vector3;
    position: Vector3;
  } => {
    const baseSize = 2;
    const boundingBox = new THREE.Box3().setFromObject(object);
    const size = boundingBox.getSize(new THREE.Vector3());
    const position = boundingBox.getCenter(new THREE.Vector3());
    const scale = size.x > size.y ? baseSize / size.x : baseSize / size.y;
    return {
      scale: [scale, scale, scale],
      position: [-position.x * scale, -position.y * scale, -position.z * scale],
    };
  };

  useEffect(() => {
    setTimeout(() => {
      const defaultVal = getDefaultObjectVal(groupRef.current);
      console.log(defaultVal);
      //   setDefaultScale(defaultVal.scale);
      //   setDefaultPosition(defaultVal.position);
    }, 1000);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });
  return (
    <group ref={groupRef} scale={defaultScale} position={defaultPosition}>
      <Bath022 />
    </group>
  );
};

export default GlbModel;
