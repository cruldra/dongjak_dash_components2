import React, { useEffect } from 'react';
import type { DashBaseProps } from "props/dash";

interface AdvanceLinkProps extends DashBaseProps{
    /** 命令,比如openfile */
    cmd?: string;
    /** 命令参数,比如cmd为openfile时这里就是路径 */
    value?: string;
    /** 后端地址,链接被点击的时候把cmd和value发送到这个地址上 */
    backend?: string;
}

const AdvanceLink: React.FC<AdvanceLinkProps> = (props) => {
    const { cmd, value, backend, ...rest } = props;

    // 获取目录地址
    const getDir = () => {
        fetch(backend, {
            method: 'POST', // 使用POST方法
            headers: {
              'Content-Type': 'application/json' // 设置请求头类型为JSON
            },
            body: JSON.stringify({ // 将JavaScript对象转换为JSON字符串
                cmd: cmd, // 将cmd和value作为JSON对象发送
                value: value,
            }) 
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应错误');
            }
            return response.json(); // 将响应转换为JSON对象
        })
        .then(data => {
            console.log('成功:', data); // 输出成功返回的数据
        })
        .catch(error => {
            console.error('错误:', error); // 输出错误信息
        });
    }

    return (
        <div>
            <a style={{cursor:"pointer"}} onClick={getDir}>
                {value}
            </a>
        </div>
    );
};

export default AdvanceLink;