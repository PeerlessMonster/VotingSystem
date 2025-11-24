// 等待整个HTML文档加载完成后再执行脚本
document.addEventListener('DOMContentLoaded', function () {
    // 获取投票按钮元素
    const catButton = document.getElementById('cats');
    const dogButton = document.getElementById('dogs');

    // 定义一个通用的投票函数，接收一个参数：动物类型('cats' 或 'dogs')
    function handleVote(animalType) {
        // 构造请求的URL
        const url = `/api/votes/${animalType}`;

        // 使用fetch API发送POST请求
        fetch(url, {
            method: 'POST',
            // 对于简单的POST请求，Content-Type通常设置为application/x-www-form-urlencoded
            // 或者如果后端接受JSON，可以设置为application/json
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(response => {
                // 检查响应状态是否成功 (状态码在 200-299 之间)
                if (!response.ok) {
                    // 如果响应失败，抛出一个错误，错误信息包含状态码
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // 将响应体解析为JSON格式
                return response.json();
            })
            .then(data => {
                // 3. 请求成功后的处理
                // 这里的data是后端返回的JSON数据
                console.log('投票成功：', data);
                // 使用alert向用户展示成功信息
                alert(`Vote successful.`);

            })
            .catch(error => {
                // 4. 请求失败或网络错误的处理
                console.error('投票失败：', error);
                // 使用alert向用户展示错误信息
                alert('Vote failed! Please try again later.');
            });
    }

    // 为两个按钮分别添加点击事件监听器
    if (catButton) {
        catButton.addEventListener('click', function () {
            handleVote('cats');
        });
    }
    if (dogButton) {
        dogButton.addEventListener('click', function () {
            handleVote('dogs');
        });
    }
});