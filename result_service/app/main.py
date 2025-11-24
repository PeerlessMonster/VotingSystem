from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from .api.get_vote import router

app = FastAPI()
# 挂载静态文件目录
# 在特定路径添加一个完全独立的应用，然后负责处理所有子路径
static_directory = Path(__file__).parent / "static"
app.mount(
    # 这个子应用会被挂载到 `/static` 指向的子路径
    # 任何以 `/static` 开头的路径都会被它处理
    path="/static",
    # 指向包含静态文件的目录名字，目录路径相对于当前 `main.py` 位置
    app=StaticFiles(directory=static_directory),
    # 静态文件的命名空间，提供了一个能被 FastAPI 内部使用的名字
    name="static"
)
app.include_router(router, prefix="/api")


@app.get(path="/", response_class=FileResponse)
def index() -> FileResponse:
    """返回静态页面
    """
    # FileResponse 自动处理 Content-Type 为 text/html
    return FileResponse(path=static_directory / "index.html")
