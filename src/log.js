function getLogDate() {
    try {
        const date = localStorage.getItem('sketchMeasureUv');
        const time = new Date();
        const y = time.getFullYear();
        const m = time.getMonth() + 1;
        const d = time.getDate();
        if (`${y}-${m}-${d}` === date) {
            return false;
        }
        localStorage.setItem('sketchMeasureUv', `${y}-${m}-${d}`);
        return true;
    } catch (error) {

    }
}

export default () => {
    if (getLogDate()) {
        const uvLog = new Image();
        uvLog.src = 'https://sp1.baidu.com/5b1ZeDe5KgQFm2e88IuM_a/mwb2.gif?pid=1_3&lid=&ts=1682429332295&group=js&type=except&card=sketchMeasureUv&dim=%7B%22card%22%3A%22sketchMeasureUv%22%2C%22env%22%3A%22pc%22%2C%22type%22%3A%22work%22%7D&env=sf&info=%7B%22msg%22%3A%22sketchMeasureUv%22%7D';
    }

    const pvLog = new Image();
    pvLog.src = 'https://sp1.baidu.com/5b1ZeDe5KgQFm2e88IuM_a/mwb2.gif?pid=1_3&lid=&ts=1682429332295&group=js&type=except&card=sketchMeasurePv&dim=%7B%22card%22%3A%22sketchMeasurePv%22%2C%22env%22%3A%22pc%22%2C%22type%22%3A%22work%22%7D&env=sf&info=%7B%22msg%22%3A%22sketchMeasurePv%22%7D';
}