# PathSense AR - IOBM Indoor Navigation

**PathSense AR** is an Augmented Reality (AR) indoor navigation system designed for the IOBM campus. It leverages the Google Gemini Vision API to identify corridors, classrooms, and landmarks, projecting 3D pathfinding arrows onto the real-world view to guide students to their destination—even without an active internet connection (via caching).

## 🚀 Features

*   **Visual Positioning System (VPS)**: AI-powered location recognition using camera feed.
*   **AR Navigation**: 3D arrows and distance meters overlaid on the real world.
*   **Offline First**: Designed to work in areas with poor Wi-Fi.
*   **Smart Dashboard**: Integrated timetable and campus quick actions.
*   **Voice Search**: Hands-free room lookup.

## 🛠️ Tech Stack

*   **Frontend**: React (v18), TypeScript, Tailwind CSS
*   **Build Tool**: Vite
*   **AI/AR**: Google Gemini API (`gemini-3-flash-preview`), Native Camera API
*   **Icons**: Lucide React

## 📦 Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/pathsense-ar.git
    cd pathsense-ar
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up Environment Variables:
    *   Create a `.env` file in the root directory.
    *   Add your Google Gemini API Key:
        ```env
        API_KEY=your_google_api_key_here
        ```
    *   *Note: If no API key is provided, the app will run in "Mock Mode" for demonstration purposes.*

4.  Run the development server:
    ```bash
    npm run dev
    ```

5.  Open your browser (usually `http://localhost:5173`) to view the app.

## 📱 Usage

1.  **Landing Page**: Overview of the problem and solution.
2.  **Auth**: Click "Get Started" to sign up (simulated).
3.  **Dashboard**: View your schedule. Click "Start Navigation".
4.  **AR Demo**:
    *   Allow Camera permissions.
    *   Type "Lab 401" or speak the destination.
    *   The AI will "scan" the room and project a path.

## 📄 License

This project is a Final Year Project (FYP) prototype.

---
*Built with ❤️ for the IOBM Community*
