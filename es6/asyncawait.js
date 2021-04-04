/**
 * Created by jkwu on 2019-09-27.
 */
// const readFile = function (fileName) {
//     return new Promise(function (resolve, reject) {
//         setTimeout(() => { resolve('data:result', fileName)}, 5000);
//     });
// };
//
// const gen = function *() {
//     const f1 = yield readFile('/etc/fstab-gen');
//     const f2 = yield readFile('/etc/shells-gen');
//     console.log(f1.toString());
//     console.log(f2.toString());
// };
//
// console.log(gen().next());
// console.log(gen().next());
//
//
// const asyncReadFile = async function () {
//     const f1 = await readFile('/etc/fstab');
//     const f2 = await readFile('/etc/shells');
//     console.log(f1.toString(), new Date().getTime());
//     console.log(f2.toString(), new Date().getTime());
// };

// asyncReadFile();


// async function getTitle(url) {
//     let response = await fetch(url);
//     let html = await response.text();
//     return html.match(/<title>([\s\S]+)<\/title>/i)[1];
// }
// getTitle('https://tc39.github.io/ecma262/').then(console.log)

//
// function sleep(interval) {
//     return new Promise(resolve => {
//         setTimeout(resolve, interval);
//     })
// }
//
// // 用法
// async function one2FiveInAsync() {
//     for(let i = 1; i <= 5; i++) {
//         console.log(i);
//         await sleep(1000);
//     }
// }
//
// one2FiveInAsync();

/**
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */
function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 200), n);
    });
}
//
// function step1(n) {
//     console.log(`step1 with ${n}`);
//     return takeLongTime(n);
// }
//
// function step2(n) {
//     console.log(`step2 with ${n}`);
//     return takeLongTime(n);
// }
//
// function step3(n) {
//     console.log(`step3 with ${n}`);
//     return takeLongTime(n);
// }

function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}

function step2(m, n) {
    console.log(`step2 with ${m} and ${n}`);
    return takeLongTime(m + n);
}

function step3(k, m, n) {
    console.log(`step3 with ${k}, ${m} and ${n}`);
    return takeLongTime(k + m + n);
}

// function doIt() {
//     console.time("doIt");
//     const time1 = 300;
//     step1(time1)
//         .then(time2 => step2(time2))
//         .then(time3 => step3(time3))
//         .then(result => {
//             console.log(`result is ${result}`);
//             console.timeEnd("doIt");
//         });
// }
//
// doIt();

// async function doIt() {
//     console.time("doIt");
//     const time1 = 300;
//     const time2 = await step1(time1);
//     const time3 = await step2(time2);
//     const result = await step3(time3);
//     console.log(`result is ${result}`);
//     console.timeEnd("doIt");
// }
//
// doIt();

// async function doIt() {
//     console.time("doIt");
//     const time1 = 300;
//     const time2 = await step1(time1);
//     const time3 = await step2(time1, time2);
//     const result = await step3(time1, time2, time3);
//     console.log(`result is ${result}`);
//     console.timeEnd("doIt");
// }
//
// doIt();

function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => {
            return step2(time1, time2)
                .then(time3 => [time1, time2, time3]);
        })
        .then(times => {
            const [time1, time2, time3] = times;
            return step3(time1, time2, time3);
        })
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}

doIt();
