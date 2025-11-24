from datetime import datetime, timezone

from .select_vote_repo import select_vote_by_name
from ..model.vote import Vote
from ..util.db import get_session


def update_vote_number(option_name: str) -> Vote:
    """更新指定投票选项的票数和最后投票时间

    :param session: 数据库会话
    :param option_name: 投票选项名称，如 `cats`、`dogs`
    :return: 更新后的 Vote 对象
    """
    vote = select_vote_by_name(option_name)
    if not vote:
        raise ValueError("投票选项名称不存在！")

    with get_session() as session:
        # 原子更新票数，避免并发问题
        vote.vote_number += 1
        vote.last_vote = datetime.now(timezone.utc)
        session.add(vote)
        session.commit()

        # 立即刷新会话，获取更新后的数据
        session.refresh(vote)
        return vote
