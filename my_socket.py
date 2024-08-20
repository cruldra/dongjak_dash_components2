import asyncio
import time

import websockets
import json


# 处理每个客户端连接的协程
async def handle_client(websocket, path):
    try:
        while True:
            # 创建消息
            message = {"message": f"{time.strftime('%Y-%m-%d %H:%M:%S')}"}

            # 发送消息给客户端
            await websocket.send(json.dumps(message))

            # 等待5秒
            await asyncio.sleep(5)
    except websockets.exceptions.ConnectionClosed:
        print("客户端断开连接")


# 启动WebSocket服务器
async def main():
    server = await websockets.serve(handle_client, "localhost", 8765)
    print("WebSocket服务器已启动在ws://localhost:8765")
    await server.wait_closed()


# 运行服务器
asyncio.run(main())
