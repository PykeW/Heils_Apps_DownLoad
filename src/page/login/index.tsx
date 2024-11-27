import "./index.scss";
import { Button, Checkbox, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../API/users";
import { setToken, clearToken } from "../../store/login/authSlice";
import { store } from "../../store";
import bg from "../../asset/isometric-landing-page-design-background-template-1612199755792-cover.webp";
import lgbg from "../../asset/lgbg.png"; 
import logo from "../../asset/logo.jpg";

function Login() {
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const [loading,setLoading] = useState<boolean>(false)

  function handleLogin() {
    form
      .validateFields()
      .then(async (res) => {
        setLoading(true)
        const {data:{data:{token,username}}} = await login(res);
        dispatch(setToken(token))
        sessionStorage.setItem("username",username)

        setLoading(false)
        navigate("/")
      })
      .catch((err) => {
        console.log("err是", err);
      });
  }
  
  useEffect(()=>{
    console.log("redux中token是", store.getState().authReducer.token)
  },[])

  return (
    <div className="login" style={{ backgroundImage: `url(${bg})` }}>
      <div className="lgbg" style={{ backgroundImage: `url(${lgbg})` }}>
        <div className="part">
          <div className="title">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            <div>
              <h1>智慧园区管理系统</h1>
            </div>
            <Form 
              name="basic" 
              initialValues={{ remember: true }} 
              form={form}
              onKeyPress={e => {
                if(e.key === 'Enter') {
                  handleLogin();
                }
              }}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: "请输入用户名" }]}
              >
                <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "请输入密码" }]}
              >
                <Input.Password
                  placeholder="请输入密码"
                  prefix={<LockOutlined />}
                />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={handleLogin}
                  loading={loading}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
