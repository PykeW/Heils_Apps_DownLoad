from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Union, Dict, Any
from fastapi.middleware.cors import CORSMiddleware  # 添加这行导入


app = FastAPI()
# 添加 CORS 中间件配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有源，生产环境建议设置具体的源
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有方法
    allow_headers=["*"],  # 允许所有请求头
)

# 定义登录请求模型
class LoginRequest(BaseModel):
    username: str
    password: str

# 定义菜单项模型
class MenuItem(BaseModel):
    key: str
    icon: Optional[str] = None 
    label: str

# 定义响应模型
class Response(BaseModel):
    code: int
    message: str
    data: Any = None
    

# 菜单列表
menu_list = [
    {
        "key": "/home",
        "icon": None,
        "label": "首页"
    },
    {
        "key": "/user", 
        "icon": None,
        "label": "用户管理",
        "children": [
            {
                "key": "/user/list",
                "label": "用户列表",
                "icon": None
            }
        ]
    }
]

@app.post("/login")
async def login(request: LoginRequest):
    if request.username == "admin" and request.password == "1":
        return Response(
            code=200,
            message="登录成功",
            data={
                "username": "admin",
                "token": "tokenadsjfljijelaaeiu2802hb0y612"
            }
        )
    elif request.username == "manager" and request.password == "123456":
        return Response(code=200, message="登录成功")
    elif request.username == "user" and request.password == "123456":
        return Response(code=201, message="登录失败")
    else:
        return Response(code=201, message="登录失败")

@app.get("/getMenu")
async def get_menu(token: str):
    print(token)
    if token == "tokenadsjfljijelaaeiu2802hb0y612":
        return Response(
            code=200,
            message="获取菜单成功",
            data=menu_list
        )
    return Response(
        code=401,
        message="未授权",
        data=None
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)

