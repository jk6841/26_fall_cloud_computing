from fastapi import APIRouter, Depends

from app.core.config import Settings, get_settings
from app.core.map_provider import get_map_provider

router = APIRouter(prefix="/api/map", tags=["map"])


@router.get("/config")
def get_map_config(settings: Settings = Depends(get_settings)) -> dict:
    """Public config the frontend needs to initialize the map SDK.

    Only ever returns the client-safe key for the active provider, never the
    server-side secrets (e.g. Kakao REST key, Naver client secret).
    """
    provider = settings.map_provider
    js_keys = {
        "kakao": settings.kakao_map_js_key,
        "naver": settings.naver_map_client_id,
        "google": settings.google_maps_api_key,
    }
    return {"provider": provider, "client_key": js_keys.get(provider, "")}


@router.get("/search")
async def search_places(query: str, settings: Settings = Depends(get_settings)) -> list[dict]:
    provider = get_map_provider(settings)
    return await provider.search_places(query)
