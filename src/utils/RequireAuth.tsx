import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { store } from "../store";
import { useEffect } from "react";
import React from "react";


interface Iprops {
  allowed: boolean;
  redirectTo: string;
  children: React.ReactNode;
}

function RequireAuth({ allowed, redirectTo, children }: Iprops) {
  const { token } = useSelector((state: any) => state.authReducer);
  const isLogin = Boolean(token);
  const navigate = useNavigate();

  useEffect(() => {
    // 如果当前登录状态与要求不符，则重定向
    if (allowed !== isLogin) {
      navigate(redirectTo, { replace: true });
    }
  }, [isLogin, allowed, redirectTo]);

  // 只在状态匹配时渲染子组件
  return allowed === isLogin ? <>{children}</> : null;
}

export default RequireAuth;
