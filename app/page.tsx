"use client";
import { useState, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import TopCircuit from "@/components/Top-circuit";
import LeftCircuit from "@/components/IGBT-Conv1";
import RightCircuit from "@/components/IGBT-Conv2";
import FourIGBTCircuit1 from "@/components/4-IGBT-circuit-1";
import FourIGBTCircuit2 from "@/components/4-IGBT-circuit-2";
import FourIGBTCircuit3 from "@/components/4-IGBT-circuit-3";
import FourIGBTCircuit4 from "@/components/4-IGBT-circuit-4";
import TwoIGBTCircuit from "@/components/2-IGBT-Circuit";
import IARTDB1 from "@/components/IA-RTDB-1";
import IARTDB2 from "@/components/IA-RTDB-2";
import IARTDB3 from "@/components/IA-RTDB-3";
import IARTDB4 from "@/components/IA-RTDB-4";
import IARTDB5 from "@/components/IA-RTDB-5";
import IARTDB6 from "@/components/IA-RTDB-6";
import IARTDB7 from "@/components/IA-RTDB-7";
import IARTDB8 from "@/components/IA-RTDB-8";
import IBRTDB1 from "@/components/IB-RTDB-1";
import IBRTDB2 from "@/components/IB-RTDB-2";
import IBRTDB3 from "@/components/IB-RTDB-3";
import IBRTDB4 from "@/components/IB-RTDB-4";
import IBRTDB5 from "@/components/IB-RTDB-5";
import IBRTDB6 from "@/components/IB-RTDB-6";
import IBRTDB7 from "@/components/IB-RTDB-7";
import LegendDetailsTable from "@/components/Legend_Table";

export default function Home() {
  // Zoom mode state
  const [zoomModeEnabled, setZoomModeEnabled] = useState(false);
  // Legend table visibility state
  const [showLegend, setShowLegend] = useState(false);
  // Input Current state
  const [inputCurrentOn, setInputCurrentOn] = useState(false);
  // Track which circuit is currently zoomed
  const [zoomedCircuit, setZoomedCircuit] = useState<string | null>(null);

  // Load zoomedCircuit from localStorage on mount using useLayoutEffect so it's set
  // before the first paint on the client. This avoids a visible flash while keeping
  // server-rendered HTML deterministic (preventing hydration mismatch).
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("zoomedCircuit");
      if (saved !== null) {
        setZoomedCircuit(saved);
        // If a saved zoom exists, add body class immediately so CSS-based blur
        // appears before paint (defensive in case some elements depend on class)
        try {
          document.body.classList.add("modal-open-saved");
        } catch (e) {}
      }
    }
  }, []);

  // Save zoomedCircuit to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (zoomedCircuit === null) {
        localStorage.removeItem("zoomedCircuit");
      } else {
        localStorage.setItem("zoomedCircuit", zoomedCircuit);
      }
    }
  }, [zoomedCircuit]);

  // Keep body class in sync with zoomedCircuit after initial mount
  useEffect(() => {
    try {
      if (zoomedCircuit !== null) {
        document.body.classList.add("modal-open-saved");
      } else {
        document.body.classList.remove("modal-open-saved");
      }
    } catch (e) {}
    return () => {};
  }, [zoomedCircuit]);

  // Load input current state from localStorage on component mount
  useEffect(() => {
    // Only run in browser environment to prevent hydration errors
    if (typeof window !== "undefined") {
      const savedInputCurrentState = localStorage.getItem("inputCurrentOn");
      if (savedInputCurrentState !== null) {
        setInputCurrentOn(savedInputCurrentState === "true");
      }
    }
  }, []);
  // IGBT-Conv1 MCCB states
  const [leftMCCBOn, setLeftMCCBOn] = useState(false);
  const [rightMCCBOn, setRightMCCBOn] = useState(false);
  const [bothMCCBOn, setBothMCCBOn] = useState(false);

  // IGBT-Conv2 MCCB states
  const [rightCircuitLeftMCCBOn, setRightCircuitLeftMCCBOn] = useState(false);
  const [rightCircuitRightMCCBOn, setRightCircuitRightMCCBOn] = useState(false);
  const [rightCircuitBothMCCBOn, setRightCircuitBothMCCBOn] = useState(false);
  // Track output contactor states for four-IGBT blocks (flattened for the 4 blocks)
  // We'll index them left-to-right across the page: 0..3 for first FourIGBT, 4..7 for second, etc.
  const [outputContactors, setOutputContactors] = useState<
    Record<number, boolean>
  >({});

  // Load zoom mode state from localStorage on component mount
  useEffect(() => {
    // Only run in browser environment to prevent hydration errors
    if (typeof window !== "undefined") {
      const savedZoomMode = localStorage.getItem("zoomModeEnabled");
      if (savedZoomMode !== null) {
        setZoomModeEnabled(savedZoomMode === "true");
      }
    }
  }, []);

  // Save zoom mode state to localStorage when it changes
  useEffect(() => {
    // Only run in browser environment to prevent hydration errors
    if (typeof window !== "undefined") {
      localStorage.setItem("zoomModeEnabled", zoomModeEnabled.toString());
    }
  }, [zoomModeEnabled]);

  // Save input current state to localStorage when it changes
  useEffect(() => {
    // Only run in browser environment to prevent hydration errors
    if (typeof window !== "undefined") {
      localStorage.setItem("inputCurrentOn", inputCurrentOn.toString());
    }
  }, [inputCurrentOn]);

  // No longer needed as boxed view is implemented directly in the IA-RTDB-1 component
  // Define coordinates for each diagram
  const topCircuitPosition = { x: 200, y: 0 };

  const leftCircuitPosition = { x: 200, y: 125 };
  const rightCircuitPosition = { x: 1200, y: 125 };

  const fourIGBTCircuit1Position = { x: 40, y: 275 };
  const fourIGBTCircuit2Position = { x: 290, y: 275 };
  const fourIGBTCircuit3Position = { x: 1050, y: 275 };
  const fourIGBTCircuit4Position = { x: 1300, y: 275 };

  const twoIGBTCircuitPosition = { x: 700, y: 275 };

  const IARTDBPosition = { x: 67, y: 392.4 };
  const IARTDB1Position = { x: 124, y: 392.4 };
  const IARTDB2Position = { x: 181, y: 392.4 };
  const IARTDB3Position = { x: 238, y: 392.4 };

  const IARTDB4Position = { x: 315, y: 392.4 };
  const IARTDB5Position = { x: 372, y: 392.4 };
  const IARTDB6Position = { x: 429, y: 392.4 };
  const IARTDB7Position = { x: 486, y: 392.4 };

  const IARTDB8Position = { x: 1075, y: 392.4 };
  const IARTDB9Position = { x: 1132, y: 392.4 };
  const IARTDB10Position = { x: 1190, y: 392.4 };
  const IARTDB11Position = { x: 1245, y: 392.4 };

  const IARTDB12Position = { x: 1325, y: 392.4 };
  const IARTDB13Position = { x: 1382, y: 392.4 };
  const IARTDB14Position = { x: 1439, y: 392.4 };

  const LegendDetailsTablePosition = { x: 40, y: 560 };

  const shouldBlurControls = zoomedCircuit !== null || showLegend;

  return (
    <div
      className="bg-white"
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {/* Global click-blocker overlay when any circuit is zoomed */}
      {zoomedCircuit !== null && (
        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "TopCircuit"}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "transparent",
            zIndex: 9000,
            // Do NOT intercept pointer events here. Individual circuit wrappers already
            // set `pointerEvents: 'none'` for non-zoomed circuits. Leaving a global
            // click-catcher with `pointerEvents: 'auto'` prevents modal header buttons
            // (like the close X) and interactive elements inside the expanded component
            // from receiving clicks. Use pointerEvents: 'none' so the modal can handle clicks.
            pointerEvents: "none",
          }}
        />
      )}
      {/* Zoom Mode Toggle Button */}
      {/* Control buttons in top-right corner */}
      <div
        className="control-buttons"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          filter: shouldBlurControls ? "blur(3px)" : "none",
          opacity: shouldBlurControls ? 0.3 : 1,
          transition: "filter 0.3s, opacity 0.3s",
        }}
      >
        <button
          onClick={() => setZoomModeEnabled(!zoomModeEnabled)}
          style={{
            padding: "8px 16px",
            backgroundColor: zoomModeEnabled ? "#4CAF50" : "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            marginBottom: "10px",
          }}
        >
          Zoom Mode: {zoomModeEnabled ? "ON" : "OFF"}
        </button>
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <button
            onClick={() => setShowLegend(!showLegend)}
            style={{
              padding: "8px 16px",
              backgroundColor: showLegend ? "#4CAF50" : "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            Legend: {showLegend ? "ON" : "OFF"}
          </button>
        </div>
        {/* Button removed as boxed view is now implemented directly in the IA-RTDB-1 component */}
      </div>

      {/* Legend popup - reuse the expanded popup style from Exp-IA-RTDB-1 */}
      {showLegend && (
        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "LeftCircuit"}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              border: "2px solid #333",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
              width: "min(90vw, 500px)",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
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
                zIndex: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span style={{ flex: 1 }}></span>
              <span>Legend Details</span>
              <span style={{ flex: 1, textAlign: "right" }}>
                <button
                  onClick={() => setShowLegend(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "white",
                    fontSize: "16px",
                    cursor: "pointer",
                    padding: "0 8px",
                  }}
                >
                  X
                </button>
              </span>
            </div>

            <div
              style={{
                paddingTop: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LegendDetailsTable />
            </div>
          </div>
        </div>
      )}

      {/* Input Current button next to Top Circuit */}
      <div
        className="control-buttons"
        style={{
          position: "fixed",
          top: "30px",
          left: `${topCircuitPosition.x + 400}px`,
          zIndex: 10001,
          filter: shouldBlurControls ? "blur(3px)" : "none",
          opacity: shouldBlurControls ? 0.3 : 1,
          transition: "filter 0.3s, opacity 0.3s",
        }}
      >
        <button
          onClick={() => {
            // keep visually same but ignore clicks when zoomed or when legend popup is open
            if (zoomedCircuit !== null || showLegend) return;
            setInputCurrentOn(!inputCurrentOn);
          }}
          style={{
            padding: "8px 16px",
            backgroundColor: inputCurrentOn ? "#4CAF50" : "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "default",
            fontWeight: "bold",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          Input Current: {inputCurrentOn ? "ON" : "OFF"}
        </button>
      </div>

      <div
        className={`circuit-container ${
          zoomedCircuit !== null ? "modal-open" : ""
        }`}
        style={{ position: "static", width: "100%", height: "100%" }}
      >
        {/* Global CSS: when modal-open is set, disable pointer-events for all circuit wrappers
            except the one marked as data-active="true". This is a robust central control
            (avoids stacking-context/pointer-event edge cases). */}
        <style jsx global>{`
          .modal-open .circuit-wrapper {
            pointer-events: none !important;
          }
          .modal-open .circuit-wrapper[data-active="true"] {
            pointer-events: auto !important;
          }
        `}</style>
        {/* Top Circuit positioned at specified coordinates */}
        <svg
          className="background-svg"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 1000,
            width: "100%",
            height: "100%",
            filter: zoomedCircuit !== null || showLegend ? "blur(3px)" : "none",
            opacity: zoomedCircuit !== null || showLegend ? 0.3 : 1,
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          {/* Left Vertical connection line from top circuit to horizontal line */}
          <line
            x1={topCircuitPosition.x + 643}
            y1={topCircuitPosition.y + 112}
            x2={leftCircuitPosition.x + 643}
            y2={leftCircuitPosition.y + 15}
            stroke={inputCurrentOn ? "#00ff00" : "black"}
            strokeWidth={inputCurrentOn ? "2" : "1"}
          />

          {/* Right Vertical connection line from top circuit to horizontal line */}
          <line
            x1={topCircuitPosition.x + 658}
            y1={topCircuitPosition.y + 112}
            x2={leftCircuitPosition.x + 658}
            y2={leftCircuitPosition.y + 15}
            stroke={inputCurrentOn ? "#00ff00" : "black"}
            strokeWidth={inputCurrentOn ? "2" : "1"}
          />

          {/* Vertical connection line from horizontal line to left circuit */}
          <line
            x1={topCircuitPosition.x + 120}
            y1={topCircuitPosition.y + 139}
            x2={leftCircuitPosition.x + 120}
            y2={leftCircuitPosition.y + 47}
            stroke={inputCurrentOn ? "#00ff00" : "black"}
            strokeWidth={inputCurrentOn ? "2" : "1"}
          />

          {/* Vertical connection line from horizontal line to right circuit */}
          <line
            x1={topCircuitPosition.x + 1120}
            y1={topCircuitPosition.y + 139}
            x2={leftCircuitPosition.x + 1120}
            y2={leftCircuitPosition.y + 47}
            stroke={inputCurrentOn ? "#00ff00" : "black"}
            strokeWidth={inputCurrentOn ? "2" : "1"}
          />

          {/* Horizontal connection line from top circuit to left circuit */}
          <line
            x1={topCircuitPosition.x + 120}
            y1={topCircuitPosition.y + 140}
            x2={rightCircuitPosition.x + 15}
            y2={rightCircuitPosition.y + 15}
            stroke={inputCurrentOn ? "#00ff00" : "black"}
            strokeWidth={inputCurrentOn ? "2" : "1"}
          />

          {/* Horizontal connection line from top circuit to right circuit */}
          <line
            x1={topCircuitPosition.x + 400}
            y1={topCircuitPosition.y + 140}
            x2={rightCircuitPosition.x + 120}
            y2={rightCircuitPosition.y + 15}
            stroke={inputCurrentOn ? "#00ff00" : "black"}
            strokeWidth={inputCurrentOn ? "2" : "1"}
          />

          {/* Vertical connection line from left circuit to 4-IGBT circuit */}
          <line
            x1={topCircuitPosition.x + 120}
            y1={topCircuitPosition.y + 295}
            x2={leftCircuitPosition.x + 120}
            y2={leftCircuitPosition.y + 192}
            stroke={bothMCCBOn && inputCurrentOn ? "#00ff00" : "black"}
            strokeWidth={bothMCCBOn && inputCurrentOn ? "2" : "1"}
          />

          {/* Horizontal connection line from left circuit to 4 IGBT circuit */}
          <line
            x1={topCircuitPosition.x - 20.7}
            y1={topCircuitPosition.y + 317}
            x2={rightCircuitPosition.x - 360}
            y2={rightCircuitPosition.y + 192}
            stroke={
              (bothMCCBOn || rightCircuitBothMCCBOn) && inputCurrentOn
                ? "#00ff00"
                : "black"
            }
            strokeWidth={
              (bothMCCBOn || rightCircuitBothMCCBOn) && inputCurrentOn
                ? "2"
                : "1"
            }
          />

          {/* Left Vertical connection line to 2 IGBT circuit */}
          <line
            x1={topCircuitPosition.x + 640}
            y1={topCircuitPosition.y + 280}
            x2={leftCircuitPosition.x + 640}
            y2={leftCircuitPosition.y + 192.5}
            stroke={
              (bothMCCBOn || rightCircuitBothMCCBOn) && inputCurrentOn
                ? "#00ff00"
                : "black"
            }
            strokeWidth={
              (bothMCCBOn || rightCircuitBothMCCBOn) && inputCurrentOn
                ? "2"
                : "1"
            }
          />

          {/* Horizontal connection line from 2 IGBT circuit to right 4 IGBT circuit */}
          <line
            x1={topCircuitPosition.x + 636}
            y1={topCircuitPosition.y + 285}
            x2={rightCircuitPosition.x - 7}
            y2={rightCircuitPosition.y + 160}
            stroke={
              (bothMCCBOn || rightCircuitBothMCCBOn) && inputCurrentOn
                ? "#00ff00"
                : "black"
            }
            strokeWidth={
              (bothMCCBOn || rightCircuitBothMCCBOn) && inputCurrentOn
                ? "2"
                : "1"
            }
          />

          {/* Right Vertical connection line to 2 IGBT circuit */}
          <line
            x1={topCircuitPosition.x + 989}
            y1={topCircuitPosition.y + 280}
            x2={leftCircuitPosition.x + 989}
            y2={leftCircuitPosition.y + 192.5}
            stroke={
              (bothMCCBOn || rightCircuitBothMCCBOn) && inputCurrentOn
                ? "#00ff00"
                : "black"
            }
            strokeWidth={
              (bothMCCBOn || rightCircuitBothMCCBOn) && inputCurrentOn
                ? "2"
                : "1"
            }
          />

          {/* Horizontal connection line from right circuit to 4 IGBT circuit */}
          <line
            x1={topCircuitPosition.x + 989}
            y1={topCircuitPosition.y + 317}
            x2={rightCircuitPosition.x + 240.3}
            y2={rightCircuitPosition.y + 192}
            stroke={
              (bothMCCBOn || rightCircuitBothMCCBOn) && inputCurrentOn
                ? "#00ff00"
                : "black"
            }
            strokeWidth={
              (bothMCCBOn || rightCircuitBothMCCBOn) && inputCurrentOn
                ? "2"
                : "1"
            }
          />

          {/* Vertical connection line from right circuit to 4-IGBT circuit */}
          <line
            x1={topCircuitPosition.x + 1120}
            y1={topCircuitPosition.y + 295}
            x2={leftCircuitPosition.x + 1120}
            y2={leftCircuitPosition.y + 192}
            stroke={
              rightCircuitBothMCCBOn && inputCurrentOn ? "#00ff00" : "black"
            }
            strokeWidth={rightCircuitBothMCCBOn && inputCurrentOn ? "2" : "1"}
          />

          {/* Horizontal line below left 3 number circuit */}
          <line
            x1={topCircuitPosition.x - 120}
            y1={topCircuitPosition.y + 517}
            x2={rightCircuitPosition.x - 300}
            y2={rightCircuitPosition.y + 392}
            stroke={"black"}
            strokeWidth={1}
          />

          {/* Left Vertical line below 3 number ciruit */}
          <line
            x1={topCircuitPosition.x - 120}
            y1={topCircuitPosition.y + 510}
            x2={leftCircuitPosition.x - 120}
            y2={leftCircuitPosition.y + 392}
            stroke={"black"}
            strokeWidth={1}
          />

          {/* Right Vertical line below 3 number ciruit */}
          <line
            x1={topCircuitPosition.x + 700}
            y1={topCircuitPosition.y + 510}
            x2={leftCircuitPosition.x + 700}
            y2={leftCircuitPosition.y + 392}
            stroke={"black"}
            strokeWidth={1}
          />

          {/* Horizontal line below right 3 number circuit */}
          <line
            x1={topCircuitPosition.x + 875}
            y1={topCircuitPosition.y + 517}
            x2={rightCircuitPosition.x + 375}
            y2={rightCircuitPosition.y + 392}
            stroke={"black"}
            strokeWidth={1}
          />

          {/* Left Vertical line below 3 number ciruit */}
          <line
            x1={topCircuitPosition.x + 875}
            y1={topCircuitPosition.y + 510}
            x2={leftCircuitPosition.x + 875}
            y2={leftCircuitPosition.y + 392}
            stroke={"black"}
            strokeWidth={1}
          />

          {/* Right Vertical line below 3 number ciruit */}
          <line
            x1={topCircuitPosition.x + 1375}
            y1={topCircuitPosition.y + 510}
            x2={leftCircuitPosition.x + 1375}
            y2={leftCircuitPosition.y + 392}
            stroke={"black"}
            strokeWidth={1}
          />

          {/* DC660V label in first 4-IGBT Circuit */}
          <text
            x="120"
            y="360"
            textAnchor="middle"
            fontSize="6"
            fontFamily="Arial, sans-serif"
          >
            DC660V
          </text>

          {/* DC660V label in third 4-IGBT Circuit */}
          <text
            x="1250"
            y="360"
            textAnchor="middle"
            fontSize="6"
            fontFamily="Arial, sans-serif"
          >
            DC660V
          </text>

          {/* DC660V label in fourth 4-IGBT Circuit */}
          <text
            x="1500"
            y="360"
            textAnchor="middle"
            fontSize="6"
            fontFamily="Arial, sans-serif"
          >
            DC660V
          </text>

          {/* Spare label below fourth 4-IGBT Circuit */}
          <text
            x="1528"
            y="435"
            textAnchor="middle"
            fontSize="6"
            fontFamily="Arial, sans-serif"
          >
            Spare
          </text>

          {/* FURNACE 1A label */}
          <text
            x="355"
            y="540"
            textAnchor="middle"
            fontSize="12"
            fontFamily="Arial"
          >
            FURNACE 1A
          </text>

          {/* FURNACE 1B label */}
          <text
            x="1350"
            y="540"
            textAnchor="middle"
            fontSize="12"
            fontFamily="Arial"
          >
            FURNACE 1B
          </text>
        </svg>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "RightCircuit"}
          style={{
            position: "absolute",
            left: `${topCircuitPosition.x}px`,
            top: `${topCircuitPosition.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "TopCircuit") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "TopCircuit") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "TopCircuit") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <TopCircuit
            zoomModeEnabled={zoomModeEnabled}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "TopCircuit" : null);
            }}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "TopCircuit") ||
              showLegend
            }
          />
        </div>

        {/* Left Circuit positioned at specified coordinates */}
        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "FourIGBTCircuit"}
          style={{
            position: "absolute",
            left: `${leftCircuitPosition.x}px`,
            top: `${leftCircuitPosition.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "LeftCircuit") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "LeftCircuit") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "LeftCircuit") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <LeftCircuit
            zoomModeEnabled={zoomModeEnabled}
            inputCurrentOn={inputCurrentOn}
            onMCCBStateChange={(l, r) => {
              setLeftMCCBOn(l);
              setRightMCCBOn(r);
              setBothMCCBOn(l && r);
            }}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "LeftCircuit" : null);
            }}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "LeftCircuit") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "IA-RTDB-1"}
          style={{
            position: "absolute",
            left: `${rightCircuitPosition.x}px`,
            top: `${rightCircuitPosition.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "RightCircuit") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "RightCircuit") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "RightCircuit") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <RightCircuit
            zoomModeEnabled={zoomModeEnabled}
            inputCurrentOn={inputCurrentOn}
            onMCCBStateChange={(l, r) => {
              setRightCircuitLeftMCCBOn(l);
              setRightCircuitRightMCCBOn(r);
              setRightCircuitBothMCCBOn(l && r);
            }}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "RightCircuit" : null);
            }}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "RightCircuit") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "IA-RTDB-2"}
          style={{
            position: "absolute",
            left: `${fourIGBTCircuit1Position.x}px`,
            top: `${fourIGBTCircuit1Position.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "FourIGBTCircuit") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "FourIGBTCircuit") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "FourIGBTCircuit") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <FourIGBTCircuit1
            zoomModeEnabled={zoomModeEnabled}
            inputCurrentOn={inputCurrentOn}
            bothMCCBOn={bothMCCBOn || rightCircuitBothMCCBOn}
            forceExpanded={zoomedCircuit === "FourIGBTCircuit1"}
            onOutputSwitchChange={(index: number, value: boolean) => {
              // map to global index for the first FourIGBT block (0..3)
              setOutputContactors((prev) => ({ ...prev, [index]: value }));
            }}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "FourIGBTCircuit" : null);
            }}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "FourIGBTCircuit") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "IA-RTDB-4"}
          style={{
            position: "absolute",
            left: `${IARTDBPosition.x}px`,
            top: `${IARTDBPosition.y}px`,
            filter: zoomedCircuit !== null || showLegend ? "blur(3px)" : "none",
            opacity: zoomedCircuit !== null || showLegend ? 0.7 : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-2") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <IARTDB1
            zoomModeEnabled={zoomModeEnabled}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "IA-RTDB-1" : null);
            }}
            upstreamContactorClosed={!!outputContactors[1]}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-1") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "IA-RTDB-4"}
          style={{
            position: "absolute",
            left: `${IARTDB1Position.x}px`,
            top: `${IARTDB1Position.y}px`,
            filter: zoomedCircuit !== null || showLegend ? "blur(3px)" : "none",
            opacity: zoomedCircuit !== null || showLegend ? 0.7 : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-2") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <IARTDB2
            zoomModeEnabled={zoomModeEnabled}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "IA-RTDB-2" : null);
            }}
            upstreamContactorClosed={!!outputContactors[1]}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-2") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "FourIGBT-2"}
          style={{
            position: "absolute",
            left: `${IARTDB2Position.x}px`,
            top: `${IARTDB2Position.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-3") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-3") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-3") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <IARTDB3
            zoomModeEnabled={zoomModeEnabled}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "IA-RTDB-3" : null);
            }}
            upstreamContactorClosed={!!outputContactors[2]}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-3") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "IA-RTDB-5"}
          style={{
            position: "absolute",
            left: `${IARTDB3Position.x}px`,
            top: `${IARTDB3Position.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-4") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-4") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-4") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <IARTDB4
            zoomModeEnabled={zoomModeEnabled}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "IA-RTDB-4" : null);
            }}
            upstreamContactorClosed={!!outputContactors[3]}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-4") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "IA-RTDB-6"}
          style={{
            position: "absolute",
            left: `${fourIGBTCircuit2Position.x}px`,
            top: `${fourIGBTCircuit2Position.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "FourIGBT-2") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "FourIGBT-2") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "FourIGBT-2") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <FourIGBTCircuit2
            zoomModeEnabled={zoomModeEnabled}
            inputCurrentOn={inputCurrentOn}
            bothMCCBOn={bothMCCBOn || rightCircuitBothMCCBOn}
            onOutputSwitchChange={(index: number, value: boolean) => {
              // second FourIGBT block -> offset indices by 4
              setOutputContactors((prev) => ({ ...prev, [index + 4]: value }));
            }}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "FourIGBT-2" : null);
            }}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "FourIGBT-2") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "IA-RTDB-7"}
          style={{
            position: "absolute",
            left: `${IARTDB4Position.x}px`,
            top: `${IARTDB4Position.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-5") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-5") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-5") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <IARTDB5
            zoomModeEnabled={zoomModeEnabled}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "IA-RTDB-5" : null);
            }}
            upstreamContactorClosed={!!outputContactors[4]}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-5") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "IA-RTDB-8"}
          style={{
            position: "absolute",
            left: `${IARTDB5Position.x}px`,
            top: `${IARTDB5Position.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-6") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-6") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-6") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <IARTDB6
            zoomModeEnabled={zoomModeEnabled}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "IA-RTDB-6" : null);
            }}
            upstreamContactorClosed={!!outputContactors[5]}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-6") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "TwoIGBT"}
          style={{
            position: "absolute",
            left: `${IARTDB6Position.x}px`,
            top: `${IARTDB6Position.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-7") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-7") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-7") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <IARTDB7
            zoomModeEnabled={zoomModeEnabled}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "IA-RTDB-7" : null);
            }}
            upstreamContactorClosed={!!outputContactors[6]}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-7") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "FourIGBT-3"}
          style={{
            position: "absolute",
            left: `${IARTDB7Position.x}px`,
            top: `${IARTDB7Position.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-8") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-8") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-8") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <IARTDB8
            zoomModeEnabled={zoomModeEnabled}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "IA-RTDB-8" : null);
            }}
            upstreamContactorClosed={!!outputContactors[7]}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "IA-RTDB-8") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "FourIGBT-3"}
          style={{
            position: "absolute",
            left: `${twoIGBTCircuitPosition.x}px`,
            top: `${twoIGBTCircuitPosition.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "TwoIGBT") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "TwoIGBT") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "TwoIGBT") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <TwoIGBTCircuit
            zoomModeEnabled={zoomModeEnabled}
            inputCurrentOn={inputCurrentOn}
            bothMCCBOn={bothMCCBOn || rightCircuitBothMCCBOn}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "TwoIGBT" : null);
            }}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "TwoIGBT") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "IA-RTDB-5"}
          style={{
            position: "absolute",
            left: `${fourIGBTCircuit3Position.x}px`,
            top: `${fourIGBTCircuit3Position.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "FourIGBT-3") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "FourIGBT-3") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "FourIGBT-3") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <FourIGBTCircuit3
            zoomModeEnabled={zoomModeEnabled}
            inputCurrentOn={inputCurrentOn}
            bothMCCBOn={bothMCCBOn || rightCircuitBothMCCBOn}
            onOutputSwitchChange={(index: number, value: boolean) => {
              // third FourIGBT block -> offset indices by 8
              setOutputContactors((prev) => ({ ...prev, [index + 8]: value }));
            }}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "FourIGBT-3" : null);
            }}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "FourIGBT-3") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "IA-RTDB-6"}
          style={{
            position: "absolute",
            left: `${IARTDB8Position.x}px`,
            top: `${IARTDB8Position.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-1") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-1") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-1") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <IBRTDB1
            zoomModeEnabled={zoomModeEnabled}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "IB-RTDB-1" : null);
            }}
            upstreamContactorClosed={!!outputContactors[8]}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-1") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "IA-RTDB-7"}
          style={{
            position: "absolute",
            left: `${IARTDB9Position.x}px`,
            top: `${IARTDB9Position.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-2") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-2") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-2") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <IBRTDB2
            zoomModeEnabled={zoomModeEnabled}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "IB-RTDB-2" : null);
            }}
            upstreamContactorClosed={!!outputContactors[9]}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-2") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "IA-RTDB-8"}
          style={{
            position: "absolute",
            left: `${IARTDB10Position.x}px`,
            top: `${IARTDB10Position.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-3") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-3") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-3") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <IBRTDB3
            zoomModeEnabled={zoomModeEnabled}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "IB-RTDB-3" : null);
            }}
            upstreamContactorClosed={!!outputContactors[10]}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-3") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "IB-RTDB-4"}
          style={{
            position: "absolute",
            left: `${IARTDB11Position.x}px`,
            top: `${IARTDB11Position.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-4") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-4") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-4") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <IBRTDB4
            zoomModeEnabled={zoomModeEnabled}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "IB-RTDB-4" : null);
            }}
            upstreamContactorClosed={!!outputContactors[11]}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-4") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "FourIGBT-4"}
          style={{
            position: "absolute",
            left: `${fourIGBTCircuit4Position.x}px`,
            top: `${fourIGBTCircuit4Position.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "FourIGBT-4") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "FourIGBT-4") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "FourIGBT-4") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <FourIGBTCircuit4
            zoomModeEnabled={zoomModeEnabled}
            inputCurrentOn={inputCurrentOn}
            bothMCCBOn={bothMCCBOn || rightCircuitBothMCCBOn}
            onOutputSwitchChange={(index: number, value: boolean) => {
              // fourth FourIGBT block -> offset indices by 12
              setOutputContactors((prev) => ({ ...prev, [index + 12]: value }));
            }}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "FourIGBT-4" : null);
            }}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "FourIGBT-4") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "IB-RTDB-5"}
          style={{
            position: "absolute",
            left: `${IARTDB12Position.x}px`,
            top: `${IARTDB12Position.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-5") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-5") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-5") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <IBRTDB5
            zoomModeEnabled={zoomModeEnabled}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "IB-RTDB-5" : null);
            }}
            upstreamContactorClosed={!!outputContactors[12]}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-5") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "IB-RTDB-6"}
          style={{
            position: "absolute",
            left: `${IARTDB13Position.x}px`,
            top: `${IARTDB13Position.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-6") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-6") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-6") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <IBRTDB6
            zoomModeEnabled={zoomModeEnabled}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "IB-RTDB-6" : null);
            }}
            upstreamContactorClosed={!!outputContactors[13]}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-6") ||
              showLegend
            }
          />
        </div>

        <div
          className="circuit-wrapper"
          data-active={zoomedCircuit === "IB-RTDB-7"}
          style={{
            position: "absolute",
            left: `${IARTDB14Position.x}px`,
            top: `${IARTDB14Position.y}px`,
            filter:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-7") ||
              showLegend
                ? "blur(3px)"
                : "none",
            opacity:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-7") ||
              showLegend
                ? 0.7
                : 1,
            pointerEvents:
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-7") ||
              showLegend
                ? "none"
                : "auto",
            transition: "filter 0.3s, opacity 0.3s",
          }}
        >
          <IBRTDB7
            zoomModeEnabled={zoomModeEnabled}
            onZoomChange={(isZoomed: boolean) => {
              setZoomedCircuit(isZoomed ? "IB-RTDB-7" : null);
            }}
            upstreamContactorClosed={!!outputContactors[14]}
            isBlurred={
              (zoomedCircuit !== null && zoomedCircuit !== "IB-RTDB-7") ||
              showLegend
            }
          />
        </div>

        {/* Background legend removed - legend now only appears in the centered popup */}
      </div>
    </div>
  );
}
