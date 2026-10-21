
from threading import Lock

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="Parking Reservation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

spots = [
    {"id": i, "name": f"P-{i:02}", "reserved": False,
     "customer": None, "plate": None}
    for i in range(1, 13)
]

reservations_lock = Lock()


class ReservationRequest(BaseModel):
    customer: str = Field(min_length=2, max_length=80)
    plate: str = Field(min_length=2, max_length=20)


@app.get("/")
def home():
    return {"message": "Parking Reservation API is running"}


@app.get("/spots")
def get_spots():
    with reservations_lock:
        return [spot.copy() for spot in spots]


@app.post("/reservations/{spot_id}")
def reserve_spot(spot_id: int, request: ReservationRequest):
    with reservations_lock:
        spot = next(
            (s for s in spots if s["id"] == spot_id), None
        )

        if spot is None:
            raise HTTPException(404, "Parking spot not found")

        if spot["reserved"]:
            raise HTTPException(409, "This spot is already reserved")

        spot["reserved"] = True
        spot["customer"] = request.customer.strip()
        spot["plate"] = request.plate.strip().upper()

        return {
            "message": f"{spot['name']} reserved successfully",
            "spot": spot.copy(),
        }
