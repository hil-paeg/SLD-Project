"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface FourIGBTCircuit4Props {
  zoomModeEnabled: boolean;
  inputCurrentOn?: boolean;
  bothMCCBOn?: boolean;
  onZoomChange?: (isZoomed: boolean) => void;
  forceExpanded?: boolean;
  isBlurred?: boolean;
  onOutputSwitchChange?: (index: number, value: boolean) => void;
}

const FourIGBTCircuit4 = ({
  zoomModeEnabled,
  inputCurrentOn = true,
  bothMCCBOn = false,
  onZoomChange,
  forceExpanded = false,
  isBlurred = false,
  onOutputSwitchChange,
}: FourIGBTCircuit4Props) => {
  const [isCircuitOn, setIsCircuitOn] = useState(false);
  const [outputSwitches, setOutputSwitches] = useState([
    false,
    false,
    false,
    false,
  ]);
  const STORAGE_KEYS = {
    ISOLATOR: "FourIGBT4.isCircuitOn",
    OUTPUTS: "FourIGBT4.outputSwitches",
  };
  const [isZoomed, setIsZoomed] = useState(forceExpanded || false);
  // Keep a stable ref to parent onZoomChange so forced expand can notify parent
  const onZoomChangeRef = useRef(onZoomChange);
  useEffect(() => {
    onZoomChangeRef.current = onZoomChange;
  }, [onZoomChange]);

  // If parent forces expanded (e.g., on page load), open modal and notify parent.
  useEffect(() => {
    if (!forceExpanded) return;
    setIsZoomed(true);
    if (onZoomChangeRef.current) onZoomChangeRef.current(true);
    return () => {
      if (onZoomChangeRef.current) onZoomChangeRef.current(false);
    };
  }, [forceExpanded]);

  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  const toggleCircuit = () => {
    setIsCircuitOn(!isCircuitOn);
  };

  // If MCCBs go off, ensure isolator is immediately turned off
  useEffect(() => {
    if (!bothMCCBOn && isCircuitOn) {
      setIsCircuitOn(false);
    }
  }, [bothMCCBOn]);

  // If global input current is turned off, ensure local isolator closes
  useEffect(() => {
    if (inputCurrentOn === false && isCircuitOn) {
      setIsCircuitOn(false);
    }
  }, [inputCurrentOn, isCircuitOn]);

  // If input current goes off (DC isolator toggled), force output contactors ON
  // Close outputs when global input current is turned off or when local isolator is opened
  const prevIsCircuitOn = useRef(isCircuitOn);
  // keep a ref to the parent callback so we can call it without forcing it into the deps array
  const onOutputSwitchChangeRef = useRef(onOutputSwitchChange);
  useEffect(() => {
    onOutputSwitchChangeRef.current = onOutputSwitchChange;
  }, [onOutputSwitchChange]);

  // Initialize isolator and output switches from localStorage on mount
  useEffect(() => {
    try {
      const storedIsolator = localStorage.getItem(STORAGE_KEYS.ISOLATOR);
      const storedOutputs = localStorage.getItem(STORAGE_KEYS.OUTPUTS);

      if (storedIsolator !== null) {
        setIsCircuitOn(storedIsolator === "true");
      }

      if (storedOutputs) {
        const parsed = JSON.parse(storedOutputs);
        if (Array.isArray(parsed) && parsed.length === 4) {
          const bools = parsed.map((v: any) => Boolean(v));
          setOutputSwitches(bools);
          // notify parent about restored values
          if (typeof onOutputSwitchChangeRef.current === "function") {
            bools.forEach((val, idx) =>
              onOutputSwitchChangeRef.current &&
              onOutputSwitchChangeRef.current(idx, val)
            );
          }
        }
      }
    } catch (e) {
      // ignore storage errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist isolator and output switches whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ISOLATOR, String(isCircuitOn));
      localStorage.setItem(
        STORAGE_KEYS.OUTPUTS,
        JSON.stringify(outputSwitches)
      );
    } catch (e) {
      // ignore storage errors
    }
  }, [isCircuitOn, outputSwitches]);

  useEffect(() => {
    const shouldCloseOutputs =
      inputCurrentOn === false ||
      (prevIsCircuitOn.current === true && isCircuitOn === false);
    // only update state/call parent when there is an actual change needed
    if (shouldCloseOutputs && outputSwitches.some((s) => s === true)) {
      const newSwitches = [false, false, false, false];
      setOutputSwitches(newSwitches);
      const cb = onOutputSwitchChangeRef.current;
      if (typeof cb === "function") {
        newSwitches.forEach((val, idx) => cb(idx, val));
      }
    }
    prevIsCircuitOn.current = isCircuitOn;
  }, [inputCurrentOn, isCircuitOn, outputSwitches]);

  const toggleOutputSwitch = (index: number) => {
    const newSwitches = [...outputSwitches];
    newSwitches[index] = !newSwitches[index];
    setOutputSwitches(newSwitches);
    if (typeof onOutputSwitchChange === "function") {
      onOutputSwitchChange(index, newSwitches[index]);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // Prevent zoom when clicking on interactive elements or when zoom mode is disabled
    const target = e.target as HTMLElement;
    if (
      target.closest("[data-interactive]") ||
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

  // Keep parent informed whenever zoom state changes so it can
  // apply blur/other global effects. Using an effect avoids missing
  // notifications from other code paths (close button, overlay click, etc).
  useEffect(() => {
    if (typeof onZoomChange === "function") {
      onZoomChange(isZoomed);
    }
  }, [isZoomed, onZoomChange]);

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
        // When zoomed we render the full-screen wrapper (modal). When not
        // zoomed we fall back to the original small fixed container so the
        // circuit remains exactly where it was placed before.
        position: "fixed",
        top: isZoomed ? 0 : undefined,
        left: isZoomed ? 0 : undefined,
        width: isZoomed ? "100vw" : "300px",
        height: isZoomed ? "100vh" : "250px",
        display: isZoomed ? "flex" : undefined,
        justifyContent: isZoomed ? "center" : undefined,
        alignItems: isZoomed ? "center" : undefined,
        pointerEvents: "none",
        padding: isZoomed ? "20px" : undefined,
        boxSizing: "border-box",
        // Only blur the background when requested AND this component
        // is not currently the one shown in the zoomed modal. When
        // this circuit is zoomed we want the modal content to stay
        // sharp, so skip the blur here.
        filter: isBlurred && !isZoomed ? "blur(3px)" : "none",
        opacity: isBlurred && !isZoomed ? 0.7 : 1,
        transition: "filter 0.3s, opacity 0.3s",
      }}
    >
      {(() => {
        const portalTarget =
          typeof document !== "undefined" ? document.body : null;
        // Build the scaled circuit node (same as the in-place transform div)
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
              top: isZoomed ? "54%" : "auto",
              left: isZoomed ? "50%" : "auto",
              marginTop: isZoomed ? "-105px" : "auto",
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
            <svg width="300" height="250" viewBox="0 0 800 400">
              {/* ...existing svg content... */}
              {/* Current flow animation overlay - only visible when circuit is on */}
              {isCircuitOn && (
                <g>
                  <line
                    x1="372"
                    y1="-20"
                    x2="372"
                    y2="55"
                    stroke="#00ff00"
                    strokeWidth="4"
                    opacity="0.9"
                  />
                  <line
                    x1="143"
                    y1="69"
                    x2="597"
                    y2="69"
                    stroke="#00ff00"
                    strokeWidth="4"
                    opacity="0.9"
                  />
                  <line
                    x1="145"
                    y1="68.5"
                    x2="145"
                    y2="132.5"
                    stroke="#00ff00"
                    strokeWidth="4"
                    opacity="0.9"
                  />
                  <line
                    x1="295"
                    y1="68.5"
                    x2="295"
                    y2="132.5"
                    stroke="#00ff00"
                    strokeWidth="4"
                    opacity="0.9"
                  />
                  <line
                    x1="445"
                    y1="68.5"
                    x2="445"
                    y2="132.5"
                    stroke="#00ff00"
                    strokeWidth="4"
                    opacity="0.9"
                  />
                  <line
                    x1="595"
                    y1="68.5"
                    x2="595"
                    y2="132.5"
                    stroke="#00ff00"
                    strokeWidth="4"
                    opacity="0.9"
                  />
                  {outputSwitches[0] && (
                    <line
                      x1="149.5"
                      y1="172.5"
                      x2="149.5"
                      y2="244.5"
                      stroke="#00ff00"
                      strokeWidth="4"
                      opacity="0.9"
                    />
                  )}
                  {outputSwitches[1] && (
                    <line
                      x1="299.5"
                      y1="172.5"
                      x2="299.5"
                      y2="244.5"
                      stroke="#00ff00"
                      strokeWidth="4"
                      opacity="0.9"
                    />
                  )}
                  {outputSwitches[2] && (
                    <line
                      x1="449"
                      y1="172.5"
                      x2="449"
                      y2="244.5"
                      stroke="#00ff00"
                      strokeWidth="4"
                      opacity="0.9"
                    />
                  )}
                  {outputSwitches[3] && (
                    <line
                      x1="599"
                      y1="172.5"
                      x2="599"
                      y2="244.5"
                      stroke="#00ff00"
                      strokeWidth="4"
                      opacity="0.9"
                    />
                  )}
                </g>
              )}

              {/* Original dashed rectangle */}
              <foreignObject x="-300" y="-75" width="1400" height="475">
                <Image
                  src="/rectangle-dotted1.svg"
                  alt="Dashed Rectangle"
                  width={760}
                  height={220}
                  className="w-full h-full"
                />
              </foreignObject>

              {/* Upward arrows using SVG import and rest of svg elements preserved */}
              <foreignObject x="110" y="64.5" width="70" height="75">
                <Image
                  src="/line-up-double-arrow.svg"
                  alt="Upward Arrow"
                  width={30}
                  height={15}
                  className="w-full h-full"
                />
              </foreignObject>
              <foreignObject x="260" y="64.5" width="70" height="75">
                <Image
                  src="/line-up-double-arrow.svg"
                  alt="Upward Arrow"
                  width={30}
                  height={15}
                  className="w-full h-full"
                />
              </foreignObject>
              <foreignObject x="410" y="64.5" width="70" height="75">
                <Image
                  src="/line-up-double-arrow.svg"
                  alt="Upward Arrow"
                  width={30}
                  height={15}
                  className="w-full h-full"
                />
              </foreignObject>
              <foreignObject x="560" y="64.5" width="70" height="75">
                <Image
                  src="/line-up-double-arrow.svg"
                  alt="Upward Arrow"
                  width={30}
                  height={15}
                  className="w-full h-full"
                />
              </foreignObject>

              {/* IGBT Inverter symbols and the rest of SVG content reused unchanged */}
              <foreignObject x="110" y="130" width="80" height="50">
                <Image
                  src="/IGBT.svg"
                  alt="IGBT Inverter"
                  width={100}
                  height={60}
                  className="w-full h-full"
                />
              </foreignObject>
              <text
                x="215"
                y="143"
                textAnchor="middle"
                fontSize="12"
                fontFamily="Arial, sans-serif"
              >
                200KVA
              </text>
              <text
                x="218"
                y="155"
                textAnchor="middle"
                fontSize="12"
                fontFamily="Arial, sans-serif"
              >
                IGBT Inv.
              </text>
              <foreignObject x="260" y="130" width="80" height="50">
                <Image
                  src="/IGBT.svg"
                  alt="IGBT Inverter"
                  width={100}
                  height={60}
                  className="w-full h-full"
                />
              </foreignObject>
              <text
                x="366"
                y="143"
                textAnchor="middle"
                fontSize="12"
                fontFamily="Arial, sans-serif"
              >
                200KVA
              </text>
              <text
                x="369"
                y="155"
                textAnchor="middle"
                fontSize="12"
                fontFamily="Arial, sans-serif"
              >
                IGBT Inv.
              </text>
              <foreignObject x="410" y="130" width="80" height="50">
                <Image
                  src="/IGBT.svg"
                  alt="IGBT Inverter"
                  width={100}
                  height={60}
                  className="w-full h-full"
                />
              </foreignObject>
              <text
                x="517"
                y="143"
                textAnchor="middle"
                fontSize="12"
                fontFamily="Arial, sans-serif"
              >
                200KVA
              </text>
              <text
                x="520"
                y="155"
                textAnchor="middle"
                fontSize="12"
                fontFamily="Arial, sans-serif"
              >
                IGBT Inv.
              </text>
              <foreignObject x="560" y="130" width="80" height="50">
                <Image
                  src="/IGBT.svg"
                  alt="IGBT Inverter"
                  width={100}
                  height={60}
                  className="w-full h-full"
                />
              </foreignObject>
              <text
                x="668"
                y="143"
                textAnchor="middle"
                fontSize="12"
                fontFamily="Arial, sans-serif"
              >
                200KVA
              </text>
              <text
                x="671"
                y="155"
                textAnchor="middle"
                fontSize="12"
                fontFamily="Arial, sans-serif"
              >
                IGBT Inv.
              </text>
              <text
                x="400"
                y="30"
                textAnchor="start"
                fontSize="12"
                fontFamily="Arial, sans-serif"
              >
                1250A
              </text>

              {/* Switch symbol overlay using SVG files */}
              <foreignObject x="340" y="-30" width="50" height="98">
                <div
                  onClick={bothMCCBOn ? toggleCircuit : undefined}
                  style={{
                    cursor: bothMCCBOn ? "pointer" : "not-allowed",
                    opacity: bothMCCBOn ? 1 : 0.6,
                  }}
                >
                  <Image
                    src={
                      isCircuitOn
                        ? "/DC-OFF-load-isolator-closed.svg"
                        : "/DC-OFF-load-isolator.svg"
                    }
                    alt={
                      isCircuitOn
                        ? "DC Off-load Isolator Closed"
                        : "DC Off-load Isolator Open"
                    }
                    width={50}
                    height={40}
                    className="w-full h-full"
                    style={{ transition: "all 3s ease" }}
                  />
                </div>
              </foreignObject>

              {/* Output contactors */}
              <foreignObject
                x="127"
                y="165"
                width="36"
                height="74"
                onClick={
                  inputCurrentOn && isCircuitOn
                    ? () => toggleOutputSwitch(0)
                    : undefined
                }
                style={{
                  cursor:
                    inputCurrentOn && isCircuitOn ? "pointer" : "not-allowed",
                  opacity: inputCurrentOn && isCircuitOn ? 1 : 0.6,
                }}
              >
                <Image
                  src={
                    outputSwitches[0]
                      ? "/output-contactor-closed.svg"
                      : "/output-contactor.svg"
                  }
                  alt={
                    outputSwitches[0]
                      ? "Output Contactor 1 Closed"
                      : "Output Contactor 1 Open"
                  }
                  width={50}
                  height={40}
                  className="w-full h-full"
                  style={{ transition: "all 3s ease" }}
                />
              </foreignObject>
              <foreignObject
                x="276.5"
                y="165"
                width="36"
                height="74"
                onClick={
                  inputCurrentOn && isCircuitOn
                    ? () => toggleOutputSwitch(1)
                    : undefined
                }
                style={{
                  cursor:
                    inputCurrentOn && isCircuitOn ? "pointer" : "not-allowed",
                  opacity: inputCurrentOn && isCircuitOn ? 1 : 0.6,
                }}
              >
                <Image
                  src={
                    outputSwitches[1]
                      ? "/output-contactor-closed.svg"
                      : "/output-contactor.svg"
                  }
                  alt={
                    outputSwitches[1]
                      ? "Output Contactor 2 Closed"
                      : "Output Contactor 2 Open"
                  }
                  width={50}
                  height={40}
                  className="w-full h-full"
                  style={{ transition: "all 3s ease" }}
                />
              </foreignObject>
              <foreignObject
                x="426"
                y="165"
                width="36"
                height="74"
                onClick={
                  inputCurrentOn && isCircuitOn
                    ? () => toggleOutputSwitch(2)
                    : undefined
                }
                style={{
                  cursor:
                    inputCurrentOn && isCircuitOn ? "pointer" : "not-allowed",
                  opacity: inputCurrentOn && isCircuitOn ? 1 : 0.6,
                }}
              >
                <Image
                  src={
                    outputSwitches[2]
                      ? "/output-contactor-closed.svg"
                      : "/output-contactor.svg"
                  }
                  alt={
                    outputSwitches[2]
                      ? "Output Contactor 3 Closed"
                      : "Output Contactor 3 Open"
                  }
                  width={50}
                  height={40}
                  className="w-full h-full"
                  style={{ transition: "all 3s ease" }}
                />
              </foreignObject>
              <foreignObject
                x="576"
                y="165"
                width="36"
                height="74"
                onClick={
                  inputCurrentOn && isCircuitOn
                    ? () => toggleOutputSwitch(3)
                    : undefined
                }
                style={{
                  cursor:
                    inputCurrentOn && isCircuitOn ? "pointer" : "not-allowed",
                  opacity: inputCurrentOn && isCircuitOn ? 1 : 0.6,
                }}
              >
                <Image
                  src={
                    outputSwitches[3]
                      ? "/output-contactor-closed.svg"
                      : "/output-contactor.svg"
                  }
                  alt={
                    outputSwitches[3]
                      ? "Output Contactor 4 Closed"
                      : "Output Contactor 4 Open"
                  }
                  width={50}
                  height={40}
                  className="w-full h-full"
                  style={{ transition: "all 3s ease" }}
                />
              </foreignObject>

              {/* rest of SVG (arrows, SF boxes, lines) */}
              <foreignObject x="134" y="230.5" width="30" height="20">
                <Image
                  src="/down-two-arrows.svg"
                  alt="Downward Arrow"
                  width={30}
                  height={15}
                  className="w-full h-full"
                />
              </foreignObject>
              <foreignObject x="284" y="230.5" width="30" height="20">
                <Image
                  src="/down-two-arrows.svg"
                  alt="Downward Arrow"
                  width={30}
                  height={15}
                  className="w-full h-full"
                />
              </foreignObject>
              <foreignObject x="434" y="230.5" width="30" height="20">
                <Image
                  src="/down-two-arrows.svg"
                  alt="Downward Arrow"
                  width={30}
                  height={15}
                  className="w-full h-full"
                />
              </foreignObject>
              <foreignObject x="584" y="230.5" width="30" height="20">
                <Image
                  src="/down-two-arrows.svg"
                  alt="Downward Arrow"
                  width={30}
                  height={15}
                  className="w-full h-full"
                />
              </foreignObject>
              <foreignObject x="115" y="240" width="70" height="30">
                <Image
                  src="/S.F.svg"
                  alt="SF Symbol"
                  width={50}
                  height={25}
                  className="w-full h-full"
                />
              </foreignObject>
              <foreignObject x="265" y="240" width="70" height="30">
                <Image
                  src="/S.F.svg"
                  alt="SF Symbol"
                  width={50}
                  height={25}
                  className="w-full h-full"
                />
              </foreignObject>
              <foreignObject x="415" y="240" width="70" height="30">
                <Image
                  src="/S.F.svg"
                  alt="SF Symbol"
                  width={50}
                  height={25}
                  className="w-full h-full"
                />
              </foreignObject>
              <foreignObject x="565" y="240" width="70" height="30">
                <Image
                  src="/S.F.svg"
                  alt="SF Symbol"
                  width={50}
                  height={25}
                  className="w-full h-full"
                />
              </foreignObject>
              <line
                x1="145"
                y1="68.5"
                x2="595"
                y2="68.5"
                stroke="black"
                strokeWidth="1"
              />
            </svg>
          </div>
        );

        if (isZoomed && portalTarget) {
          return createPortal(
            <div className="modal-portal"
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.35)",
                    /* blur the page behind the overlay so the modal content stays sharp */
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
                  width: "45%",
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
                  <span>4 IGBT Circuit</span>
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
                  {/* place the circuitNode inside the modal so it is not blurred by backdrop */}
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

      {/* circuitNode is rendered above (inline or via portal) - removed duplicate */}
    </div>
  );
};

export default FourIGBTCircuit4;
