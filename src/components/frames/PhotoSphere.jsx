import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const PhotoSphere = ({ position, photo }) => {
    const meshRef = useRef();

    // Load texture
    const texture = useLoader(TextureLoader, photo);

    // Floating animation
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3;
            meshRef.current.rotation.y += 0.008;
        }
    });

    return (
        <mesh ref={meshRef} position={position} castShadow>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial
                map={texture}
                metalness={0.3}
                roughness={0.6}
                transparent
                opacity={0.95}
            />
        </mesh>
    );
};

export default PhotoSphere;
