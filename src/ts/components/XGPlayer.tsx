import React from 'react';
import Xgplayer from 'xgplayer-react';
import type { DashBaseProps } from "props/dash";

interface XGPlayerProps extends DashBaseProps{
    url?: string;
    /** 自动播放 */
    autoplay?: boolean;
    /** 尺寸 */
    width?: number,
    height?: number,
    /** 流式布局，可使播放器宽度跟随父元素的宽度大小变化 */
    fluid?: boolean;
    /** 自适应视频内容宽高 */
    fitVideoSize?: 'fixWidth' | 'fixHeight' | 'auto';
    /** 音量 */
    volume?: number;
    /** 循环播放 */
    loop?: boolean;
    /** 封面图 */
    poster?: string;
    /** 下载 */
    download?: boolean;
    /** 画中画 */
    pip?: boolean;
    /** 播放器控制栏 */
    controls?: boolean;
    /** 控制条选项配置 */
    controlsList?: Array<string>;
}

const XGPlayer: React.FC<XGPlayerProps> = (props) => {
    const { url, ...rest } = props;
    let config = {
        id: 'mse',
        url: url,
        ...rest
    };
    let Player = null;

    return (
        <Xgplayer config={config} playerInit={(player)=>{ Player = player; }} />
    );
};

export default XGPlayer;