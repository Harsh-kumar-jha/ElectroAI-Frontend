"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Text,
  Box,
  Plane,
  Environment,
} from "@react-three/drei";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Home, Eye, EyeOff, Lightbulb, Cable, Zap } from "lucide-react";
import * as THREE from "three";

interface Room {
  id: number;
  name: string;
  type: string;
  area: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ThreeDViewerProps {
  rooms: Room[];
  className?: string;
}

// Room component for 3D visualization
function Room3D({ room, isVisible }: { room: Room; isVisible: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.1;
    } else if (meshRef.current) {
      meshRef.current.position.y = 0.1;
    }
  });

  const getRoomColor = (type: string) => {
    switch (type) {
      case "Office":
        return "#4CAF50";
      case "Meeting":
        return "#2196F3";
      case "Utility":
        return "#FF9800";
      case "Storage":
        return "#9C27B0";
      default:
        return "#9E9E9E";
    }
  };

  if (!isVisible) return null;

  return (
    <group position={[(room.x - 200) / 50, 0, (room.y - 150) / 50]}>
      {/* Room floor */}
      <Box
        ref={meshRef}
        args={[room.width / 50, 0.2, room.height / 50]}
        position={[0, 0.1, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={getRoomColor(room.type)}
          transparent
          opacity={hovered ? 0.8 : 0.6}
        />
      </Box>

      {/* Room walls */}
      <group>
        {/* Front wall */}
        <Box
          args={[room.width / 50, 2, 0.1]}
          position={[0, 1, room.height / 100]}
        >
          <meshStandardMaterial color="#e0e0e0" transparent opacity={0.3} />
        </Box>
        {/* Back wall */}
        <Box
          args={[room.width / 50, 2, 0.1]}
          position={[0, 1, -room.height / 100]}
        >
          <meshStandardMaterial color="#e0e0e0" transparent opacity={0.3} />
        </Box>
        {/* Left wall */}
        <Box
          args={[0.1, 2, room.height / 50]}
          position={[-room.width / 100, 1, 0]}
        >
          <meshStandardMaterial color="#e0e0e0" transparent opacity={0.3} />
        </Box>
        {/* Right wall */}
        <Box
          args={[0.1, 2, room.height / 50]}
          position={[room.width / 100, 1, 0]}
        >
          <meshStandardMaterial color="#e0e0e0" transparent opacity={0.3} />
        </Box>
      </group>

      {/* Room label */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.3}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        {room.name}
      </Text>

      {/* Electrical elements */}
      {room.type === "Office" && (
        <>
          {/* Light fixture */}
          <Box args={[0.5, 0.1, 0.5]} position={[0, 2.8, 0]}>
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={0.2}
            />
          </Box>
          {/* Electrical outlet */}
          <Box
            args={[0.2, 0.1, 0.1]}
            position={[room.width / 100 - 0.1, 0.5, 0]}
          >
            <meshStandardMaterial color="#333333" />
          </Box>
        </>
      )}
    </group>
  );
}

// Electrical panel component
function ElectricalPanel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Box args={[0.8, 1.2, 0.2]} position={[0, 1.2, 0]}>
        <meshStandardMaterial color="#2c3e50" />
      </Box>
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.2}
        color="#e74c3c"
        anchorX="center"
        anchorY="middle"
      >
        MAIN PANEL
      </Text>
    </group>
  );
}

// Wire routing component
function WireRouting({ rooms }: { rooms: Room[] }) {
  const points = rooms.map(
    (room) => new THREE.Vector3((room.x - 200) / 50, 0.5, (room.y - 150) / 50)
  );

  // Add main panel connection point
  points.unshift(new THREE.Vector3(-5, 1, -3));

  const curve = new THREE.CatmullRomCurve3(points);
  const tubeGeometry = new THREE.TubeGeometry(curve, 64, 0.05, 8, false);

  return (
    <mesh geometry={tubeGeometry}>
      <meshStandardMaterial color="#e74c3c" />
    </mesh>
  );
}

// Camera controller
function CameraController({ resetTrigger }: { resetTrigger: number }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(10, 8, 10);
    camera.lookAt(0, 0, 0);
  }, [resetTrigger, camera]);

  return null;
}

// Main 3D Scene component
function Scene3D({
  rooms,
  showWiring,
  resetTrigger,
}: {
  rooms: Room[];
  showWiring: boolean;
  resetTrigger: number;
}) {
  return (
    <>
      <CameraController resetTrigger={resetTrigger} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minDistance={5}
        maxDistance={50}
      />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
      <pointLight position={[-10, 10, -10]} intensity={0.3} />

      {/* Environment */}
      <Environment preset="studio" />

      {/* Ground plane */}
      <Plane
        args={[20, 20]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color="#f5f5f5" />
      </Plane>

      {/* Rooms */}
      {rooms.map((room) => (
        <Room3D key={room.id} room={room} isVisible={true} />
      ))}

      {/* Electrical panel */}
      <ElectricalPanel position={[-5, 0, -3]} />

      {/* Wire routing */}
      {showWiring && <WireRouting rooms={rooms} />}
    </>
  );
}

export function ThreeDViewer({ rooms, className }: ThreeDViewerProps) {
  const [showWiring, setShowWiring] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for 3D scene
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleResetView = () => {
    setResetTrigger((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <Card className={`border-border ${className}`}>
        <CardHeader>
          <CardTitle>3D Electrical Model</CardTitle>
          <CardDescription>
            Interactive 3D visualization of your electrical design
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-96 bg-muted/30 rounded-lg">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <div className="space-y-2">
                <p className="text-lg font-medium">Generating 3D Model...</p>
                <p className="text-sm text-muted-foreground">
                  Processing electrical layout and wire routing
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-border ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>3D Electrical Model</CardTitle>
            <CardDescription>
              Interactive 3D visualization of your electrical design
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowWiring(!showWiring)}
              className="border-border bg-transparent"
            >
              {showWiring ? (
                <EyeOff className="h-4 w-4 mr-2" />
              ) : (
                <Eye className="h-4 w-4 mr-2" />
              )}
              {showWiring ? "Hide" : "Show"} Wiring
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetView}
              className="border-border bg-transparent"
            >
              <Home className="h-4 w-4 mr-2" />
              Reset View
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 3D Canvas */}
          <div className="h-96 bg-gradient-to-b from-sky-100 to-sky-50 rounded-lg overflow-hidden border border-border">
            <Canvas
              camera={{ position: [10, 8, 10], fov: 60 }}
              shadows
              gl={{ antialias: true, alpha: true }}
            >
              <Scene3D
                rooms={rooms}
                showWiring={showWiring}
                resetTrigger={resetTrigger}
              />
            </Canvas>
          </div>

          {/* Controls and Legend */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Controls</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Left click + drag: Rotate view</p>
                <p>• Right click + drag: Pan view</p>
                <p>• Scroll wheel: Zoom in/out</p>
                <p>• Hover over rooms for details</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Legend</h4>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  <Lightbulb className="h-3 w-3 mr-1" />
                  Office Spaces
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  <Cable className="h-3 w-3 mr-1" />
                  Meeting Rooms
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-red-50 text-red-700 border-red-200"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Electrical Panel
                </Badge>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <Separator />
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">
                {rooms.length}
              </div>
              <div className="text-xs text-muted-foreground">Rooms Modeled</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">1</div>
              <div className="text-xs text-muted-foreground">Main Panel</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {showWiring ? rooms.length : 0}
              </div>
              <div className="text-xs text-muted-foreground">Wire Runs</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
