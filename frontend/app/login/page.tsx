'use client';

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Nav from "../../components/Nav";
import { api, User } from "../../lib/api";

export default function Login() {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "professor">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await api<{ user: User }>("/login", {
        method: "POST",
        body: JSON.stringify({ email, password, role }),
      });

      localStorage.setItem("doubtoutUser", JSON.stringify(data.user));
      router.push(
        role === "student"
          ? "/student/dashboard"
          : "/professor/dashboard"
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Nav />

      <main className="login-page">
        <div className="login-wrapper">

          {/* Left section */}
          <section className="login-intro">
            <div className="login-sticker">
              WELCOME BACK 👋
            </div>

            <h1>
              Good to
              <span> see you!</span>
            </h1>

            <p>
              Log in to continue asking questions,
              sharing knowledge and helping your
              DoubtOut community.
            </p>

            <div className="login-doodle">
              <div className="doodle-line" />
              <span>Ready to learn?</span>
              <span className="doodle-arrow">→</span>
            </div>
          </section>

          {/* Login card */}
          <form className="login-card" onSubmit={submit}>

            <div className="login-card-header">
              <div>
                <h2>Login to DoubtOut</h2>
                <p>Access your DoubtOut dashboard.</p>
              </div>

              <div className="login-icon">🔐</div>
            </div>

            {error && (
              <div className="login-error">
                ⚠️ {error}
              </div>
            )}

            {/* Role */}
            <div className="login-field">
              <label>Login as</label>

              <div className="role-options">
                <button
                  type="button"
                  className={`role-option ${
                    role === "student" ? "active student" : ""
                  }`}
                  onClick={() => setRole("student")}
                >
                  <span className="role-icon">🎓</span>

                  <span>
                    <strong>Student</strong>
                    <small>Ask & learn</small>
                  </span>
                </button>

                <button
                  type="button"
                  className={`role-option ${
                    role === "professor" ? "active professor" : ""
                  }`}
                  onClick={() => setRole("professor")}
                >
                  <span className="role-icon">👨‍🏫</span>

                  <span>
                    <strong>Professor</strong>
                    <small>Teach & guide</small>
                  </span>
                </button>
              </div>
            </div>

            {/* Email */}
            <div className="login-field">
              <label htmlFor="email">
                BMSCE email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@bmsce.ac.in"
                required
              />
            </div>

            {/* Password */}
            <div className="login-field">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              className="login-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login to DoubtOut →"}
            </button>

            <div className="signup-link">
              <span>New to DoubtOut?</span>{" "}
              <Link href="/signup">
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </main>

      <style jsx>{`
        .login-page {
          min-height: calc(100vh - 72px);
          background: #f0f8ff;
          padding: 60px 20px 90px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-wrapper {
          width: 100%;
          max-width: 900px;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 55px;
          align-items: center;
        }

        /* --------------------------------
           LEFT INTRO
        -------------------------------- */

        .login-intro {
          padding: 10px;
        }

        .login-sticker {
          display: inline-block;
          padding: 9px 15px;
          background: #22c55e;
          color: #172015;
          border: 3px solid #1f2937;
          font-size: 13px;
          font-weight: 950;
          letter-spacing: 1px;
          box-shadow: 5px 5px 0 #1f2937;
          transform: rotate(-2deg);
          margin-bottom: 27px;
        }

        .login-intro h1 {
          margin: 0;
          color: #1f2937;
          font-size: clamp(45px, 5vw, 64px);
          line-height: 0.98;
          font-weight: 950;
          letter-spacing: -3px;
        }

        .login-intro h1 span {
          display: block;
          color: #2563eb;
        }

        .login-intro p {
          max-width: 350px;
          margin: 25px 0 0;
          color: #4b5563;
          font-size: 17px;
          line-height: 1.65;
        }

        .login-doodle {
          margin-top: 38px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #1f2937;
          font-size: 14px;
          font-weight: 900;
        }

        .doodle-line {
          width: 40px;
          height: 3px;
          background: #1f2937;
          transform: rotate(-4deg);
        }

        .doodle-arrow {
          color: #2563eb;
          font-size: 25px;
        }

        /* --------------------------------
           CARD
        -------------------------------- */

        .login-card {
          background: white;
          border: 4px solid #1f2937;
          border-radius: 18px;
          padding: 32px;
          box-shadow: 9px 9px 0 #1f2937;
        }

        .login-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 26px;
        }

        .login-card-header h2 {
          margin: 0;
          color: #1f2937;
          font-size: 28px;
          font-weight: 950;
        }

        .login-card-header p {
          margin: 5px 0 0;
          color: #6b7280;
          font-size: 14px;
        }

        .login-icon {
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          border: 3px solid #1f2937;
          border-radius: 12px;
          background: #dbeafe;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 4px 4px 0 #1f2937;
        }

        /* --------------------------------
           ERROR
        -------------------------------- */

        .login-error {
          margin-bottom: 19px;
          padding: 12px 14px;
          background: #fee2e2;
          color: #991b1b;
          border: 3px solid #991b1b;
          border-radius: 9px;
          font-size: 14px;
          font-weight: 800;
        }

        /* --------------------------------
           FIELDS
        -------------------------------- */

        .login-field {
          margin-bottom: 19px;
        }

        .login-field label {
          display: block;
          margin-bottom: 7px;
          color: #1f2937;
          font-size: 14px;
          font-weight: 950;
        }

        .login-field input {
          width: 100%;
          box-sizing: border-box;
          padding: 14px;
          border: 3px solid #1f2937;
          border-radius: 8px;
          background: #f8fafc;
          color: #1f2937;
          font-size: 15px;
          outline: none;
          transition: 0.15s ease;
        }

        .login-field input:focus {
          background: white;
          box-shadow: 4px 4px 0 #2563eb;
          transform: translate(-1px, -1px);
        }

        .login-field input::placeholder {
          color: #9ca3af;
        }

        /* --------------------------------
           ROLE SELECTOR
        -------------------------------- */

        .role-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .role-option {
          display: flex;
          align-items: center;
          gap: 10px;
          text-align: left;
          padding: 12px;
          background: #f8fafc;
          border: 3px solid #1f2937;
          border-radius: 9px;
          cursor: pointer;
          transition: 0.15s ease;
        }

        .role-option:hover {
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 0 #1f2937;
        }

        .role-option.active.student {
          background: #dbeafe;
          box-shadow: 4px 4px 0 #2563eb;
        }

        .role-option.active.professor {
          background: #dcfce7;
          box-shadow: 4px 4px 0 #16a34a;
        }

        .role-icon {
          font-size: 22px;
        }

        .role-option strong {
          display: block;
          color: #1f2937;
          font-size: 14px;
          font-weight: 950;
        }

        .role-option small {
          display: block;
          margin-top: 2px;
          color: #6b7280;
          font-size: 11px;
        }

        /* --------------------------------
           LOGIN BUTTON
        -------------------------------- */

        .login-submit {
          width: 100%;
          margin-top: 4px;
          padding: 15px;
          border: 3px solid #1f2937;
          border-radius: 9px;
          background: #2563eb;
          color: white;
          font-size: 16px;
          font-weight: 950;
          cursor: pointer;
          box-shadow: 5px 5px 0 #1f2937;
          transition: 0.15s ease;
        }

        .login-submit:hover:not(:disabled) {
          transform: translate(2px, 2px);
          box-shadow: 3px 3px 0 #1f2937;
        }

        .login-submit:active:not(:disabled) {
          transform: translate(5px, 5px);
          box-shadow: none;
        }

        .login-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        /* --------------------------------
           SIGNUP LINK
        -------------------------------- */

        .signup-link {
          margin-top: 22px;
          text-align: center;
          color: #6b7280;
          font-size: 13px;
        }

        .signup-link a {
          color: #2563eb;
          font-weight: 950;
          text-decoration: none;
        }

        .signup-link a:hover {
          text-decoration: underline;
        }

        /* --------------------------------
           RESPONSIVE
        -------------------------------- */

        @media (max-width: 750px) {
          .login-wrapper {
            grid-template-columns: 1fr;
            max-width: 540px;
            gap: 25px;
          }

          .login-intro {
            text-align: center;
          }

          .login-intro p {
            margin-left: auto;
            margin-right: auto;
          }

          .login-doodle {
            justify-content: center;
          }

          .login-intro h1 {
            font-size: 47px;
          }
        }

        @media (max-width: 480px) {
          .login-page {
            padding: 35px 14px 60px;
          }

          .login-card {
            padding: 21px;
            box-shadow: 6px 6px 0 #1f2937;
          }

          .role-options {
            grid-template-columns: 1fr;
          }

          .login-intro h1 {
            font-size: 40px;
          }
        }
      `}</style>
    </>
  );
}