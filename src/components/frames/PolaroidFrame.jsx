import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

const PolaroidFrame = ({ position, rotation, photo, index }) => {
    const groupRef = useRef();
    const texture = useLoader(TextureLoader, photo);

    // Gentle floating animation for each polaroid
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
        }
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            {/* Photo */}
            <mesh>
                <planeGeometry args={[1.2, 1.4]} />
                <meshStandardMaterial
                    map={texture}
                    roughness={0.8}
                    metalness={0.1}
                />
            </mesh>

            {/* White polaroid border */}
            <mesh position={[0, 0, -0.02]}>
                <planeGeometry args={[1.4, 1.7]} />
                <meshStandardMaterial
                    color="#ffffff"
                    roughness={0.7}
                    metalness={0.2}
                />
            </mesh>

            {/* Bottom label area */}
            <mesh position={[0, -0.65, -0.01]}>
                <planeGeometry args={[1.4, 0.4]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            {/* Shadow/depth */}
            <mesh position={[0, 0, -0.04]}>
                <planeGeometry args={[1.5, 1.8]} />
                <meshStandardMaterial
                    color="#f0f0f0"
                    roughness={0.9}
                />
            </mesh>
        </group>
    );
};

export default PolaroidFrame;
