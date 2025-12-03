import axios from "axios";
import { useState } from "react";

// Detect API base URL (use server IP on phone, localhost on desktop)
const getApiBaseURL = () => {
    // Check if running on localhost/127.0.0.1
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5000';
    }
    // For phone/other devices, use current host IP
    return `http://${window.location.hostname}:5000`;
};

const API_BASE_URL = getApiBaseURL();

function Login() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setMessageType("");

    try {
      if (isLogin) {
        // Login request
        const res = await axios.post(`${API_BASE_URL}/api/login`, {
          email: form.email,
          password: form.password,
        });
        setMessage(`Login successful! Welcome ${res.data.user.firstname}!`);
        setMessageType("success");
        console.log("Login response:", res.data);
        // Reset form on success
        setForm({ firstname: "", lastname: "", email: "", password: "" });
      } else {
        // Register request - saves to MongoDB CarDealership database
        const res = await axios.post(`${API_BASE_URL}/api/register`, form);
        setMessage(`Registration successful! Welcome ${res.data.user.firstname}!`);
        setMessageType("success");
        console.log("Registration response:", res.data);
        // Reset form on success
        setForm({ firstname: "", lastname: "", email: "", password: "" });
        // Switch to login mode after successful registration
        setTimeout(() => {
          setIsLogin(true);
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
        (isLogin ? "Invalid email or password" : "Error registering user");
      setMessage(errorMessage);
      setMessageType("error");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  };

  const cardStyle = {
    background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
    borderRadius: "20px",
    boxShadow: "0 25px 80px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
    padding: "50px 40px",
    width: "100%",
    maxWidth: "450px",
    animation: "fadeIn 0.6s ease-in",
    position: "relative",
    zIndex: 1,
  };

  const logoStyle = {
    textAlign: "center",
    marginBottom: "30px",
  };

  const logoTextStyle = {
    fontSize: "36px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #0f3460 0%, #e94560 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "8px",
    letterSpacing: "2px",
  };

  const logoSubtextStyle = {
    fontSize: "12px",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: "3px",
    fontWeight: "600",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: "8px",
    textAlign: "center",
  };

  const subtitleStyle = {
    fontSize: "14px",
    color: "#666",
    textAlign: "center",
    marginBottom: "35px",
    lineHeight: "1.6",
  };

  const inputGroupStyle = {
    marginBottom: "24px",
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  };

  const inputStyle = {
    width: "100%",
    padding: "16px 18px",
    fontSize: "15px",
    border: "2px solid #e0e0e0",
    borderRadius: "10px",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
    background: "#ffffff",
    color: "#1a1a2e",
  };

  const buttonStyle = {
    width: "100%",
    padding: "16px",
    fontSize: "16px",
    fontWeight: "700",
    color: "white",
    background: "linear-gradient(135deg, #0f3460 0%, #e94560 100%)",
    border: "none",
    borderRadius: "10px",
    cursor: isLoading ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
    opacity: isLoading ? 0.7 : 1,
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    boxShadow: "0 4px 15px rgba(15, 52, 96, 0.3)",
  };

  const toggleButtonStyle = {
    width: "100%",
    padding: "12px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#0f3460",
    background: "transparent",
    border: "2px solid #0f3460",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "15px",
  };

  const messageStyle = {
    marginTop: "24px",
    padding: "14px 18px",
    borderRadius: "10px",
    fontSize: "14px",
    textAlign: "center",
    fontWeight: "500",
    backgroundColor: messageType === "success" ? "#d4edda" : "#f8d7da",
    color: messageType === "success" ? "#155724" : "#721c24",
    border: `2px solid ${messageType === "success" ? "#c3e6cb" : "#f5c6cb"}`,
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={logoStyle}>
          <div style={logoTextStyle}>🚗 CAR DEALERSHIP</div>
          <div style={logoSubtextStyle}>Premium Vehicles</div>
        </div>
        
        <h2 style={titleStyle}>
          {isLogin ? "Login" : "Register"}
        </h2>
        <p style={subtitleStyle}>
          {isLogin 
            ? "Sign in to access your account" 
            : "Create an account to get started"}
        </p>
        
        <form onSubmit={submit}>
          {!isLogin && (
            <>
              <div style={inputGroupStyle}>
                <label style={labelStyle} htmlFor="firstname">
                  First Name
                </label>
                <input
                  id="firstname"
                  type="text"
                  placeholder="Enter your first name"
                  value={form.firstname}
                  onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                  required={!isLogin}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0f3460";
                    e.target.style.boxShadow = "0 0 0 3px rgba(15, 52, 96, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e0e0e0";
                    e.target.style.boxShadow = "none";
                  }}
                  disabled={isLoading}
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle} htmlFor="lastname">
                  Last Name
                </label>
                <input
                  id="lastname"
                  type="text"
                  placeholder="Enter your last name"
                  value={form.lastname}
                  onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                  required={!isLogin}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0f3460";
                    e.target.style.boxShadow = "0 0 0 3px rgba(15, 52, 96, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e0e0e0";
                    e.target.style.boxShadow = "none";
                  }}
                  disabled={isLoading}
                />
              </div>
            </>
          )}

          <div style={inputGroupStyle}>
            <label style={labelStyle} htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = "#0f3460";
                e.target.style.boxShadow = "0 0 0 3px rgba(15, 52, 96, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e0e0e0";
                e.target.style.boxShadow = "none";
              }}
              disabled={isLoading}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = "#0f3460";
                e.target.style.boxShadow = "0 0 0 3px rgba(15, 52, 96, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e0e0e0";
                e.target.style.boxShadow = "none";
              }}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 8px 25px rgba(15, 52, 96, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(15, 52, 96, 0.3)";
            }}
            disabled={isLoading}
          >
            {isLoading 
              ? (isLogin ? "⏳ Signing In..." : "⏳ Registering...") 
              : (isLogin ? "🚀 Sign In" : "🚀 Register")}
          </button>
        </form>

        <button
          type="button"
          style={toggleButtonStyle}
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage("");
            setForm({ firstname: "", lastname: "", email: "", password: "" });
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#0f3460";
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "#0f3460";
          }}
        >
          {isLogin 
            ? "Don't have an account? Register here" 
            : "Already have an account? Login here"}
        </button>

        {message && (
          <div style={messageStyle}>
            {messageType === "success" ? "✅ " : "❌ "}
            {message}
          </div>
        )}

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-30px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default Login;
