"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface TwoIGBTCircuitProps {
  zoomModeEnabled: boolean;
  inputCurrentOn: boolean;
  bothMCCBOn?: boolean;
  onZoomChange?: (isZoomed: boolean) => void;
  isBlurred?: boolean;
  onOutputSwitchChange?: (index: number, value: boolean) => void;
}

const TwoIGBTCircuit = ({
  zoomModeEnabled,
  inputCurrentOn,
  bothMCCBOn = false,
  onOutputSwitchChange,
}: TwoIGBTCircuitProps) => {
  // State variables
  const [isCircuitOn, setIsCircuitOn] = useState(false);
  const [outputSwitches, setOutputSwitches] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  // Constants
  const STORAGE_KEYS = {
    ISOLATOR: "TwoIGBT.isCircuitOn",
    OUTPUTS: "TwoIGBT.outputSwitches",
  };

  // Refs
  const prevIsCircuitOn = React.useRef<boolean>(isCircuitOn);
  const onOutputSwitchChangeRef = React.useRef(onOutputSwitchChange);

  useEffect(() => {
    onOutputSwitchChangeRef.current = onOutputSwitchChange;
  }, [onOutputSwitchChange]);

  // Initialize isolator and outputs from localStorage on mount
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
            bools.forEach(
              (val, idx) =>
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

  // Persist isolator and outputs whenever they change
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

  // Event handlers
  const toggleCircuit = () => {
    if (!bothMCCBOn) return;
    setIsCircuitOn(!isCircuitOn);
  };

  const toggleOutputSwitch = (index: number) => {
    if (!isCircuitOn) return;
    const newSwitches = [...outputSwitches];
    newSwitches[index] = !newSwitches[index];
    setOutputSwitches(newSwitches);
    if (typeof onOutputSwitchChange === "function") {
      onOutputSwitchChange(index, newSwitches[index]);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest("[data-interactive]") ||
      isDragging ||
      !zoomModeEnabled
    ) {
      return;
    }
    if (!isZoomed) {
      setIsZoomed(true);
      setPanOffset({ x: 0, y: 0 });
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

  // Auto-close circuit when MCCB turns off
  useEffect(() => {
    if (!bothMCCBOn && isCircuitOn) {
      setIsCircuitOn(false);
    }
  }, [bothMCCBOn]);

  // Auto-close circuit when input current is off
  useEffect(() => {
    if (inputCurrentOn === false && isCircuitOn) {
      setIsCircuitOn(false);
    }
  }, [inputCurrentOn, isCircuitOn]);

  // Auto-close outputs when circuit closes
  useEffect(() => {
    const shouldClose =
      prevIsCircuitOn.current === true && isCircuitOn === false;
    if (shouldClose && outputSwitches.some((s) => s === true)) {
      const newSwitches = [false, false, false, false];
      setOutputSwitches(newSwitches);
      const cb = onOutputSwitchChangeRef.current;
      if (typeof cb === "function") {
        newSwitches.forEach((val, idx) => cb(idx, val));
      }
    }
    prevIsCircuitOn.current = isCircuitOn;
  }, [isCircuitOn, outputSwitches]);

  // Render current flow animation
  const renderCurrentFlow = () => {
    if (!isCircuitOn) return null;

    return (
      <g>
        {/* Vertical flow through closed switch */}
        <line
          x1="372"
          y1="-20"
          x2="372"
          y2="67"
          stroke="#00ff00"
          strokeWidth="4"
          opacity="0.9"
        />

        {/* Main horizontal current flow */}
        <line
          x1="293"
          y1="69"
          x2="445"
          y2="69"
          stroke="#00ff00"
          strokeWidth="4"
          opacity="0.9"
        />

        {/* Vertical flows to each IGBT */}
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
          y1="68"
          x2="445"
          y2="132.5"
          stroke="#00ff00"
          strokeWidth="4"
          opacity="0.9"
        />

        {/* Vertical flows after output contactors */}
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
    );
  };

  // Render isolator switch
  const renderIsolatorSwitch = () => (
    <foreignObject x="340" y="-30" width="50" height="98">
      <div
        onClick={bothMCCBOn ? toggleCircuit : undefined}
        style={{ cursor: bothMCCBOn ? "pointer" : "not-allowed" }}
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
          style={{
            transition: "all 3s ease",
            opacity: bothMCCBOn ? 1 : 0.5,
          }}
        />
      </div>
    </foreignObject>
  );

  // Render output contactors
  const renderOutputContactors = () => (
    <>
      <foreignObject x="276.5" y="165" width="36" height="74">
        <div
          onClick={() => toggleOutputSwitch(1)}
          style={{ cursor: inputCurrentOn ? "pointer" : "not-allowed" }}
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
            style={{
              transition: "all 3s ease",
              opacity: inputCurrentOn ? 1 : 0.5,
            }}
          />
        </div>
      </foreignObject>

      <foreignObject x="426" y="165" width="36" height="74">
        <div
          onClick={() => toggleOutputSwitch(2)}
          style={{ cursor: inputCurrentOn ? "pointer" : "not-allowed" }}
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
            style={{
              transition: "all 3s ease",
              opacity: inputCurrentOn ? 1 : 0.5,
            }}
          />
        </div>
      </foreignObject>
    </>
  );

  // Render main circuit SVG
  const renderCircuitSVG = () => (
    <svg width="300" height="250" viewBox="0 0 800 400">
      {renderCurrentFlow()}

      {/* Background rectangle */}
      <foreignObject x="-50" y="12" width="900" height="310">
        <Image
          src="/rectangle-dotted.svg"
          alt="Dashed Rectangle"
          width={760}
          height={220}
          className="w-full h-full"
        />
      </foreignObject>

      {/* Upward arrows */}
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

      {/* IGBT components */}
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

      {/* Labels */}
      <text
        x="400"
        y="25"
        textAnchor="start"
        fontSize="12"
        fontFamily="Arial, sans-serif"
      >
        400A
      </text>
      <text
        x="400"
        y="-50"
        textAnchor="start"
        fontSize="16"
        fontFamily="Arial, sans-serif"
      >
        DC660V
      </text>

      {renderIsolatorSwitch()}
      {renderOutputContactors()}

      {/* Downward arrows */}
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

      {/* SF boxes */}
      <foreignObject x="265" y="240" width="70" height="30">
        <Image
          src="/S.F.svg"
          alt="SF Symbol"
          width={50}
          height={25}
          className="w-full h-full"
        />
      </foreignObject>
      <text
        x="300"
        y="288"
        textAnchor="middle"
        fontSize="12"
        fontFamily="Arial, sans-serif"
      >
        Spare
      </text>

      <foreignObject x="415" y="240" width="70" height="30">
        <Image
          src="/S.F.svg"
          alt="SF Symbol"
          width={50}
          height={25}
          className="w-full h-full"
        />
      </foreignObject>
      <text
        x="452"
        y="288"
        textAnchor="middle"
        fontSize="12"
        fontFamily="Arial, sans-serif"
      >
        Spare
      </text>

      {/* Connection lines */}
      <line
        x1="295"
        y1="68.5"
        x2="445.5"
        y2="68.5"
        stroke="black"
        strokeWidth="1"
      />
    </svg>
  );

  // Circuit node with transform styles
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
      {renderCircuitSVG()}
    </div>
  );

  // Render zoomed modal
  const renderZoomedModal = () => {
    if (!isZoomed || typeof document === "undefined") return null;

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
      >
        <div
          style={{
            position: "relative",
            width: "25%",
            height: "55%",
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
            <span>2 IGBT Circuit</span>
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
      document.body
    );
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
      {renderZoomedModal()}
      {!isZoomed && circuitNode}
    </div>
  );
};

export default TwoIGBTCircuit;
