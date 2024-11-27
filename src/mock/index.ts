import Mock from "mockjs";

Mock.setup({
  timeout: 100
})
// 登录接口
Mock.mock("https://www.demo.com/login", "post", (options: any) => {
  const { username, password } = JSON.parse(options.body);
  if (username == "admin" && password == "1") {
    return {
      code: 200,
      message: "登录成功",
      data: {
        username: "admin",
        token: "tokenadsjfljijelaaeiu2802hb0y612",
      }
    };
  } else if (username == "manager" && password == "123456") {
    return {
      code: 200,
      message: "登录成功",
    };
  } else if (username == "user" && password == "123456") {
    return {
      code: 201,
      message: "登录失败",
    };
  } else {
    return {
      code: 201,
      message: "登录失败",
    };
  }
});

const menuList = [
    {
        key: "/home",
        icon: null,
        label: "首页"
    },
    {
        key: "/user",
        icon: null,
        label: "用户管理"
    }
]
// 获取动态菜单
Mock.mock(/https:\/\/www\.demo\.com\/getMenu(\?.*)?/, "get", (options: any) => {
  console.log("登录成功");
  // 从options.url中解析token参数
  const url = new URL(options.url);
  const token = url.searchParams.get('token');

  console.log("mock中获取token", token);

  if (token === "tokenadsjfljijelaaeiu2802hb0y612") {
    return {
      code: 200,
      message: "获取菜单成功",
      data: menuList,
    };
  }
  return {
    code: 401,
    message: "未授权",
    data: null,
  };
});