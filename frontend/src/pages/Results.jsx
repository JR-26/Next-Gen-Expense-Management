import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Download, RefreshCw, Home, Loader } from "lucide-react";
import DataOrbit from "../components/3D/DataOrbit";
import toast from "react-hot-toast";

export default function Results() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get("/api/results");
      setData(response.data?.data || null);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load results");
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    try {
      setDownloading(true);
      const response = await axios.get("/api/report/download", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense-analysis-report.txt");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Report downloaded successfully");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to download report");
    } finally {
      setDownloading(false);
    }
  };

  const normalizedExpenses = Array.isArray(data?.categorized)
    ? data.categorized
    : Array.isArray(data?.categorized?.expenses)
      ? data.categorized.expenses
      : [];

  const normalizedRows = normalizedExpenses.map((item) => {
    const amount = Number(item.Amount ?? item.amount ?? 0) || 0;
    const category =
      item["Expense Category"] || item.category || item.Category || "Other";
    const dateValue = item["Transaction Date"] || item.date || null;

    return {
      amount,
      category,
      date: dateValue,
    };
  });

  const totalExpenses = normalizedRows.reduce(
    (sum, row) => sum + row.amount,
    0,
  );

  const categoriesMap = normalizedRows.reduce((acc, row) => {
    acc[row.category] = (acc[row.category] || 0) + row.amount;
    return acc;
  }, {});

  const colorPalette = [
    "#a855f7",
    "#ec4899",
    "#f43f5e",
    "#06b6d4",
    "#8b5cf6",
    "#22c55e",
    "#f59e0b",
  ];

  const categoriesData = Object.entries(categoriesMap)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value], index) => ({
      name,
      value,
      fill: colorPalette[index % colorPalette.length],
    }));

  const trendMap = normalizedRows.reduce((acc, row) => {
    if (!row.date) {
      return acc;
    }

    const parsedDate = new Date(row.date);
    if (Number.isNaN(parsedDate.getTime())) {
      return acc;
    }

    const month = parsedDate.toLocaleString("en-US", { month: "short" });
    const monthIndex = parsedDate.getMonth();

    if (!acc[month]) {
      acc[month] = { month, monthIndex, expenses: 0 };
    }

    acc[month].expenses += row.amount;
    return acc;
  }, {});

  const trendData = Object.values(trendMap).sort(
    (a, b) => a.monthIndex - b.monthIndex,
  );

  const averageMonthly =
    trendData.length > 0 ? totalExpenses / trendData.length : 0;
  const topCategory = categoriesData[0];
  const reportText = data?.report || "No report generated yet.";
  const personalCount = normalizedExpenses.filter(
    (item) => item.Is_Personal === true || item.is_personal === true,
  ).length;
  const complianceScore = normalizedExpenses.length
    ? Math.max(
        0,
        Math.round(
          ((normalizedExpenses.length - personalCount) /
            normalizedExpenses.length) *
            100,
        ),
      )
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-300">Loading your analysis...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "categories", label: "Categories" },
    { id: "trends", label: "Trends" },
    { id: "report", label: "Report" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Analysis Results
            </h1>
            <p className="text-gray-300">Your expense insights powered by AI</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchResults}
              className="flex items-center gap-2 px-6 py-3 rounded-lg glass hover:bg-white/20 transition-all"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-6 py-3 gradient-btn rounded-lg text-white shadow-lg shadow-purple-500/50"
            >
              <Home className="w-5 h-5" />
              Dashboard
            </button>
          </div>
        </div>

        {/* 3D Data Visualization */}
        <div className="glass rounded-2xl p-6 mb-8 h-96 neon-box">
          <h2 className="text-2xl font-bold mb-4">3D Data Visualization</h2>
          <DataOrbit categories={categoriesData} />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 p-1 glass rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-purple-500/30 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  label: "Total Expenses",
                  value: `$${totalExpenses.toLocaleString()}`,
                  change: `${normalizedExpenses.length} transactions`,
                },
                {
                  label: "Average Monthly",
                  value: `$${Math.round(averageMonthly).toLocaleString()}`,
                  change: `${trendData.length || 0} active months`,
                },
                {
                  label: "Top Category",
                  value: topCategory?.name || "N/A",
                  change: topCategory
                    ? `$${topCategory.value.toLocaleString()}`
                    : "No data",
                },
                {
                  label: "Compliance Score",
                  value: `${complianceScore}%`,
                  change:
                    personalCount > 0
                      ? `${personalCount} personal-flag expenses`
                      : "No personal flags",
                },
              ].map((item, idx) => (
                <div key={idx} className="glass rounded-xl p-6 neon-box">
                  <p className="text-gray-400 text-sm mb-2">{item.label}</p>
                  <p className="text-3xl font-bold mb-2">{item.value}</p>
                  <p
                    className={`text-sm ${item.change?.includes("-") ? "text-red-400" : "text-green-400"}`}
                  >
                    {item.change}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "categories" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-6 neon-box">
                <h3 className="text-2xl font-bold mb-6">
                  Expenses by Category
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoriesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: $${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoriesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="glass rounded-xl p-6 neon-box">
                <h3 className="text-2xl font-bold mb-6">Category Breakdown</h3>
                <div className="space-y-3">
                  {categoriesData.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.fill }}
                        />
                        <span className="text-gray-300">{item.name}</span>
                      </div>
                      <span className="font-semibold">${item.value}</span>
                      <span className="text-gray-400 text-sm ml-4">
                        {totalExpenses > 0
                          ? ((item.value / totalExpenses) * 100).toFixed(1)
                          : "0.0"}
                        %
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "trends" && (
            <div className="glass rounded-xl p-6 neon-box">
              <h3 className="text-2xl font-bold mb-6">Spending Trends</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                    formatter={(value) => `$${value}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#a855f7"
                    strokeWidth={3}
                    dot={{ fill: "#ec4899", r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === "report" && (
            <div className="glass rounded-xl p-8 neon-box">
              <h3 className="text-2xl font-bold mb-6">AI-Generated Report</h3>
              <div className="space-y-4 text-gray-300">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10 whitespace-pre-wrap leading-relaxed">
                  {reportText}
                </div>
              </div>
              <button
                onClick={handleDownloadReport}
                disabled={downloading}
                className="mt-8 flex items-center gap-2 px-8 py-3 gradient-btn rounded-lg text-white font-semibold shadow-lg shadow-purple-500/50 disabled:opacity-60"
              >
                <Download className="w-5 h-5" />
                {downloading ? "Downloading..." : "Download Full Report"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
