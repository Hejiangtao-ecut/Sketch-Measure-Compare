interface Config {
    /**
     * 页面层级
     */
    zIndex?: number;
    /**
     * 页面测量尺
     */
    enableDomRulers?: Boolean;
    /**
     * 右键文本替换
     */
    enableTextReplace?: Boolean;
    /**
     * 水平方向折叠
     */
    offsetX?: number;
    /**
     * 垂直方向折叠
     */
    offsetY?: number;
    /**
     * 窗口大小
     */
    width?: number;
    /**
     * 字体放大倍数
     */
    fontMultiplier?: number;
    enableBlockClose?: boolean;
}

interface SketchMeasureCompare {
    init: (config?: Config) => void;
}

declare module 'sketch-measure-compare' {
    const sketchMeasureCompare: SketchMeasureCompare;
    export = sketchMeasureCompare;
}