"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface RightCircuitProps {
  zoomModeEnabled: boolean;
  inputCurrentOn: boolean;
  onMCCBStateChange?: (leftMCCBOn: boolean, rightMCCBOn: boolean) => void;
  onZoomChange?: (isZoomed: boolean) => void;
  isBlurred?: boolean;
}

const RightCircuit: React.FC<RightCircuitProps> = ({
  zoomModeEnabled,
  inputCurrentOn,
  onMCCBStateChange,
  onZoomChange,
  isBlurred = false,
}) => {
  const [leftMCCBOn, setLeftMCCBOn] = useState(false);
  const [rightMCCBOn, setRightMCCBOn] = useState(false);
  const STORAGE_KEYS = {
    LEFT: "IGBTConv2.leftMCCBOn",
    RIGHT: "IGBTConv2.rightMCCBOn",
  };
  const [isZoomed, setIsZoomed] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  // Notify parent component when MCCB states change
  useEffect(() => {
    if (onMCCBStateChange) {
      onMCCBStateChange(leftMCCBOn, rightMCCBOn);
    }
  }, [leftMCCBOn, rightMCCBOn, onMCCBStateChange]);

  // Initialize MCCB states from localStorage on first render
  useEffect(() => {
    try {
      const storedLeft = localStorage.getItem(STORAGE_KEYS.LEFT);
      const storedRight = localStorage.getItem(STORAGE_KEYS.RIGHT);

      if (storedLeft !== null) setLeftMCCBOn(storedLeft === "true");
      if (storedRight !== null) setRightMCCBOn(storedRight === "true");
    } catch (e) {
      // localStorage may be unavailable in some environments; silently ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist MCCB states when they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LEFT, String(leftMCCBOn));
      localStorage.setItem(STORAGE_KEYS.RIGHT, String(rightMCCBOn));
    } catch (e) {
      // ignore storage errors
    }
  }, [leftMCCBOn, rightMCCBOn]);

  // When global input current is turned off, ensure MCCBs visually open
  useEffect(() => {
    if (inputCurrentOn === false) {
      if (leftMCCBOn) setLeftMCCBOn(false);
      if (rightMCCBOn) setRightMCCBOn(false);
    }
  }, [inputCurrentOn, leftMCCBOn, rightMCCBOn]);

  // Handle zoom changes
  useEffect(() => {
    if (onZoomChange) {
      onZoomChange(isZoomed);
    }
  }, [isZoomed, onZoomChange]);

  const toggleLeftMCCB = () => {
    setLeftMCCBOn(!leftMCCBOn);
  };

  const toggleRightMCCB = () => {
    setRightMCCBOn(!rightMCCBOn);
  };

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    // Prevent any action if we just finished dragging
    if (hasDragged) {
      setHasDragged(false);
      return;
    }

    // Check if click was on an interactive element
    if (
      target.closest("[data-interactive]") ||
      target.closest("image") ||
      target.tagName.toLowerCase() === "image" ||
      isDragging ||
      !zoomModeEnabled
    ) {
      return;
    }

    // Only open the modal when not currently zoomed. Closing should only
    // happen via the modal close (X) button so user doesn't accidentally
    // dismiss the popup by clicking the circuit or background.
    if (!isZoomed) {
      setIsZoomed(true);
      setPanOffset({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isZoomed) {
      setIsDragging(true);
      setHasDragged(false);
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && isZoomed) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;

      // If mouse has moved more than a small threshold, mark as dragged
      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
        setHasDragged(true);
      }

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
        width: "300px",
        height: "250px",
        overflow: isZoomed ? "visible" : "hidden",
      }}
    >
      {(() => {
        const portalTarget =
          typeof document !== "undefined" ? document.body : null;

        const circuitNode = (
          <div
            style={{
              transform: `scale(${isZoomed ? 2.5 : 1}) translate(${
                panOffset.x / (isZoomed ? 2.5 : 1)
              }px, ${panOffset.y / (isZoomed ? 2.5 : 1)}px)`,
              transformOrigin: "center center",
              cursor: isZoomed ? (isDragging ? "grabbing" : "grab") : "pointer",
              pointerEvents: "auto",
              zIndex: isZoomed ? 1000 : "auto",
              position: isZoomed ? "fixed" : "relative",
              top: isZoomed ? "50%" : "auto",
              left: isZoomed ? "52%" : "auto",
              marginTop: isZoomed ? "-80px" : "auto",
              marginLeft: isZoomed ? "-150px" : "auto",
              filter: "none",
              opacity: 1,
              transition: isDragging ? "none" : "transform 0.3s ease",
            }}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <svg width="300" height="250" viewBox="50 0 500 350">
              {/* Current flow animation overlay - only visible when at least one MCCB is on and input current is on */}
              {(leftMCCBOn || rightMCCBOn) && inputCurrentOn && (
                <g>
                  {/* Vertical flows through each MCCB switch - only show when respective MCCB switch is on */}
                  {leftMCCBOn && inputCurrentOn && (
                    <line
                      x1="196"
                      y1="88"
                      x2="196"
                      y2="175"
                      stroke="#00ff00"
                      strokeWidth="4"
                      opacity="0.9"
                    />
                  )}

                  {rightMCCBOn && inputCurrentOn && (
                    <line
                      x1="305"
                      y1="90"
                      x2="305"
                      y2="175"
                      stroke="#00ff00"
                      strokeWidth="4"
                      opacity="0.9"
                    />
                  )}

                  {/* Vertical flows after each IGBT - only show when respective MCCB is on and input current is on */}
                  {leftMCCBOn && inputCurrentOn && (
                    <line
                      x1="200"
                      y1="215"
                      x2="200"
                      y2="236.5"
                      stroke="#00ff00"
                      strokeWidth="4"
                      opacity="0.9"
                    />
                  )}

                  {rightMCCBOn && inputCurrentOn && (
                    <line
                      x1="300"
                      y1="215"
                      x2="300"
                      y2="236.5"
                      stroke="#00ff00"
                      strokeWidth="4"
                      opacity="0.9"
                    />
                  )}

                  {/* Horizontal flows after each IGBT - only show when respective MCCB is on */}
                  {leftMCCBOn && (
                    <line
                      x1="199.5"
                      y1="235"
                      x2="250"
                      y2="235"
                      stroke="#00ff00"
                      strokeWidth="4"
                      opacity="0.9"
                    />
                  )}

                  {rightMCCBOn && (
                    <line
                      x1="249.5"
                      y1="235"
                      x2="300.5"
                      y2="235"
                      stroke="#00ff00"
                      strokeWidth="4"
                      opacity="0.9"
                    />
                  )}

                  {/* Vertical flow after left circuit - only show when both MCCB is on */}
                  {leftMCCBOn && rightMCCBOn && (
                    <line
                      x1="250"
                      y1="235"
                      x2="250"
                      y2="250"
                      stroke="#00ff00"
                      strokeWidth="4"
                      opacity="0.9"
                    />
                  )}

                  {/* Vertical flow after left circuit - only show when both MCCB is on */}
                  {leftMCCBOn && rightMCCBOn && (
                    <line
                      x1="250"
                      y1="250"
                      x2="250"
                      y2="287"
                      stroke="#00ff00"
                      strokeWidth="4"
                      opacity="0.9"
                    />
                  )}
                </g>
              )}
              {/* Main outer dashed rectangle - imported from rectangle-dotted.svg */}
              <foreignObject x="113" y="55" width="300" height="205">
                <Image
                  src="/rectangle-dotted.svg"
                  alt="Dashed Rectangle"
                  width={300}
                  height={250}
                  className="w-full h-full"
                />
              </foreignObject>

              {/* I/P CHOKE custom SVG symbol */}
              <foreignObject x="175" y="37" width="150" height="50">
                <div>
                  <Image
                    src="/input-choke.svg"
                    alt="Input Choke"
                    width={150}
                    height={50}
                    className="w-full h-full"
                  />
                </div>
              </foreignObject>

              {/* I/P CHOKE label */}
              <text
                x="355"
                y="70"
                textAnchor="middle"
                fontSize="12"
                fontFamily="Arial"
              >
                I/P CHOKE
              </text>

              {/* Left MCCB symbol */}
              <foreignObject
                x="173.5"
                y="80"
                width="30"
                height="95"
                data-interactive
              >
                <div
                  onClick={inputCurrentOn ? toggleLeftMCCB : undefined}
                  style={{ cursor: inputCurrentOn ? "pointer" : "not-allowed" }}
                >
                  <Image
                    src={
                      leftMCCBOn
                        ? "/switch-with-protection-closed.svg"
                        : "/switch-with-protection.svg"
                    }
                    alt={
                      leftMCCBOn
                        ? "switch with protection Closed"
                        : "switch with protection Open"
                    }
                    width={20}
                    height={40}
                    className="w-full h-full"
                    style={{
                      transition: "all 0.3s ease",
                      display: "block",
                      visibility: "visible",
                      opacity: inputCurrentOn ? 1 : 0.6,
                    }}
                    priority
                  />
                </div>
              </foreignObject>

              {/* Left MCCB labels */}
              <text
                x="230"
                y="100"
                textAnchor="middle"
                fontSize="10"
                fontFamily="Arial"
              >
                MCCB
              </text>
              <text
                x="229"
                y="112"
                textAnchor="middle"
                fontSize="10"
                fontFamily="Arial"
              >
                1250A
              </text>
              <text
                x="228"
                y="124"
                textAnchor="middle"
                fontSize="10"
                fontFamily="Arial"
              >
                50KA
              </text>

              {/* Right MCCB symbol */}
              <foreignObject
                x="283"
                y="80"
                width="30"
                height="95"
                data-interactive
              >
                <div
                  onClick={inputCurrentOn ? toggleRightMCCB : undefined}
                  style={{ cursor: inputCurrentOn ? "pointer" : "not-allowed" }}
                >
                  <Image
                    src={
                      rightMCCBOn
                        ? "/switch-with-protection-closed.svg"
                        : "/switch-with-protection.svg"
                    }
                    alt={
                      rightMCCBOn
                        ? "switch with protection Closed"
                        : "switch with protection Open"
                    }
                    width={20}
                    height={40}
                    className="w-full h-full"
                    style={{
                      transition: "all 0.3s ease",
                      display: "block",
                      visibility: "visible",
                      opacity: inputCurrentOn ? 1 : 0.6,
                    }}
                    priority
                  />
                </div>
              </foreignObject>

              {/* Right MCCB labels */}
              <text
                x="330"
                y="100"
                textAnchor="middle"
                fontSize="10"
                fontFamily="Arial"
              >
                MCCB
              </text>
              <text
                x="330"
                y="112"
                textAnchor="middle"
                fontSize="10"
                fontFamily="Arial"
              >
                1250A
              </text>
              <text
                x="330"
                y="124"
                textAnchor="middle"
                fontSize="10"
                fontFamily="Arial"
              >
                50KA
              </text>

              {/* Left IGBT symbol */}
              <foreignObject x="165" y="172" width="80" height="50">
                <Image
                  src="/IGBT.svg"
                  alt="IGBT"
                  width={80}
                  height={50}
                  className="w-full h-full"
                />
              </foreignObject>

              {/* Right IGBT symbol */}
              <foreignObject x="265" y="172" width="80" height="50">
                <Image
                  src="/IGBT.svg"
                  alt="IGBT"
                  width={80}
                  height={50}
                  className="w-full h-full"
                />
              </foreignObject>

              {/* Bottom output connection */}
              <line
                x1="200"
                y1="215"
                x2="200"
                y2="235"
                stroke="black"
                strokeWidth="0.5"
              />
              <line
                x1="300"
                y1="215"
                x2="300"
                y2="235"
                stroke="black"
                strokeWidth="0.5"
              />
              <line
                x1="199.5"
                y1="235"
                x2="300"
                y2="235"
                stroke="black"
                strokeWidth="0.5"
              />
              <line
                x1="250"
                y1="235  "
                x2="250"
                y2="255"
                stroke="black"
                strokeWidth="0.5"
              />

              {/* IGBT Conv. label on the right */}
              <text
                x="370"
                y="180"
                textAnchor="start"
                fontSize="10"
                fontFamily="Arial"
              >
                IGBT Conv.
              </text>
              <text
                x="370"
                y="193"
                textAnchor="start"
                fontSize="10"
                fontFamily="Arial"
              >
                576KW (228KW X 2)
              </text>
              <text
                x="370"
                y="205"
                textAnchor="start"
                fontSize="10"
                fontFamily="Arial"
              >
                1200KW (600KVA X 2)
              </text>
              <text
                x="370"
                y="216"
                textAnchor="start"
                fontSize="10"
                fontFamily="Arial"
              >
                660V Overload 250%
              </text>

              {/* DC660V label on the connection lines */}
              <text
                x="150"
                y="275"
                textAnchor="start"
                fontSize="12"
                fontFamily="Arial, sans-serif"
              >
                DC660V
              </text>
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
                  width: "40%",
                  height: "65%",
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
                  <span>IGBT Conv-1 Circuit</span>
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
                    paddingTop: "40px",
                  }}
                >
                  {circuitNode}
                </div>
              </div>
            </div>,
            portalTarget
          );
        }

        // not zoomed: render circuit inline (original placement)
        return !isZoomed ? circuitNode : null;
      })()}

      {/* circuitNode is rendered above (inline or via portal) */}
    </div>
  );
};

export default RightCircuit;
