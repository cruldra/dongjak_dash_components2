import asyncio
import websockets
import json

# 用于存储当前活跃的 WebSocket 连接
clients = set()

async def send_periodic_messages(websocket):
    counter = 1
    while True:
        message = {"message": f"This is a message {counter}"}
        await websocket.send(json.dumps(message))
        counter += 1  # 每次发送后递增计数器
        await asyncio.sleep(0.8)  # 每800ms发送一次消息

async def handler(websocket, path):
    clients.add(websocket)
    try:
        async for message in websocket:
            data = json.loads(message)
            asyncio.create_task(send_periodic_messages(websocket))
            # if data["action"] == "start":
            #     # 启动消息发送任务
            #     asyncio.create_task(send_periodic_messages(websocket))
            # elif data["action"] == "stop":
            #     # 停止消息发送，通过退出循环来停止
            #     break
    finally:
        clients.remove(websocket)

start_server = websockets.serve(handler, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()