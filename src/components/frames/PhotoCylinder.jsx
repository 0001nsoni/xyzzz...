import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

const PhotoCylinder = ({ position, photos }) => {
    const meshRef = useRef();

    // Load first photo for cylinder texture
    const texture = useLoader(TextureLoader, photos[0]);
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = -1; // Mirror for cylinder wrap

    // Continuous rotation
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh ref={meshRef} position={position} castShadow>
            <cylinderGeometry args={[0.8, 0.8, 2.5, 32]} />
            <meshStandardMaterial
                map={texture}
                metalness={0.2}
                roughness={0.8}
            />
        </mesh>
    );
};

export default PhotoCylinder;
