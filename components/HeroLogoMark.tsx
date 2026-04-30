"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";

const DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.3,46,96.19,53,91.08,65.69,84.69,65.69Z" fill="#ffffff"/></svg>`;

type MaterialStyle = "Metallic" | "Glass";

interface Props {
  svgUrl?: string;
  materialStyle?: MaterialStyle;
  useSvgColors?: boolean;
  color?: string;
  roughness?: number;
  metalness?: number;
  extrudeDepth?: number;
  bevelSize?: number;
  autoRotate?: boolean;
  logoScale?: number;
  backgroundColor?: string;
  className?: string;
}

const createPremiumMetalTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#888888";
  ctx.fillRect(0, 0, 512, 512);

  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 12;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  ctx.globalAlpha = 0.04;
  for (let i = 0; i < 1000; i++) {
    ctx.beginPath();
    const y = Math.random() * 512;
    ctx.moveTo(0, y);
    ctx.lineTo(512, y + (Math.random() - 0.5) * 15);
    ctx.lineWidth = Math.random() * 1.5 + 0.5;
    ctx.strokeStyle = Math.random() > 0.5 ? "#ffffff" : "#000000";
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 4);
  tex.anisotropy = 16;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
};

const createStudioEnvironment = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, 1024, 512);

  ctx.fillStyle = "#ffffff";
  ctx.filter = "blur(10px)";
  ctx.fillRect(100, 100, 200, 100);
  ctx.fillRect(700, 150, 150, 200);
  ctx.fillRect(400, 400, 300, 50);

  const tex = new THREE.CanvasTexture(canvas);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  return tex;
};

const createMaterial = (
  style: MaterialStyle,
  colorHex: string,
  roughness: number,
  metalness: number,
  scratchTexture: THREE.Texture
) => {
  const color = new THREE.Color(colorHex || "#ffffff");
  if (style === "Glass") {
    return new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.1,
      roughness: roughness * 0.5,
      transmission: 1.0,
      ior: 1.5,
      thickness: 1.0,
      envMapIntensity: 2.0,
      transparent: true,
    });
  }
  return new THREE.MeshStandardMaterial({
    color,
    metalness,
    roughness,
    roughnessMap: scratchTexture,
    bumpMap: scratchTexture,
    bumpScale: 0.002,
    envMapIntensity: 2.5,
  });
};

