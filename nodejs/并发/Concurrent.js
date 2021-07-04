/*
 * @Description: 并发-处理并发
 * @Author: jkwu
 * @Date: 2020-08-20 21:49:41
 * @LastEditors: jkwu
 * @LastEditTime: 2020-08-20 22:47:39
 */

const request = (promiseList, limit = 5) => {
	return new Promise((resolve, reject) => {
		let count = 0;
		let result = [];
		const len = promiseList.length;
		const start = async (limit) => {
			const currentPromise = promiseList.shift();
			if (currentPromise) {
				const hhhh = await currentPromise;
				console.log(limit, count, hhhh);
				result.push(hhhh);
				if (count === len - 1) {
					resolve({ count, result });
				} else {
					count++;
					start(limit);
				}
			}
		};

		while (limit > 0) {
			start(limit);
			limit--;
		}
	});
};

const promiseList = new Array(5000).fill(1).map((item, index) => {
	return new Promise((resolve, jecect) => {
		setTimeout(() => resolve(`${index}-${item}`), Math.random() * 1000);
	});
});

request(promiseList)
	.then((res) => {
		console.log(res);
	})
	.catch((error) => console.log(error));
