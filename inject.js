(() => {
    if (!window.SKETCH_MEASURE_COMPARE) {
        window.SKETCH_MEASURE_COMPARE = true;
        const iframe = document.createElement('iframe');
        iframe.style.width = '100vw';
        iframe.style.height = '100vh';
        iframe.style.position = 'fixed';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.border = 'none';
        iframe.style.zIndex = '9999';
        iframe.style.display = 'none';

        fetch('https://neco86.github.io/Sketch-Measure-Compare')
            .then((res) => res.text())
            .then((html) => {
                const blob = new Blob([html], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                iframe.src = url;
                document.body.appendChild(iframe);
            });

        const toggleBtnWrapper = document.createElement('div');
        toggleBtnWrapper.style.position = 'fixed';
        toggleBtnWrapper.style.zIndex = '10000';
        toggleBtnWrapper.style.width = '100vw';
        toggleBtnWrapper.style.height = '0';
        toggleBtnWrapper.style.top = '0';
        toggleBtnWrapper.style.left = '0';
        toggleBtnWrapper.onmousemove = (e) => {
            console.log(e);
        };
        const toggleBtn = document.createElement('div');
        toggleBtn.innerText = 'UI';
        toggleBtn.style.position = 'fixed';
        toggleBtn.style.zIndex = '10000';
        toggleBtn.style.top = 'calc(100vh - 50px)';
        toggleBtn.style.left = 'calc(100vw - 43px)';
        toggleBtn.style.backgroundColor = '#04BE02';
        toggleBtn.style.padding = '2px 14px';
        toggleBtn.style.borderRadius = '3px';
        toggleBtn.style.color = '#fff';
        let shiftX = 0;
        let shiftY = 0;
        let isMoving = false;
        let mouseDownX = 0;
        let mouseDownY = 0;
        toggleBtn.onclick = () => {
            const isClick =
                Math.abs(toggleBtn.getBoundingClientRect().left - mouseDownX) <
                    1 ||
                Math.abs(toggleBtn.getBoundingClientRect().top - mouseDownY) <
                    1;
            if (isClick) {
                iframe.style.display =
                    iframe.style.display === 'none' ? 'block' : 'none';
            }
        };
        toggleBtn.onmousedown = (e) => {
            toggleBtnWrapper.style.height = '100vh';
            mouseDownX = toggleBtn.getBoundingClientRect().left;
            mouseDownY = toggleBtn.getBoundingClientRect().top;
            shiftX = e.clientX - mouseDownX;
            shiftY = e.clientY - mouseDownY;
            isMoving = true;
        };
        toggleBtnWrapper.onmouseup = () => {
            toggleBtnWrapper.style.height = '0';
            isMoving = false;
        };
        toggleBtnWrapper.onmousemove = (e) => {
            if (isMoving) {
                toggleBtn.style.left = e.clientX - shiftX + 'px';
                toggleBtn.style.top = e.clientY - shiftY + 'px';
            }
        };
        toggleBtnWrapper.appendChild(toggleBtn);
        document.body.appendChild(toggleBtnWrapper);
    }
})();
