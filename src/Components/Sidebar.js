import React, { useState, useEffect } from "react";
import { SidebarData } from "./SidebarData";
import "../Styles/custom.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdLogout } from "react-icons/md";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Sidebar({ role }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoverSubMenu, setHoverSubMenu] = useState(null);
  const [boxTop, setBoxTop] = useState(0);
  const navigate = useNavigate();

  // NEW: modal state
  const [restrictOpen, setRestrictOpen] = useState(false);
  const [restrictMsg, setRestrictMsg] = useState("");

  // 🔒 Access control
  const checkAccess = (menuKey, subKey) => {
    // role-based full menu restrictions
    if ((menuKey === "Create" || menuKey === "Payroll" || menuKey === "Rolled Payees" || menuKey === "Drafts" || menuKey === "Quick Currency Calculator") && role !== "creator") return false;
    if ((menuKey === "Manage" || menuKey === "Make Approvers" || menuKey === "View Rolled Payees") && role !== "manager") return false;
    if ((menuKey === "Approver" || menuKey === "Approved Payees" || menuKey === "Pending Payees") && role !== "approver") return false;

    // specific item restrictions
    if ((menuKey === "Add Account" || menuKey === "Change Account" || menuKey === "Edit Account" || menuKey === "Edit Employee Accounts") && (role === "approver" || role === "manager")) return false;
    if ((menuKey === "View Approvers" || menuKey === "View Creators" || menuKey === "View Managers") && (role === "creator" || role === "approver")) return false;
    if (menuKey === "Change Account" && role === "manager") return false;

    return true;
  };

  // Handle clicks with accessibility restriction
  const handleClick = (menuKey, subKey, thirdKey, itemData) => {
    if (!checkAccess(menuKey, subKey, thirdKey)) {
      setRestrictMsg(`🚫 You are restricted from accessing "${menuKey}"!`);
      setRestrictOpen(true);
      return;
    }

    // ✅ Check if the item has a path and navigate
    if (itemData && itemData.path) {
      navigate(itemData.path);
      toast.success(`✅ Accessing ${menuKey}`, {
        position: "top-right",
        autoClose: 1500,
      });
    } else {
      toast.success(`✅ Accessing ${menuKey}`, {
        position: "top-right",
        autoClose: 1500,
      });
    }
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
      <Navbar />

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
                onClick={() => {
                  // ✅ Check if this is a direct navigation item (has subMenu with paths)
                  if (subVal.subMenu) {
                    // Check if any of the subMenu items have paths
                    const hasDirectPaths = Object.values(subVal.subMenu).some(item => item.path);
                    if (hasDirectPaths) {
                      // For items like "Create" that have direct path children, don't navigate
                      // Just show the submenu
                      return;
                    }
                  }
                  handleClick(subKey, null, null, subVal);
                }}
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
                    onClick={() => {
                      if (thirdVal.path) {
                        navigate(thirdVal.path);
                      } else {
                        handleClick(activeMenu, hoverSubMenu, thirdKey, thirdVal);
                      }
                    }}
                  >
                    <span className="icon">{thirdVal.icon}</span>
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