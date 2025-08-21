import React, { useState, useEffect } from "react";
import { SidebarData } from "./SidebarData";
import "../Styles/custom.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdLogout } from "react-icons/md";

function Sidebar({ role }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoverSubMenu, setHoverSubMenu] = useState(null);
  const [boxTop, setBoxTop] = useState(0);

  // NEW: modal state
  const [restrictOpen, setRestrictOpen] = useState(false);
  const [restrictMsg, setRestrictMsg] = useState("");

  // 🔒 Access control
  const checkAccess = (menuKey,subKey) => {
    // role-based full menu restrictions
    if ((menuKey === "Create" || menuKey === "Payroll" || menuKey === "Rolled Payees"|| menuKey === "Drafts"|| menuKey === "Quick Currency Calculator") && role !== "creator") return false;
    if ((menuKey === "Manage" ||menuKey === "Make Approvers"|| menuKey === "View Rolled Payees") && role !== "manager") return false;
    if ((menuKey === "Approver" || menuKey === "Approved Payees"|| menuKey === "Pending Payees") && role !== "approver") return false;

    // specific item restrictions
    if ((menuKey === "Add Account" || menuKey==="Change Account" || menuKey==="Edit Account" || menuKey==="Edit Employee Accounts" ) && (role === "approver" || role==="manager")) return false;
    if ((menuKey === "View Approvers" || menuKey === "View Creators" || menuKey==="View Managers") && (role === "creator" || role === "approver")) return false;
    if (menuKey === "Change Account" && role === "manager") return false;

    return true;
  };

  // Handle clicks with accessibility restriction
  const handleClick = (menuKey,subKey,thirdKey) => {
    if (!checkAccess(menuKey,subKey,thirdKey)) {
      setRestrictMsg(`🚫 You are restricted from accessing "${menuKey}"!`);
      setRestrictOpen(true);
      return;
    }
    toast.success(`✅ Accessing ${menuKey}`, {
      position: "top-right",
      autoClose: 1500,
    });
  };

  // Close modal with ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setRestrictOpen(false);
    };
    if (restrictOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [restrictOpen]);

  return (
    <div className="app">
      {/* 🔹 Navbar */}
      <div className="navbar">
        <div className="nav-left flex items-center gap-2 px-4 py-3">
          <img
            className="brand-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Standard_Chartered_Logo_%282021%2C_Logo_only%29.svg"
            alt="SC Logo"
          />
          <span className="brand-name">
          <h3>
            Standard
            <br />
            Chartered
          </h3>
          </span>
        </div>
        <div className="navbar-right">
          <MdLogout size={30} color="white" className="nav-icon"/>
        </div>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        {/* Column 1 - Main Menu */}
        <div className="col main-col">
          {Object.entries(SidebarData).map(([menuKey, menuVal]) => (
            <div
              key={menuKey}
              className={`menu-item vertical ${activeMenu === menuKey ? "active" : ""}`}
              onClick={() => {
                if (activeMenu === menuKey) {
                  setActiveMenu(null);
                  setHoverSubMenu(null);
                } else {
                  setActiveMenu(menuKey);
                  setHoverSubMenu(null);
                }
              }}
            >
              <span className="icon big">{menuVal.icon}</span>
              <span>{menuKey}</span>
            </div>
          ))}
        </div>

        {/* Column 2 - SubMenu */}
        {activeMenu && (
          <div className="col-2 sub-col">
            {Object.entries(SidebarData[activeMenu].subMenu || {}).map(([subKey, subVal]) => (
              <div
                key={subKey}
                className={`menu-item-2 vertical ${hoverSubMenu === subKey ? "active" : ""}`}
                onMouseEnter={(e) => {
                  setHoverSubMenu(subKey);
                  setBoxTop(e.currentTarget.offsetTop);
                }}
                onClick={() => handleClick(subKey)}
              >
                <span className="icon">{subVal.icon}</span>
                <span>{subKey}</span>
              </div>
            ))}
          </div>
        )}

        {/* Column 3 - Hover SubSubMenu */}
        {activeMenu &&
          hoverSubMenu &&
          SidebarData[activeMenu].subMenu[hoverSubMenu].subMenu && (
            <div
              className="submenu-box"
              style={{ top: boxTop }}
              onMouseLeave={() => setHoverSubMenu(null)}
            >
              {Object.entries(SidebarData[activeMenu].subMenu[hoverSubMenu].subMenu).map(
                ([thirdKey, thirdVal]) => (
                  <div
                    key={thirdKey}
                    className="menu-item-3 vertical leaf"
                    onClick={() => handleClick(thirdKey)}
                  >
                    <span className="icon">{thirdVal}</span>
                    <span>{thirdKey}</span>
                  </div>
                )
              )}
            </div>
          )}
      </div>

      {/* Restriction Modal */}
      {restrictOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="restrict-title"
          onClick={(e) => {
            if (e.target.classList.contains("modal-overlay")) setRestrictOpen(false);
          }}
        >
          <div className="modal-card" role="document">
            <h3 id="restrict-title" className="modal-title">Access Restricted</h3>
            <p className="modal-text">{restrictMsg}</p>
            <div className="modal-actions">
              <button className="modal-btn" onClick={() => setRestrictOpen(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;

