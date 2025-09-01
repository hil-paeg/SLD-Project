# SLD (Single Line Diagram) for New Hot Strip Mill

A comprehensive web application for visualizing and interacting with SLD (Single Line Diagram) for New Hot Strip Mill in various configurations.

## Features

### Circuit Visualizations
- **Multiple IGBT Configurations**:
  - 2-IGBT circuit
  - 4-IGBT circuits (multiple variants)
  - Complex IGBT converter circuits
- **Interactive Components**:
  - Toggle circuit breakers (MCCB)
  - Control input/output contactors
  - Zoom functionality for detailed inspection
  - Real-time state visualization

### User Experience
- Persistent state management using localStorage
- Intuitive UI with clear visual feedback
- Zoom mode for detailed circuit inspection

## Technologies Used

### Frontend
- **Framework**: Next.js 15
- **UI Components**: Radix UI Primitives
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React Hooks
- **Icons**: Lucide React

### Development Tools
- TypeScript
- ESLint
- PostCSS
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn package manager
- Git (for version control)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/igbt-circuit-visualizer.git
   cd igbt-circuit-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

### Running the Application

1. **Development Mode**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.`

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page component
├── components/             # React components
│   ├── 2-IGBT-Circuit.tsx  # 2-IGBT circuit component
│   ├── 4-IGBT-circuit*.tsx # Various 4-IGBT circuit components
│   ├── IGBT-Conv*.tsx      # IGBT converter components
│   ├── IA-RTDB-*.tsx       # Current measurement components
│   ├── IB-RTDB-*.tsx       # Additional measurement components
│   └── Legend_Table.tsx    # Legend component
├── hooks/                  # Custom React hooks
│   ├── use-mobile.tsx      # Mobile detection hook
│   └── useLocalStorage.ts  # LocalStorage utilities
├── lib/                    # Utility functions
├── public/                 # Static assets
│   └── *.svg               # SVG icons and illustrations
└── styles/                 # Global styles
```

## Usage Guide

### Basic Navigation
1. The main interface displays the circuit diagram
2. Use the zoom buttons to focus on specific circuit sections
3. Toggle circuit breakers and contactors to see state changes
4. Refer to the legend for symbol meanings

### Interactive Features
- **Zoom Mode**: Click the zoom icon to enter zoom mode for detailed inspection
- **Circuit Controls**: Toggle switches to activate/deactivate circuit components
- **Legend**: Toggle the legend to understand circuit symbols and states

## Support

For support or questions, please open an issue in the GitHub repository.
