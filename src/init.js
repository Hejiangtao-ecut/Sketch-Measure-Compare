let isInit = false;

export default (config) => {
    if (isInit) {
        return;
    }
    isInit = true;
    const zIndex = config?.zIndex ?? 10000;
    const enableDomRulers = config?.enableDomRulers ?? false;
    const enableTextReplace = config?.enableTextReplace ?? false;
    const offsetY = config?.offsetY ?? 0;
    const offsetX = config?.offsetX ?? 0;
    const width = config?.width ?? 0;
    const enableBlockClose = config?.enableBlockClose ?? true;
    const finalConfig = {
        zIndex,
        enableDomRulers,
        enableTextReplace,
        offsetX,
        offsetY,
        width,
        enableBlockClose,
    };
    const configHandler = {
        get(target, property) {
            return target[property];
        },
        set(target, property, value) {
            target[property] = value;
            if (property === 'zIndex') {
                setStyle(iframe, {
                    zIndex: `${value}`,
                });
                setStyle(toggleBtnWrapper, {
                    zIndex: `${value}`,
                });
                setStyle(toggleBtn, {
                    zIndex: `${value}`,
                });
            }
        },
    };
    window.top.sketchMeasureCompare.config = new Proxy(
        finalConfig,
        configHandler
    );
    const iframe = document.createElement('iframe');
    const setStyle = (ele, obj) => {
        Object.keys(obj).forEach((key) => {
            ele.style[key] = obj[key];
        });
    };

    setStyle(iframe, {
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: '0',
        left: '0',
        border: 'none',
        zIndex: `${zIndex}`,
        display: 'none',
    });

    const toggleBtnWrapper = document.createElement('div');
    setStyle(toggleBtnWrapper, {
        position: 'fixed',
        zIndex: `${zIndex}`,
        width: '100vw',
        height: '0',
        top: '0',
        left: '0',
    });

    const toggleBtn = document.createElement('div');
    setStyle(toggleBtn, {
        position: 'fixed',
        zIndex: `${zIndex}`,
        right: '0',
        bottom: '40px',
        backgroundColor: '#04BE02',
        padding: '2px 14px',
        borderRadius: '3px',
        color: '#fff',
        height: '26px',
        lineHeight: '22px',
        fontSize: '16px',
        userSelect: 'none',
        webkitUserSelect: 'none',
        boxSizing: 'border-box',
    });
    toggleBtn.innerText = 'UI';

    let shiftX = 0;
    let shiftY = 0;
    let isMoving = false;
    let mouseDownX = 0;
    let mouseDownY = 0;
    let screenHeight = 0;
    let screenWidth = 0;

    toggleBtn.onclick = (e) => {
        const { left, top } = toggleBtn.getBoundingClientRect();
        const isClick =
            Math.abs(left - mouseDownX) < 1 ||
            Math.abs(top - mouseDownY) < 1 ||
            !e?.isTrusted;
        if (isClick) {
            iframe.style.display =
                iframe.style.display === 'none' ? 'block' : 'none';
        }
    };

    const handleMouseDown = (e) => {
        toggleBtnWrapper.style.height = '100vh';
        const { left, top, width, height } = toggleBtn.getBoundingClientRect();
        const { width: wrapperWidth, height: wrapperHeight } =
            toggleBtnWrapper.getBoundingClientRect();
        mouseDownX = left;
        mouseDownY = top;
        screenHeight = wrapperHeight;
        screenWidth = wrapperWidth;
        const clientX = e?.touches?.[0]?.clientX ?? e?.clientX;
        const clientY = e?.touches?.[0]?.clientY ?? e?.clientY;
        shiftX = clientX - mouseDownX - width;
        shiftY = clientY - mouseDownY - height;
        isMoving = true;
    };

    const handleMouseUp = () => {
        toggleBtnWrapper.style.height = '0';
        isMoving = false;
    };

    const handleMouseMove = (e) => {
        e.preventDefault();
        if (isMoving) {
            const clientX = e?.touches?.[0]?.clientX ?? e?.clientX;
            const clientY = e?.touches?.[0]?.clientY ?? e?.clientY;
            toggleBtn.style.right = screenWidth - clientX + shiftX + 'px';
            toggleBtn.style.bottom = screenHeight - clientY + shiftY + 'px';
        }
    };

    toggleBtn.onmousedown = handleMouseDown;
    toggleBtnWrapper.onmousemove = handleMouseMove;
    toggleBtnWrapper.onmouseup = handleMouseUp;
    toggleBtn.ontouchstart = handleMouseDown;
    toggleBtnWrapper.ontouchmove = handleMouseMove;
    toggleBtnWrapper.ontouchend = handleMouseUp;

    toggleBtnWrapper.appendChild(toggleBtn);

    iframe.src = window.top.sketchMeasureCompare.html;
    document.body.appendChild(iframe);
    document.body.appendChild(toggleBtnWrapper);
};
