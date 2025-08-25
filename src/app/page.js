"use client";
import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Shield, Users } from "lucide-react";
import Image from "next/image";

export default function ScardLandingPage({
  // Logo and Brand Images
  // ,

  // Mobile App Screenshots
  mobileAppScreenshot = "/hand_phone.jpg",

  // Credit Card Images
  primaryCardImage = "/background_image.jpg",
  secondaryCardImage = "/caption_image.jpg",

  // Background Images
  backgroundImage = null,

  // Icon Images (optional - will fallback to Lucide icons)
  securityIcon = null,
  networkIcon = null,

  // Decorative Images
  sparkleIcon = null,
}) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white relative overflow-x-hidden overflow-hidden">
      {/* Background Image or Gradients */}
      {backgroundImage ? (
        <div className="absolute inset-0 opacity-40">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover blur-sm scale-105"
            priority
          />
        </div>
      ) : (
        <>
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-radial from-purple-800/40 via-purple-900/10 to-transparent opacity-60 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-radial from-lime-400/30 via-lime-400/10 to-transparent opacity-40 animate-spin-slow"></div>
          <div className="absolute top-1/2 left-1/2 w-[1200px] h-[1200px] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-white/5 via-purple-400/10 to-transparent opacity-20 blur-2xl"></div>
        </>
      )}

      {/* HERO SECTION: Main Content Container + CTA Buttons */}
      <motion.div
        className="relative px-6 lg:px-12 min-h-screen flex items-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              className="space-y-10"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="space-y-6">
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    Credit Risk Scoring System:{" "}
                  </motion.span>
                  <motion.span
                    className="bg-gradient-to-r from-lime-400 via-purple-400 to-white bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    An End-to-End ML Project
                  </motion.span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-lime-400/20 via-purple-400/20 to-transparent rounded-2xl blur-xl"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <p className="relative text-gray-200 text-xl lg:text-2xl leading-relaxed max-w-xl font-medium bg-white/5 rounded-xl px-4 py-3 shadow-lg backdrop-blur-md border border-white/10">
                    A machine learning–powered solution using{" "}
                    <span className="text-lime-400 font-bold">
                      Logistic Regression
                    </span>{" "}
                    to classify &quot;good&quot; vs. &quot;bad&quot; credit,
                    deployed with{" "}
                    <span className="text-purple-400 font-bold">FastAPI</span>{" "}
                    and <span className="text-lime-400 font-bold">Next.js</span>
                    .
                  </p>
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                {/* Primary CTA */}
                <motion.button
                  className="relative inline-flex items-center justify-center gap-3 rounded-full px-8 py-3.5 text-sm font-semibold text-black bg-gradient-to-r from-lime-400 via-purple-400 to-indigo-500 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-lime-400/40 transition-shadow"
                  onClick={() => router.push("/getstarted")}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Try the Live Demo</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                {/* Secondary CTA */}
                <motion.button
                  className="relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-white/80 border border-white/25 hover:text-white hover:border-lime-400/50 focus:outline-none focus:ring-4 focus:ring-purple-400/30 transition-colors"
                  onClick={() => router.push("/howtouse")}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>How to use this</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Content - Enhanced 3-Card Showcase */}
            <motion.div
              className="relative lg:block mt-10 md:mt-0 mb-[36vh]"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Floating Elements */}
              <motion.div
                className="absolute mt-[14vh] -top-8 -right-8 z-30"
                animate={{
                  rotate: [0, 180, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {sparkleIcon ? (
                  <div className="w-12 h-12 relative">
                    <Image
                      src={sparkleIcon}
                      alt="Decoration"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-lime-400 text-6xl drop-shadow-2xl">
                    ✦
                  </div>
                )}
              </motion.div>

              {/* Enhanced Card Stack */}
              <ThreeCardShowcase
                primaryCardImage={primaryCardImage}
                secondaryCardImage={secondaryCardImage}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* SECTIONS BELOW HERO */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-12">
        {/* Architecture Section */}
        <div className="pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="inline-block w-6 h-6">
              <Image
                src="/globe.svg"
                alt="Architecture"
                width={24}
                height={24}
              />
            </span>
            Project Architecture
          </h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 shadow-md">
              <span className="inline-block w-6 h-6">
                <Image src="/file.svg" alt="Backend" width={24} height={24} />
              </span>
              <div>
                <span className="font-semibold text-lime-400">Backend:</span>{" "}
                FastAPI REST API serving <code>/predict</code> endpoint and
                model artifacts.
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 shadow-md">
              <span className="inline-block w-6 h-6">
                <Image
                  src="/window.svg"
                  alt="Frontend"
                  width={24}
                  height={24}
                />
              </span>
              <div>
                <span className="font-semibold text-purple-400">Frontend:</span>{" "}
                Next.js form interface for API interaction.
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 shadow-md">
              <span className="inline-block w-6 h-6">
                <Image
                  src="/caption_image.jpg"
                  alt="Model"
                  width={24}
                  height={24}
                />
              </span>
              <div>
                <span className="font-semibold text-lime-400">Model:</span>{" "}
                Logistic Regression for good vs. bad credit classification.
              </div>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="inline-block w-6 h-6">
              <Shield className="w-6 h-6 text-lime-400" />
            </span>
            Key Features
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>Automated data cleaning and missing value imputation</li>
            <li>Scalable, production-ready artifact loading and serving</li>
            {/* <li>
              Demo setup via <code>create_synthetic_artifacts.py</code>{" "}
              for easy testing
            </li> */}
          </ul>
        </div>

        {/* Tech Stack Section */}
        <div className="pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="inline-block w-6 h-6">
              <Image src="/next.svg" alt="Tech Stack" width={24} height={24} />
            </span>
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <span className="inline-flex items-center gap-1 bg-white/10 rounded px-3 py-1 text-base font-semibold">
              <Image src="/file.svg" alt="FastAPI" width={20} height={20} />{" "}
              FastAPI
            </span>
            <span className="inline-flex items-center gap-1 bg-white/10 rounded px-3 py-1 text-base font-semibold">
              <Image src="/file.svg" alt="Python" width={20} height={20} />{" "}
              Python
            </span>
            <span className="inline-flex items-center gap-1 bg-white/10 rounded px-3 py-1 text-base font-semibold">
              <Image
                src="/file.svg"
                alt="scikit-learn"
                width={20}
                height={20}
              />{" "}
              scikit-learn
            </span>
            <span className="inline-flex items-center gap-1 bg-white/10 rounded px-3 py-1 text-base font-semibold">
              <Image src="/next.svg" alt="Next.js" width={20} height={20} />{" "}
              Next.js
            </span>
            <span className="inline-flex items-center gap-1 bg-white/10 rounded px-3 py-1 text-base font-semibold">
              <Image src="/vercel.svg" alt="React" width={20} height={20} />{" "}
              React
            </span>
            <span className="inline-flex items-center gap-1 bg-white/10 rounded px-3 py-1 text-base font-semibold">
              <Image
                src="/globe.svg"
                alt="Tailwind CSS"
                width={20}
                height={20}
              />{" "}
              Tailwind CSS
            </span>
            <span className="inline-flex items-center gap-1 bg-white/10 rounded px-3 py-1 text-base font-semibold">
              <Image src="/window.svg" alt="Uvicorn" width={20} height={20} />{" "}
              Uvicorn
            </span>
            <span className="inline-flex items-center gap-1 bg-white/10 rounded px-3 py-1 text-base font-semibold">
              <Image src="/window.svg" alt="npm" width={20} height={20} /> npm
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mini component inside same file for simplicity
// Enhanced Three Card Showcase Component
function ThreeCardShowcase({ primaryCardImage, secondaryCardImage }) {
  const containerRef = React.useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sheen = useMotionValue(0);

  const rotateX = useTransform(rx, [-1, 1], [12, -12]);
  const rotateY = useTransform(ry, [-1, 1], [-12, 12]);
  const sheenOpacity = useTransform(sheen, [0, 1], [0, 0.6]);

  function handleMove(e) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    ry.set((x - 0.5) * 2);
    rx.set((y - 0.5) * 2);
    sheen.set(1);
  }

  function reset() {
    animate(rx, 0, { duration: 0.6, ease: "easeOut" });
    animate(ry, 0, { duration: 0.6, ease: "easeOut" });
    animate(sheen, 0, { duration: 0.8, ease: "easeOut" });
  }

  const cardBase =
    "rounded-3xl overflow-hidden relative will-change-transform select-none border border-white/15";
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className=" flex justify-center items-center"
      style={{ width: 500, height: 400 }}
    >
      <motion.div
        ref={containerRef}
        className="w-full h-full [perspective:2000px]"
        onMouseMove={handleMove}
        onMouseLeave={() => {
          reset();
          setIsHovered(false);
        }}
        onMouseEnter={() => setIsHovered(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        {/* Background Ambient Light */}
        <motion.div
          className="absolute -inset-12 bg-gradient-radial from-lime-400/30 via-purple-500/15 to-transparent rounded-full blur-3xl"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : [1, 1.05, 1],
            opacity: isHovered ? [0.6, 0.9, 0.6] : [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: isHovered ? 3 : 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Third Card (Bottom Back) */}
        <motion.div
          className={`${cardBase} absolute top-20 left-12 w-72 h-44 bg-gradient-to-br from-indigo-800/70 via-slate-800/50 to-black/80 shadow-2xl`}
          style={{
            rotateX: useTransform(rx, [-1, 1], [6, -6]),
            rotateY: useTransform(ry, [-1, 1], [-6, 6]),
            translateZ: -100,
            scale: isHovered ? 1.02 : 1,
          }}
          initial={{ opacity: 0, y: 80, scale: 0.7, rotate: -18 }}
          animate={{
            opacity: 0.8,
            y: 0,
            scale: 1,
            rotate: -18,
            transition: { delay: 1.8, duration: 1, ease: [0.22, 1, 0.36, 1] },
          }}
          whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(255,255,255,0.15),transparent_70%)]" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={isHovered ? { x: ["-100%", "100%"] } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <div className="p-6 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <motion.div
                className="text-white/80 text-base font-mono tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
              >
                •••• •••• •••• 7892
              </motion.div>
              <div className="w-10 h-7 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md flex items-center justify-center text-white text-xs font-bold">
                VISA
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-white/60">PLATINUM MEMBER</div>
              <div className="text-sm text-white/90 font-semibold">
                ALEX CHEN
              </div>
            </div>
          </div>
        </motion.div>

        {/* Second Card (Middle) */}
        <motion.div
          className={`${cardBase} absolute top-12 right-8 w-80 h-48 bg-gradient-to-br from-purple-800/80 via-purple-700/60 to-black/70 shadow-2xl`}
          style={{
            rotateX: useTransform(rx, [-1, 1], [8, -8]),
            rotateY: useTransform(ry, [-1, 1], [-8, 8]),
            translateZ: -50,
            scale: isHovered ? 1.01 : 1,
          }}
          initial={{ opacity: 0, y: 70, scale: 0.8, rotate: 12 }}
          animate={{
            opacity: 0.9,
            y: 0,
            scale: 1,
            rotate: 12,
            transition: { delay: 1.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          }}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        >
          {secondaryCardImage && (
            <Image
              src={secondaryCardImage}
              alt="Secondary"
              fill
              className="object-cover opacity-30 mix-blend-overlay"
            />
          )}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.2),transparent_70%)]" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            animate={isHovered ? { x: ["-100%", "100%"] } : {}}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
          />
          <div className="p-7 h-full flex flex-col justify-between text-white">
            <div className="flex justify-between items-start">
              <motion.div
                className="space-y-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 }}
              >
                <div className="text-lg font-mono tracking-wider">
                  •••• •••• •••• 3456
                </div>
                <div className="text-xs opacity-80">GOLD REWARDS</div>
              </motion.div>
              <div className="w-12 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-md flex items-center justify-center text-black text-xs font-bold shadow-lg">
                GOLD
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xs opacity-70">EXPIRES</div>
              <div className="flex justify-between items-end">
                <div className="text-lg font-bold">SARAH JONES</div>
                <div className="text-sm font-mono">08/29</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Primary Card (Front) */}
        <motion.div
          className={`${cardBase} absolute top-0 left-1/2 transform -translate-x-1/2 w-88 h-56 shadow-[0_0_0_1px_rgba(255,255,255,0.25),0_12px_50px_-10px_rgba(132,204,22,0.8),0_0_80px_0_rgba(168,85,247,0.6)] bg-gradient-to-br from-gray-900 via-purple-900/80 to-black/90`}
          style={{
            rotateX: useTransform(rx, [-1, 1], [12, -12]),
            rotateY: useTransform(ry, [-1, 1], [-12, 12]),
            scale: isHovered ? 1.03 : 1,
          }}
          initial={{ opacity: 0, y: 60, scale: 0.85 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          }}
          whileHover={{
            scale: 1.05,
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.3), 0 20px 60px -12px rgba(132,204,22,0.9), 0 0 100px 0 rgba(168,85,247,0.7)",
            transition: { duration: 0.3 },
          }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 opacity-60 mix-blend-plus-lighter"
              style={{
                background:
                  "linear-gradient(120deg, #1e293b 0%, #4c1d95 30%, #84cc16 60%, #1e293b 100%)",
                backgroundSize: "300% 300%",
              }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {primaryCardImage && (
            <Image
              src={primaryCardImage}
              alt="Primary"
              fill
              className="object-cover opacity-25 mix-blend-overlay"
              priority
            />
          )}

          {/* Dynamic Sheen */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0) 15%, rgba(255,255,255,0.9) 48%, rgba(255,255,255,0) 70%)",
              mixBlendMode: "overlay",
              opacity: useTransform(sheen, [0, 1], [0, 0.8]),
            }}
          />

          {/* Interactive Sheen on Hover */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={
              isHovered
                ? {
                    background: [
                      "linear-gradient(115deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)",
                      "linear-gradient(115deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 70%)",
                      "linear-gradient(115deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)",
                    ],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            }}
            style={{ mixBlendMode: "overlay" }}
          />

          {/* Card Content */}
          <div className="relative z-10 h-full flex flex-col p-8 text-white font-semibold tracking-wide">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-3">
                <motion.div
                  className="flex gap-3 text-lg font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 0.8 }}
                >
                  {["5289", "3411", "9024", "1337"].map((seg, i) => (
                    <motion.span
                      key={seg}
                      className="tracking-widest"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2 + i * 0.15, duration: 0.6 }}
                      whileHover={{ scale: 1.1, color: "#84cc16" }}
                    >
                      {seg}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div
                  className="text-sm text-white/80 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5, duration: 0.6 }}
                >
                  CREDIT • ML POWERED • PREMIUM
                </motion.div>
              </div>

              <div className="flex items-center gap-3">
                <motion.div
                  className="w-12 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-sm font-bold border border-white/30"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 2.2,
                    duration: 0.8,
                    type: "spring",
                    bounce: 0.5,
                  }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(132, 204, 22, 0.3)",
                  }}
                >
                  ML
                </motion.div>
                <motion.div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-400 to-purple-500 shadow-lg"
                  animate={{
                    scale: isHovered ? [1, 1.3, 1] : [1, 1.1, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: isHovered ? 2 : 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ boxShadow: "0 0 20px rgba(132, 204, 22, 0.8)" }}
                />
              </div>
            </div>

            <div className="mt-auto flex justify-between items-end">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.3, duration: 0.8 }}
              >
                <p className="text-sm text-white/70 font-medium">CARDHOLDER</p>
                <motion.p
                  className="text-2xl font-bold bg-gradient-to-r from-white via-lime-200 to-purple-200 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  SCARD USER
                </motion.p>
                <p className="text-xs text-white/60">MEMBER SINCE 2023</p>
              </motion.div>

              <motion.div
                className="text-right space-y-2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.4, duration: 0.8 }}
              >
                <p className="text-sm text-white/70">EXPIRES</p>
                <p className="font-mono text-lg font-bold">12/30</p>
                <motion.div
                  className="w-16 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  CHIP
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Border Glow */}
          <div className="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none mix-blend-overlay" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// Custom Animations (add to your global CSS or Tailwind config)
/*
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px 5px #a3e63544, 0 0 40px 10px #a78bfa33; }
  50% { box-shadow: 0 0 40px 10px #a3e63599, 0 0 80px 20px #a78bfa66; }
}
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(12deg); }
  50% { transform: translateY(-16px) rotate(12deg); }
}
@keyframes float-reverse {
  0%, 100% { transform: translateY(0) rotate(-12deg); }
  50% { transform: translateY(16px) rotate(-12deg); }
}
@keyframes spin-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
*/
