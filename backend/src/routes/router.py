from fastapi import APIRouter
from routes.lenet import router as lenet_router
from routes.linear import router as linear_router

router = APIRouter(prefix="/api/rest")

router.include_router(linear_router)
router.include_router(lenet_router)
