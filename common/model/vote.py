from datetime import datetime
from typing import Optional

from sqlmodel import SQLModel, Field


# `table=True` 会告诉 SQLModel 这是一个表模型
# 应该表示 SQL 数据库中的一个表，而不仅仅是一个数据模型
class Vote(SQLModel, table=True):
    id: Optional[int] = Field(
        default=None,
        primary_key=True,
        nullable=False
    )
    name: str = Field(
        primary_key=True,
        max_length=50,
        nullable=False,
        unique=True,
        index=True
    )
    vote_number: int = Field(
        nullable=False,
        # 保证 vote_number >= 0
        ge=0
    )
    last_vote: Optional[datetime] = Field(
        default=None,
        nullable=True
    )
