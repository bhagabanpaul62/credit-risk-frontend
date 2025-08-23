"use client";
import { useState } from "react";
import axios from "axios";

// Internal model feature keys remain unchanged. We'll map them to clearer labels & help text.
const fieldMeta = [
  {
    key: "age",
    label: "Age (years)",
    help: "Applicant age in whole years.",
    type: "number",
  },
  {
    key: "annual_income",
    label: "Annual Income",
    help: "Gross yearly income (numbers only, same currency as model).",
    type: "number",
  },
  {
    key: "employment_years",
    label: "Years in Current Job",
    help: "Full years employed in current position.",
    type: "number",
  },
  {
    key: "derogatory_marks",
    label: "Derogatory Marks",
    help: "Count of negative / derogatory credit report items (collections, liens, etc.).",
    type: "number",
  },
  {
    key: "inquiries_last6m",
    label: "Credit Checks (6 mo)",
    help: "Number of hard credit inquiries in the last 6 months.",
    type: "number",
  },
  {
    key: "inquiries_finance_24m",
    label: "Finance Inquiries (24 mo)",
    help: "Hard inquiries specifically for finance / loan products (24 months).",
    type: "number",
  },
  {
    key: "total_accounts",
    label: "Total Credit Accounts",
    help: "Total number of credit accounts ever opened (closed + open).",
    type: "number",
  },
  {
    key: "active_accounts",
    label: "Open Credit Accounts",
    help: "Number of currently open credit accounts (revolving + installment).",
    type: "number",
  },
  {
    key: "high_credit_util_75",
    label: "Any Account Utilization ≥ 75%?",
    help: "Select Yes if ANY single revolving line is using 75% or more of its limit.",
    type: "boolean",
  },
  {
    key: "util_50_plus",
    label: "Overall Utilization ≥ 50%?",
    help: "Yes if overall revolving balance / total revolving limit is ≥ 50%.",
    type: "boolean",
  },
  {
    key: "balance_high_credit_pct",
    label: "Balance / Credit Limit %",
    help: "Average balance as a percent of high credit / limits (0–100).",
    type: "number",
  },
  {
    key: "satisfied_pct",
    label: "% Accounts Satisfied",
    help: "Percent of accounts fully paid / satisfied (0–100).",
    type: "number",
  },
  {
    key: "delinquency_30_60_24m",
    label: "30–60 Day Lates (24 mo)",
    help: "Count of 30–60 day delinquencies in last 24 months.",
    type: "number",
  },
  {
    key: "delinquency_90d_24m",
    label: "90+ Day Lates (24 mo)",
    help: "Count of 90+ day delinquencies in last 24 months.",
    type: "number",
  },
  {
    key: "delinquencies_60d",
    label: "All 60+ Day Lates (lifetime)",
    help: "Total historical 60+ day delinquencies (if model expects 24m, use that horizon).",
    type: "number",
  },
  {
    key: "chargeoffs_last24m",
    label: "Charge-offs (24 mo)",
    help: "Number of accounts charged off in last 24 months.",
    type: "number",
  },
  {
    key: "derog_or_bad_cnt",
    label: "Derog/Bad Accounts Count",
    help: "Total count of derogatory or bad status accounts (collections, charge-offs, etc.).",
    type: "number",
  },
  {
    key: "accounts_open_last24m",
    label: "New Accounts Opened (24 mo)",
    help: "How many new credit accounts were opened in last 24 months.",
    type: "number",
  },
  {
    key: "max_account_balance",
    label: "Largest Single Account Balance",
    help: "Highest current balance on any single account.",
    type: "number",
  },
  {
    key: "total_balance",
    label: "Total Current Balance",
    help: "Sum of balances across all open accounts.",
    type: "number",
  },
];

const initialState = fieldMeta.reduce((acc, f) => {
  acc[f.key] = "";
  return acc;
}, {});

export default function Home() {
  const [form, setForm] = useState(initialState);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    const payload = {};
    Object.keys(form).forEach((k) => {
      const raw = form[k];
      if (raw !== "") {
        if (raw === "yes") {
          payload[k] = 1;
        } else if (raw === "no") {
          payload[k] = 0;
        } else {
          const v = parseFloat(raw);
          if (!isNaN(v)) payload[k] = v;
          else payload[k] = raw;
        }
      }
    });
    try {
      const base =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
      const res = await axios.post(`${base}/predict`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      setResult(res.data);
    } catch (err) {
      setError(err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(initialState);
    setResult(null);
  };

  return (
    <main
      style={{
        maxWidth: 1000,
        margin: "30px auto",
        fontFamily: "system-ui",
        padding: "0 12px",
      }}
    >
      <h1 style={{ marginBottom: 4 }}>Credit Risk Predictor</h1>
      <p style={{ marginTop: 0, color: "#444" }}>
        Provide the applicant's credit profile details. Leave a field blank if
        unknown (the model may fallback to defaults).
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
          gap: 16,
          alignItems: "start",
        }}
      >
        {fieldMeta.map((f) => (
          <div key={f.key} style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor={f.key}
              style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}
            >
              {f.label}
            </label>
            {f.type === "boolean" ? (
              <select
                id={f.key}
                name={f.key}
                value={form[f.key]}
                onChange={handleChange}
                style={{
                  padding: 6,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                }}
              >
                <option value="">(Select)</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            ) : (
              <input
                id={f.key}
                name={f.key}
                type="number"
                value={form[f.key]}
                onChange={handleChange}
                placeholder={f.label}
                style={{
                  padding: 6,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                }}
              />
            )}
            <span
              style={{
                fontSize: 11,
                color: "#666",
                marginTop: 4,
                lineHeight: 1.3,
              }}
            >
              {f.help}
            </span>
          </div>
        ))}
        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            gap: 12,
            marginTop: 8,
          }}
        >
          <button
            type="submit"
            disabled={loading}
            style={{ padding: "10px 22px", fontWeight: 600 }}
          >
            {loading ? "Predicting..." : "Predict Risk"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            style={{ padding: "10px 18px" }}
          >
            Reset
          </button>
        </div>
      </form>

      {error && (
        <div style={{ marginTop: 24, color: "#b00020", fontWeight: 500 }}>
          Error: {error}
        </div>
      )}
      {result && (
        <div
          style={{
            marginTop: 32,
            padding: 24,
            border: "1px solid #ddd",
            borderRadius: 10,
            background: "#fafafa",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Result</h2>
          <p style={{ margin: "4px 0" }}>
            Status: <strong>{result.status}</strong>
          </p>
          <p style={{ margin: "4px 0" }}>Prediction: {result.prediction}</p>
          <p style={{ margin: "4px 0" }}>
            Probability Bad: {(result.probability_bad * 100).toFixed(2)}%
          </p>
          <p style={{ margin: "4px 0" }}>
            Probability Good: {(result.probability_good * 100).toFixed(2)}%
          </p>
          <p style={{ margin: "4px 0" }}>
            Threshold Used: {result.threshold_used}
          </p>
          <p style={{ margin: "4px 0" }}>
            Model Version: {result.model_version}
          </p>
        </div>
      )}
    </main>
  );
}
