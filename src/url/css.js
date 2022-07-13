const css = `html,
body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
#iframe {
    width: 100vw;
    height: 100vh;
    border: none;
    display: none;
}
#clear {
    transition: all 0.5s;
    opacity: 0.65;
    position: fixed;
    bottom: 0px;
    left: calc(50% + 260px);
    font-size: 12px;
    color: #989a9c;
    padding: 0 14px;
    transform: translateX(-50%);
    height: 40px;
    line-height: 40px;
    border-radius: 6px 6px 0 0;
    backdrop-filter: blur(12px);
    background-color: rgba(35, 37, 39, 0.85);
    cursor: pointer;
    display: none;
}
#clear:hover {
    opacity: 1;
}
`
    .replace(/\n/g, '')
    .replace(/\s+/g, ' ');

export default URL.createObjectURL(new Blob([css], { type: 'text/css' }));
