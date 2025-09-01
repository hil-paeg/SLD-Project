"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface EXPIBRTDB7Props {
  zoomModeEnabled: boolean;
  forceExpanded?: boolean;
  onZoomOut?: () => void;
  initialTopSwitchClosed?: boolean;
  initialSwitch1Closed?: boolean;
  initialSwitch3Closed?: boolean;
  initialSwitch5Closed?: boolean;
  initialSwitch7Closed?: boolean;
  initialSwitch9Closed?: boolean;
  initialSwitch11Closed?: boolean;
  initialSwitch13Closed?: boolean;
  initialSwitch15Closed?: boolean;
  initialSwitch17Closed?: boolean;
  inputCurrentOn?: boolean;
  upstreamContactorClosed?: boolean;
  onSwitchChange?: {
    setTopSwitchClosed: (value: boolean) => void;
    setSwitch1Closed: (value: boolean) => void;
    setSwitch3Closed: (value: boolean) => void;
    setSwitch5Closed: (value: boolean) => void;
    setSwitch7Closed: (value: boolean) => void;
    setSwitch9Closed: (value: boolean) => void;
    setSwitch11Closed: (value: boolean) => void;
    setSwitch13Closed: (value: boolean) => void;
    setSwitch15Closed: (value: boolean) => void;
    setSwitch17Closed: (value: boolean) => void;
  };
  onZoomChange?: (isZoomed: boolean) => void;
  isBlurred?: boolean;
}

