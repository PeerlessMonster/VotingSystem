from fastapi import APIRouter

from common.model.vote import Vote
from common.repository import select_vote_repo as repo

router = APIRouter(prefix="/votes", tags=["get"])


@router.get(path="/", response_model=list[Vote])
def get_all_votes() -> list[Vote]:
    """获取所有投票选项的当前结果，包括投票选项名称、票数、最后投票时间等
    """
    return repo.select_all_votes()
