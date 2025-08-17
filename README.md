<b>Project Overview-</b>
<br/>
Note-Pilot is an AI-powered meeting notes summarizer designed to help professionals quickly extract key points from meetings. Users can upload transcripts or paste text, generate structured summaries, and optionally send them via email for easy sharing and collaboration.
<br/>
<br/>
Live app deployed at: https://note-pilot.onrender.com/
<br/>

<b>Features-</b>
<br/>
Upload .txt meeting transcripts or paste text manually.<br/>
Add optional instructions for customized summaries (e.g., bullet points, action items).<br/>
Generate AI-powered summaries instantly.<br/>
Email summaries directly from the app.<br/>
Responsive UI built with Tailwind CSS.<br/>
Works in both development and production environments.<br/>

<b>Tech Stack-</b>

Frontend: React (Vite), Tailwind CSS<br/>
Backend: Node.js, Express.js<br/>
Database: MongoDB<br/>
Deployment: Render.com<br/>
Libraries & Tools: Axios, dotenv, CORS, Nodemailer, multer<br/>

<b>Architecture & Flow-</b><br/>
<b>Frontend-</b><br/>
Handles file uploads or text input.<br/>
Sends transcript and optional instructions to backend APIs (/api/upload and /api/summary) using Axios.<br/>
Displays AI-generated summaries.<br/>
Email summaries through EmailForm component.<br/>

<b>Backend-</b><br/>
Express.js handles API routes.<br/>
File uploads processed with multer.<br/>
AI summary generation handled in summaryRoutes.<br/>
MongoDB stores user data and transcripts.<br/>
Serves frontend build in production from /frontend/dist.<br/>

<b>Deployment-</b><br/>
Backend and frontend deployed on Render.com.<br/>
Frontend built using Vite and served as static assets by Express.<br/>
API routes accessed via relative paths in production to avoid CORS issues.<br/>

<b>Usage-</b><br/>
Upload a .txt transcript or paste the text.<br/>
Enter optional instructions for the summary.<br/>
Click Generate Summary.<br/>
View and optionally email the summary.<br/>
