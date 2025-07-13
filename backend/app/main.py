from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import router
import auth_routes

app = FastAPI()

app.include_router(router)
app.include_router(auth_routes.router, prefix="/auth")  # note the prefix here

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev only, limit for prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
