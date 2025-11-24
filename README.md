# 投票系统 Voting System

一个十分简单的投票系统，支持用户为“猫”或“狗”投票，并实时展示投票结果。

## 功能简介

### 投票

- 用户可通过投票页面点击“🐱 CATS 🐱”或“🐶 DOGS 🐶”按钮提交投票
- 投票请求通过 `POST /api/votes/{option_name}` 接口提交
- 后端接收请求后，原子性更新对应选项的票数和最后投票时间

### 结果展示

- 结果页面展示总票数、各选项的票数、百分比及最后投票时间
- 页面加载时通过 `GET /api/votes` 接口获取最新投票数据
- 投票时间自动从 UTC 时间转换为本地时区时间

## 项目结构

该系统包含两个核心服务：

- **投票服务 (voting_service)**：提供投票界面和投票提交接口，用户可选择为"猫"或"狗"投票
- **结果服务 (result_service)**：展示实时投票结果，包括总票数、各选项票数、百分比及最后投票时间

```
VotingSystem/
├── common/                                 # 共享模块
│   ├── model/                              # 数据模型
│   │   └── vote.py                         # 投票选项模型定义
│   ├── repository/                         # 数据库操作层
│   │   ├── select_vote_repo.py             # 查询投票数据
│   │   └── update_vote_repo.py             # 更新投票数据
│   └── util/                               # 工具函数
│       ├── db.py                           # 数据库连接配置
│       └── log.py                          # 日志配置
├── voting_service/                         # 投票服务
│   ├── app/
│   │   ├── api/                            # 请求处理响应层
│   │   │   └── post_vote.py                # 投票提交接口
│   │   ├── static/                         # 静态资源
│   │   │   ├── css/
│   │   │   │   └── styles.css              # 投票页面样式
│   │   │   ├── js/
│   │   │   │   └── voting-handler.js       # 投票交互逻辑
│   │   │   └── index.html                  # 投票页面
│   │   └── main.py                         # 投票服务入口
├── result_service/                         # 结果展示服务
│   ├── app/
│   │   ├── api/                            # 请求处理响应层
│   │   │   └── get_vote.py                 # 获取投票结果接口
│   │   ├── static/                         # 静态资源
│   │   │   ├── css/
│   │   │   │   └── styles.css              # 结果页面样式
│   │   │   ├── js/
│   │   │   │   ├── util/
│   │   │   │   │   └── date-formatter.js   # 日期格式化工具
│   │   │   │   └── vote-render.js          # 结果渲染逻辑
│   │   │   └── index.html                  # 结果展示页面
│   │   └── main.py                         # 结果服务入口
├── .env                                    # 环境变量配置
└── .gitignore                              # Git 忽略文件配置
```

## 运行步骤

### 开发配置

#### 1. 安装依赖

- 直接使用 `pip`

```bash
# 在一个名为 `.venv` 的目录创建一个虚拟环境
python -m venv .venv
# 激活虚拟环境
source .venv/Scripts/activate
# 升级 `pip` 到最新版本
# 在安装包时出现的许多奇怪的错误都可以解决
python -m pip install --upgrade pip
# 从 `requirements.txt` 安装软件包
pip install -r requirements.txt
```

- 安装了 `conda`

```bash
# 根据 `environment.yml` 中的配置创建虚拟环境
conda env create -f environment.yml
# 激活虚拟环境
conda activate VotingSystem
```

#### 2. 设置数据库

先将项目根目录的 `.env.example` 重命名为 `.env`，按需修改内容

```bash
# 根据 `docker-compose.dev.yml` 中的配置在后台启动容器
docker compose -f ./docker-compose.dev.yml up -d
```

#### 3. 启动服务

```bash
# 确保位于是项目根目录下，从而加入 Python 模块搜索路径，否则找不到 common 模块
cd ${PROJECT_LOCATION}/VotingSystem
# 启动投票服务，指定 app 入口
fastapi dev --entrypoint voting_service.app.main:app --port 6110
# 启动结果展示服务
fastapi dev --entrypoint result_service.app.main:app --port 6111

# 若传入 app 入口路径，FastAPI 自动把该目录加入 Python 模块搜索路径，导致找不到 common 模块
# fastapi dev ./voting_service/app --port 6110
```

#### 4. API 文档

- 投票服务（voting_service）：http://localhost:6110/docs
- 结果服务（result_service）：http://localhost:6111/docs

## 技术栈

- **后端**：Python 3.8+, [FastAPI](https://fastapi.tiangolo.com), [SQLModel](https://sqlmodel.tiangolo.com/) (ORM)
- **前端**：HTML5, CSS3, 原生 JavaScript
- **数据库**：PostgreSQL
