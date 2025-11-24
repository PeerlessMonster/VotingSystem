from typing import List

from sqlmodel import select

from ..model.vote import Vote
from ..util.db import get_session


def select_all_votes() -> List[Vote]:
    """查询所有投票选项的当前数据

    :param session: 数据库会话
    :return: 包含所有Vote对象的列表，按选项名称排序
    """
    with get_session() as session:
        statement = select(Vote).order_by(Vote.name)
        votes = session.exec(statement).all()
        return votes


def select_vote_by_name(option_name: str) -> Vote:
    """根据选项名称查询单个投票数据

    :param session: 数据库会话
    :param option_name: 投票选项名称
    :return: 对应的Vote对象，若不存在则返回None
    """
    with get_session() as session:
        statement = select(Vote).where(Vote.name == option_name)
        vote = session.exec(statement).one_or_none()

        if not vote:
            raise ValueError("投票选项名称不存在！")
        return vote
