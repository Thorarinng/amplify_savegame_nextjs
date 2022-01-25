import React from "react";

export default function password() {
  return (
    <div className="form-main-outer">
      <div className="container">
        <h1> Reset Password</h1>
        <input placeholder="Enter your email address" />
        <button type="button" className="btn" value="ResetButton">
          Reset Password
        </button>
      </div>
    </div>
  );
}
