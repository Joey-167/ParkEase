\# ParkEase — Parking Reservation System



ParkEase is a web-based parking reservation application designed to let users view parking spaces and reserve an available spot. The project is being developed with a React frontend and a FastAPI backend.



\## Features



\- View available parking spaces.

\- Reserve a parking spot using customer details and vehicle registration.

\- View reservation status.

\- REST API built with FastAPI.

\- Responsive web interface built with React and Vite.



\## Tech Stack



\*\*Frontend\*\*

\- React

\- Vite

\- JavaScript

\- CSS



\*\*Backend\*\*

\- Python

\- FastAPI

\- Pydantic

\- Uvicorn



\*\*Database\*\*

\- MySQL integration is planned for a future development stage.



\## Project Structure



```text

parking-car/

├── backend/

│   ├── main.py

│   └── requirements.txt

├── frontend/

│   ├── src/

│   ├── public/

│   ├── package.json

│   └── index.html

├── .gitignore

└── README.md

```



\*Note: The structure above shows the main project files; your actual folders may contain additional files.\*



\## Getting Started



\### Prerequisites



Install the following before running the project:



\- Python 3.10 or later

\- Node.js and npm

\- Git



\### 1. Clone the repository



```bash

git clone YOUR\_GITHUB\_REPOSITORY\_URL

cd parking-car

```



Replace `YOUR\_GITHUB\_REPOSITORY\_URL` with your GitHub repository's HTTPS URL.



\### 2. Start the backend



Open a terminal in the project root:



```powershell

cd backend

python -m venv .venv

```



Activate the virtual environment on Windows PowerShell:



```powershell

.\\.venv\\Scripts\\Activate.ps1

```



Install the Python dependencies:



```powershell

python -m pip install -r requirements.txt

```



Start the API:



```powershell

uvicorn main:app --reload

```



The backend API should be available at:



\- API: http://127.0.0.1:8000

\- Interactive API documentation: http://127.0.0.1:8000/docs



\### 3. Start the frontend



Open a second terminal in the project root:



```powershell

cd frontend

npm install

npm run dev

```



Open the local frontend URL printed by Vite, usually:



http://localhost:5173



Keep both terminals running while using the application.



\## API Endpoints



| Method | Endpoint | Description |

|---|---|---|

| GET | `/` | Check whether the API is running |

| GET | `/spots` | Retrieve parking spot information |

| POST | `/reservations/{spot\_id}` | Reserve a parking spot |



\## Current Limitations



\- Reservation data is currently stored in backend memory and is lost when the backend restarts.

\- MySQL database persistence is planned for a future iteration.

\- The application is a development project and has not yet been configured for production deployment.



\## Roadmap



\- \[ ] Integrate MySQL for persistent storage.

\- \[ ] Add reservation cancellation.

\- \[ ] Improve input validation and error handling.

\- \[ ] Add user authentication.

\- \[ ] Deploy the application.



\## Contributing



This project is under active development. Suggestions and contributions are welcome.



\## License



No license has been added yet. All rights are reserved by the copyright holder unless a license is added to this repository.



