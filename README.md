
# ResignAjaDulu

ResignAjaDulu is an AI-powered web application designed to help young professionals make objective, data-driven career transition decisions and mitigate impulsive resignations.

By analyzing user savings, attrition prediction models, and real-time market demand data, the app delivers a Resignation Readiness Score (0-100) along with personalized upskilling recommendations.




## Special Thanks To
<img width="947" height="263" alt="codingcampDBS" src="https://github.com/user-attachments/assets/3bba7925-3c46-4ff4-b7be-23f660357436" />
<img width="500" height="177" alt="dicoding" src="https://github.com/user-attachments/assets/73d7abcd-d9bf-470a-8fca-e3f9265dc10a" />
<img width="474" height="77" alt="DBS" src="https://github.com/user-attachments/assets/71d01f16-c95f-4c68-a7ec-e47b55e5ba72" />




## Features

- **Secure User Authentication:** Protected user accounts with secure signup, login, and session management (powered by JWT).
- **Resignation Readiness Score (0-100):** A comprehensive dashboard that visualizes your overall career transition readiness based on objective parameters.
- **Financial Runway Calculator:** Estimates how many months your current savings will last based on your spending habits.
- **AI Attrition Predictor:** Uses predictive modeling to evaluate career risks and separate emotional impulses from logical career moves.
- **Smart Upskilling Roadmap:** Generates personalized recommendations for skills and competencies you need to improve before hitting the resign button.


## Tech Stack

### 🎨 Frontend
*   **Core:** React 19 (Vite) & React Router Dom v7
*   **Styling & UI:** Tailwind CSS v4 & React Icons
*   **Animation:** Framer Motion (untuk transisi dashboard yang interaktif)
*   **State & Form:** React Hook Form & Axios (API Fetching)

### ⚙️ Backend (REST API & WebSockets)
*   **Runtime/Framework:** Node.js, Express.js (v5)
*   **Database Integration:** PostgreSQL (via `pg` & `node-pg-migrate`)
*   **AI SDK:** `@google/genai` (Google Gemini integration)
*   **Media Storage:** Cloudinary (untuk manajemen aset/upload file)
*   **Real-time:** Socket.io

### 🧠 AI Service
*   **Framework:** FastAPI (Python) & Uvicorn
*   **Machine Learning:** Scikit-Learn, Joblib, Numpy
*   **Edge Runtime:** ai-edge-litert (TensorFlow Lite Runtime)


## Installation

Follow these steps to set up the **ResignAjaDulu** project on your local machine.

### Prerequisites
* **Git:** To clone the repository.
* **Python:** Ensure you are using Python between version `3.10` and `3.13`.

### Cloning & Initial Setup
Clone this repository
```bash
git clone https://github.com/oMrPuPa/capstoneProject.git
```

### Environment Variables
To run this project, you will need to add the following environment variables to your .env file

`HOST`  The host address where your backend server runs (e.g., localhost).

`PORT`  The port number for your Express backend server to listen on.

`NODE_ENV`  The environment mode for the application (e.g., **development or production**).

`JWT_SECRET`  A secret key used for signing and verifying JSON Web Tokens (JWT) during authentication.

`PGUSER`  Your local PostgreSQL database username.

`PGHOST`  The host address of your PostgreSQL database (e.g., localhost).

`PGPASSWORD`  The password for your PostgreSQL database user.

`PGDATABASE`  The name of the database created for this project.

`PGPORT`  The port number where your PostgreSQL instance is running (usually 5432).

`AI_SERVICE_URL`  The local URL where your Python FastAPI service endpoint is exposed.

`GEMINI_API_KEY`  You can create API KEY free in https://aistudio.google.com.

### Initial Setup

Install Frontend dependencies
```bash
cd frontend
npm install
```
Run Frontend
```bash
npm run dev
```

Install Backend dependencies
```bash
cd ../backend
npm install
```  

Run migrations to automatically create tables in PostgreSQL (In Backend folder)
```bash
npm run migrate up
``` 

Run backend server
```bash
npm run dev
``` 

Move to ai-service folder
```bash
cd ../ai-service
``` 

Creating Virtual Environment
```bash
python -m venv venv

``` 
Activate Virtual Environment
```bash
.\venv\Scripts\activate
``` 

Install ai-service dependencies
```bash
pip install fastapi uvicorn tensorflow joblib scikit-learn pydantic
``` 

Run ai-service
```bash
uvicorn app:app --host 127.0.0.1 --port 8000 --reload
``` 



## 👥 Our Team

- [@Arya Ivan Ghally](https://github.com/Amosszzn) - *Data Scientist*
- [@Ananda Nashril](https://github.com/FikriNash12) - *Data Scientist*
- [@Devi Oktaviani](https://github.com/deviktvn) - *AI Engineer*
- [@Feri Adiansah](https://github.com/feriadiansah) - *AI Engineer*
- [@Egi Prayogi](https://github.com/Knightmare001) - *Full-Stack Web Developer*
- [@M. Rafi Putra Pati](https://github.com/oMrPuPa) - *Full-Stack Web Developer*

