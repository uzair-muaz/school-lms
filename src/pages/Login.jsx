import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../services/axiosInstance";
import { setToken } from "../redux/systemSlice";
import { Input, Button, Form, message } from "antd";
export default function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await publicRequest.post("/auth/login", values);
      const result = response.data;
      console.log("result", result);
      dispatch(setToken(result.data));
      message.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      message.error(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid h-screen md:grid-cols-2">
      {/* Left Section (Login Form) */}
      <div className="flex flex-col items-center justify-center px-20 py-6">
        <h2 className="mb-6 text-5xl">Welcome Back</h2>

        <p className="mb-10 text-lg">
          Please login to continue to your account.
        </p>
        <Form
          onFinish={onFinish}
          layout="vertical"
          variant={"filled"}
          size="large"
          requiredMark={false}
          className="w-full max-w-lg"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <p className="mb-5 text-center text-sm font-light">
            By continuing, You are agree to our Terms and Conditions and Privacy
            Policy
          </p>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="w-full"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Right Section */}
      <div
        className="relative h-full w-full"
        style={{
          background:
            "linear-gradient(217.64deg, #9181F4 -5.84%, #0177FB 106.73%)",
        }}
      >
        <img
          src="/login-pattern.png"
          alt="pattern"
          className="absolute inset-0 h-full w-full opacity-10"
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-10 px-10 py-5 text-center text-white">
          <img src="/logo.svg" alt="logo" />
          <h2 className="text-lg">
            Log in to access your courses, submit assignments, track your
            progress, and connect with teachers and classmates.
          </h2>
        </div>
      </div>
    </div>
  );
}
