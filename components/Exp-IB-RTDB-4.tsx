"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface EXPIBRTDB4Props {
  zoomModeEnabled: boolean;
  forceExpanded?: boolean;
  onZoomOut?: () => void;
  initialTopSwitchClosed?: boolean;
  initialSwitch2Closed?: boolean;
  initialSwitch4Closed?: boolean;
  initialSwitch6Closed?: boolean;
  initialSwitch8Closed?: boolean;
  initialSwitch10Closed?: boolean;
  initialSwitch12Closed?: boolean;
  initialSwitch14Closed?: boolean;
  initialSwitch16Closed?: boolean;
  initialSwitch18Closed?: boolean;
  inputCurrentOn?: boolean;
  upstreamContactorClosed?: boolean;
  onSwitchChange?: {
    setTopSwitchClosed: (value: boolean) => void;
    setSwitch2Closed: (value: boolean) => void;
    setSwitch4Closed: (value: boolean) => void;
    setSwitch6Closed: (value: boolean) => void;
    setSwitch8Closed: (value: boolean) => void;
    setSwitch10Closed: (value: boolean) => void;
    setSwitch12Closed: (value: boolean) => void;
    setSwitch14Closed: (value: boolean) => void;
    setSwitch16Closed: (value: boolean) => void;
    setSwitch18Closed: (value: boolean) => void;
  };
  onZoomChange?: (isZoomed: boolean) => void;
  isBlurred?: boolean;
}

