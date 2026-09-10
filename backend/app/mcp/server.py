from mcp.server.mcpserver import MCPServer

from app.core.config import get_settings
from app.core.map_provider import get_map_provider

mcp = MCPServer("backend-mcp")


@mcp.tool()
async def search_places(query: str) -> list[dict]:
    """Search places/addresses via the active map provider."""
    settings = get_settings()
    provider = get_map_provider(settings)
    return await provider.search_places(query)
