"use client";

import { useState, useEffect } from "react";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { LuScanText } from "react-icons/lu";
import { FaExclamation } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GrDocumentText } from "react-icons/gr";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaBuildingColumns } from "react-icons/fa6";
import { RiUserVoiceFill } from "react-icons/ri";
import Image from "next/image";
import logo from "./logo.png";
import { useTheme } from "@mui/material/styles";
import { IoCloudyNightSharp } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { AiFillQuestionCircle } from "react-icons/ai";
import { TbMenu2 } from "react-icons/tb";

import {
  Box,
  Tooltip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  TableHead,
  TextField,
  IconButton,
  Checkbox,
  ListItemText,
} from "@mui/material";
import {
  Search as SearchIcon,
  FirstPage,
  LastPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";

const data = [
  {
    id: 1,
    name: "CVE-2024-3848 Scanner",
    description: "Path Traversal vulnerability in mlflow",
    severity: "High",
  },
  {
    id: 2,
    name: "CVE-2024-1483 Scanner",
    description: "Path Traversal vulnerability in mlflow",
    severity: "High",
  },
  {
    id: 3,
    name: "CVE-2024-10924 Scanner",
    description: "Authentication Bypass in Security",
    severity: "Critical",
  },
  {
    id: 4,
    name: "CVE-2022-41800 Scanner",
    description: "Command Injection in F5 BIG-IP",
    severity: "High",
  },
  {
    id: 5,
    name: "CVE-2021-34630 Scanner",
    description: "Cross-Site Scripting (XSS) in GTranslate",
    severity: "Medium",
  },
  {
    id: 6,
    name: "CVE-2022-0250 Scanner",
    description: "Cross-Site Scripting in Redirection",
    severity: "Medium",
  },
  {
    id: 7,
    name: "CVE-2022-24819 Scanner",
    description: "Information Disclosure in XWiki",
    severity: "Medium",
  },
  {
    id: 8,
    name: "CVE-2024-50498 Scanner",
    description: "Remote Code Execution (RCE) in WP Query Console",
    severity: "Critical",
  },
  {
    id: 9,
    name: "CVE-2024-43919 Scanner",
    description: "Missing Authorization in Plugin",
    severity: "Critical",
  },
  {
    id: 10,
    name: "CVE-2024-9186 Scanner",
    description: "SQL Injection in FunnelKit Automation",
    severity: "High",
  },
];

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        sx={{
          color: "inherit",
        }}
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        sx={{
          color: "inherit",
        }}
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        sx={{
          color: "inherit",
        }}
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        sx={{
          color: "inherit",
        }}
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

const Header = ({ toggleTheme }) => {
  return (
    <div className="flex justify-between items-center mb-6 px-4 sm:px-6 md:px-8">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold ml-4">Free Tools</h1>
      </div>
      <div className="flex space-x-4 mr-4">
        <button
          onClick={() => toggleTheme("light")}
          className="px-4 py-2 bg-gray-200 rounded dark:bg-gray-600 hover:bg-gray-300"
        >
          <FiSun size={24} />
        </button>
        <button
          onClick={() => toggleTheme("dark")}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          <IoCloudyNightSharp size={24} />
        </button>
      </div>
    </div>
  );
};

export default function Sidebar() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [theme, setTheme] = useState("light");
  const [searchTerm, setSearchTerm] = useState("");
  const [focused, setFocused] = useState(false);
  const [isScanManagerOpen, setIsScanManagerOpen] = useState(false);
  const [selectedSeverities, setSelectedSeverities] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleScanManager = () => setIsScanManagerOpen(!isScanManagerOpen);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSeverityChange = (event) => {
    const value = event.target.value;
    setSelectedSeverities(value.length > 0 ? value : []);
  };

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - data.length);

  const toggleTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    const savedSearchTerm = localStorage.getItem("searchTerm") || "";
    const savedSelectedSeverities =
      JSON.parse(localStorage.getItem("selectedSeverities")) || [];

    setTheme(savedTheme);
    setSearchTerm(savedSearchTerm);
    setSelectedSeverities(savedSelectedSeverities);

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
    localStorage.setItem(
      "selectedSeverities",
      JSON.stringify(selectedSeverities)
    );
  }, [searchTerm, selectedSeverities]);

  const filteredData = data.filter((row) => {
    const matchesSearch =
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.severity.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity = selectedSeverities.length
      ? selectedSeverities.includes(row.severity)
      : true;

    return matchesSearch && matchesSeverity;
  });

  const commonMenuStyles =
    "flex items-center pl-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded";
  const subMenuStyles = "hover:bg-gray-100 dark:hover:bg-gray-600 p-1 rounded";
  const navHeaderStyle =
    "flex items-center justify-start text-xs font-bold uppercase px-2 py-2";
  const commonTableCellStyles =
    "dark:text-gray-400 text-gray-600 dark:border-gray-700";
  const commonTableCellSX = { fontSize: "0.80rem", fontWeight: "bold" };
  const commonRowStyles =
    "border-b border-gray-300 dark:border-gray-700 dark:hover:bg-gray-600";
  const severityStyles = {
    High: "bg-red-600",
    Critical: "bg-purple-700",
    Medium: "bg-orange-500",
    Low: "bg-gray-500",
  };
  const commonTextStyle =
    "text-gray-800 dark:text-white text-sm ml-5 mr-7 inline-flex items-center";

  const commonSpanStyle = {
    margin: "0 10px",
    color: "#B0B0B0",
  };
  const menuItemStyle =
    "dark:bg-gray-800 dark:text-white hover:dark:bg-gray-700 px-4 py-1";
  const formControlStyle = "bg-transparent dark:bg-slate-700 w-full mb-2";
  const inputLabelStyle =
    "bg-transparent dark:text-white text-[0.80rem] font-bold ";

  return (
    <div
      className={`min-h-screen flex ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`w-64 p-4 ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        } transition-all`}
      >
        <ul className={`space-y-4 ${isMenuOpen ? "block" : "hidden"} md:block`}>
          <div className="flex items-center mb-4">
            <Image
              src={logo}
              alt="Logo"
              className="h-12"
              width={45}
              height={45}
            />
            <span className="text-3xl font-semibold ml-2">S4E</span>
          </div>

          <li className={navHeaderStyle}>GENERAL</li>

          <li>
            <a href="#" className={commonMenuStyles}>
              <GridViewRoundedIcon />
              <span className="ml-3">Dashboard</span>
            </a>
          </li>

          <li>
            <a href="#" className={commonMenuStyles}>
              <BsFillHandbagFill size={22} />
              <span className="ml-3">Asset Manager</span>
              <FaExclamation className="ml-6" />
            </a>
          </li>

          <li>
            <button onClick={toggleScanManager} className={commonMenuStyles}>
              <div className="flex items-center">
                <LuScanText size={22} />
                <span className="ml-3">Scan Manager</span>
              </div>
              <span
                className={`transition-transform ${
                  isScanManagerOpen ? "rotate-180" : ""
                }`}
              >
                <MdKeyboardArrowDown size={22} className="ml-6" />
              </span>
            </button>

            {isScanManagerOpen && (
              <ul className="pl-12 space-y-2 list-disc">
                <li className={subMenuStyles}>
                  <a href="#" className="block text-xs ">
                    Start Scan
                  </a>
                </li>
                <li className={subMenuStyles}>
                  <a href="#" className="block text-xs ">
                    Scan Activities
                  </a>
                </li>
                <li className={subMenuStyles}>
                  <a href="#" className="block text-xs ">
                    All Based Scan Generator{" "}
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <a href="#" className={commonMenuStyles}>
              <GrDocumentText size={22} />
              <span className="ml-3">Outputs</span>
            </a>
          </li>

          <li>
            <a href="#" className={commonMenuStyles}>
              <FaBuildingColumns size={22} />
              <span className="ml-3">Awareness</span>
            </a>
          </li>

          <li className={navHeaderStyle}>SUPPORT</li>

          <li>
            <a href="#" className={commonMenuStyles}>
              <RiUserVoiceFill size={22} />
              <span className="ml-3">Support Ticket</span>
            </a>
          </li>
        </ul>
      </div>

      <button
        onClick={toggleMenu}
        className="md:hidden absolute top-4 left-4 text-white bg-gray-800 p-2 rounded-full"
      >
        <span className="material-icons">
          <TbMenu2 />
        </span>
      </button>

      <div className="w-full max-w-[100%] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 overflow-x-auto">
        <div className=" relative overflow-x-auto bg-gray-50 dark:bg-gray-900 p-2 ">
          <Header toggleTheme={toggleTheme} />

          <Box
            className="ml-12"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <button
              style={{
                fontSize: "18px",
                background: "none",
                border: "none",
                cursor: "pointer",
                marginRight: "5px",
                marginLeft: "0",
              }}
              onClick={() => console.log("Back button clicked")}
            >
              <IoIosArrowRoundBack />
            </button>

            <span style={commonSpanStyle}>|</span>
            <span
              className="text-[#333] dark:text-white"
              style={{ fontSize: "14px" }}
            >
              Main
            </span>
            <span style={commonSpanStyle}>·</span>
            <span
              className="text-[#333] dark:text-white"
              style={{ fontSize: "14px" }}
            >
              Start Scan
            </span>
            <span style={commonSpanStyle}>·</span>
            <span style={{ fontSize: "14px", color: "#B0B0B0" }}>
              Free Tools
            </span>
          </Box>

          <Box className=" dark:bg-gray-950w-full max-w-[100%] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            <Box
              className="dark:bg-slate-600 bg-gray-100"
              sx={{
                display: "flex",
                alignItems: "center",
                height: "50px",
                padding: "10px",
                borderRadius: "15px 15px 0 0",
              }}
            >
              <span className={commonTextStyle}>All</span>
              <span className={commonTextStyle}>
                Asset Owner
                <Tooltip
                  title="Scans that are powered by our AI-based custom scan tools."
                  arrow
                >
                  <AiFillQuestionCircle className="ml-1 text-gray-500" />
                </Tooltip>
              </span>
              <span className={commonTextStyle}>
                Everyone
                <AiFillQuestionCircle className="ml-1 text-gray-500" />
              </span>
              <span className={commonTextStyle}>
                All Scans
                <AiFillQuestionCircle className="ml-1 text-gray-500" />
              </span>
            </Box>
            <Box
              className="bg-white dark:bg-slate-800"
              sx={{
                padding: "16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "16px",
              }}
            >
              <TextField
                className={formControlStyle}
                label="Search"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton sx={{ color: "gray" }}>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: "0.80rem",
                    transform: "translate(12px, 12px) scale(1)",
                    transition: "all 0.2s ease-out",

                    "&.MuiInputLabel-shrink": {
                      transform: "translate(14px, -6px) scale(0.9)",
                    },
                    color: "inherit",
                  },
                }}
                sx={{
                  backgroundColor: "transparent",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "& fieldset": {
                      borderColor: "#e8e8e8",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                }}
              />

              <FormControl
                className={formControlStyle}
                fullWidth
                size="small"
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "transparent",
                  width: "100%",
                }}
              >
                <InputLabel className={inputLabelStyle}>Severity</InputLabel>
                <Select
                  multiple
                  value={selectedSeverities}
                  label="Severity"
                  onChange={handleSeverityChange}
                  renderValue={(selected) => (
                    <span style={{ color: "white" }}>
                      {selected.join(", ")}
                    </span>
                  )}
                >
                  <MenuItem value="High" className={menuItemStyle}>
                    <Checkbox
                      checked={selectedSeverities.includes("High")}
                      className="text-gray-600 dark:text-white"
                    />
                    <ListItemText
                      primary="High"
                      className="text-sm text-gray-800 dark:text-gray-300"
                    />
                  </MenuItem>

                  <MenuItem value="Medium" className={menuItemStyle}>
                    <Checkbox
                      checked={selectedSeverities.includes("Medium")}
                      className="text-gray-600 dark:text-white"
                    />
                    <ListItemText
                      primary="Medium"
                      className="text-sm text-gray-800 dark:text-gray-300"
                    />
                  </MenuItem>

                  <MenuItem value="Critical" className={menuItemStyle}>
                    <Checkbox
                      checked={selectedSeverities.includes("Critical")}
                      className="text-gray-600 dark:text-white"
                    />
                    <ListItemText
                      primary="Critical"
                      className="text-sm text-gray-800 dark:text-gray-300"
                    />
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl
                className={formControlStyle}
                fullWidth
                size="small"
                sx={{
                  backgroundColor: "transparent",
                  width: "100%",
                }}
              >
                <InputLabel className={inputLabelStyle}>Asset Type</InputLabel>
                <Select multiple label="Asset Type"></Select>
              </FormControl>

              <FormControl
                className={formControlStyle}
                fullWidth
                size="small"
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "transparent",
                  width: "100%",
                }}
              >
                <InputLabel className={inputLabelStyle}>Category</InputLabel>
                <Select multiple label="Category"></Select>
              </FormControl>
            </Box>

            <TableContainer
              component={Paper}
              className="overflow-x-auto dark:bg-slate-800 bg-white rounded-lg shadow-lg"
              sx={{
                width: "100%",
                maxWidth: "100%",
              }}
            >
              <Table
                sx={{
                  minWidth: 650,
                }}
                className="w-full text-sm text-left text-gray-500 bg-transparent dark:bg-slate-800 "
              >
                <TableHead>
                  <TableRow className="dark:bg-slate-700 bg-gray-100 ">
                    <TableCell
                      className={commonTableCellStyles}
                      sx={commonTableCellSX}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      className={commonTableCellStyles}
                      sx={commonTableCellSX}
                      align="left"
                    >
                      Description
                    </TableCell>
                    <TableCell
                      className={commonTableCellStyles}
                      sx={commonTableCellSX}
                      align="center"
                    >
                      Severity
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id} className={commonRowStyles}>
                        <TableCell
                          className="dark:text-white dark:border-gray-700 "
                          sx={{ ...commonTableCellSX }}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell
                          className="dark:text-white dark:border-gray-700"
                          sx={{ fontSize: "0.80rem" }}
                          align="left"
                        >
                          {row.description}
                        </TableCell>
                        <TableCell
                          className="dark:text-white dark:border-gray-700"
                          align="center"
                          sx={{ fontSize: "0.80rem" }}
                        >
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-white text-center w-1/2 ${
                              severityStyles[row.severity] || "bg-gray-500"
                            }`}
                          >
                            {row.severity}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={3} />
                    </TableRow>
                  )}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TablePagination
                      className="dark:text-white dark:border-gray-700"
                      colSpan={3}
                      count={filteredData.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Box>
        </div>
      </div>
    </div>
  );
}
