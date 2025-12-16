import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://66.135.1.147:5000";

function Login({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setAuth(true);
      navigate("/todos");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>

      {/* Animated background elements */}
      <div style={styles.bgOrb1}></div>
      <div style={styles.bgOrb2}></div>

      <div style={styles.wrapper}>
        {/* Glass morphism card */}
        <div style={styles.card}>
          {/* Logo/Icon */}
          <div style={styles.logoContainer}>
            <div style={styles.logo}>
              <svg
                style={styles.logoIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to continue to your account</p>

          {/* Error Message */}
          {error && (
            <div style={styles.error}>
              <svg
                style={styles.errorIcon}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Email Input */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <svg
                  style={styles.inputIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
            </div>

            {/* Password Input */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <svg
                  style={styles.inputIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.button,
                ...(isLoading && styles.buttonDisabled),
              }}
            >
              {isLoading ? (
                <span style={styles.buttonContent}>
                  <svg style={styles.spinner} fill="none" viewBox="0 0 24 24">
                    <circle
                      style={styles.spinnerCircle}
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      style={styles.spinnerPath}
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div style={styles.footer}>
            <p style={styles.footerText}>
              Don't have an account?{" "}
              <Link to="/register" style={styles.link}>
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div style={styles.decorOrb1}></div>
        <div style={styles.decorOrb2}></div>
      </div>
    </div>
  );
}

const keyframes = `
  @keyframes pulse {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    padding: "1rem",
    position: "relative",
    overflow: "hidden",
  },
  bgOrb1: {
    position: "absolute",
    top: "5rem",
    left: "5rem",
    width: "18rem",
    height: "18rem",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
    filter: "blur(60px)",
    animation: "pulse 4s ease-in-out infinite",
  },
  bgOrb2: {
    position: "absolute",
    bottom: "5rem",
    right: "5rem",
    width: "24rem",
    height: "24rem",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
    filter: "blur(60px)",
    animation: "pulse 4s ease-in-out infinite 0.7s",
  },
  wrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "28rem",
  },
  card: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    borderRadius: "1.5rem",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    padding: "2rem",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    position: "relative",
    zIndex: 1,
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  logo: {
    width: "4rem",
    height: "4rem",
    background: "linear-gradient(135deg, #ffffff, rgba(255, 255, 255, 0.8))",
    borderRadius: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
  logoIcon: {
    width: "2rem",
    height: "2rem",
    color: "#667eea",
  },
  title: {
    fontSize: "1.875rem",
    fontWeight: "700",
    textAlign: "center",
    color: "white",
    marginBottom: "0.5rem",
  },
  subtitle: {
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: "2rem",
    fontSize: "0.875rem",
  },
  error: {
    marginBottom: "1.5rem",
    padding: "1rem",
    background: "rgba(239, 68, 68, 0.2)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(239, 68, 68, 0.5)",
    borderRadius: "0.75rem",
    color: "white",
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  errorIcon: {
    width: "1.25rem",
    height: "1.25rem",
    flexShrink: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: "0.875rem",
    fontWeight: "500",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "1rem",
    width: "1.25rem",
    height: "1.25rem",
    color: "rgba(255, 255, 255, 0.5)",
    pointerEvents: "none",
    zIndex: 1,
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem 0.75rem 3rem",
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "0.75rem",
    color: "white",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.3s ease",
  },
  button: {
    width: "100%",
    padding: "0.75rem 1rem",
    background: "white",
    color: "#667eea",
    fontWeight: "600",
    border: "none",
    borderRadius: "0.75rem",
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    transition: "all 0.2s ease",
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },
  spinner: {
    width: "1.25rem",
    height: "1.25rem",
    animation: "spin 1s linear infinite",
  },
  spinnerCircle: {
    opacity: 0.25,
  },
  spinnerPath: {
    opacity: 0.75,
  },
  footer: {
    marginTop: "2rem",
    textAlign: "center",
  },
  footerText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "0.875rem",
  },
  link: {
    color: "white",
    fontWeight: "600",
    textDecoration: "none",
    transition: "all 0.2s ease",
  },
  decorOrb1: {
    position: "absolute",
    bottom: "-1rem",
    right: "-1rem",
    width: "6rem",
    height: "6rem",
    background: "linear-gradient(135deg, #ec4899, #ef4444)",
    borderRadius: "50%",
    filter: "blur(40px)",
    opacity: 0.5,
    zIndex: 0,
  },
  decorOrb2: {
    position: "absolute",
    top: "-1rem",
    left: "-1rem",
    width: "8rem",
    height: "8rem",
    background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    borderRadius: "50%",
    filter: "blur(40px)",
    opacity: 0.5,
    zIndex: 0,
  },
};

export default Login;
