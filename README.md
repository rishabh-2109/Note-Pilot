<b>Project Overview-</b>
<br/>
Live app deployed at: https://note-pilot.onrender.com/
<br/>
Note-Pilot is an AI-powered meeting notes summarizer designed to help professionals quickly extract key points from meetings. Users can upload transcripts or paste text, generate structured summaries, and optionally send them via email for easy sharing and collaboration.

<b>Features-</b>
<br/>
Upload .txt meeting transcripts or paste text manually.
Add optional instructions for customized summaries (e.g., bullet points, action items).
Generate AI-powered summaries instantly.
Email summaries directly from the app.
Responsive UI built with Tailwind CSS.
Works in both development and production environments.

<b>Tech Stack-</b>

Frontend: React (Vite), Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB
Deployment: Render.com
Libraries & Tools: Axios, dotenv, CORS, Nodemailer, multer

<b>Architecture & Flow-</b>
<b>Frontend-</b>
Handles file uploads or text input.
Sends transcript and optional instructions to backend APIs (/api/upload and /api/summary) using Axios.
Displays AI-generated summaries.
Email summaries through EmailForm component.

<b>Backend-</b>
Express.js handles API routes.
File uploads processed with multer.
AI summary generation handled in summaryRoutes.
MongoDB stores user data and transcripts.
Serves frontend build in production from /frontend/dist.

<b>Deployment-</b>
Backend and frontend deployed on Render.com.
Frontend built using Vite and served as static assets by Express.
API routes accessed via relative paths in production to avoid CORS issues.

<b>Usage-</b>
Upload a .txt transcript or paste the text.
Enter optional instructions for the summary.
Click Generate Summary.
View and optionally email the summary.
