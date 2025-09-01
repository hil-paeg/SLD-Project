"use client";

import React, { useState, useEffect } from "react"; // Change this import line
import { createPortal } from "react-dom";
import Image from "next/image";
import ExpIBRTDB7 from "./Exp-IB-RTDB-7";
import SwitchWithProtection from "./switch-with-protection.svg";

interface IBRTDB7Props {
  zoomModeEnabled: boolean;
  inputCurrentOn?: boolean;
  onZoomChange?: (isZoomed: boolean) => void;
  isBlurred?: boolean;
  upstreamContactorClosed?: boolean;
}

const IBRTDB7 = ({
  zoomModeEnabled,
  inputCurrentOn = true,
  upstreamContactorClosed = true,
  onZoomChange,
  isBlurred = false,
}: IBRTDB7Props) => {
  const [topSwitchClosed, setTopSwitchClosed] = useState(false);
  const [switch1Closed, setSwitch1Closed] = useState(false);
  const [switch3Closed, setSwitch3Closed] = useState(false);
  const [switch5Closed, setSwitch5Closed] = useState(false);
  const [switch7Closed, setSwitch7Closed] = useState(false);
  const [switch9Closed, setSwitch9Closed] = useState(false);
  const [switch11Closed, setSwitch11Closed] = useState(false);
  const [switch13Closed, setSwitch13Closed] = useState(false);
  const [switch15Closed, setSwitch15Closed] = useState(false);
  const [switch17Closed, setSwitch17Closed] = useState(false);

  const [isZoomed, setIsZoomed] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const _skipUpstreamEffect = React.useRef(true);
  const [modalKey, setModalKey] = useState(0);

  // Load persisted state from localStorage on mount
  useEffect(() => {
    try {
      const load = (key: string, setter: (v: boolean) => void) => {
        const s = localStorage.getItem(key);
        if (s !== null) setter(JSON.parse(s));
      };
      load("IB-RTDB-7-topSwitchClosed", setTopSwitchClosed);
      load("IB-RTDB-7-switch1Closed", setSwitch1Closed);
      load("IB-RTDB-7-switch3Closed", setSwitch3Closed);
      load("IB-RTDB-7-switch5Closed", setSwitch5Closed);
      load("IB-RTDB-7-switch7Closed", setSwitch7Closed);
      load("IB-RTDB-7-switch9Closed", setSwitch9Closed);
      load("IB-RTDB-7-switch11Closed", setSwitch11Closed);
      load("IB-RTDB-7-switch13Closed", setSwitch13Closed);
      load("IB-RTDB-7-switch15Closed", setSwitch15Closed);
      load("IB-RTDB-7-switch17Closed", setSwitch17Closed);

      load("IB-RTDB-7-isZoomed", setIsZoomed);
    } catch (e) {
      // ignore
    }
  }, []);
  const isMounted = React.useRef(false);

  // Persist switches and zoom state
  useEffect(() => {
    try {
      localStorage.setItem(
        "IB-RTDB-7-topSwitchClosed",
        JSON.stringify(topSwitchClosed)
      );
      localStorage.setItem(
        "IB-RTDB-7-switch1Closed",
        JSON.stringify(switch1Closed)
      );
      localStorage.setItem(
        "IB-RTDB-7-switch3Closed",
        JSON.stringify(switch3Closed)
      );
      localStorage.setItem(
        "IB-RTDB-7-switch5Closed",
        JSON.stringify(switch5Closed)
      );
      localStorage.setItem(
        "IB-RTDB-7-switch7Closed",
        JSON.stringify(switch7Closed)
      );
      localStorage.setItem(
        "IB-RTDB-7-switch9Closed",
        JSON.stringify(switch9Closed)
      );
      localStorage.setItem(
        "IB-RTDB-7-switch11Closed",
        JSON.stringify(switch11Closed)
      );
      localStorage.setItem(
        "IB-RTDB-7-switch13Closed",
        JSON.stringify(switch13Closed)
      );
      localStorage.setItem(
        "IB-RTDB-7-switch15Closed",
        JSON.stringify(switch15Closed)
      );
      localStorage.setItem(
        "IB-RTDB-7-switch17Closed",
        JSON.stringify(switch17Closed)
      );

      localStorage.setItem("IB-RTDB-7-isZoomed", JSON.stringify(isZoomed));
    } catch (e) {}
  }, [
    topSwitchClosed,
    switch1Closed,
    switch3Closed,
    switch5Closed,
    switch7Closed,
    switch9Closed,
    switch11Closed,
    switch13Closed,
    switch15Closed,
    switch17Closed,
    isZoomed,
  ]);

  // Check if circuit is complete (top switch + any bottom switch)
  const isCircuitActive =
    topSwitchClosed && (switch1Closed || switch3Closed || switch17Closed);

  // Handle zoom changes
  useEffect(() => {
    if (onZoomChange) {
      onZoomChange(isZoomed);
    }
  }, [isZoomed, onZoomChange]);

  // Line color based on circuit state
  const lineColor = topSwitchClosed ? "#00aa00" : "black";

  // Style for terminal symbols based on switch states
  const getTerminalStyle = (switchNumber: number) => {
    const isActive =
      topSwitchClosed &&
      (switchNumber === 1
        ? switch1Closed
        : switchNumber === 3
        ? switch3Closed
        : switchNumber === 5
        ? switch5Closed
        : switchNumber === 7
        ? switch7Closed
        : switchNumber === 17
        ? switch17Closed
        : false);

    return isActive
      ? {
          filter:
            "brightness(0) saturate(100%) invert(34%) sepia(93%) saturate(1700%) hue-rotate(75deg) brightness(95%) contrast(105%)",
        }
      : {};
  };

  // Handler for bottom switches - only allow toggle if top switch is closed
  const handleBottomSwitchToggle = (switchNumber: number) => {
    if (zoomModeEnabled) return;
    if (!inputCurrentOn) return; // Prevent toggling if input current is off
    if (!topSwitchClosed) return; // Prevent toggling if top switch is open

    switch (switchNumber) {
      case 1:
        setSwitch1Closed(!switch1Closed);
        break;
      case 3:
        setSwitch3Closed(!switch3Closed);
        break;
      case 5:
        setSwitch5Closed(!switch5Closed);
        break;
      case 17:
        setSwitch17Closed(!switch17Closed);
        break;
    }
  };

  // Handler for top switch - reset all bottom switches when turned off
  const handleTopSwitchToggle = () => {
    if (zoomModeEnabled) return;
    if (!inputCurrentOn) return; // Prevent toggling if input current is off
    // Only allow toggling top switch if upstream contactor is closed
    if (upstreamContactorClosed === false) return;

    const newTopState = !topSwitchClosed;
    setTopSwitchClosed(newTopState);

    // If turning off the top switch, turn off all bottom switches
    if (!newTopState) {
      setSwitch1Closed(false);
      setSwitch5Closed(false);
      setSwitch7Closed(false);
      setSwitch17Closed(false);
    }
  };

  useEffect(() => {
    if (_skipUpstreamEffect.current) {
      _skipUpstreamEffect.current = false;
      return;
    }
    if (upstreamContactorClosed === false && topSwitchClosed) {
      setTopSwitchClosed(false);
      setSwitch1Closed(false);
      setSwitch3Closed(false);
      setSwitch5Closed(false);
      setSwitch7Closed(false);
      setSwitch17Closed(false);
    }
  }, [upstreamContactorClosed]);

  // Avoid auto-closing switches on initial mount (respect persisted state first)
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  //Auto-close when input current is turned off (DC isolator opened)
  useEffect(() => {
    // Skip effect on initial mount so restored persisted values are not overridden
    if (!isMounted.current) return;
    if (inputCurrentOn === false) {
      // Reset all switches when input current is turned off
      setTopSwitchClosed(false);
      setSwitch1Closed(false);
      setSwitch3Closed(false);
      setSwitch5Closed(false);
      setSwitch7Closed(false);
      setSwitch9Closed(false);
      setSwitch11Closed(false);
      setSwitch13Closed(false);
      setSwitch15Closed(false);
      setSwitch17Closed(false);
    }
  }, [inputCurrentOn]);

  const handleClick = (e: React.MouseEvent) => {
    // Prevent zoom when clicking on interactive elements or when zoom mode is disabled
    const target = e.target as HTMLElement;
    if (
      target.closest("[data-interactive]") ||
      target.closest("image") ||
      isDragging ||
      !zoomModeEnabled
    ) {
      return;
    }
    const newZoomState = !isZoomed;
    setIsZoomed(newZoomState);
    // Reset panOffset when opening to ensure centered view
    setPanOffset({ x: 0, y: 0 });
    if (newZoomState) {
      // bump modalKey so the expanded component remounts and becomes visible
      setModalKey((k) => k + 1);
    }

    // Notify parent component of zoom state change
    if (onZoomChange) {
      onZoomChange(newZoomState);
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

  const handleExpandedSwitchChange = {
    setTopSwitchClosed,
    setSwitch1Closed,
    setSwitch3Closed,
    setSwitch5Closed,
    setSwitch7Closed,
    setSwitch9Closed,
    setSwitch11Closed,
    setSwitch13Closed,
    setSwitch15Closed,
    setSwitch17Closed,
  };

  return (
    <div
      style={{
        position: "fixed",
        width: "75px",
        height: "150px",
        overflow: isZoomed ? "visible" : "hidden",
        filter: isBlurred ? "blur(3px)" : "none",
        opacity: isBlurred ? 0.7 : 1,
        transition: "filter 0.3s, opacity 0.3s",
      }}
    >
      {isZoomed ? (
        // determine portal target safely (avoids TS error during SSR typings)
        (() => {
          const portalTarget =
            typeof document !== "undefined" ? document.body : null;
          return createPortal(
            // Full screen modal wrapper (rendered at document.body)
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.35)",
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
            >
              <div
                style={{
                  position: "relative",
                  width: "55%",
                  height: "70%",
                  border: "4px solid #f44336",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
                  cursor: isDragging ? "grabbing" : "grab",
                  pointerEvents: "auto",
                  filter: "none",
                  zIndex: 20002,
                }}
              >
                {/* Title for the box - match IB-RTDB-1 styling */}
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
                  <span>IB-RTDB-7 Circuit</span>
                  <span style={{ flex: 1, textAlign: "right" }}>
                    <button
                      data-close-button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsZoomed(false);
                        if (onZoomChange) onZoomChange(false);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: "white",
                        fontSize: "16px",
                        cursor: "pointer",
                        padding: "0 8px",
                        pointerEvents: "auto",
                        zIndex: 30011,
                      }}
                    >
                      ✕
                    </button>
                  </span>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "40px" /* Below the title */,
                    left: 0,
                    width: "100%",
                    height: "calc(100% - 40px)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: `translate(-50%, -50%)`,
                      filter: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        transform: "scale(0.88)",
                        transformOrigin: "center center",
                        width: "100%",
                        maxWidth: 1000,
                        maxHeight: 380,
                        overflow: "visible",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ExpIBRTDB7
                        key={modalKey}
                        zoomModeEnabled={true}
                        forceExpanded={true}
                        onZoomOut={() => {
                          setIsZoomed(false);
                          if (onZoomChange) onZoomChange(false);
                        }}
                        initialTopSwitchClosed={topSwitchClosed}
                        initialSwitch1Closed={switch1Closed}
                        initialSwitch3Closed={switch3Closed}
                        initialSwitch5Closed={switch5Closed}
                        initialSwitch7Closed={switch7Closed}
                        initialSwitch9Closed={switch9Closed}
                        initialSwitch11Closed={switch11Closed}
                        initialSwitch13Closed={switch13Closed}
                        initialSwitch15Closed={switch15Closed}
                        initialSwitch17Closed={switch17Closed}
                        onSwitchChange={handleExpandedSwitchChange}
                        inputCurrentOn={inputCurrentOn}
                        upstreamContactorClosed={upstreamContactorClosed}
                        onZoomChange={onZoomChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            // attach to body so modal sits above any ancestor effects/transforms
            portalTarget as unknown as Element
          );
        })()
      ) : (
        <div
          style={{
            transform: `scale(${1}) translate(${0}px, ${0}px)`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.3s ease",
            cursor: zoomModeEnabled ? "pointer" : "default",
            pointerEvents: "auto",
            zIndex: "auto",
            position: "relative",
          }}
          onClick={handleClick}
        >
          <div className="relative">
            <svg width="75" height="150" viewBox="0 0 280 350">
              {/* Current flow animation overlay - only visible when circuit is on */}
              {topSwitchClosed && (
                <g>
                  {/* Vertical flow through top switch */}
                  <line
                    x1="107.5"
                    y1="13.5"
                    x2="107.5"
                    y2="76.5"
                    stroke="#00aa00"
                    strokeWidth="3"
                    opacity="0.9"
                  />

                  {/* Main horizontal current flow */}
                  <line
                    x1="107.5"
                    y1="75"
                    x2="209.2"
                    y2="75"
                    stroke="#00aa00"
                    strokeWidth="3"
                    opacity="0.9"
                  />

                  {/* Vertical flows after switches - only show for active switches */}

                  {switch1Closed && (
                    <line
                      x1="107.5"
                      y1="75"
                      x2="107.5"
                      y2="163"
                      stroke="#00aa00"
                      strokeWidth="3"
                      opacity="0.9"
                    />
                  )}

                  {switch3Closed && (
                    <line
                      x1="147"
                      y1="75"
                      x2="147"
                      y2="163"
                      stroke="#00aa00"
                      strokeWidth="3"
                      opacity="0.9"
                    />
                  )}

                  {switch17Closed && (
                    <line
                      x1="209"
                      y1="73.5"
                      x2="209"
                      y2="163"
                      stroke="#00aa00"
                      strokeWidth="3"
                      opacity="0.9"
                    />
                  )}
                </g>
              )}
              {/* Main horizontal line */}
              <line
                x1="107.5"
                y1="75"
                x2="209.2"
                y2="75"
                stroke={lineColor}
                strokeWidth="1"
              />

              {/* IB-RTDB-7 box */}
              <text
                x="166"
                y="60"
                textAnchor="middle"
                fontSize="14"
                fontFamily="Arial"
                fill="red"
              >
                IB-RTDB-7
              </text>

              {/* Switch with protection Symbol svg import */}
              {/* Top symbol */}
              <foreignObject x="86.7" y="9" width="30" height="80">
                <Image
                  src={
                    topSwitchClosed
                      ? "/switch-with-protection-closed.svg"
                      : "/switch-with-protection.svg"
                  }
                  alt="Switch with protection"
                  width={80}
                  height={20}
                  className="w-full h-full cursor-pointer"
                  onClick={handleTopSwitchToggle}
                />
              </foreignObject>

              {/* First symbol */}
              <foreignObject x="85.5" y="68" width="30" height="100">
                <Image
                  src={
                    switch1Closed
                      ? "/switch-with-protection-closed.svg"
                      : "/switch-with-protection.svg"
                  }
                  alt="Switch with protection"
                  width={80}
                  height={100}
                  className="w-full h-full cursor-pointer"
                  onClick={() => handleBottomSwitchToggle(1)}
                />
              </foreignObject>

              {/* Second Symbol */}
              <foreignObject x="125" y="69" width="30" height="100">
                <Image
                  src={
                    switch3Closed
                      ? "/switch-with-protection-closed.svg"
                      : "/switch-with-protection.svg"
                  }
                  alt="Switch with protection"
                  width={100}
                  height={60}
                  className="w-full h-full cursor-pointer"
                  onClick={() => handleBottomSwitchToggle(3)}
                />
              </foreignObject>

              {/* Third Symbol */}
              <foreignObject x="187" y="69" width="30" height="100">
                <Image
                  src={
                    switch17Closed
                      ? "/switch-with-protection-closed.svg"
                      : "/switch-with-protection.svg"
                  }
                  alt="Switch with protection"
                  width={100}
                  height={60}
                  className="w-full h-full cursor-pointer"
                  onClick={() => handleBottomSwitchToggle(17)}
                />
              </foreignObject>

              {/* Terminal symbols using imported SVG */}
              <g transform="translate(89, 150)">
                <image
                  href="/1.svg"
                  width="40"
                  height="50"
                  style={getTerminalStyle(1)}
                />
              </g>
              <g transform="translate(129, 150)">
                <image
                  href="/3.svg"
                  width="40"
                  height="50"
                  style={getTerminalStyle(3)}
                />
              </g>
              <g transform="translate(190, 150)">
                <image
                  href="/17.svg"
                  width="40"
                  height="50"
                  style={getTerminalStyle(17)}
                />
              </g>

              {/* Base line */}
              <line
                x1="90"
                y1="200"
                x2="230"
                y2="200"
                stroke="black"
                strokeWidth="1.5"
              />

              {/* Horizontal line to symbol 3 */}
              <line
                x1="165"
                y1="118"
                x2="199"
                y2="118"
                stroke="black"
                strokeWidth="1"
              />

              {/* Vertical lines to base */}
              <line
                x1="90"
                y1="201"
                x2="90"
                y2="190"
                stroke="black"
                strokeWidth="1.5"
              />
              <line
                x1="230"
                y1="190"
                x2="230"
                y2="201"
                stroke="black"
                strokeWidth="1.5"
              />
            </svg>

            {/* Specifications text */}
            <div
              className="mt-6 text-center text-black"
              style={{
                transform: "translate(4px, -90px)",
                fontSize: "4px",
                fontFamily: "Arial, sans-serif",
                lineHeight: "1.2",
              }}
            >
              <div>9 sets</div>
              <div>12 kW</div>
              <div>125 r/min</div>
              <div>(250% 1min)</div>
              <div>HSB</div>
              <div>Table (1)</div>
              <div className="text-red-600">[AM3001-3017]</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IBRTDB7;
