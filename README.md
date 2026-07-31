# PathVerse AR - IOBM Indoor Navigation

**PathVerse AR** is a cutting-edge indoor navigation system designed for the IOBM campus. It leverages Gemini-powered Visual Positioning (VPS) to identify architectural landmarks, projecting high-precision 3D pathfinding arrows onto the real-world view to guide students to their destination—even in structural signal dead zones.

## 🚀 Project Overview

1. **Spatial Intelligence:** PathSense AR identifies indoor locations by recognizing unique architectural landmarks through Gemini-powered visual analysis rather than relying on unstable GPS.
2. **Immersive Guidance:** It projects high-fidelity 3D navigation arrows and real-time distance markers directly onto the live camera feed, guiding students through the CBM, IT, and SSK buildings.
3. **Robust Engineering:** The system utilizes Gemini 3 Flash for low-latency edge processing and features an "Offline First" hybrid cache to ensure reliability across all campus wings.

## 🛠️ Tech Stack

*   **Frontend:** React 19 (ESM), TypeScript, Tailwind CSS.
*   **AI/Vision:** Google Gemini 3 Flash (Multimodal image -> spatial context analysis).
*   **AR Engine:** Custom CSS Perspective-based 3D projection & HUD overlay.
*   **Icons:** Lucide React.
*   **Build Tool:** Vite.

## 📦 Key Features

*   **Visual Positioning System (VPS)**: Centimeter-level accuracy using camera landmarks.
*   **High-Fidelity AR HUD**: Real-time navigation arrows, mini-maps, and distance tracking.
*   **Hybrid Caching**: Ensures functionality in basement labs and thick-walled corridors.
*   **Privacy-First AI**: On-device processing ensures camera feeds are never stored or transmitted.

---
*Built with ❤️ for the IOBM Community*