const EXPIBRTDB4 = ({
  zoomModeEnabled,
  forceExpanded = false,
  onZoomOut,
  initialTopSwitchClosed = false,
  initialSwitch2Closed = false,
  initialSwitch4Closed = false,
  initialSwitch6Closed = false,
  initialSwitch8Closed = false,
  initialSwitch10Closed = false,
  initialSwitch12Closed = false,
  initialSwitch14Closed = false,
  initialSwitch16Closed = false,
  initialSwitch18Closed = false,
  inputCurrentOn = true,
  upstreamContactorClosed = true,
  onSwitchChange,
  onZoomChange,
  isBlurred = false,
}: EXPIBRTDB4Props) => {
  // Initialize with props values first
  const [topSwitchClosed, setTopSwitchClosed] = useState(
    initialTopSwitchClosed
  );
  const [switch2Closed, setSwitch2Closed] = useState(initialSwitch2Closed);
  const [switch4Closed, setSwitch4Closed] = useState(initialSwitch4Closed);
  const [switch6Closed, setSwitch6Closed] = useState(initialSwitch6Closed);
  const [switch8Closed, setSwitch8Closed] = useState(initialSwitch8Closed);
  const [switch10Closed, setSwitch10Closed] = useState(initialSwitch10Closed);
  const [switch12Closed, setSwitch12Closed] = useState(initialSwitch12Closed);
  const [switch14Closed, setSwitch14Closed] = useState(initialSwitch14Closed);
  const [switch16Closed, setSwitch16Closed] = useState(initialSwitch16Closed);
  const [switch18Closed, setSwitch18Closed] = useState(initialSwitch18Closed);
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
        "Exp-IB-RTDB-4-topSwitchClosed",
        setTopSwitchClosed,
        initialTopSwitchClosed
      );
      loadSwitchState(
        "Exp-IB-RTDB-4-switch2Closed",
        setSwitch2Closed,
        initialSwitch2Closed
      );
      loadSwitchState(
        "Exp-IB-RTDB-4-switch4Closed",
        setSwitch4Closed,
        initialSwitch4Closed
      );
      loadSwitchState(
        "Exp-IB-RTDB-4-switch6Closed",
        setSwitch6Closed,
        initialSwitch6Closed
      );
      loadSwitchState(
        "Exp-IB-RTDB-4-switch8Closed",
        setSwitch8Closed,
        initialSwitch8Closed
      );
      loadSwitchState(
        "Exp-IB-RTDB-4-switch10Closed",
        setSwitch10Closed,
        initialSwitch10Closed
      );
      loadSwitchState(
        "Exp-IB-RTDB-4-switch12Closed",
        setSwitch12Closed,
        initialSwitch12Closed
      );
      loadSwitchState(
        "Exp-IB-RTDB-4-switch14Closed",
        setSwitch14Closed,
        initialSwitch14Closed
      );
      loadSwitchState(
        "Exp-IB-RTDB-4-switch16Closed",
        setSwitch16Closed,
        initialSwitch16Closed
      );
      loadSwitchState(
        "Exp-IB-RTDB-4-switch18Closed",
        setSwitch18Closed,
        initialSwitch18Closed
      );
      // Only load isZoomed from localStorage if not in forceExpanded mode
      if (!forceExpanded) {
        loadSwitchState("Exp-IB-RTDB-4-isZoomed", setIsZoomed, forceExpanded);
      }
    }
  }, [
    forceExpanded,
    initialTopSwitchClosed,
    initialSwitch2Closed,
    initialSwitch4Closed,
    initialSwitch6Closed,
    initialSwitch8Closed,
    initialSwitch10Closed,
    initialSwitch12Closed,
    initialSwitch14Closed,
    initialSwitch16Closed,
    initialSwitch18Closed,
  ]);
  // dragging disabled for expanded view

  useEffect(() => {
    if (forceExpanded) {
      setTopSwitchClosed(initialTopSwitchClosed);
      setSwitch2Closed(initialSwitch2Closed);
      setSwitch4Closed(initialSwitch4Closed);
      setSwitch6Closed(initialSwitch6Closed);
      setSwitch8Closed(initialSwitch8Closed);
      setSwitch10Closed(initialSwitch10Closed);
      setSwitch12Closed(initialSwitch12Closed);
      setSwitch14Closed(initialSwitch14Closed);
      setSwitch16Closed(initialSwitch16Closed);
      setSwitch18Closed(initialSwitch18Closed);
    }
  }, [
    forceExpanded,
    initialTopSwitchClosed,
    initialSwitch2Closed,
    initialSwitch4Closed,
    initialSwitch6Closed,
    initialSwitch8Closed,
    initialSwitch10Closed,
    initialSwitch12Closed,
    initialSwitch14Closed,
    initialSwitch16Closed,
    initialSwitch18Closed,
  ]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    // Only save to localStorage if not in forceExpanded mode
    if (!forceExpanded) {
      localStorage.setItem(
        "Exp-IB-RTDB-4-topSwitchClosed",
        JSON.stringify(topSwitchClosed)
      );
      localStorage.setItem(
        "Exp-IB-RTDB-4-switch2Closed",
        JSON.stringify(switch2Closed)
      );
      localStorage.setItem(
        "Exp-IB-RTDB-4-switch4Closed",
        JSON.stringify(switch4Closed)
      );
      localStorage.setItem(
        "Exp-IB-RTDB-4-switch6Closed",
        JSON.stringify(switch6Closed)
      );
      localStorage.setItem(
        "Exp-IB-RTDB-4-switch8Closed",
        JSON.stringify(switch8Closed)
      );
      localStorage.setItem(
        "Exp-IB-RTDB-4-switch10Closed",
        JSON.stringify(switch10Closed)
      );
      localStorage.setItem(
        "Exp-IB-RTDB-4-switch12Closed",
        JSON.stringify(switch12Closed)
      );
      localStorage.setItem(
        "Exp-IB-RTDB-4-switch14Closed",
        JSON.stringify(switch14Closed)
      );
      localStorage.setItem(
        "Exp-IB-RTDB-4-switch16Closed",
        JSON.stringify(switch16Closed)
      );
      localStorage.setItem(
        "Exp-IB-RTDB-4-switch18Closed",
        JSON.stringify(switch18Closed)
      );
      localStorage.setItem("Exp-IB-RTDB-4-isZoomed", JSON.stringify(isZoomed));
    }
  }, [
    topSwitchClosed,
    switch2Closed,
    switch4Closed,
    switch6Closed,
    switch8Closed,
    switch10Closed,
    switch12Closed,
    switch14Closed,
    switch16Closed,
    switch18Closed,
    isZoomed,
    forceExpanded,
  ]);

  // Handle zoom changes
  useEffect(() => {
    if (onZoomChange) {
      onZoomChange(isZoomed);
    }
  }, [isZoomed, onZoomChange]);

  // If this component is forced expanded (used inside IB-RTDB-4 popup), notify parent.
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
      case 2:
        return switch2Closed;
      case 4:
        return switch4Closed;
      case 6:
        return switch6Closed;
      case 8:
        return switch8Closed;
      case 10:
        return switch10Closed;
      case 12:
        return switch12Closed;
      case 14:
        return switch14Closed;
      case 16:
        return switch16Closed;
      case 18:
        return switch18Closed;
      default:
        return false;
    }
  };

  // Check if circuit is complete (top switch + any bottom switch)
  const isCircuitActive =
    topSwitchClosed && (switch2Closed || switch4Closed || switch6Closed);

  // Line color based on circuit state
  const lineColor = topSwitchClosed ? "#00aa00" : "black";

  // Style for terminal symbols based on switch states
  const getTerminalStyle = (switchNumber: number) => {
    const isActive =
      topSwitchClosed &&
      (switchNumber === 2
        ? switch2Closed
        : switchNumber === 4
        ? switch4Closed
        : switchNumber === 6
        ? switch6Closed
        : switchNumber === 8
        ? switch8Closed
        : switchNumber === 10
        ? switch10Closed
        : switchNumber === 12
        ? switch12Closed
        : switchNumber === 14
        ? switch14Closed
        : switchNumber === 16
        ? switch16Closed
        : switchNumber === 18
        ? switch18Closed
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
      case 2:
        const newState2 = !switch2Closed;
        setSwitch2Closed(newState2);
        onSwitchChange?.setSwitch2Closed(newState2);
        break;
      case 4:
        const newState4 = !switch4Closed;
        setSwitch4Closed(newState4);
        onSwitchChange?.setSwitch4Closed(newState4);
        break;
      case 6:
        const newState6 = !switch6Closed;
        setSwitch6Closed(newState6);
        onSwitchChange?.setSwitch6Closed(newState6);
        break;
      case 8:
        const newState8 = !switch8Closed;
        setSwitch8Closed(newState8);
        onSwitchChange?.setSwitch8Closed(newState8);
        break;
      case 10:
        const newState10 = !switch10Closed;
        setSwitch10Closed(newState10);
        onSwitchChange?.setSwitch10Closed(newState10);
        break;
      case 12:
        const newState12 = !switch12Closed;
        setSwitch12Closed(newState12);
        onSwitchChange?.setSwitch12Closed(newState12);
        break;
      case 14:
        const newState14 = !switch14Closed;
        setSwitch14Closed(newState14);
        onSwitchChange?.setSwitch14Closed(newState14);
        break;
      case 16:
        const newState16 = !switch16Closed;
        setSwitch16Closed(newState16);
        onSwitchChange?.setSwitch16Closed(newState16);
        break;
      case 18:
        const newState18 = !switch18Closed;
        setSwitch18Closed(newState18);
        onSwitchChange?.setSwitch18Closed(newState18);
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
      setSwitch2Closed(false);
      setSwitch4Closed(false);
      setSwitch6Closed(false);
      setSwitch8Closed(false);
      setSwitch10Closed(false);
      setSwitch12Closed(false);
      setSwitch14Closed(false);
      setSwitch16Closed(false);
      setSwitch18Closed(false);
      onSwitchChange?.setSwitch2Closed(false);
      onSwitchChange?.setSwitch4Closed(false);
      onSwitchChange?.setSwitch6Closed(false);
      onSwitchChange?.setSwitch8Closed(false);
      onSwitchChange?.setSwitch10Closed(false);
      onSwitchChange?.setSwitch12Closed(false);
      onSwitchChange?.setSwitch14Closed(false);
      onSwitchChange?.setSwitch16Closed(false);
      onSwitchChange?.setSwitch18Closed(false);
    }
  };

  // Auto-close when upstream contactor opens
  useEffect(() => {
    if (upstreamContactorClosed === false) {
      if (topSwitchClosed) {
        setTopSwitchClosed(false);
        onSwitchChange?.setTopSwitchClosed(false);
      }
      setSwitch2Closed(false);
      setSwitch4Closed(false);
      setSwitch6Closed(false);
      setSwitch8Closed(false);
      setSwitch10Closed(false);
      setSwitch12Closed(false);
      setSwitch14Closed(false);
      setSwitch16Closed(false);
      setSwitch18Closed(false);
      onSwitchChange?.setSwitch2Closed(false);
      onSwitchChange?.setSwitch4Closed(false);
      onSwitchChange?.setSwitch6Closed(false);
      onSwitchChange?.setSwitch8Closed(false);
      onSwitchChange?.setSwitch10Closed(false);
      onSwitchChange?.setSwitch12Closed(false);
      onSwitchChange?.setSwitch14Closed(false);
      onSwitchChange?.setSwitch16Closed(false);
      onSwitchChange?.setSwitch18Closed(false);
    }
  }, [upstreamContactorClosed]);

  // Auto-close when input current is turned off (DC isolator opened)
  useEffect(() => {
    if (inputCurrentOn === false) {
      if (topSwitchClosed) {
        setTopSwitchClosed(false);
        onSwitchChange?.setTopSwitchClosed(false);
      }

      setSwitch2Closed(false);
      setSwitch4Closed(false);
      setSwitch6Closed(false);
      setSwitch8Closed(false);
      setSwitch10Closed(false);
      setSwitch12Closed(false);
      setSwitch14Closed(false);
      setSwitch16Closed(false);
      setSwitch18Closed(false);

      onSwitchChange?.setSwitch2Closed(false);
      onSwitchChange?.setSwitch4Closed(false);
      onSwitchChange?.setSwitch6Closed(false);
      onSwitchChange?.setSwitch8Closed(false);
      onSwitchChange?.setSwitch10Closed(false);
      onSwitchChange?.setSwitch12Closed(false);
      onSwitchChange?.setSwitch14Closed(false);
      onSwitchChange?.setSwitch16Closed(false);
      onSwitchChange?.setSwitch18Closed(false);
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

                  {switch2Closed && (
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

                  {switch4Closed && (
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

                  {switch6Closed && (
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

                  {switch8Closed && (
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

                  {switch10Closed && (
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

                  {switch12Closed && (
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

                  {switch14Closed && (
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

                  {switch16Closed && (
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

                  {switch18Closed && (
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

              {/* IB-RTDB-4 box */}
              <text
                x="166"
                y="60"
                textAnchor="middle"
                fontSize="14"
                fontFamily="Arial"
                fill="red"
              >
                IB-RTDB-4
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

              {/* Switch 2 */}
              <foreignObject
                x="85.5"
                y="69"
                width="30"
                height="100"
                data-interactive="true"
              >
                <Image
                  src={
                    switch2Closed
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
                    handleBottomSwitchToggle(2);
                  }}
                />
              </foreignObject>

              {/* Switch 4 */}
              <foreignObject
                x="125"
                y="69"
                width="30"
                height="100"
                data-interactive="true"
              >
                <Image
                  src={
                    switch4Closed
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
                    handleBottomSwitchToggle(4);
                  }}
                />
              </foreignObject>

              {/* Switch 6 */}
              <foreignObject
                x="164.5"
                y="69"
                width="30"
                height="100"
                data-interactive="true"
              >
                <Image
                  src={
                    switch6Closed
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
                    handleBottomSwitchToggle(6);
                  }}
                />
              </foreignObject>

              {/* Switch 8 */}
              <foreignObject
                x="204"
                y="69"
                width="30"
                height="100"
                data-interactive="true"
              >
                <Image
                  src={
                    switch8Closed
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
                    handleBottomSwitchToggle(8);
                  }}
                />
              </foreignObject>

              {/* Switch 10 */}
              <foreignObject
                x="243.5"
                y="69"
                width="30"
                height="100"
                data-interactive="true"
              >
                <Image
                  src={
                    switch10Closed
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
                    handleBottomSwitchToggle(10);
                  }}
                />
              </foreignObject>

              {/* Switch 12 */}
              <foreignObject
                x="283"
                y="69"
                width="30"
                height="100"
                data-interactive="true"
              >
                <Image
                  src={
                    switch12Closed
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
                    handleBottomSwitchToggle(12);
                  }}
                />
              </foreignObject>

              {/* Switch 14 */}
              <foreignObject
                x="322.5"
                y="69"
                width="30"
                height="100"
                data-interactive="true"
              >
                <Image
                  src={
                    switch14Closed
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
                    handleBottomSwitchToggle(14);
                  }}
                />
              </foreignObject>

              {/* Switch 16 */}
              <foreignObject
                x="362"
                y="69"
                width="30"
                height="100"
                data-interactive="true"
              >
                <Image
                  src={
                    switch16Closed
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
                    handleBottomSwitchToggle(16);
                  }}
                />
              </foreignObject>

              {/* Switch 18 */}
              <foreignObject
                x="401.5"
                y="69"
                width="30"
                height="100"
                data-interactive="true"
              >
                <Image
                  src={
                    switch18Closed
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
                    handleBottomSwitchToggle(18);
                  }}
                />
              </foreignObject>

              {/* Terminal symbols using imported SVG */}
              <g transform="translate(89, 150)">
              <image
                href="/2.svg"
                width="40"
                height="50"
                style={getTerminalStyle(2)}
              />
            </g>
            <g transform="translate(129, 150)">
              <image
                href="/4.svg"
                width="40"
                height="50"
                style={getTerminalStyle(4)}
              />
            </g>
            <g transform="translate(169, 150)">
              <image
                href="/6.svg"
                width="40"
                height="50"
                style={getTerminalStyle(6)}
              />
            </g>
            <g transform="translate(209, 150)">
              <image
                href="/8.svg"
                width="40"
                height="50"
                style={getTerminalStyle(8)}
              />
            </g>
            <g transform="translate(247, 150)">
              <image
                href="/10.svg"
                width="40"
                height="50"
                style={getTerminalStyle(10)}
              />
            </g>
            <g transform="translate(287, 150)">
              <image
                href="/12.svg"
                width="40"
                height="50"
                style={getTerminalStyle(12)}
              />
            </g>
            <g transform="translate(327, 150)">
              <image
                href="/14.svg"
                width="40"
                height="50"
                style={getTerminalStyle(14)}
              />
            </g>
            <g transform="translate(366, 150)">
              <image
                href="/16.svg"
                width="40"
                height="50"
                style={getTerminalStyle(16)}
              />
            </g>
            <g transform="translate(405, 150)">
              <image
                href="/18.svg"
                width="40"
                height="50"
                style={getTerminalStyle(18)}
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
              <div>Table (2)</div>
              <div className="text-red-600">[AM3002-3018]</div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EXPIBRTDB4;