export default function HeroLogoMark({
  svgUrl = "",
  materialStyle = "Metallic",
  useSvgColors = false,
  color = "#E0DDD8",
  roughness = 0.2,
  metalness = 1.0,
  extrudeDepth = 15,
  bevelSize = 2,
  autoRotate = false,
  logoScale = 1,
  backgroundColor = "rgba(0,0,0,0)",
  className,
}: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lighting + environment
    scene.environment = createStudioEnvironment();
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const keyLight = new THREE.SpotLight(0xfff0e6, 4);
    keyLight.position.set(15, 25, 20);
    keyLight.angle = 0.3;
    keyLight.penumbra = 0.5;
    scene.add(keyLight);

    const fillLight = new THREE.SpotLight(0xe6f2ff, 2);
    fillLight.position.set(-20, -10, 15);
    fillLight.angle = 0.5;
    fillLight.penumbra = 1;
    scene.add(fillLight);

    const rimLight = new THREE.SpotLight(0xffffff, 6);
    rimLight.position.set(0, 20, -15);
    rimLight.angle = 0.6;
    rimLight.penumbra = 0.2;
    scene.add(rimLight);

    // 3. Geometry from SVG
    const wrapperGroup = new THREE.Group();
    scene.add(wrapperGroup);

    const scratchTexture = createPremiumMetalTexture();
    const currentMeshes: THREE.Mesh[] = [];

    const loadSVG = (svgText: string) => {
      const loader = new SVGLoader();
      const data = loader.parse(svgText);

      let maxDim = 100;
      const xmlDoc = data.xml as XMLDocument | undefined;
      const rootEl = xmlDoc?.documentElement;
      if (rootEl) {
        const viewBox = rootEl.getAttribute("viewBox");
        if (viewBox) {
          const parts = viewBox.trim().split(/[\s,]+/).filter(Boolean);
          if (parts.length >= 4) {
            maxDim = Math.max(parseFloat(parts[2]), parseFloat(parts[3]));
          }
        }
      }

      const autoScale = 100 / maxDim;
      const finalScale = 0.05 * autoScale * (logoScale || 1);

      const extrudeSettings = {
        depth: Math.max(0.01, (extrudeDepth || 15) / autoScale),
        bevelEnabled: bevelSize > 0,
        bevelThickness: Math.max(0, (bevelSize || 2) / autoScale),
        bevelSize: Math.max(0, (bevelSize || 2) / autoScale),
        bevelSegments: 12,
        curveSegments: 64,
      };

      const svgGroup = new THREE.Group();
      svgGroup.scale.set(finalScale, -finalScale, finalScale);

      data.paths.forEach((path, i) => {
        const fillColor = (path.userData as { style?: { fill?: string } } | undefined)
          ?.style?.fill;
        if (fillColor && fillColor !== "none") {
          const matColor = useSvgColors ? fillColor : color;
          const material = createMaterial(
            materialStyle,
            matColor,
            roughness,
            metalness,
            scratchTexture
          );

          const shapes = SVGLoader.createShapes(path);
          shapes.forEach((shape) => {
            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.z = i * 0.05;
            svgGroup.add(mesh);
            currentMeshes.push(mesh);
          });
        }
      });

      const box = new THREE.Box3().setFromObject(svgGroup);
      const center = box.getCenter(new THREE.Vector3());
      svgGroup.position.sub(center);

      wrapperGroup.add(svgGroup);
    };

    if (svgUrl) {
      fetch(svgUrl)
        .then((res) => res.text())
        .then((text) => loadSVG(text))
        .catch(() => loadSVG(DEFAULT_SVG));
    } else {
      loadSVG(DEFAULT_SVG);
    }

    // 4. Interaction + animation
    let isDragging = false;
    let isHovered = false;
    let previousMouse = { x: 0, y: 0 };
    const pointerPos = { x: 0, y: 0 };
    const dragRotation = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMouse = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = () => {
      isDragging = false;
    };
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerPos.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerPos.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMouse.x;
        const deltaY = e.clientY - previousMouse.y;
        dragRotation.y += deltaX * 0.01;
        dragRotation.x += deltaY * 0.01;
        dragRotation.x = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, dragRotation.x)
        );
        previousMouse = { x: e.clientX, y: e.clientY };
      }
    };
    const onPointerEnter = () => {
      isHovered = true;
    };
    const onPointerLeave = () => {
      isHovered = false;
      pointerPos.x = 0;
      pointerPos.y = 0;
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerenter", onPointerEnter);
    container.addEventListener("pointerleave", onPointerLeave);

    let animationFrameId = 0;
    const clock = new THREE.Clock();
    let time = 0;
    let inView = false;
    let isAnimating = false;

    const animate = () => {
      if (!inView) {
        isAnimating = false;
        return;
      }

      isAnimating = true;
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      time += delta;

      let targetY = dragRotation.y;
      let targetX = dragRotation.x;

      if (isHovered && !isDragging) {
        targetY += (pointerPos.x * Math.PI) / 4;
        targetX += -(pointerPos.y * Math.PI) / 4;
      } else if (autoRotate && !isDragging && !isHovered) {
        targetY += Math.sin(time * 0.4) * 0.3;
        targetX += Math.cos(time * 0.3) * 0.15;
      }

      wrapperGroup.rotation.y = THREE.MathUtils.lerp(
        wrapperGroup.rotation.y,
        targetY,
        delta * 8
      );
      wrapperGroup.rotation.x = THREE.MathUtils.lerp(
        wrapperGroup.rotation.x,
        targetX,
        delta * 8
      );

      const targetPosY =
        autoRotate && !isHovered && !isDragging
          ? Math.sin(time * 1.5) * 0.2
          : 0;
      wrapperGroup.position.y = THREE.MathUtils.lerp(
        wrapperGroup.position.y,
        targetPosY,
        delta * 5
      );

      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !isAnimating) {
          clock.getDelta();
          animate();
        }
      },
      { threshold: 0 }
    );
    observer.observe(container);

    // 5. Resize
    const resizeObserver = new ResizeObserver((entries) => {
      width = entries[0].contentRect.width;
      height = entries[0].contentRect.height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      observer.disconnect();
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointerleave", onPointerLeave);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      currentMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      scratchTexture.dispose();
      renderer.dispose();
    };
  }, [
    svgUrl,
    materialStyle,
    useSvgColors,
    color,
    roughness,
    metalness,
    extrudeDepth,
    bevelSize,
    autoRotate,
    logoScale,
  ]);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        touchAction: "none",
        backgroundColor,
      }}
    />
  );
}
