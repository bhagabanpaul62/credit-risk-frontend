"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaArrowRight,
  FaArrowLeft,
  FaCheckCircle,
  FaUser,
  FaMoneyBill,
  FaChartLine,
  FaClipboardCheck,
} from "react-icons/fa";

// Field metadata for the credit risk model
const fieldMeta = [
  {
    key: "age",
    label: "Age (years)",
    help: "Applicant age in whole years.",
    type: "number",
    step: 1,
  },
  {
    key: "annual_income",
    label: "Annual Income",
    help: "Gross yearly income (numbers only, same currency as model).",
    type: "number",
    step: 2,
  },
  {
    key: "employment_years",
    label: "Years in Current Job",
    help: "Full years employed in current position.",
    type: "number",
    step: 2,
  },
  {
    key: "derogatory_marks",
    label: "Derogatory Marks",
    help: "Count of negative / derogatory credit report items (collections, liens, etc.).",
    type: "number",
    step: 2,
  },
  {
    key: "inquiries_last6m",
    label: "Credit Checks (6 mo)",
    help: "Number of hard credit inquiries in the last 6 months.",
    type: "number",
    step: 2,
  },
  {
    key: "inquiries_finance_24m",
    label: "Finance Inquiries (24 mo)",
    help: "Hard inquiries specifically for finance / loan products (24 months).",
    type: "number",
    step: 2,
  },
  {
    key: "total_accounts",
    label: "Total Credit Accounts",
    help: "Total number of credit accounts ever opened (closed + open).",
    type: "number",
    step: 2,
  },
  {
    key: "active_accounts",
    label: "Open Credit Accounts",
    help: "Number of currently open credit accounts (revolving + installment).",
    type: "number",
    step: 2,
  },
  {
    key: "high_credit_util_75",
    label: "Any Account Utilization ≥ 75%?",
    help: "Select Yes if ANY single revolving line is using 75% or more of its limit.",
    type: "boolean",
    step: 3,
  },
  {
    key: "util_50_plus",
    label: "Overall Utilization ≥ 50%?",
    help: "Yes if overall revolving balance / total revolving limit is ≥ 50%.",
    type: "boolean",
    step: 3,
  },
  {
    key: "balance_high_credit_pct",
    label: "Balance / Credit Limit %",
    help: "Average balance as a percent of high credit / limits (0–100).",
    type: "number",
    step: 3,
  },
  {
    key: "satisfied_pct",
    label: "% Accounts Satisfied",
    help: "Percent of accounts fully paid / satisfied (0–100).",
    type: "number",
    step: 3,
  },
  {
    key: "delinquency_30_60_24m",
    label: "30–60 Day Lates (24 mo)",
    help: "Count of 30–60 day delinquencies in last 24 months.",
    type: "number",
    step: 3,
  },
  {
    key: "delinquency_90d_24m",
    label: "90+ Day Lates (24 mo)",
    help: "Count of 90+ day delinquencies in last 24 months.",
    type: "number",
    step: 3,
  },
  {
    key: "delinquencies_60d",
    label: "All 60+ Day Lates (lifetime)",
    help: "Total historical 60+ day delinquencies (if model expects 24m, use that horizon).",
    type: "number",
    step: 3,
  },
  {
    key: "chargeoffs_last24m",
    label: "Charge-offs (24 mo)",
    help: "Number of accounts charged off in last 24 months.",
    type: "number",
    step: 3,
  },
  {
    key: "derog_or_bad_cnt",
    label: "Derog/Bad Accounts Count",
    help: "Total count of derogatory or bad status accounts (collections, charge-offs, etc.).",
    type: "number",
    step: 3,
  },
  {
    key: "accounts_open_last24m",
    label: "New Accounts Opened (24 mo)",
    help: "How many new credit accounts were opened in last 24 months.",
    type: "number",
    step: 3,
  },
  {
    key: "max_account_balance",
    label: "Largest Single Account Balance",
    help: "Highest current balance on any single account.",
    type: "number",
    step: 3,
  },
  {
    key: "total_balance",
    label: "Total Current Balance",
    help: "Sum of balances across all open accounts.",
    type: "number",
    step: 3,
  },
];

