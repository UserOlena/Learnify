import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundColor: "black", color: "white", padding: "20px" }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Add your company logo here */}
        <img
          src="/path/to/company-logo.png"
          alt="Company Logo"
          style={{ width: "50px", marginRight: "10px" }}
        />
        <p>&copy; {currentYear} Your Company Name. All rights reserved.</p>
      </div>
      <div style={{ marginTop: "10px" }}>
        <a href="/about" style={{ color: "white", marginRight: "10px" }}>
          About
        </a>
        <a href="/careers" style={{ color: "white", marginRight: "10px" }}>
          Careers
        </a>
        <a href="/who-we-are" style={{ color: "white" }}>
          Who We Are
        </a>
      </div>
    </footer>
  );
}

export default Footer;
