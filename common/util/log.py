import logging
import sys
from logging import StreamHandler

# 日志格式，包含时间、级别、模块、消息
_LOG_FORMAT = "%(asctime)s - %(levelname)s - %(module)s - %(message)s"
# 日志时间格式
_DATE_FORMAT = "%Y-%m-%d %H:%M:%S"


def get_logger(name: str = __name__, level: int = logging.INFO) -> logging.Logger:
    """获取配置好的 logger 实例

    :param name: logger 名称（默认使用当前模块名）
    :param level: 日志级别

    :return: 一个 logger 实例
    """
    logger = logging.getLogger(name)

    # 避免重复添加 handler 导致日志重复输出
    if not logger.handlers:
        # 创建 StreamHandler，输出到stdout
        stream_handler = StreamHandler(sys.stdout)
        # 设置handler的日志格式
        formatter = logging.Formatter(_LOG_FORMAT, _DATE_FORMAT)
        stream_handler.setFormatter(formatter)
        # 为logger添加handler
        logger.addHandler(stream_handler)

        # 设置日志级别
        logger.setLevel(level)
    # 禁止 logger 向上传播，避免与 root logger 重复输出
    logger.propagate = False

    return logger
