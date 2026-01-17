import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const PhotoCube = ({ position, photos }) => {
    const meshRef = useRef();

    // Load textures - use first 6 photos for cube faces
    const textures = useLoader(TextureLoader, photos.slice(0, 6));

    // Rotate the cube
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    return (
        <mesh ref={meshRef} position={position} castShadow>
            <boxGeometry args={[2, 2, 2]} />
            {textures.map((texture, index) => (
                <meshStandardMaterial
                    key={index}
                    attach={`material-${index}`}
                    map={texture}
                    metalness={0.1}
                    roughness={0.8}
                />
            ))}
        </mesh>
    );
};

export default PhotoCube;
