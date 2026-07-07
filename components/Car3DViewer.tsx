'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, RefreshCw, ZoomIn, ZoomOut, ToggleLeft, ToggleRight } from 'lucide-react';

interface Car3DViewerProps {
  carCategory: 'sedan' | 'suv' | 'luxury' | 'sports';
  carName: string;
  variantName: string;
  paintColor: string;
  alloyStyle: 'spoke' | 'star' | 'mesh' | 'redline';
  wooferStyle: 'none' | 'bassking' | 'jbl' | 'sony';
  interiorColor: string;
  viewMode: 'exterior' | 'interior';
  cadMode: boolean;
  trunkOpen: boolean;
}

export default function Car3DViewer({
  carCategory,
  carName,
  variantName,
  paintColor,
  alloyStyle,
  wooferStyle,
  interiorColor,
  viewMode,
  cadMode,
  trunkOpen,
}: Car3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isRotating, setIsRotating] = useState(true);

  // Keep references for animation
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const carGroupRef = useRef<THREE.Group | null>(null);
  const wheelsRef = useRef<THREE.Mesh[]>([]);
  const woofersRef = useRef<THREE.Mesh[]>([]);

  // Simulation loading effect when car or variant changes
  useEffect(() => {
    setLoading(true);
    setLoadProgress(0);
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        current = 100;
        setLoading(false);
        clearInterval(interval);
      }
      setLoadProgress(current);
    }, 100);
    return () => clearInterval(interval);
  }, [carName, variantName]);

  // Set up Three.js scene
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.clientWidth || 600;
    const height = containerRef.current.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null; // transparent to use CSS background
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight2.position.set(-5, 5, -5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 0.8, 10);
    pointLight.position.set(0, 3, 0);
    scene.add(pointLight);

    // Car Group
    const carGroup = new THREE.Group();
    scene.add(carGroup);
    carGroupRef.current = carGroup;

    // Custom Orbit Controls (lightweight drag handler)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotX = 0.2;
    let rotY = 0.8;
    let camDistance = 6.5;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      if (viewMode === 'exterior') {
        // Rotate car group in exterior view
        rotY += deltaMove.x * 0.008;
        rotX += deltaMove.y * 0.008;
        rotX = Math.max(-0.2, Math.min(1.2, rotX)); // limit vertical rotation
      } else {
        // Look around inside in interior view
        rotY -= deltaMove.x * 0.008;
        rotX -= deltaMove.y * 0.008;
        rotX = Math.max(-0.8, Math.min(0.8, rotX));
      }

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camDistance += e.deltaY * 0.005;
      camDistance = Math.max(3.0, Math.min(12.0, camDistance));
    };

    const canvasEl = canvasRef.current;
    canvasEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvasEl.addEventListener('wheel', onWheel, { passive: false });

    // Touch events for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y,
      };
      if (viewMode === 'exterior') {
        rotY += deltaMove.x * 0.01;
        rotX += deltaMove.y * 0.01;
        rotX = Math.max(-0.2, Math.min(1.2, rotX));
      } else {
        rotY -= deltaMove.x * 0.01;
        rotX -= deltaMove.y * 0.01;
        rotX = Math.max(-0.8, Math.min(0.8, rotX));
      }
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    canvasEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !renderer) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Auto rotation in exterior mode when not dragging
      if (viewMode === 'exterior' && isRotating && !isDragging) {
        rotY += 0.005;
      }

      // Position Camera
      if (viewMode === 'exterior') {
        camera.position.x = camDistance * Math.sin(rotY) * Math.cos(rotX);
        camera.position.z = camDistance * Math.cos(rotY) * Math.cos(rotX);
        camera.position.y = camDistance * Math.sin(rotX) + 0.5;
        camera.lookAt(0, 0.4, 0);
        carGroup.rotation.set(0, 0, 0);
      } else {
        // Camera locked inside the car cabin
        camera.position.set(0, 0.4, -0.1);
        const lookTarget = new THREE.Vector3(
          Math.sin(rotY) * Math.cos(rotX),
          Math.sin(rotX) + 0.4,
          Math.cos(rotY) * Math.cos(rotX) - 0.1
        );
        camera.lookAt(lookTarget);
      }

      // Pulse Subwoofers
      if (wooferStyle !== 'none' && woofersRef.current.length > 0) {
        const pulse = 1.0 + Math.sin(elapsedTime * 12) * 0.06;
        woofersRef.current.forEach(w => {
          w.scale.set(pulse, pulse, 1);
        });
      }

      // Rotate Wheels if auto rotating
      if (isRotating && wheelsRef.current.length > 0 && viewMode === 'exterior') {
        wheelsRef.current.forEach(w => {
          w.rotation.x += 0.05;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvasEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvasEl.removeEventListener('wheel', onWheel);
      canvasEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
      renderer.dispose();
    };
  }, [viewMode, isRotating, wooferStyle]);

  // Build/Rebuild the 3D car model based on selections
  useEffect(() => {
    const carGroup = carGroupRef.current;
    if (!carGroup) return;

    // Clear old car models
    while (carGroup.children.length > 0) {
      carGroup.remove(carGroup.children[0]);
    }
    wheelsRef.current = [];
    woofersRef.current = [];

    // Colors & Materials
    const chassisColor = new THREE.Color(paintColor);
    const seatColor = new THREE.Color(interiorColor);
    const tireColor = new THREE.Color(0x151518);
    const windowColor = new THREE.Color(0x111c24);
    const chromeColor = new THREE.Color(0xd1d5db);
    const wireframeColor = new THREE.Color(0x10b981); // Neon green CAD

    const bodyMat = new THREE.MeshStandardMaterial({
      color: chassisColor,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: cadMode,
      emissive: cadMode ? wireframeColor : new THREE.Color(0x000000),
      emissiveIntensity: cadMode ? 0.3 : 0,
    });

    const interiorMat = new THREE.MeshStandardMaterial({
      color: seatColor,
      roughness: 0.6,
      wireframe: cadMode,
      emissive: cadMode ? wireframeColor : new THREE.Color(0x000000),
      emissiveIntensity: cadMode ? 0.2 : 0,
    });

    const tireMat = new THREE.MeshStandardMaterial({
      color: tireColor,
      roughness: 0.8,
      wireframe: cadMode,
    });

    const windowMat = new THREE.MeshPhysicalMaterial({
      color: windowColor,
      transparent: true,
      opacity: 0.4,
      roughness: 0.1,
      transmission: 0.6,
      thickness: 0.5,
      wireframe: cadMode,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: chromeColor,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: cadMode,
    });

    // 1. CHASSIS SHAPING BY CATEGORY
    let bodyGeo: THREE.BufferGeometry;
    let cabinGeo: THREE.BufferGeometry;
    let wheelBase = 2.4;
    let wheelWidth = 1.6;
    let bodyHeight = 0.5;

    if (carCategory === 'sports') {
      bodyGeo = new THREE.BoxGeometry(4.2, 0.4, 2.0);
      cabinGeo = new THREE.BoxGeometry(1.6, 0.45, 1.6);
      wheelBase = 2.6;
      wheelWidth = 1.7;
      bodyHeight = 0.3;
    } else if (carCategory === 'suv') {
      bodyGeo = new THREE.BoxGeometry(3.9, 0.8, 1.9);
      cabinGeo = new THREE.BoxGeometry(2.3, 0.9, 1.8);
      wheelBase = 2.3;
      wheelWidth = 1.6;
      bodyHeight = 0.6;
    } else if (carCategory === 'luxury') {
      bodyGeo = new THREE.BoxGeometry(4.5, 0.6, 2.0);
      cabinGeo = new THREE.BoxGeometry(2.2, 0.7, 1.8);
      wheelBase = 2.7;
      wheelWidth = 1.75;
      bodyHeight = 0.45;
    } else {
      // sedan
      bodyGeo = new THREE.BoxGeometry(4.0, 0.5, 1.8);
      cabinGeo = new THREE.BoxGeometry(2.0, 0.65, 1.6);
      wheelBase = 2.4;
      wheelWidth = 1.6;
      bodyHeight = 0.4;
    }

    // Lower Chassis Mesh
    const chassis = new THREE.Mesh(bodyGeo, bodyMat);
    chassis.position.y = bodyHeight;
    carGroup.add(chassis);

    // Cabin / Windshield Mesh
    const cabin = new THREE.Mesh(cabinGeo, windowMat);
    cabin.position.set(carCategory === 'sports' ? -0.3 : -0.1, bodyHeight + (carCategory === 'suv' ? 0.8 : 0.55), 0);
    carGroup.add(cabin);

    // Front Grille
    const grillGeo = new THREE.BoxGeometry(0.1, carCategory === 'suv' ? 0.6 : 0.35, 1.1);
    const grill = new THREE.Mesh(grillGeo, chromeMat);
    grill.position.set(carCategory === 'sports' ? 2.1 : 1.96, bodyHeight + 0.05, 0);
    carGroup.add(grill);

    // Grille details (CAD lines or mesh)
    if (!cadMode) {
      const grillMeshGeo = new THREE.BoxGeometry(0.08, carCategory === 'suv' ? 0.5 : 0.25, 0.95);
      const grillMesh = new THREE.Mesh(grillMeshGeo, new THREE.MeshBasicMaterial({ color: 0x111111 }));
      grillMesh.position.set(carCategory === 'sports' ? 2.11 : 1.97, bodyHeight + 0.05, 0);
      carGroup.add(grillMesh);
    }

    // Rear Spoiler (Sports only)
    if (carCategory === 'sports') {
      const spoilerPillarsGeo = new THREE.BoxGeometry(0.1, 0.3, 1.4);
      const spoilerPillars = new THREE.Mesh(spoilerPillarsGeo, bodyMat);
      spoilerPillars.position.set(-1.8, bodyHeight + 0.35, 0);
      carGroup.add(spoilerPillars);

      const wingGeo = new THREE.BoxGeometry(0.3, 0.05, 1.8);
      const wing = new THREE.Mesh(wingGeo, chromeMat);
      wing.position.set(-1.8, bodyHeight + 0.5, 0);
      carGroup.add(wing);
    }

    // 2. INTERIOR DETAILS
    // Dashboard
    const dashGeo = new THREE.BoxGeometry(0.4, 0.3, 1.5);
    const dashboard = new THREE.Mesh(dashGeo, interiorMat);
    dashboard.position.set(0.6, bodyHeight + 0.35, 0);
    carGroup.add(dashboard);

    // Steering Wheel
    const steerGeo = new THREE.TorusGeometry(0.12, 0.02, 8, 24);
    const steering = new THREE.Mesh(steerGeo, chromeMat);
    steering.position.set(0.42, bodyHeight + 0.42, -0.35);
    steering.rotation.y = Math.PI / 2;
    steering.rotation.x = 0.2;
    carGroup.add(steering);

    // Front Seats
    const seatBaseGeo = new THREE.BoxGeometry(0.45, 0.15, 0.5);
    const seatBackGeo = new THREE.BoxGeometry(0.15, 0.55, 0.5);

    [-0.35, 0.35].forEach(zPos => {
      const seatBase = new THREE.Mesh(seatBaseGeo, interiorMat);
      seatBase.position.set(0.0, bodyHeight + 0.2, zPos);
      carGroup.add(seatBase);

      const seatBack = new THREE.Mesh(seatBackGeo, interiorMat);
      seatBack.position.set(-0.2, bodyHeight + 0.5, zPos);
      seatBack.rotation.z = -0.15;
      carGroup.add(seatBack);
    });

    // Rear Seats (unless it's a 2-seat sports car)
    if (carCategory !== 'sports') {
      const rearSeatBase = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.15, 1.4), interiorMat);
      rearSeatBase.position.set(-0.8, bodyHeight + 0.2, 0);
      carGroup.add(rearSeatBase);

      const rearSeatBack = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.55, 1.4), interiorMat);
      rearSeatBack.position.set(-1.05, bodyHeight + 0.5, 0);
      rearSeatBack.rotation.z = -0.15;
      carGroup.add(rearSeatBack);
    }

    // 3. WHEELS & CUSTOM ALLOYS
    const wheelGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.3, 32);
    wheelGeo.rotateX(Math.PI / 2);

    const xOffsets = [wheelBase / 2, -wheelBase / 2];
    const zOffsets = [wheelWidth / 2, -wheelWidth / 2];

    xOffsets.forEach(x => {
      zOffsets.forEach(z => {
        const wheelMesh = new THREE.Mesh(wheelGeo, tireMat);
        wheelMesh.position.set(x, bodyHeight - 0.1, z);
        carGroup.add(wheelMesh);
        wheelsRef.current.push(wheelMesh);

        // Alloy Center/Face
        const alloyGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.31, 16);
        alloyGeo.rotateX(Math.PI / 2);
        
        let alloyMaterial = chromeMat;
        if (alloyStyle === 'redline') {
          alloyMaterial = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5, metalness: 0.5, wireframe: cadMode });
        } else if (alloyStyle === 'mesh') {
          alloyMaterial = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.2, metalness: 0.8, wireframe: cadMode }); // Gold
        }

        const alloyFace = new THREE.Mesh(alloyGeo, alloyMaterial);
        wheelMesh.add(alloyFace);

        // Add spokes/designs inside the wheel
        if (!cadMode) {
          if (alloyStyle === 'spoke') {
            // 8 thin spokes
            for (let i = 0; i < 8; i++) {
              const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.25, 0.04), chromeMat);
              spoke.rotation.z = (i * Math.PI) / 4;
              spoke.position.y = 0;
              alloyFace.add(spoke);
            }
          } else if (alloyStyle === 'star') {
            // 5 star spokes
            for (let i = 0; i < 5; i++) {
              const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.25, 0.05), chromeMat);
              spoke.rotation.z = (i * 2 * Math.PI) / 5;
              spoke.position.y = 0.1;
              alloyFace.add(spoke);
            }
          } else if (alloyStyle === 'mesh') {
            // Gold cross lines
            for (let i = 0; i < 6; i++) {
              const spoke1 = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.25, 0.02), alloyMaterial);
              spoke1.rotation.z = (i * Math.PI) / 6;
              const spoke2 = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.25, 0.02), alloyMaterial);
              spoke2.rotation.z = (i * Math.PI) / 6 + 0.2;
              alloyFace.add(spoke1, spoke2);
            }
          } else if (alloyStyle === 'redline') {
            // Black face with thin red outer ring
            const ringGeo = new THREE.RingGeometry(0.24, 0.26, 32);
            const ringMat = new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.position.z = z > 0 ? 0.16 : -0.16;
            alloyFace.add(ring);
            
            // 5 black spokes
            for (let i = 0; i < 5; i++) {
              const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.24, 0.04), alloyMaterial);
              spoke.rotation.z = (i * 2 * Math.PI) / 5;
              alloyFace.add(spoke);
            }
          }
        }
      });
    });

    // 4. SUBWOOFER / WOOFER IN THE BOOT
    // Trunk lid (if open)
    const trunkLidGeo = new THREE.BoxGeometry(carCategory === 'suv' ? 0.1 : 0.8, 0.05, 1.4);
    const trunkLid = new THREE.Mesh(trunkLidGeo, bodyMat);
    if (carCategory === 'suv') {
      trunkLid.position.set(-1.95, bodyHeight + 0.8, 0);
      if (trunkOpen) {
        trunkLid.rotation.z = -0.6;
        trunkLid.position.y += 0.4;
        trunkLid.position.x += 0.25;
      }
    } else {
      trunkLid.position.set(-1.4, bodyHeight + 0.35, 0);
      if (trunkOpen) {
        trunkLid.rotation.z = 1.0;
        trunkLid.position.y += 0.3;
        trunkLid.position.x += 0.2;
      }
    }
    carGroup.add(trunkLid);

    // If trunk is open or in interior view, show subwoofers
    if (wooferStyle !== 'none' && (trunkOpen || viewMode === 'interior')) {
      const boxGeo = new THREE.BoxGeometry(0.5, 0.45, 1.1);
      const boxMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7, wireframe: cadMode });
      const subBox = new THREE.Mesh(boxGeo, boxMat);
      subBox.position.set(carCategory === 'suv' ? -1.5 : -1.35, bodyHeight + 0.2, 0);
      carGroup.add(subBox);

      // Woofer cones
      const coneGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.05, 24);
      coneGeo.rotateZ(Math.PI / 2);

      let coneColor = 0xffffff;
      let centerColor = 0xd1d5db;
      if (wooferStyle === 'jbl') {
        coneColor = 0x111111;
        centerColor = 0xea580c; // Orange
      } else if (wooferStyle === 'sony') {
        coneColor = 0xd90429; // Red
        centerColor = 0xffffff;
      } else if (wooferStyle === 'bassking') {
        coneColor = 0xb45309; // Gold/amber
        centerColor = 0xffd700;
      }

      const coneMat = new THREE.MeshStandardMaterial({ color: coneColor, roughness: 0.4, wireframe: cadMode });
      const centerMat = new THREE.MeshStandardMaterial({ color: centerColor, roughness: 0.2, metalness: 0.8, wireframe: cadMode });

      [-0.26, 0.26].forEach(zOffset => {
        const cone = new THREE.Mesh(coneGeo, coneMat);
        cone.position.set(0.26, 0, zOffset);
        subBox.add(cone);
        woofersRef.current.push(cone);

        // Center Cap
        const capGeo = new THREE.SphereGeometry(0.06, 16, 16);
        const cap = new THREE.Mesh(capGeo, centerMat);
        cap.position.set(0.03, 0, 0);
        cone.add(cap);

        // Add brand label or logo
        if (wooferStyle === 'bassking') {
          const crown = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.05, 0.05), new THREE.MeshBasicMaterial({ color: 0xffd700 }));
          crown.position.set(0.04, 0.06, 0);
          cone.add(crown);
        }
      });
    }

  }, [carCategory, paintColor, alloyStyle, wooferStyle, interiorColor, cadMode, trunkOpen, viewMode]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 50%, var(--bg-surface) 0%, var(--bg-primary) 100%)',
        borderRadius: '24px',
        border: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          cursor: 'grab',
        }}
      />

      {/* Loading overlay */}
      {loading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--bg-primary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            zIndex: 10,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: 800, fontSize: '20px', color: 'var(--text-primary)', margin: '0 0 4px' }}>
              Initializing 3D CAD Session
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
              Loading {carName} ({variantName})
            </p>
          </div>
          <div style={{ width: '220px', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <div
              style={{
                width: `${loadProgress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-violet))',
                transition: 'width 0.1s ease',
              }}
            />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 600, margin: 0 }}>
            {loadProgress}%
          </p>
        </div>
      )}

      {/* Interactive Controls Overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          display: 'flex',
          gap: '8px',
          zIndex: 5,
        }}
      >
        <button
          onClick={() => setIsRotating(!isRotating)}
          title={isRotating ? 'Pause auto rotation' : 'Play auto rotation'}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transition: 'all 0.2s',
          }}
        >
          {isRotating ? <Pause size={17} /> : <Play size={17} />}
        </button>

        {viewMode === 'exterior' && (
          <div style={{ display: 'flex', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <button
              onClick={() => {
                if (cameraRef.current) {
                  // Zoom in
                  const zoomFactor = 0.8;
                  const cam = cameraRef.current;
                  cam.position.multiplyScalar(zoomFactor);
                }
              }}
              title="Zoom In"
              style={{
                width: '40px',
                height: '40px',
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <ZoomIn size={17} />
            </button>
            <div style={{ width: '1px', background: 'var(--border)' }} />
            <button
              onClick={() => {
                if (cameraRef.current) {
                  // Zoom out
                  const zoomFactor = 1.25;
                  const cam = cameraRef.current;
                  cam.position.multiplyScalar(zoomFactor);
                }
              }}
              title="Zoom Out"
              style={{
                width: '40px',
                height: '40px',
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <ZoomOut size={17} />
            </button>
          </div>
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '6px 12px',
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          pointerEvents: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        {viewMode} view {cadMode ? '• CAD active' : ''}
      </div>
    </div>
  );
}