export default function GetStarted() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(
    fieldMeta.reduce((acc, field) => {
      acc[field.key] = "";
      return acc;
    }, {})
  );
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const steps = [
    "Basic Info",
    "Financial Info",
    "Credit History",
    "Review & Submit",
  ];

  useEffect(() => {
    if (window.location.hash !== "#wizard") {
      window.location.hash = "wizard";
    }
  }, []);

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function nextStep() {
    setCurrentStep((s) => Math.min(s + 1, 4));
  }

  function prevStep() {
    setCurrentStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const payload = {};
    Object.keys(formData).forEach((k) => {
      const raw = formData[k];
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
      setCurrentStep(4);
    } catch (err) {
      setError(err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }

  // Get fields for current step
  function getFieldsForStep(step) {
    return fieldMeta.filter((field) => field.step === step);
  }

  // Calculate dynamic assessment data based on result and formData
  function getAssessmentData() {
    if (!result) return null;

    const badProb = result.probability_bad || 0;
    const goodProb = result.probability_good || 0;

    // Calculate credit score (inverse relationship with bad probability)
    const creditScore = Math.round(900 - badProb * 400); // Scale from 500-900

    // Determine risk level
    const riskLevel =
      badProb < 0.2 ? "Low Risk" : badProb < 0.5 ? "Medium Risk" : "High Risk";
    const riskColor =
      badProb < 0.2 ? "emerald" : badProb < 0.5 ? "amber" : "rose";

    // Calculate score percentage for circular progress
    const scorePercentage = Math.round((creditScore / 900) * 100);

    // Generate key factors based on form data
    const keyFactors = [];

    // Income factor
    if (formData.annual_income) {
      const income = parseFloat(formData.annual_income);
      const incomeScore = Math.min(
        95,
        Math.max(30, (income / 100000) * 80 + 20)
      );
      keyFactors.push({
        label: "Annual Income Level",
        value: Math.round(incomeScore),
        negative: incomeScore < 50,
      });
    }

    // Employment stability
    if (formData.employment_years) {
      const years = parseFloat(formData.employment_years);
      const employmentScore = Math.min(95, years * 15 + 40);
      keyFactors.push({
        label: "Employment Stability",
        value: Math.round(employmentScore),
        negative: employmentScore < 50,
      });
    }

    // Credit utilization
    if (formData.balance_high_credit_pct !== "") {
      const util = parseFloat(formData.balance_high_credit_pct) || 0;
      const utilScore = Math.max(10, 95 - util);
      keyFactors.push({
        label: "Credit Utilization",
        value: Math.round(utilScore),
        negative: util > 50,
      });
    }

    // Payment history
    const delinquencies =
      (parseFloat(formData.delinquency_30_60_24m) || 0) +
      (parseFloat(formData.delinquency_90d_24m) || 0);
    if (delinquencies >= 0) {
      const paymentScore = Math.max(20, 95 - delinquencies * 20);
      keyFactors.push({
        label: "Payment History",
        value: Math.round(paymentScore),
        negative: delinquencies > 2,
      });
    }

    // Derogatory marks
    if (formData.derogatory_marks !== "") {
      const derogs = parseFloat(formData.derogatory_marks) || 0;
      const derogScore = Math.max(15, 85 - derogs * 25);
      keyFactors.push({
        label: "Credit Report Issues",
        value: Math.round(derogScore),
        negative: derogs > 1,
      });
    }

    // Generate factor analysis data
    const factorAnalysis = [
      {
        k: "Payment History",
        v: keyFactors.find((f) => f.label === "Payment History")?.value || 75,
      },
      {
        k: "Credit Utilization",
        v:
          keyFactors.find((f) => f.label === "Credit Utilization")?.value || 65,
      },
      {
        k: "Income Level",
        v:
          keyFactors.find((f) => f.label === "Annual Income Level")?.value ||
          70,
      },
      {
        k: "Employment",
        v:
          keyFactors.find((f) => f.label === "Employment Stability")?.value ||
          60,
      },
      {
        k: "Account Management",
        v: Math.max(20, 80 - (parseFloat(formData.derogatory_marks) || 0) * 15),
      },
    ].sort((a, b) => b.v - a.v);

    return {
      creditScore,
      scorePercentage,
      riskLevel,
      riskColor,
      badProbability: Math.round(badProb * 100),
      goodProbability: Math.round(goodProb * 100),
      keyFactors: keyFactors.slice(0, 5), // Limit to 5 factors
      factorAnalysis,
      riskDistribution: {
        low: Math.round(goodProb * 100),
        medium: Math.round((1 - goodProb - badProb) * 100),
        high: Math.round(badProb * 100),
      },
    };
  }

  const assessmentData = getAssessmentData();

  // Decorative background blobs
  const Blobs = () => (
    <>
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-40 z-0" />
      <div className="pointer-events-none absolute top-1/2 right-0 w-80 h-80 bg-violet-200 rounded-full blur-2xl opacity-30 z-0" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gradient-to-r from-indigo-100 via-violet-100 to-white rounded-full blur-2xl opacity-30 z-0" />
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-violet-100 text-slate-800 relative overflow-x-hidden text-sm sm:text-base">
      <Blobs />

      {/* Hero */}
      <section
        id="home"
        className="w-full border-b bg-gradient-to-b from-white via-violet-50 to-white relative z-10"
      >
        <div className="mx-auto max-w-6xl px-2 sm:px-4 py-8 sm:py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-violet-600 drop-shadow">
              Check your credit score instantly.
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-md">
              Our advanced AI analyzes your financial data to provide accurate
              credit risk assessment in minutes.
            </p>
            <div>
              <Link
                href="#wizard"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-500 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg hover:scale-105 hover:from-indigo-700 hover:to-violet-600 transition-all duration-200"
              >
                Get Started <FaArrowRight />
              </Link>
            </div>
          </div>
          <div className="flex justify-center mt-6 md:mt-0">
            <div className="relative w-full max-w-xs sm:max-w-md aspect-[4/3] drop-shadow-xl">
              <Image
                src="/window.svg"
                alt="Hero"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Wizard Section */}
      <section
        id="wizard"
        className="relative z-10 mx-auto max-w-6xl w-full px-2 sm:px-4 py-8 sm:py-12 space-y-6"
      >
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-violet-600 drop-shadow mb-2">
          Predict Your Credit Risk
        </h2>
        {/* Stepper */}
        <div className="flex items-center justify-center gap-6 text-xs text-slate-500 mb-4">
          {steps.map((label, idx) => (
            <div
              key={label}
              className="flex items-center gap-2 transition-all duration-300"
            >
              <div
                className={`size-8 grid place-items-center rounded-full border-2 shadow-md transition-all duration-300
                  ${
                    currentStep === idx + 1
                      ? "bg-gradient-to-br from-indigo-600 to-violet-500 text-white border-indigo-600 scale-110"
                      : "bg-white text-slate-600 border-slate-200"
                  }`}
              >
                {idx === 0 && <FaUser />}
                {idx === 1 && <FaMoneyBill />}
                {idx === 2 && <FaChartLine />}
                {idx === 3 && <FaClipboardCheck />}
              </div>
              <span
                className={`hidden sm:block font-semibold transition-colors duration-300 ${
                  currentStep === idx + 1 ? "text-indigo-700" : ""
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="rounded-2xl border shadow-xl p-4 sm:p-6 md:p-10 bg-white/70 backdrop-blur-lg transition-all duration-500 ring-1 ring-indigo-100">
          {currentStep === 1 && (
            <>
              <h3 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center gap-2">
                <FaUser className="text-indigo-500" /> Step 1: Basic Information
              </h3>
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                onSubmit={handleSubmit}
              >
                {getFieldsForStep(1).map((field) => (
                  <div
                    key={field.key}
                    className={field.key === "age" ? "md:col-span-2" : ""}
                  >
                    <label className="block text-xs mb-1 font-medium text-slate-700">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      value={formData[field.key]}
                      onChange={(e) => updateField(field.key, e.target.value)}
                      className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                      placeholder={field.label}
                    />
                    <span className="text-xs text-slate-500 mt-1 block">
                      {field.help}
                    </span>
                  </div>
                ))}
                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-500 px-6 py-2 text-base font-semibold text-white shadow-lg hover:scale-105 hover:from-indigo-700 hover:to-violet-600 transition-all duration-200"
                  >
                    Next Step <FaArrowRight />
                  </button>
                </div>
              </form>
            </>
          )}

          {currentStep === 2 && (
            <>
              <h3 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center gap-2">
                <FaMoneyBill className="text-green-500" /> Step 2: Financial
                Information
              </h3>
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                onSubmit={handleSubmit}
              >
                {getFieldsForStep(2).map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs mb-1 font-medium text-slate-700">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      value={formData[field.key]}
                      onChange={(e) => updateField(field.key, e.target.value)}
                      className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                      placeholder={field.label}
                    />
                    <span className="text-xs text-slate-500 mt-1 block">
                      {field.help}
                    </span>
                  </div>
                ))}
                <div className="md:col-span-2 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center gap-2 rounded-lg border px-6 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-200"
                  >
                    <FaArrowLeft /> Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-500 px-6 py-2 text-base font-semibold text-white shadow-lg hover:scale-105 hover:from-indigo-700 hover:to-violet-600 transition-all duration-200"
                  >
                    Next Step <FaArrowRight />
                  </button>
                </div>
              </form>
            </>
          )}

          {currentStep === 3 && (
            <>
              <h3 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center gap-2">
                <FaChartLine className="text-violet-500" /> Step 3: Credit
                History
              </h3>
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                onSubmit={handleSubmit}
              >
                {getFieldsForStep(3).map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs mb-1 font-medium text-slate-700">
                      {field.label}
                    </label>
                    {field.type === "boolean" ? (
                      <select
                        value={formData[field.key]}
                        onChange={(e) => updateField(field.key, e.target.value)}
                        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    ) : (
                      <input
                        type="number"
                        value={formData[field.key]}
                        onChange={(e) => updateField(field.key, e.target.value)}
                        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                        placeholder={field.label}
                      />
                    )}
                    <span className="text-xs text-slate-500 mt-1 block">
                      {field.help}
                    </span>
                  </div>
                ))}
                <div className="md:col-span-2 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center gap-2 rounded-lg border px-6 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-200"
                  >
                    <FaArrowLeft /> Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-500 px-6 py-2 text-base font-semibold text-white shadow-lg hover:scale-105 hover:from-indigo-700 hover:to-violet-600 transition-all duration-200"
                  >
                    Review <FaArrowRight />
                  </button>
                </div>
              </form>
            </>
          )}

          {currentStep === 4 && (
            <>
              <h3 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center gap-2">
                <FaClipboardCheck className="text-violet-500" /> Step 4: Review
                & Submit
              </h3>

              {/* Show error if any */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-medium">Error: {error}</p>
                </div>
              )}

              {/* Show results if available */}
              {result && (
                <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="text-lg font-semibold text-green-800 mb-4">
                    Prediction Result
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-600">Status:</span>
                      <span className="font-semibold">{result.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Prediction:</span>
                      <span className="font-semibold">{result.prediction}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">
                        Bad Risk Probability:
                      </span>
                      <span className="font-semibold">
                        {(result.probability_bad * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">
                        Good Risk Probability:
                      </span>
                      <span className="font-semibold">
                        {(result.probability_good * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Threshold:</span>
                      <span className="font-semibold">
                        {result.threshold_used}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Model Version:</span>
                      <span className="font-semibold">
                        {result.model_version}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {!result && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm mb-6">
                  {fieldMeta.map((field) => (
                    <div
                      key={field.key}
                      className="flex items-center justify-between rounded border px-3 py-2 bg-white/80"
                    >
                      <span className="text-zinc-500">{field.label}</span>
                      <span className="font-medium text-zinc-900">
                        {formData[field.key] || "–"}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-lg border px-6 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-200 disabled:opacity-50"
                >
                  <FaArrowLeft /> Back
                </button>
                {!result && (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-2 text-base font-semibold text-white shadow-lg hover:scale-105 hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50"
                  >
                    <FaCheckCircle /> {loading ? "Submitting..." : "Submit"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Dynamic Assessment Section - Only show when result is available */}
      {assessmentData && (
        <section className="mx-auto max-w-6xl w-full px-2 sm:px-4 pb-8 sm:pb-12 space-y-6 relative z-10">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-violet-600 drop-shadow mb-2">
            Your Credit Risk Assessment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Dynamic Credit Score */}
            <div className="rounded-2xl border shadow-xl p-8 bg-white/80 backdrop-blur-lg">
              <h4 className="text-base font-semibold mb-4 text-indigo-700">
                Credit Score
              </h4>
              <div className="flex items-center gap-6">
                <div className="relative size-32">
                  <svg viewBox="0 0 36 36" className="size-32">
                    <path
                      d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32"
                      fill="#F3F4F6"
                    />
                    <path
                      d="M18 2 a 16 16 0 1 1 0 32"
                      fill="none"
                      stroke={`${
                        assessmentData.riskColor === "emerald"
                          ? "#22c55e"
                          : assessmentData.riskColor === "amber"
                          ? "#f59e0b"
                          : "#ef4444"
                      }`}
                      strokeWidth="4"
                      strokeDasharray={`${assessmentData.scorePercentage} 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-center">
                      <div
                        className={`text-3xl font-bold text-${assessmentData.riskColor}-600`}
                      >
                        {assessmentData.creditScore}
                      </div>
                      <div className="text-xs text-zinc-500">out of 900</div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-zinc-600">
                  <div className="flex items-center gap-2 mb-2">
                    {["#ef4444", "#f59e0b", "#22c55e", "#16a34a"].map(
                      (c, i) => (
                        <div
                          key={i}
                          className="h-2 w-8 rounded"
                          style={{ backgroundColor: c }}
                        />
                      )
                    )}
                  </div>
                  <div
                    className={`rounded bg-${assessmentData.riskColor}-50 text-${assessmentData.riskColor}-700 px-2 py-1 inline-block font-semibold`}
                  >
                    {assessmentData.riskLevel}
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-1">
                    Probability of default: {assessmentData.badProbability}%
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Key Factors */}
            <div className="rounded-2xl border shadow-xl p-8 bg-white/80 backdrop-blur-lg">
              <h4 className="text-base font-semibold mb-4 text-indigo-700">
                Key Factors
              </h4>
              <ul className="space-y-3 text-sm">
                {assessmentData.keyFactors.map((factor, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span
                      className={`size-6 grid place-items-center rounded-full ${
                        factor.negative
                          ? "bg-rose-50 text-rose-600"
                          : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      ✓
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-700">{factor.label}</span>
                        <span
                          className={`font-semibold ${
                            factor.negative
                              ? "text-rose-600"
                              : "text-emerald-600"
                          }`}
                        >
                          {factor.value}%
                        </span>
                      </div>
                      <div className="h-2 rounded bg-zinc-100 mt-1">
                        <div
                          className={`h-2 rounded ${
                            factor.negative ? "bg-rose-400" : "bg-emerald-500"
                          }`}
                          style={{ width: `${factor.value}%` }}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dynamic Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Dynamic Factor Analysis */}
            <div className="rounded-2xl border shadow-xl p-8 bg-white/80 backdrop-blur-lg">
              <h4 className="text-base font-semibold mb-4 text-indigo-700">
                Factor Analysis
              </h4>
              <div className="space-y-3">
                {assessmentData.factorAnalysis.map((factor) => (
                  <div key={factor.k} className="text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span>{factor.k}</span>
                      <span className="text-zinc-500">
                        {Math.round(factor.v)}
                      </span>
                    </div>
                    <div className="h-2 rounded bg-zinc-100">
                      <div
                        className="h-2 rounded bg-indigo-500"
                        style={{
                          width: `${Math.min(
                            100,
                            (factor.v /
                              Math.max(
                                ...assessmentData.factorAnalysis.map((f) => f.v)
                              )) *
                              100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Risk Distribution */}
            <div className="rounded-2xl border shadow-xl p-8 bg-white/80 backdrop-blur-lg">
              <h4 className="text-base font-semibold mb-4 text-indigo-700">
                Risk Category Distribution
              </h4>
              <div className="flex items-center gap-6">
                <div className="relative size-32">
                  <svg
                    viewBox="0 0 36 36"
                    className="size-32 rotate-90 -scale-x-100"
                  >
                    <circle cx="18" cy="18" r="16" fill="#F3F4F6" />
                    <path
                      d="M18 2 a 16 16 0 0 1 0 32"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="4"
                      strokeDasharray={`${assessmentData.riskDistribution.low} 100`}
                    />
                    <path
                      d="M18 2 a 16 16 0 0 1 0 32"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="4"
                      strokeDasharray={`${assessmentData.riskDistribution.medium} 100`}
                      strokeDashoffset={-assessmentData.riskDistribution.low}
                    />
                    <path
                      d="M18 2 a 16 16 0 0 1 0 32"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="4"
                      strokeDasharray={`${assessmentData.riskDistribution.high} 100`}
                      strokeDashoffset={
                        -(
                          assessmentData.riskDistribution.low +
                          assessmentData.riskDistribution.medium
                        )
                      }
                    />
                  </svg>
                </div>
                <ul className="text-xs space-y-1">
                  <li>
                    <span className="inline-block size-2 rounded-full bg-emerald-500 mr-2" />
                    Low Risk: {assessmentData.riskDistribution.low}%
                  </li>
                  <li>
                    <span className="inline-block size-2 rounded-full bg-amber-500 mr-2" />
                    Medium Risk: {assessmentData.riskDistribution.medium}%
                  </li>
                  <li>
                    <span className="inline-block size-2 rounded-full bg-rose-500 mr-2" />
                    High Risk: {assessmentData.riskDistribution.high}%
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Additional Insights */}
          <div className="rounded-2xl border shadow-xl p-8 bg-white/80 backdrop-blur-lg">
            <h4 className="text-base font-semibold mb-4 text-indigo-700">
              Assessment Summary
            </h4>
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 text-sm">
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="text-2xl font-bold text-indigo-600 mb-1">
                  {result.prediction}
                </div>
                <div className="text-xs text-indigo-500">Model Prediction</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-violet-50">
                <div className="text-2xl font-bold text-violet-600 mb-1">
                  {result.model_version}
                </div>
                <div className="text-xs text-violet-500">Model Version</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="text-2xl font-bold text-emerald-600 mb-1">
                  {result.threshold_used}
                </div>
                <div className="text-xs text-emerald-500">
                  Decision Threshold
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-slate-50 to-gray-50 border-l-4 border-indigo-500">
              <p className="text-sm text-slate-600">
                <strong className="text-indigo-700">
                  Assessment Complete:
                </strong>{" "}
                Your credit risk analysis is based on{" "}
                {fieldMeta.filter((f) => formData[f.key] !== "").length} data
                points. The model shows a {assessmentData.badProbability}%
                probability of default risk.
                {assessmentData.badProbability < 20
                  ? " This indicates strong creditworthiness."
                  : assessmentData.badProbability < 50
                  ? " This suggests moderate credit risk that may require additional review."
                  : " This indicates higher risk that may impact credit decisions."}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-auto bg-gradient-to-br from-zinc-950 via-indigo-950 to-violet-950 text-zinc-200 relative z-10 border-t border-indigo-900 shadow-inner text-xs sm:text-sm">
        <div className="mx-auto max-w-6xl px-2 sm:px-4 py-8 sm:py-12 grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-10">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3 text-white mb-2">
              {/* Example SVG logo */}
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="#6366f1" />
                  <path
                    d="M8 13l2.5 2.5L16 10"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="font-bold text-lg tracking-tight">
                CreditSense
              </span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Advanced credit risk assessment platform powered by AI and machine
              learning.
            </p>
          </div>
          {/* Resources */}
          <div>
            <div className="font-semibold text-indigo-300 mb-2 tracking-wide">
              Resources
            </div>
            <ul className="space-y-1 text-zinc-400">
              <li>
                <a
                  href="#faq"
                  className="hover:text-indigo-300 transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-300 transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-300 transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <div className="font-semibold text-indigo-300 mb-2 tracking-wide">
              Legal
            </div>
            <ul className="space-y-1 text-zinc-400">
              <li>
                <a href="#" className="hover:text-indigo-300 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-300 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-indigo-300 transition-colors"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>
          {/* Connect */}
          <div>
            <div className="font-semibold text-indigo-300 mb-2 tracking-wide">
              Connect
            </div>
            <div className="flex items-center gap-4 mt-1">
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-sky-400 transition-colors text-xl"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.98C7.69 9.09 4.07 7.38 1.64 4.77c-.37.63-.58 1.36-.58 2.14 0 1.48.75 2.78 1.89 3.54a4.28 4.28 0 0 1-1.94-.54v.05c0 2.07 1.47 3.8 3.42 4.19-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.11 2.9 3.97 2.93A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.7 8.7 0 0 0 24 4.59a8.48 8.48 0 0 1-2.54.7z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="hover:text-white transition-colors text-xl"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-sky-300 transition-colors text-xl"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.76-1.75 1.76zm13.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.62 2.01 3.62 4.62v4.71z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-indigo-900/50 text-xs text-zinc-400 bg-zinc-950/80">
          <div className="mx-auto max-w-6xl px-2 sm:px-4 py-4 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-2">
            <div>
              © 2025{" "}
              <span className="font-semibold text-indigo-300">CreditSense</span>
              . All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#contact"
                className="hover:text-indigo-300 transition-colors"
              >
                Contact
              </a>
              <a href="#" className="hover:text-indigo-300 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-indigo-300 transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
