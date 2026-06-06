import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginRegister({ setLoggedInUser }) {
  const nav = useNavigate();
  const [err, setErr] = useState(0); 

  const handleLogin = (e) => {
    e.preventDefault();
    const loginName = e.target[0].value; 
    if (!loginName || !e.target[1].value) return setErr(1); 
    
    setLoggedInUser({ first_name: loginName, _id: "123" });
    nav("/");
  };

  const handleReg = (e) => {
    e.preventDefault();
    if (!e.target[0].value || !e.target[1].value) return setErr(2);
    alert("Đăng ký thành công!");
  };

  const css = (isErr) => ({ padding: 10, margin: 4, width: "100%", boxSizing: "border-box", border: isErr ? "2px solid red" : "1px solid #ccc" });

  return (
    <div style={{ display: "flex", padding: 40, gap: 40, backgroundColor: "#fff" }}>
      
      <form onSubmit={handleLogin} style={{ width: "40%" }} noValidate>
        <h2 style={{ color: "#1976d2" }}>Đăng Nhập</h2>
        <input required placeholder="Login Name *" style={css(err===1)} />
        <input required placeholder="Password *" style={css(err===1)} /> 
        <button style={{ width: "100%", padding: 10, background: "#1976d2", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold", marginTop: 10 }}>LOGIN</button>
      </form>

      <div style={{ borderLeft: "1px solid #ccc" }}></div>

      <form onSubmit={handleReg} style={{ width: "50%" }} noValidate>
        <h2 style={{ color: "purple" }}>Đăng Ký Tài Khoản Mới</h2>
        <input placeholder="Login Name *" style={css(err===2)} />
        <div style={{ display: "flex", gap: 10 }}>
          <input placeholder="First Name *" style={css(err===2)} />
          <input placeholder="Last Name *" style={css(err===2)} />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <input placeholder="Password *" style={css(err===2)} />
          <input placeholder="Confirm Password *" style={css(err===2)} />
        </div>
        <input placeholder="Location" style={css()} />
        <input placeholder="Occupation" style={css()} />
        <textarea placeholder="Description" rows="3" style={css()} />
        <button style={{ width: "100%", padding: 10, background: "purple", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold", marginTop: 10 }}>REGISTER ME</button>
      </form>

    </div>
  );
}