import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Example data structure for sidebar menu
const menuData = [
  {
    label: "Dashboard",
    key: "dashboard",
    path: "/home"
  },
  {
    label: "Text Control",
    key: "text-control",
    path: "/text-control"
  },
  {
    label: "Collabora Editor",
    key: "collabora",
    path: "/collabora"
  },
  {
    label: "Profile",
    key: "profile",
    children: [
      { label: "View Profile", key: "view-profile" },
      { label: "Edit Profile", key: "edit-profile" },
    ],
  },
  {
    label: "Settings",
    key: "settings",
    children: [
      { label: "Account", key: "account" },
      { label: "Security", key: "security" },
    ],
  },
];

export const SidebarMenu = ({ data = menuData }) => {
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();

  const handleToggle = (key) => {
    setOpenKeys((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
  };

  const handleItemClick = (item) => {
    if (item.path) {
      navigate(item.path);
    } else if (item.children) {
      handleToggle(item.key);
    }
  };

  return (
    <ul style={{ listStyle: "none", padding: "2rem 1rem", margin: 0 }}>
      {data.map((item) => (
        <li key={item.key} style={{ marginBottom: "1.5rem", cursor: "pointer" }}>
          <div onClick={() => handleItemClick(item)}>
            {item.label}
            {item.children && (
              <span style={{ marginLeft: 8, fontSize: 12 }}>
                {openKeys.includes(item.key) ? "▲" : "▼"}
              </span>
            )}
          </div>
          {item.children && openKeys.includes(item.key) && (
            <ul style={{ listStyle: "none", paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
              {item.children.map((sub) => (
                <li key={sub.key} style={{ marginBottom: "0.75rem", fontWeight: "normal" }}>
                  {sub.label}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};