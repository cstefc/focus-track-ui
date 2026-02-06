# Focus Track UI

![status](https://img.shields.io/badge/status-WIP-yellow)
![typescript](https://img.shields.io/badge/typescript-blue?logo=typescript&logoColor=white)
![react](https://img.shields.io/badge/react-blue?logo=react&logoColor=white)
![vite](https://img.shields.io/badge/vite-purple?logo=vite&logoColor=white)
![firebase](https://img.shields.io/badge/firebase-orange?logo=firebase&logoColor=white)
![mui](https://img.shields.io/badge/MUI‑Material‑UI-007FFF?logo=mui&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-enabled-brightgreen)
![dark mode](https://img.shields.io/badge/dark%20mode-✓-000000?style=flat&logoColor=white)
![vitest](https://img.shields.io/badge/tests‑with‑Vitest-lightgrey?logo=vitest&logoColor=black)

Focus Track is a React application for tracking personal projects and tasks, including a dedicated sport tracking feature. It uses TypeScript and Material UI to provide a modular, feature-driven frontend. The backend API supporting this application can be found on my GitHub [here](https://github.com/cstefc/focus-track-api) and is updated as new features are added to the frontend.

---

## Tech Stack

- **Frontend:** React, TypeScript  
- **UI / Styling:** Material UI  
- **Bundler / Build Tool:** Vite  
- **Routing:** React Router DOM  
- **Authentication:** Firebase Authentication (supports OAuth providers like Google)  
- **i18n / Localization:** react-i18next  
- **Testing:** Vitest  
- **Backend:** [Custom API](https://github.com/cstefc/focus-track-api)
- **Environment & Deployment:** `.env` configuration, branch protection, and status rules  

---

## Features

- **Authentication & Authorization:** Users sign in via Firebase Authentication. Frontend sends Firebase ID tokens in API requests for secure access control.  
- **Project Management:** Create, update, and manage projects.  
- **Goals & Steps:** Define detailed plans with nested steps inside projects.  
- **Routing:** Seamless navigation with top navigation bar and restricted page access.  
- **Environment Variables:** Sensitive information, such as API keys, is managed securely using `.env` files.  

---

## Roadmap

The project follows a **feature-driven development approach**, starting from the frontend and integrating with the backend. Planned features include:  

- **Events:** Add and manage events related to goals and projects for better planning and improved UX.  
- **Logging Feature:** Track progress and updates within projects.  
- **Dashboard:** Visualize statistics and progress across projects.  
- **Backend Integration:** Connect frontend features to the custom backend API for data persistence.

---

## Getting Started

### Prerequisites

1. Create a Firebase project and enable Authentication:  
   - Firebase Console: [https://console.firebase.google.com/](https://console.firebase.google.com/)  
   - Firebase Web App Config: [https://firebase.google.com/docs/web/setup#config-object](https://firebase.google.com/docs/web/setup#config-object)  
   - Firebase Auth Guide: [https://firebase.google.com/docs/auth/web/start](https://firebase.google.com/docs/auth/web/start)

2. Create a `.env` file with the following variables:

```
VITE_FIREBASE_API_KEY="your_api_key_here"
VITE_FIREBASE_AUTH_DOMAIN="your_project.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your_project_id"
VITE_FIREBASE_STORAGE_BUCKET="your_bucket.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
VITE_FIREBASE_APP_ID="your_app_id"
VITE_API_URL="your_api_url"
VITE_DEV="true_or_false"
```

> ⚠️ Do not commit your `.env` file to GitHub.

---

### Installation & Running

```
git clone https://github.com/cstefc/focus-track-ui.git
cd focus-track-ui
npm install
npm run dev
```

Open the application in your browser at [http://localhost:5173](http://localhost:5173).

---

### Authentication & Workflow

1. Sign in via Firebase Authentication (supports OAuth providers like Google).  
2. Access restricted pages (e.g., Projects) after login.  
3. Interact with the UI to create projects, add goals, and track progress.  
4. Logging out will return the user to public pages.

---

### Navigation

- Use the top navigation bar to switch between available pages.  
- Routing is handled via React Router DOM for smooth transitions and page protection.
