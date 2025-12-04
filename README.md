# 🤖 Sigma-AI   
A powerful, multimodal AI chat application built with modern web technologies, enabling **real-time conversations** and **image-based analysis**.

---

## ✨ Key Features

### 💬 Core Chat Functionality
- **Real-time Interaction**: Fast and responsive conversations powered by the **Gemini API**.
- **Contextual History**: Maintains full dialogue context for smooth, continuous interactions.
- **Formatted Timestamps**: Automatically formats timestamps to `YYYY-MM-DD HH:MM AM/PM`.
- **Loading State**: Displays a clear loader while AI processes the request.

---

### 🖼️ Multimodal Capabilities (Image Upload)
- **Image Analysis**: Supports uploading `.jpg`, `.jpeg`, `.png`, and processes them with text prompts.
- **Live Preview**: Shows a removable preview of the selected image before sending.
- **Base64 Conversion**: Securely converts images to Base64 client-side before sending to the backend for multimodal processing.

---

### 🎨 Modern UI/UX
- **Dark Mode Focused**: Clean, high-contrast interface designed for comfortable viewing.
- **Fully Responsive**: Works flawlessly across mobile, tablets, and desktop screens.
- **Smooth Transitions**: Powered by **Framer Motion** for sleek message animations.

---

## ⚙️ Technology Stack

| Category      | Technology        | Purpose |
|---------------|-------------------|---------|
| Framework     | **Next.js** | Server-side rendering + API routes |
| Language      | **TypeScript**    | Type safety & improved maintainability |
| Styling       | **Tailwind CSS**  | Utility-first responsive UI |
| State/UI      | **React Hooks**   | State and component management |
| Animation     | **Framer Motion** | Smooth message entry animations |
| API Client    | **Axios**         | For calling `/api/chat` backend route |

---