const EXPIBRTDB7 = ({
  zoomModeEnabled,
  forceExpanded = false,
  onZoomOut,
  initialTopSwitchClosed = false,
  initialSwitch1Closed = false,
  initialSwitch3Closed = false,
  initialSwitch5Closed = false,
  initialSwitch7Closed = false,
  initialSwitch9Closed = false,
  initialSwitch11Closed = false,
  initialSwitch13Closed = false,
  initialSwitch15Closed = false,
  initialSwitch17Closed = false,
  inputCurrentOn = true,
  upstreamContactorClosed = true,
  onSwitchChange,
  onZoomChange,
  isBlurred = false,
}: EXPIBRTDB7Props) => {
  // Initialize with props values first
  const [topSwitchClosed, setTopSwitchClosed] = useState(
    initialTopSwitchClosed
  );
  const [switch1Closed, setSwitch1Closed] = useState(initialSwitch1Closed);
  const [switch3Closed, setSwitch3Closed] = useState(initialSwitch3Closed);
  const [switch5Closed, setSwitch5Closed] = useState(initialSwitch5Closed);
  const [switch7Closed, setSwitch7Closed] = useState(initialSwitch7Closed);
  const [switch9Closed, setSwitch9Closed] = useState(initialSwitch9Closed);
  const [switch11Closed, setSwitch11Closed] = useState(initialSwitch11Closed);
  const [switch13Closed, setSwitch13Closed] = useState(initialSwitch13Closed);
  const [switch15Closed, setSwitch15Closed] = useState(initialSwitch15Closed);
  const [switch17Closed, setSwitch17Closed] = useState(initialSwitch17Closed);

  const [isZoomed, setIsZoomed] = useState(forceExpanded || false);

  // Use useEffect to load from localStorage after hydration
  useEffect(() => {
    if (!forceExpanded) {
      const loadSwitchState = (
        key: string,
        setter: (value: boolean) => void,
        initialValue: boolean
      ) => {
        const saved = localStorage.getItem(key);
        if (saved !== null) {
          setter(JSON.parse(saved));
        }
      };

      loadSwitchState(
        "Exp-IB-RTDB-7-topSwitchClosed",
        setTopSwitchClosed,
        initialTopSwitchClosed
      );
      loadSwitchState(
        "Exp-IB-RTDB-7-switch1Closed",
        setSwitch1Closed,
        initialSwitch1Closed
      );
      loadSwitchState(
        "Exp-IB-RTDB-7-switch3Closed",
        setSwitch3Closed,
        initialSwitch3Closed
      );
      loadSwitchState(
        "Exp-IB-RTDB-7-switch5Closed",
        setSwitch5Closed,
        initialSwitch5Closed
      );
      loadSwitchState(
        "Exp-IB-RTDB-7-switch7Closed",
        setSwitch7Closed,
        initialSwitch7Closed
      );
      loadSwitchState(
        "Exp-IB-RTDB-7-switch9Closed",
        setSwitch9Closed,
        initialSwitch9Closed
      );
      loadSwitchState(
        "Exp-IB-RTDB-7-switch11Closed",
        setSwitch11Closed,
        initialSwitch11Closed
      );
      loadSwitchState(
        "Exp-IB-RTDB-7-switch13Closed",
        setSwitch13Closed,
        initialSwitch13Closed
      );
      loadSwitchState(
        "Exp-IB-RTDB-7-switch15Closed",
        setSwitch15Closed,
        initialSwitch15Closed
      );
      loadSwitchState(
        "Exp-IB-RTDB-7-switch17Closed",
        setSwitch17Closed,
        initialSwitch17Closed
      );

      // Only load isZoomed from localStorage if not in forceExpanded mode
      if (!forceExpanded) {
        loadSwitchState("Exp-IB-RTDB-7-isZoomed", setIsZoomed, forceExpanded);
      }
    }
  }, [
    forceExpanded,
    initialTopSwitchClosed,
    initialSwitch1Closed,
    initialSwitch3Closed,
    initialSwitch5Closed,
    initialSwitch7Closed,
    initialSwitch9Closed,
    initialSwitch11Closed,
    initialSwitch13Closed,
    initialSwitch15Closed,
    initialSwitch17Closed,
  ]);
  // dragging disabled for expanded view

  useEffect(() => {
    if (forceExpanded) {
      setTopSwitchClosed(initialTopSwitchClosed);
      setSwitch1Closed(initialSwitch1Closed);
      setSwitch3Closed(initialSwitch3Closed);
      setSwitch5Closed(initialSwitch5Closed);
      setSwitch7Closed(initialSwitch7Closed);
      setSwitch9Closed(initialSwitch9Closed);
      setSwitch11Closed(initialSwitch11Closed);
      setSwitch13Closed(initialSwitch13Closed);
      setSwitch15Closed(initialSwitch15Closed);
      setSwitch17Closed(initialSwitch17Closed);
    }
  }, [
    forceExpanded,
    initialTopSwitchClosed,
    initialSwitch1Closed,
    initialSwitch3Closed,
    initialSwitch5Closed,
    initialSwitch7Closed,
    initialSwitch9Closed,
    initialSwitch11Closed,
    initialSwitch13Closed,
    initialSwitch15Closed,
    initialSwitch17Closed,
  ]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    // Only save to localStorage if not in forceExpanded mode
    if (!forceExpanded) {
      localStorage.setItem(
        "Exp-IB-RTDB-7-topSwitchClosed",
        JSON.stringify(topSwitchClosed)
      );
      localStorage.setItem(
        "Exp-IB-RTDB-7-switch1Closed",
        JSON.stringify(switch1Closed)
      );
      localStorage.setItem(
        "Exp-IB-RTDB-7-switch3Closed",
        JSON.stringify(switch3Closed)
      );
      localStorage.setItem(
        "Exp-IB-RTDB-7-switch5Closed",
        JSON.stringify(switch5Closed)
      );
      localStorage.setItem(
        "Exp-IB-RTDB-7-switch7Closed",
        JSON.stringify(switch7Closed)
      );
      localStorage.setItem(
        "Exp-IB-RTDB-7-switch9Closed",
        JSON.stringify(switch9Closed)
      );
      localStorage.setItem(
        "Exp-IB-RTDB-7-switch11Closed",
        JSON.stringify(switch11Closed)
      );
      localStorage.setItem(
        "Exp-IB-RTDB-7-switch13Closed",
        JSON.stringify(switch13Closed)
      );
      localStorage.setItem(
        "Exp-IB-RTDB-7-switch15Closed",
        JSON.stringify(switch15Closed)
      );
      localStorage.setItem(
        "Exp-IB-RTDB-7-switch17Closed",
        JSON.stringify(switch17Closed)
      );

      localStorage.setItem("Exp-IB-RTDB-7-isZoomed", JSON.stringify(isZoomed));
    }
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
    forceExpanded,
  ]);

  // Handle zoom changes
  useEffect(() => {
    if (onZoomChange) {
      onZoomChange(isZoomed);
    }
  }, [isZoomed, onZoomChange]);

  // If this component is forced expanded (used inside IB-RTDB-7 popup), notify parent.
  // Use a ref to store the callback so parent re-renders (changing callback identity)
  // don't trigger the cleanup which would incorrectly clear the zoom state.
  const onZoomChangeRef = useRef(onZoomChange);
  useEffect(() => {
    onZoomChangeRef.current = onZoomChange;
  }, [onZoomChange]);

  useEffect(() => {
    if (!forceExpanded) return;
    if (onZoomChangeRef.current) onZoomChangeRef.current(true);
    // Cleanup will run only when this effect is torn down (actual unmount or forceExpanded change)
    return () => {
      if (onZoomChangeRef.current) onZoomChangeRef.current(false);
    };
  }, [forceExpanded]);

  const getSwitchState = (switchNumber: number) => {
    switch (switchNumber) {
      case 1:
        return switch1Closed;
      case 3:
        return switch3Closed;
      case 5:
        return switch5Closed;
      case 7:
        return switch7Closed;
      case 9:
        return switch9Closed;
      case 11:
        return switch11Closed;
      case 13:
        return switch13Closed;
      case 15:
        return switch15Closed;
      case 17:
        return switch17Closed;

      default:
        return false;
    }
  };

  // Check if circuit is complete (top switch + any bottom switch)
  const isCircuitActive =
    topSwitchClosed && (switch1Closed || switch3Closed || switch5Closed);

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
        : switchNumber === 9
        ? switch9Closed
        : switchNumber === 11
        ? switch11Closed
        : switchNumber === 13
        ? switch13Closed
        : switchNumber === 15
        ? switch15Closed
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
  // Handler for bottom switches - only allow toggle if top switch is closed and input current is on
  const handleBottomSwitchToggle = (
    switchNumber: number,
    event?: React.MouseEvent
  ) => {
    if (event) {
      event.stopPropagation();
    }

    if (!topSwitchClosed || !inputCurrentOn) return;

    switch (switchNumber) {
      case 1:
        const newState1 = !switch1Closed;
        setSwitch1Closed(newState1);
        onSwitchChange?.setSwitch1Closed(newState1);
        break;
      case 3:
        const newState3 = !switch3Closed;
        setSwitch3Closed(newState3);
        onSwitchChange?.setSwitch3Closed(newState3);
        break;
      case 5:
        const newState5 = !switch5Closed;
        setSwitch5Closed(newState5);
        onSwitchChange?.setSwitch5Closed(newState5);
        break;
      case 7:
        const newState7 = !switch7Closed;
        setSwitch7Closed(newState7);
        onSwitchChange?.setSwitch7Closed(newState7);
        break;
      case 9:
        const newState9 = !switch9Closed;
        setSwitch9Closed(newState9);
        onSwitchChange?.setSwitch9Closed(newState9);
        break;
      case 11:
        const newState11 = !switch11Closed;
        setSwitch11Closed(newState11);
        onSwitchChange?.setSwitch11Closed(newState11);
        break;
      case 13:
        const newState13 = !switch13Closed;
        setSwitch13Closed(newState13);
        onSwitchChange?.setSwitch13Closed(newState13);
        break;
      case 15:
        const newState15 = !switch15Closed;
        setSwitch15Closed(newState15);
        onSwitchChange?.setSwitch15Closed(newState15);
        break;
      case 17:
        const newState17 = !switch17Closed;
        setSwitch17Closed(newState17);
        onSwitchChange?.setSwitch17Closed(newState17);
        break;
    }
  };

  // Handler for top switch - only allow toggle if upstream contactor is closed
  const handleTopSwitchToggle = (event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    if (!inputCurrentOn) return;
    if (upstreamContactorClosed === false) return;
    const newTop = !topSwitchClosed;
    setTopSwitchClosed(newTop);
    onSwitchChange?.setTopSwitchClosed(newTop);

    if (!newTop) {
      // close all bottom switches
      setSwitch1Closed(false);
      setSwitch3Closed(false);
      setSwitch5Closed(false);
      setSwitch7Closed(false);
      setSwitch9Closed(false);
      setSwitch11Closed(false);
      setSwitch13Closed(false);
      setSwitch15Closed(false);
      setSwitch17Closed(false);

      onSwitchChange?.setSwitch1Closed(false);
      onSwitchChange?.setSwitch3Closed(false);
      onSwitchChange?.setSwitch5Closed(false);
      onSwitchChange?.setSwitch7Closed(false);
      onSwitchChange?.setSwitch9Closed(false);
      onSwitchChange?.setSwitch11Closed(false);
      onSwitchChange?.setSwitch13Closed(false);
      onSwitchChange?.setSwitch15Closed(false);
      onSwitchChange?.setSwitch17Closed(false);
    }
  };

  // Auto-close when upstream contactor opens
  useEffect(() => {
    if (upstreamContactorClosed === false) {
      if (topSwitchClosed) {
        setTopSwitchClosed(false);
        onSwitchChange?.setTopSwitchClosed(false);
      }
      setSwitch1Closed(false);
      setSwitch3Closed(false);
      setSwitch5Closed(false);
      setSwitch7Closed(false);
      setSwitch9Closed(false);
      setSwitch11Closed(false);
      setSwitch13Closed(false);
      setSwitch15Closed(false);
      setSwitch17Closed(false);

      onSwitchChange?.setSwitch1Closed(false);
      onSwitchChange?.setSwitch3Closed(false);
      onSwitchChange?.setSwitch5Closed(false);
      onSwitchChange?.setSwitch7Closed(false);
      onSwitchChange?.setSwitch9Closed(false);
      onSwitchChange?.setSwitch11Closed(false);
      onSwitchChange?.setSwitch13Closed(false);
      onSwitchChange?.setSwitch15Closed(false);
      onSwitchChange?.setSwitch17Closed(false);
    }
  }, [upstreamContactorClosed]);

  // Auto-close when input current is turned off (DC isolator opened)
  useEffect(() => {
    if (inputCurrentOn === false) {
      if (topSwitchClosed) {
        setTopSwitchClosed(false);
        onSwitchChange?.setTopSwitchClosed(false);
      }

      setSwitch1Closed(false);
      setSwitch3Closed(false);
      setSwitch5Closed(false);
      setSwitch7Closed(false);
      setSwitch9Closed(false);
      setSwitch11Closed(false);
      setSwitch13Closed(false);
      setSwitch15Closed(false);
      setSwitch17Closed(false);

      onSwitchChange?.setSwitch1Closed(false);
      onSwitchChange?.setSwitch3Closed(false);
      onSwitchChange?.setSwitch5Closed(false);
      onSwitchChange?.setSwitch7Closed(false);
      onSwitchChange?.setSwitch9Closed(false);
      onSwitchChange?.setSwitch11Closed(false);
      onSwitchChange?.setSwitch13Closed(false);
      onSwitchChange?.setSwitch15Closed(false);
      onSwitchChange?.setSwitch17Closed(false);
    }
  }, [inputCurrentOn]);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    // Prevent any action if we just finished dragging
    // dragging disabled - ignore drag-completed flag

    // Check if click was on an interactive element (switch) or image
    if (
      target.closest("[data-interactive]") ||
      target.closest("image") ||
      target.tagName.toLowerCase() === "image"
    ) {
      return; // Don't zoom out if clicking on interactive elements
    }

    // Only zoom out if clicking on the close button
    if (isZoomed && onZoomOut && target.closest("[data-close-button]")) {
      onZoomOut();
    }
  };

  // dragging disabled - removed mouse handlers

  return (
    <div
      style={{
        position: forceExpanded ? "relative" : "fixed",
        width: forceExpanded ? "100%" : "75px",
        height: forceExpanded ? "100%" : "150px",
        overflow: forceExpanded ? "visible" : isZoomed ? "visible" : "hidden",
      }}
    >
      <div
        style={{
          transform: `scale(${isZoomed ? 2.5 : 1})`,
          transformOrigin: "center center",
          cursor: isZoomed ? "default" : "pointer",
          pointerEvents: "auto",
          zIndex: isZoomed ? 20001 : "auto",
          position: isZoomed ? "fixed" : "relative",
          top: isZoomed ? "50%" : "auto",
          left: isZoomed ? "50%" : "auto",
          marginTop: isZoomed ? "-75px" : "auto",
          marginLeft: isZoomed ? "140px" : "auto",
          filter: isBlurred ? "blur(3px)" : "none",
          opacity: isBlurred ? 0.3 : 1,
          transition:
            "filter 0.3s ease, opacity 0.3s ease, transform 0.3s ease",
        }}
        onClick={forceExpanded ? undefined : handleClick}
      >
        <div className="relative">
          {/* Close button for the component when it's zoomed directly (not when forced-expanded by a parent) */}
          {!forceExpanded && isZoomed && (
            <div
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                zIndex: 20003,
                pointerEvents: "auto",
              }}
            >
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
                  color: "black",
                  fontSize: "18px",
                  cursor: "pointer",
                  padding: "4px",
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          )}
          <svg width="800" height="400" viewBox="400 -100 350 500">
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
                  x2="423.5"
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
                    y1="73.5"
                    x2="147"
                    y2="163"
                    stroke="#00aa00"
                    strokeWidth="3"
                    opacity="0.9"
                  />
                )}

                {switch5Closed && (
                  <line
                    x1="186.5"
                    y1="73.5"
                    x2="186.5"
                    y2="163"
                    stroke="#00aa00"
                    strokeWidth="3"
                    opacity="0.9"
                  />
                )}

                {switch7Closed && (
                  <line
                    x1="226"
                    y1="73.5"
                    x2="226"
                    y2="163"
                    stroke="#00aa00"
                    strokeWidth="3"
                    opacity="0.9"
                  />
                )}

                {switch9Closed && (
                  <line
                    x1="266"
                    y1="73.5"
                    x2="266"
                    y2="163"
                    stroke="#00aa00"
                    strokeWidth="3"
                    opacity="0.9"
                  />
                )}

                {switch11Closed && (
                  <line
                    x1="305"
                    y1="73.5"
                    x2="305"
                    y2="163"
                    stroke="#00aa00"
                    strokeWidth="3"
                    opacity="0.9"
                  />
                )}

                {switch13Closed && (
                  <line
                    x1="345"
                    y1="73.5"
                    x2="345"
                    y2="163"
                    stroke="#00aa00"
                    strokeWidth="3"
                    opacity="0.9"
                  />
                )}

                {switch15Closed && (
                  <line
                    x1="384.5"
                    y1="73.5"
                    x2="384.5"
                    y2="163"
                    stroke="#00aa00"
                    strokeWidth="3"
                    opacity="0.9"
                  />
                )}

                {switch17Closed && (
                  <line
                    x1="424"
                    y1="73.5"
                    x2="424"
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
              x2="423.5"
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
            <foreignObject
              x="86.7"
              y="4"
              width="30"
              height="80"
              data-interactive="true"
            >
              <Image
                src={
                  topSwitchClosed
                    ? "/switch-with-protection-closed.svg"
                    : "/switch-with-protection.svg"
                }
                alt="Switch with protection"
                width={80}
                height={20}
                className={`w-full h-full ${
                  inputCurrentOn && upstreamContactorClosed
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  // Prevent toggling if input current is off or upstream contactor is open
                  if (!inputCurrentOn || upstreamContactorClosed === false)
                    return;
                  handleTopSwitchToggle(e);
                }}
              />
            </foreignObject>

            {/* Switch 1 */}
            <foreignObject
              x="85.5"
              y="69"
              width="30"
              height="100"
              data-interactive="true"
            >
              <Image
                src={
                  switch1Closed
                    ? "/switch-with-protection-closed.svg"
                    : "/switch-with-protection.svg"
                }
                alt="Switch with protection"
                width={100}
                height={60}
                className={`w-full h-full ${
                  inputCurrentOn && topSwitchClosed
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBottomSwitchToggle(1);
                }}
              />
            </foreignObject>

            {/* Switch 3 */}
            <foreignObject
              x="125"
              y="69"
              width="30"
              height="100"
              data-interactive="true"
            >
              <Image
                src={
                  switch3Closed
                    ? "/switch-with-protection-closed.svg"
                    : "/switch-with-protection.svg"
                }
                alt="Switch with protection"
                width={100}
                height={60}
                className={`w-full h-full ${
                  inputCurrentOn && topSwitchClosed
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBottomSwitchToggle(3);
                }}
              />
            </foreignObject>

            {/* Switch 5 */}
            <foreignObject
              x="164.5"
              y="69"
              width="30"
              height="100"
              data-interactive="true"
            >
              <Image
                src={
                  switch5Closed
                    ? "/switch-with-protection-closed.svg"
                    : "/switch-with-protection.svg"
                }
                alt="Switch with protection"
                width={100}
                height={60}
                className={`w-full h-full ${
                  inputCurrentOn && topSwitchClosed
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBottomSwitchToggle(5);
                }}
              />
            </foreignObject>

            {/* Switch 7 */}
            <foreignObject
              x="204"
              y="69"
              width="30"
              height="100"
              data-interactive="true"
            >
              <Image
                src={
                  switch7Closed
                    ? "/switch-with-protection-closed.svg"
                    : "/switch-with-protection.svg"
                }
                alt="Switch with protection"
                width={100}
                height={60}
                className={`w-full h-full ${
                  inputCurrentOn && topSwitchClosed
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBottomSwitchToggle(7);
                }}
              />
            </foreignObject>

            {/* Switch 9 */}
            <foreignObject
              x="243.5"
              y="69"
              width="30"
              height="100"
              data-interactive="true"
            >
              <Image
                src={
                  switch9Closed
                    ? "/switch-with-protection-closed.svg"
                    : "/switch-with-protection.svg"
                }
                alt="Switch with protection"
                width={100}
                height={60}
                className={`w-full h-full ${
                  inputCurrentOn && topSwitchClosed
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBottomSwitchToggle(9);
                }}
              />
            </foreignObject>

            {/* Switch 11 */}
            <foreignObject
              x="283"
              y="69"
              width="30"
              height="100"
              data-interactive="true"
            >
              <Image
                src={
                  switch11Closed
                    ? "/switch-with-protection-closed.svg"
                    : "/switch-with-protection.svg"
                }
                alt="Switch with protection"
                width={100}
                height={60}
                className={`w-full h-full ${
                  inputCurrentOn && topSwitchClosed
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBottomSwitchToggle(11);
                }}
              />
            </foreignObject>

            {/* Switch 13 */}
            <foreignObject
              x="322.5"
              y="69"
              width="30"
              height="100"
              data-interactive="true"
            >
              <Image
                src={
                  switch13Closed
                    ? "/switch-with-protection-closed.svg"
                    : "/switch-with-protection.svg"
                }
                alt="Switch with protection"
                width={100}
                height={60}
                className={`w-full h-full ${
                  inputCurrentOn && topSwitchClosed
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBottomSwitchToggle(13);
                }}
              />
            </foreignObject>

            {/* Switch 165*/}
            <foreignObject
              x="362"
              y="69"
              width="30"
              height="100"
              data-interactive="true"
            >
              <Image
                src={
                  switch15Closed
                    ? "/switch-with-protection-closed.svg"
                    : "/switch-with-protection.svg"
                }
                alt="Switch with protection"
                width={100}
                height={60}
                className={`w-full h-full ${
                  inputCurrentOn && topSwitchClosed
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBottomSwitchToggle(15);
                }}
              />
            </foreignObject>

            {/* Switch 17 */}
            <foreignObject
              x="401.5"
              y="69"
              width="30"
              height="100"
              data-interactive="true"
            >
              <Image
                src={
                  switch17Closed
                    ? "/switch-with-protection-closed.svg"
                    : "/switch-with-protection.svg"
                }
                alt="Switch with protection"
                width={100}
                height={60}
                className={`w-full h-full ${
                  inputCurrentOn && topSwitchClosed
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBottomSwitchToggle(17);
                }}
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
            <g transform="translate(169, 150)">
              <image
                href="/5.svg"
                width="40"
                height="50"
                style={getTerminalStyle(5)}
              />
            </g>
            <g transform="translate(209, 150)">
              <image
                href="/7.svg"
                width="40"
                height="50"
                style={getTerminalStyle(7)}
              />
            </g>
            <g transform="translate(247, 150)">
              <image
                href="/9.svg"
                width="40"
                height="50"
                style={getTerminalStyle(9)}
              />
            </g>
            <g transform="translate(287, 150)">
              <image
                href="/11.svg"
                width="40"
                height="50"
                style={getTerminalStyle(11)}
              />
            </g>
            <g transform="translate(327, 150)">
              <image
                href="/13.svg"
                width="40"
                height="50"
                style={getTerminalStyle(13)}
              />
            </g>
            <g transform="translate(366, 150)">
              <image
                href="/15.svg"
                width="40"
                height="50"
                style={getTerminalStyle(15)}
              />
            </g>
            <g transform="translate(405, 150)">
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
              x2="450"
              y2="200"
              stroke="black"
              strokeWidth="1.5"
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
              x1="450"
              y1="190"
              x2="450"
              y2="201"
              stroke="black"
              strokeWidth="1.5"
            />
          </svg>

          {/* Specifications text */}
          <div
            className="mt-6 text-center text-black"
            style={{
              transform: "translate(-60px, -280px)",
              fontSize: "10px",
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
    </div>
  );
};

export default EXPIBRTDB7;
