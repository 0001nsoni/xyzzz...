import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const FloatingCard = ({ position, photo, rotation = [0, 0, 0] }) => {
    const meshRef = useRef();

    // Load texture
    const texture = useLoader(TextureLoader, photo);

    // Floating and tilting animation
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
            meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group position={position} rotation={rotation}>
            <mesh ref={meshRef} castShadow>
                <planeGeometry args={[1.5, 2]} />
                <meshStandardMaterial
                    map={texture}
                    metalness={0.1}
                    roughness={0.9}
                />
            </mesh>

            {/* Card border/frame effect */}
            <mesh position={[0, 0, -0.05]}>
                <planeGeometry args={[1.7, 2.2]} />
                <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.3} />
            </mesh>
        </group>
    );
};

export default FloatingCard;
