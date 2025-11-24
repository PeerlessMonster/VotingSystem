/**
 * 格式化日期字符串
 * @param {string} dateString - 后端返回的 UTC 日期字符串 (如 "2024-10-10T00:00:00.000000")
 * @returns {string} 格式化后当前时区的日期字符串 (如 "2024-10-10 00:00:00") 或 "暂无数据"
 */
export function formatUTCDate(dateString) {
    // 若输入为空或非字符串，直接返回"暂无数据"
    if (!dateString || typeof dateString !== 'string') {
        return "No data available";
    }

    // 通过在字符串末尾添加 'Z' 来明确指定其为 UTC 时间
    // （Date 构造函数会自动处理带 "T" 和毫秒的 UTC 字符串）
    const date = new Date(`${dateString}Z`);

    // 若解析失败（日期无效），返回"暂无数据"
    if (isNaN(date.getTime())) {
        throw new Error("解析日期失败，格式无效！");
    }

    // 提取当前时区的年、月、日、时、分、秒（注意：getMonth() 返回 0-11，需 +1）
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 补0成两位数
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // 拼接成 "YYYY-MM-DD HH:mm:ss" 格式
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}