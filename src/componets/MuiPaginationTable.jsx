import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Select, MenuItem, IconButton, Box, Typography
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Pagination from "@mui/material/Pagination";

export const MuiPaginationTable = ({ userData, setSkip, skip, limit, total }) => {
  const currentPage = limit ? Math.ceil(skip / limit) + 1 : 1;
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selected, setSelected] = React.useState("id");
  const [sortOrder, setSortOrder] = React.useState({});
  const pageSize = 25;
  const pageCount = Math.ceil((total || 0) / pageSize);
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return userData;
    const term = searchTerm.toLowerCase();
    return userData.filter(user => {
      if (selected === "id") {
        return user.id?.toString().includes(term);
      } else if (selected === "name") {
        const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim().toLowerCase();
        return fullName.includes(term);
      }
      return false;
    });
  }, [userData, searchTerm, selected]);


  const sortData = React.useMemo(() => {
    if (sortOrder && Object.keys(sortOrder).length > 0) {
      const [key, order] = Object.entries(sortOrder)[0];
      return [...filteredData].sort((a, b) => {
        let aValue = a[key];
        let bValue = b[key];
        if (key === "name") {
          aValue = `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim();
          bValue = `${b.firstName ?? ""} ${b.lastName ?? ""}`.trim();
        }
        if (typeof aValue === "string" && typeof bValue === "string") {
          return order === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return order === "asc" ? aValue - bValue : bValue - aValue;
        }
      });
    }
    return filteredData;
  }, [sortOrder, filteredData]);


  const handleSort = (key) => {
    setSortOrder(prev =>
      prev?.[key] === "asc" ? { [key]: "desc" } : { [key]: "asc" }
    );
  };

  const handlePageChange = (event, page) => {
    const newSkip = (page - 1) * pageSize;
    setSkip(newSkip);
  };


  return (
    <Box>
      <Box className="">
        <Select
          size="small"
          value={selected}
          onChange={e => setSelected(e.target.value)}
          sx={{ minWidth: 100 }}
        >
          <MenuItem value="id">ID</MenuItem>
          <MenuItem value="name">Name</MenuItem>
        </Select>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          sx={{ minWidth: 100, maxWidth: 200, flexShrink: 1 }}
        />
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                ID
                <IconButton
                  size="small"
                  onClick={() => handleSort("id")}
                  color={sortOrder?.id ? "primary" : "default"}
                >
                  {sortOrder?.id === "asc" ? <ArrowUpwardIcon fontSize="inherit" /> : <ArrowDownwardIcon fontSize="inherit" />}
                </IconButton>
              </TableCell>
              <TableCell>
                Name
                <IconButton
                  size="small"
                  onClick={() => handleSort("name")}
                  color={sortOrder?.name ? "primary" : "default"}
                >
                  {sortOrder?.name === "asc" ? <ArrowUpwardIcon fontSize="inherit" /> : <ArrowDownwardIcon fontSize="inherit" />}
                </IconButton>
              </TableCell>
              <TableCell>
                Email
                <IconButton
                  size="small"
                  onClick={() => handleSort("email")}
                  color={sortOrder?.email ? "primary" : "default"}
                >
                  {sortOrder?.email === "asc" ? <ArrowUpwardIcon fontSize="inherit" /> : <ArrowDownwardIcon fontSize="inherit" />}
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortData && sortData.length > 0 ? (
              sortData.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.id ?? "-"}</TableCell>
                  <TableCell>
                    {user.firstName || user.lastName
                      ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
                      : user.name || "-"}
                  </TableCell>
                  <TableCell>{user.email ?? "-"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ color: "#888", py: 3 }}>
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          siblingCount={1}
          boundaryCount={1}
          showFirstButton
          showLastButton
        />
        <Typography sx={{ ml: 2, fontSize: "1rem" }}>total: {total}</Typography>
      </Box>
    </Box>
  );
};