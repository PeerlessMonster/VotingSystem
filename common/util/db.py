import os
from contextlib import contextmanager
from pathlib import Path
from typing import Generator

from dotenv import load_dotenv
from sqlmodel import Session, create_engine

# 加载环境变量
# 优先从 `.env` 文件读取，无则使用系统环境变量
dotenv_path = Path(__file__).parent.parent.parent / ".env"
load_dotenv(dotenv_path)


def _get_database_url() -> str:
    host = os.getenv("POSTGRES_HOST", "localhost")
    port = os.getenv("POSTGRES_PORT", "5432")
    username = os.getenv("POSTGRES_USER", "postgres")
    password = os.getenv("POSTGRES_PASSWORD", "")
    db = os.getenv("POSTGRES_DB", "voting")

    if not all([username, password, host, port, db]):
        print(username, password, host, port, db)
        raise ValueError("数据库连接参数不完整，请检查环境变量配置")

    return f"postgresql://{username}:{password}@{host}:{port}/{db}"


# 创建数据库引擎
# 全局唯一并共享，复用连接池，线程安全
_engine = create_engine(_get_database_url())


@contextmanager
def get_session() -> Generator[Session, None, None]:
    """生成数据库会话

    每个请求对应一个独立会话，请求结束自动关闭，避免会话共享导致的问题

    使用方法 e.g.

    ```Python
    with get_session() as session:
        session.execute(...)
    ```

    :return: 数据库会话的生成器
    """
    with Session(_engine) as session:
        yield session
