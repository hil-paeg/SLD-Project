"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface TopCircuitProps {
  zoomModeEnabled: boolean;
  onZoomChange?: (isZoomed: boolean) => void;
  isBlurred?: boolean;
}

export default function TopCircuit({
  zoomModeEnabled,
  onZoomChange,
  isBlurred = false,
}: TopCircuitProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  // notify parent when zoom state changes (keeps behavior consistent)
  useEffect(() => {
    if (typeof onZoomChange === "function") onZoomChange(isZoomed);
  }, [isZoomed, onZoomChange]);

  const handleClick = (e: React.MouseEvent) => {
    // Only allow zooming when zoom mode is enabled
    if (!isDragging && zoomModeEnabled) {
      // Only open the modal when not currently zoomed. Closing should only
      // happen via the modal close (X) button so user doesn't accidentally
      // dismiss the popup by clicking the circuit or background.
      if (!isZoomed) {
        setIsZoomed(true);
        setPanOffset({ x: 0, y: 0 });
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isZoomed) {
      setIsDragging(true);
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && isZoomed) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;

      setPanOffset((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));

      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: isZoomed ? "center" : "flex-start",
        pointerEvents: "none",
        padding: "20px", // Added padding to prevent cutoff
        boxSizing: "border-box",
      }}
    >
      {(() => {
        const portalTarget =
          typeof document !== "undefined" ? document.body : null;

        const circuitNode = (
          <div
            style={{
              transform: isZoomed
                ? `translate(-50%, -50%) scale(${2.5}) translate(${
                    panOffset.x / 2.5
                  }px, ${panOffset.y / 2.5}px)`
                : `scale(1) translate(${panOffset.x}px, ${panOffset.y}px)`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 0.3s ease",
              cursor: isZoomed ? (isDragging ? "grabbing" : "grab") : "pointer",
              pointerEvents: "auto",
              position: isZoomed ? "fixed" : "relative",
              top: isZoomed ? "63%" : "auto",
              left: isZoomed ? "50%" : "auto",
              zIndex: isZoomed ? 1000 : "auto",
            }}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <svg width="200" height="200" viewBox="25 0 500 500">
              {/* Three-phase input symbol - increased size */}
              <foreignObject x="225.5" y="35" width="80" height="80">
                <Image
                  src="/three-phase-input.svg"
                  alt="Three-phase input"
                  width={80}
                  height={80}
                  className="w-full h-full"
                />
              </foreignObject>

              {/* Horizontal line from three-phase input - connects directly to LA left endpoint */}
              <line
                x1="265"
                y1="110"
                x2="332"
                y2="110"
                stroke="black"
                strokeWidth="1"
              />

              {/* Lightning Arrester symbol - positioned so wires touch endpoints */}
              <g>
                <foreignObject x="290" y="85" width="150" height="40">
                  <Image
                    src="/lightning-arrester.svg"
                    alt="Lightning Arrester"
                    width={130}
                    height={30}
                    className="w-full h-full"
                  />
                </foreignObject>
              </g>

              {/* Horizontal line from LA right endpoint to continue circuit */}
              <line
                x1="367.5"
                y1="110"
                x2="420"
                y2="110"
                stroke="black"
                strokeWidth="1"
              />

              {/* Right vertical line from horizontal continuation */}
              <line
                x1="420"
                y1="109.5"
                x2="420"
                y2="140"
                stroke="black"
                strokeWidth="1"
              />

              {/* Right ground symbol */}
              <foreignObject x="400" y="135" width="40" height="50">
                <Image
                  src="/ground.svg"
                  alt="Ground symbol"
                  width={30}
                  height={20}
                  className="w-full h-full"
                />
              </foreignObject>

              {/* Vertical line continuation to delta intersection */}
              <line
                x1="265.5"
                y1="106"
                x2="265.5"
                y2="158"
                stroke="black"
                strokeWidth="1"
              />

              {/* Three intersecting delta components - increased size */}
              <g>
                {/* Left delta component */}
                <foreignObject x="209" y="170" width="80" height="80">
                  <Image
                    src="/delta-symbol.svg"
                    alt="Delta symbol"
                    width={80}
                    height={80}
                    className="w-full h-full"
                  />
                </foreignObject>

                {/* Top delta component */}
                <foreignObject x="225" y="138" width="80" height="80">
                  <Image
                    src="/delta-symbol.svg"
                    alt="Delta symbol"
                    width={80}
                    height={80}
                    className="w-full h-full"
                  />
                </foreignObject>

                {/* Right delta component */}
                <foreignObject x="242" y="170" width="80" height="80">
                  <Image
                    src="/delta-symbol.svg"
                    alt="Delta symbol"
                    width={80}
                    height={80}
                    className="w-full h-full"
                  />
                </foreignObject>
              </g>

              {/* Transformer specifications text - positioned to the right of delta symbols */}
              <text
                x="310"
                y="185"
                fontSize="14"
                fontFamily="Arial"
                fill="black"
              >
                1400 KVA
              </text>
              <text
                x="310"
                y="205"
                fontSize="14"
                fontFamily="Arial"
                fill="black"
              >
                6600V/355V
              </text>
              <text
                x="310"
                y="225"
                fontSize="14"
                fontFamily="Arial"
                fill="black"
              >
                %Z = 14.5%
              </text>

              {/* Exact intersection point of all three deltas - center point */}
              <circle cx="265" cy="197" r="3" fill="black" />

              {/* Connection line from exact intersection point to left ground */}
              <line
                x1="265"
                y1="197"
                x2="170"
                y2="197"
                stroke="black"
                strokeWidth="1"
              />

              {/* Vertical line down to ground */}
              <line
                x1="170"
                y1="196.5"
                x2="170"
                y2="240"
                stroke="black"
                strokeWidth="1"
              />

              {/* Left ground symbol */}
              <foreignObject x="149.8" y="235" width="40" height="50">
                <Image
                  src="/ground.svg"
                  alt="Ground symbol"
                  width={30}
                  height={20}
                  className="w-full h-full"
                />
              </foreignObject>
            </svg>
          </div>
        );

        if (isZoomed && portalTarget) {
          return createPortal(
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(7px)",
                WebkitBackdropFilter: "blur(7px)",
                zIndex: 30000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "auto",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              // overlay intentionally does NOT close modal on click; close only via X button
            >
              <div
                style={{
                  position: "relative",
                  width: "30%",
                  height: "50%",
                  border: "4px solid #f44336",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "rgba(255,255,255,0.95)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
                  cursor: isDragging ? "grabbing" : "grab",
                  pointerEvents: "auto",
                  zIndex: 20002,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    padding: "8px",
                    backgroundColor: "#f44336",
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    zIndex: 30010,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span style={{ flex: 1 }}></span>
                  <span>Top Circuit</span>
                  <span style={{ flex: 1, textAlign: "right" }}>
                    <button
                      onClick={() => setIsZoomed(false)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "white",
                        fontSize: "16px",
                        cursor: "pointer",
                        padding: "0 8px",
                      }}
                    >
                      ✕
                    </button>
                  </span>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "0",
                  }}
                >
                  {circuitNode}
                </div>
              </div>
            </div>,
            portalTarget
          );
        }

        // not zoomed: render circuit inline
        return !isZoomed ? circuitNode : null;
      })()}
    </div>
  );
}
