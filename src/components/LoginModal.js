import React, { useState } from "react";
import { loginUser, registerUser } from "../api/userService";
import { CheckCircle, AlertTriangle, Eye, EyeOff } from "lucide-react";

export default function LoginModal({ show, onClose, onLoginSuccess, onNavigate }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  if (!show) return null;

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 2500);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegistering) {
        if (formData.password !== formData.confirmPassword)
          return showMessage("Passwords do not match!", "error");

        await registerUser(formData);
        showMessage("Account created! Please login.", "success");
        setIsRegistering(false);
        return;
      }

      const data = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      if (!data?.token) return showMessage("Invalid email or password!", "error");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      showMessage(`Welcome, ${data.user.full_name}!`, "success");

      setTimeout(() => {
        onLoginSuccess(data.user);
        onClose();
        if (data.user.role !== "user") onNavigate("admin-dashboard");
      }, 1200);

    } catch {
      showMessage("Something went wrong!", "error");
    }
  };

  return (
    <div className="modal fade show d-block blur-bg">
      <div className="modal-dialog modal-dialog-centered position-relative">

        {message && (
          <div className={`toast-popup ${messageType}`}>
            {messageType === "success" ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
            <span>{message}</span>
          </div>
        )}
        
        <div className="modal-content rounded-4 shadow-lg login-box">

          <div className="modal-header modal-header-custom">
            <h5 className="fw-bold mb-0">
              {isRegistering ? "Create Account" : "Welcome To Lilaai Group Shree Ayurveda"}
            </h5>
            <button className="btn-close btn-close-white" onClick={onClose} />
          </div>

          <div className="modal-body p-4">
            <form onSubmit={handleSubmit}>

              {isRegistering && (
                <>
                  <input className="input-style"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    required />

                  <input className="input-style"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={(e) => handleChange("full_name", e.target.value)}
                    required />

                  <input className="input-style"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)} />
                </>
              )}

              <input className="input-style"
                placeholder="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required />

              <div className="position-relative">
                <input className="input-style pe-5"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required />

                <button type="button"
                  className="eye-toggle"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {isRegistering && (
                <input className="input-style"
                  placeholder="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  required />
              )}

              <button type="submit" className="btn-submit shadow-sm">
                {isRegistering ? "Sign Up" : "Login"}
              </button>
            </form>

            <p className="text-center mt-3 small toggle-text">
              {isRegistering ? (
                <>Already have an account?
                  <span onClick={() => setIsRegistering(false)}> Login</span></>
              ) : (
                <>New to Lilaai?
                  <span onClick={() => setIsRegistering(true)}> Register</span></>
              )}
            </p>
          </div>

          <div className="modal-footer border-0 small fw-semibold footer-text ">
            🌿 Lilaai Ayurvedic — Pure Herbal Wellness
          </div>

        </div>
      </div>
    </div>
  );
}
