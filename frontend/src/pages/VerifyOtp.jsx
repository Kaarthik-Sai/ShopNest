import React, { useState, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/auth.css";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Email not found. Please register again.");
      navigate("/register");
      return;
    }

    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data);

        alert("Email verified successfully!");

        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleVerify} className="auth-form">
        <h2>Verify OTP</h2>

        <p style={{ textAlign: "center", marginBottom: "15px" }}>
          OTP sent to
          <br />
          <strong>{email}</strong>
        </p>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          required
        />

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <p>
          Wrong email? <Link to="/register">Register Again</Link>
        </p>
      </form>
    </div>
  );
};

export default VerifyOtp;
