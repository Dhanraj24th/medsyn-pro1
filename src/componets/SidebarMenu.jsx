import React, { useState } from "react";

// Example data structure for sidebar menu
const menuData = [
  {
    label: "Dashboard",
    key: "dashboard",
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

  const handleToggle = (key) => {
    setOpenKeys((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
  };

  return (
    <ul style={{ listStyle: "none", padding: "2rem 1rem", margin: 0 }}>
      {data.map((item) => (
        <li key={item.key} style={{ marginBottom: "1.5rem", cursor: item.children ? "pointer" : "default" }}>
          <div onClick={() => item.children && handleToggle(item.key)}>
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