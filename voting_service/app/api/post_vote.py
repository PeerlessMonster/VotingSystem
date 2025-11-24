from fastapi import APIRouter, HTTPException

from common.model.vote import Vote
from common.repository import update_vote_repo as repo
from common.util.log import get_logger

_logger = get_logger()

router = APIRouter(prefix="/votes", tags=["post"])


@router.post(path="/{option_name}", response_model=Vote)
def post_vote(option_name: str) -> Vote:
    """处理投票请求，更新指定选项的票数和最后投票时间
    """
    try:
        updated_vote = repo.update_vote_number(option_name)
    except ValueError as error:
        _logger.warning(error)
        raise HTTPException(status_code=404, detail=error)
    _logger.info(f"Successfully voted for {option_name}! Current number of votes: {updated_vote.vote_number}")

    return updated_vote
