import { formatUTCDate } from "./util/date-formatter.js";

// 初始化：获取页面元素（DOMContentLoaded 外提前定义，避免重复查找）
const elements = {
    totalVotes: document.getElementById('total-votes-count'),
    cats: {
        count: document.getElementById('cats-vote-count'),
        percentage: document.getElementById('cats-vote-percentage'),
        lastVote: document.getElementById('cats-last-vote-time')
    },
    dogs: {
        count: document.getElementById('dogs-vote-count'),
        percentage: document.getElementById('dogs-vote-percentage'),
        lastVote: document.getElementById('dogs-last-vote-time')
    }
};

// 数据处理函数：解析原始投票数据，计算统计值
const processVoteData = (rawData) => {
    // 初始化统计结果
    const result = {
        total: 0,
        cats: { votes: 0, lastVote: '' },
        dogs: { votes: 0, lastVote: '' }
    };

    // 遍历原始数据（后端返回投票选项列表）
    rawData.forEach(vote => {
        // 验证数据合法性（避免后端返回异常格式）
        if (
            typeof vote.name !== 'string' ||
            typeof vote.vote_number !== 'number' ||
            (typeof vote.last_vote !== 'string' && vote.last_vote !== null)
        ) {
            console.warn('无效的投票数据:', vote);
            throw new Error("投票数据格式无效！");
        }

        // 若暂无投票，直接返回
        if (vote.vote_number === 0) {
            return;
        }

        // 按名称分类累加票数、更新最后投票时间
        if (vote.name === 'cats') {
            result.cats.votes += vote.vote_number;
            result.cats.lastVote = vote.last_vote; // 覆盖为最新投票时间
        } else if (vote.name === 'dogs') {
            result.dogs.votes += vote.vote_number;
            result.dogs.lastVote = vote.last_vote;
        }
    });

    // 计算总票数和百分比
    result.total = result.cats.votes + result.dogs.votes;
    // 避免除以零
    result.cats.percentage = result.total > 0
        ? (result.cats.votes / result.total * 100).toFixed(1)
        : '0.0';
    result.dogs.percentage = result.total > 0
        ? (result.dogs.votes / result.total * 100).toFixed(1)
        : '0.0';

    return result;
};

// UI 更新函数：将处理后的数据渲染到页面
const updateVoteUI = (processedData) => {
    // 更新总票数
    if (elements.totalVotes) elements.totalVotes.textContent = processedData.total;

    // 更新猫咪数据
    if (elements.cats.count) elements.cats.count.textContent = processedData.cats.votes;
    if (elements.cats.percentage) elements.cats.percentage.textContent = `${processedData.cats.percentage}%`;
    if (elements.cats.lastVote) elements.cats.lastVote.textContent = formatUTCDate(processedData.cats.lastVote);

    // 更新狗狗数据
    if (elements.dogs.count) elements.dogs.count.textContent = processedData.dogs.votes;
    if (elements.dogs.percentage) elements.dogs.percentage.textContent = `${processedData.dogs.percentage}%`;
    if (elements.dogs.lastVote) elements.dogs.lastVote.textContent = formatUTCDate(processedData.dogs.lastVote);
};

// 核心函数：获取投票数据并触发更新
const fetchThenRenderVotes = async () => {
    try {
        // 发送 GET 请求
        const response = await fetch('/api/votes', {
            method: 'GET',
            headers: { 'Accept': 'application/json' } // 声明期望接收 JSON
        });

        // 检查响应状态（200-299 为成功）
        if (!response.ok) {
            throw new Error(`请求失败：${response.status} ${response.statusText}`);
        }

        // 解析 JSON 数据
        const rawVoteData = await response.json();

        // 处理数据并更新 UI
        const processedData = processVoteData(rawVoteData);
        updateVoteUI(processedData);

        console.log('投票结果获取成功：', processedData);

    } catch (error) {
        // 统一错误处理（网络错误、数据异常等）
        console.error('获取投票结果失败：', error);
        alert('Failed to load voting data! Please try again later.');
    }
};

// 页面加载完成后执行（确保元素已存在）
document.addEventListener('DOMContentLoaded', fetchThenRenderVotes);