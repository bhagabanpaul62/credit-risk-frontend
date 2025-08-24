"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  FileText,
  PieChart,
  Users,
  Database,
  CreditCard,
  Lock,
  PenTool,
} from "lucide-react";

export default function HowToUsePage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white relative overflow-x-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-radial from-purple-800/40 via-purple-900/10 to-transparent opacity-60 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-radial from-lime-400/30 via-lime-400/10 to-transparent opacity-40 animate-spin-slow"></div>
      <div className="absolute top-1/2 left-1/2 w-[1200px] h-[1200px] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-white/5 via-purple-400/10 to-transparent opacity-20 blur-2xl"></div>

      {/* Header with Back Button */}
      <header className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <motion.h1
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-purple-400 to-white">
              How to Use
            </span>{" "}
            the Credit Risk System
          </motion.h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 gap-12 lg:gap-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Overview Section */}
            <motion.div className="space-y-8" variants={itemVariants}>
              <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-purple-400">
                  System Overview
                </h2>
                <p className="text-gray-300 mb-4">
                  The Credit Risk Scoring System uses machine learning to
                  predict creditworthiness based on financial and demographic
                  data. It&apos;s designed to help:
                </p>
                <ul className="space-y-3">
                  {[
                    {
                      icon: <Users className="text-purple-400" />,
                      text: "Financial institutions assess loan applicants",
                    },
                    {
                      icon: <CreditCard className="text-lime-400" />,
                      text: "Individuals understand their credit standing",
                    },
                    {
                      icon: <PieChart className="text-purple-400" />,
                      text: "Analysts visualize credit risk factors",
                    },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1">{item.icon}</div>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-purple-400">
                  Technical Details
                </h2>
                <p className="text-gray-300 mb-4">
                  This end-to-end machine learning solution uses:
                </p>
                <ul className="space-y-3">
                  {[
                    {
                      icon: <Database className="text-purple-400" />,
                      text: "Logistic Regression for binary classification",
                    },
                    {
                      icon: <FileText className="text-lime-400" />,
                      text: "FastAPI backend for model deployment",
                    },
                    {
                      icon: <PenTool className="text-purple-400" />,
                      text: "Next.js frontend for interactive UI",
                    },
                    {
                      icon: <Lock className="text-lime-400" />,
                      text: "Secure data handling protocols",
                    },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1">{item.icon}</div>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Step-by-Step Guide */}
            <motion.div className="space-y-8" variants={itemVariants}>
              <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-purple-400">
                  Step-by-Step Guide
                </h2>
                <ol className="relative border-l border-white/20 ml-3 space-y-8 py-2">
                  {[
                    {
                      title: "Enter Basic Information",
                      content:
                        "Provide your age and income details as the foundation for the credit assessment.",
                    },
                    {
                      title: "Add Financial History",
                      content:
                        "Enter employment years and account details for a comprehensive financial picture.",
                    },
                    {
                      title: "Credit History Details",
                      content:
                        "Provide derogatory marks, inquiries, and utilization rates for credit pattern analysis.",
                    },
                    {
                      title: "Review and Submit",
                      content:
                        "Verify all information before submission to ensure accurate predictions.",
                    },
                  ].map((step, index) => (
                    <li key={index} className="ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 bg-gradient-to-r from-lime-400 to-purple-400 text-black font-bold">
                        {index + 1}
                      </span>
                      <h3 className="font-semibold text-xl mb-1">
                        {step.title}
                      </h3>
                      <p className="text-gray-300">{step.content}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-purple-400">
                  Understanding Results
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 mt-1" />
                    <div>
                      <h3 className="font-semibold text-xl">
                        Good Credit Risk
                      </h3>
                      <p className="text-gray-300">
                        High probability of meeting financial obligations.
                        Favorable terms likely.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-400 mt-1" />
                    <div>
                      <h3 className="font-semibold text-xl">
                        Moderate Credit Risk
                      </h3>
                      <p className="text-gray-300">
                        Some concerns present. May qualify with additional
                        conditions or higher rates.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-400 mt-1" />
                    <div>
                      <h3 className="font-semibold text-xl">
                        High Credit Risk
                      </h3>
                      <p className="text-gray-300">
                        Significant concerns detected. May require secured
                        options or credit improvement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="inline-block p-px rounded-2xl bg-gradient-to-r from-lime-400 via-purple-400 to-purple-900">
              <Link
                href="/getstarted"
                className="group relative flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-br from-gray-900/95 to-black backdrop-blur-lg hover:from-gray-900/80 hover:to-black/90 transition-all duration-300"
              >
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-purple-400">
                  Try the Live Demo Now
                </span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-2 transition-transform" />
                </motion.div>
              </Link>
            </div>
            <p className="text-gray-400 mt-4">
              See the credit risk scoring system in action with your own data
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
