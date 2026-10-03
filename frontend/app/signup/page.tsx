'use client';

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "../../components/Nav";
import { api } from "../../lib/api";

export default function Signup() {
  const router = useRouter();

  const [role, setRole] = useState<"student" | "professor">("student");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleDetails, setRoleDetails] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api("/signup", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          fullName,
          role,
          roleDetails,
        }),
      });

      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Nav />

      <main className="signup-page">
        <div className="signup-wrapper">

          {/* Decorative heading */}
          <div className="signup-intro">
            <div className="signup-sticker">JOIN DOUBTOUT ✨</div>

            <h1>
              Create your
              <span> account.</span>
            </h1>

            <p>
              Ask questions, share knowledge and learn together
              with the DoubtOut community.
            </p>
          </div>

          {/* Signup card */}
          <form className="signup-card" onSubmit={submit}>

            <div className="card-top">
              <div>
                <h2>Let's get started!</h2>
                <p>Use your BMSCE email address.</p>
              </div>

              <div className="card-icon">👋</div>
            </div>

            {error && (
              <div className="signup-error">
                ⚠️ {error}
              </div>
            )}

            {/* Role */}
            <div className="signup-field">
              <label>Who are you?</label>

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
                    <small>Ask & solve doubts</small>
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
                    <small>Answer & guide students</small>
                  </span>
                </button>
              </div>
            </div>

            {/* Full name */}
            <div className="signup-field">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email */}
            <div className="signup-field">
              <label htmlFor="email">BMSCE email</label>
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
            <div className="signup-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
              />
            </div>

            {/* Branch / department */}
            <div className="signup-field">
              <label htmlFor="roleDetails">
                {role === "student"
                  ? "Branch"
                  : "Department / role details"}
              </label>

              <input
                id="roleDetails"
                value={roleDetails}
                onChange={(e) => setRoleDetails(e.target.value)}
                placeholder={
                  role === "student"
                    ? "e.g. Computer Science"
                    : "e.g. CSE Professor"
                }
                required
              />
            </div>

            <button
              className="signup-submit"
              disabled={loading}
              type="submit"
            >
              {loading ? "Creating account..." : "Create my account →"}
            </button>

            <p className="login-hint">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
              >
                Login here
              </button>
            </p>
          </form>

        </div>
      </main>

      <style jsx>{`
        .signup-page {
          min-height: calc(100vh - 72px);
          background: #f0f8ff;
          padding: 55px 20px 80px;
          display: flex;
          justify-content: center;
        }

        .signup-wrapper {
          width: 100%;
          max-width: 900px;
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 45px;
          align-items: center;
        }

        .signup-intro {
          padding: 20px 5px;
        }

        .signup-sticker {
          display: inline-block;
          background: #2563eb;
          color: white;
          border: 3px solid #1f2937;
          padding: 9px 15px;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 1px;
          box-shadow: 5px 5px 0 #1f2937;
          transform: rotate(-2deg);
          margin-bottom: 25px;
        }

        .signup-intro h1 {
          color: #1f2937;
          font-size: clamp(42px, 5vw, 62px);
          line-height: 0.98;
          margin: 0;
          font-weight: 950;
          letter-spacing: -2px;
        }

        .signup-intro h1 span {
          color: #2563eb;
        }

        .signup-intro p {
          color: #4b5563;
          font-size: 17px;
          line-height: 1.65;
          margin-top: 25px;
          max-width: 330px;
        }

        .signup-card {
          background: white;
          border: 4px solid #1f2937;
          border-radius: 18px;
          padding: 30px;
          box-shadow: 9px 9px 0 #1f2937;
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 25px;
        }

        .card-top h2 {
          margin: 0;
          color: #1f2937;
          font-size: 27px;
          font-weight: 900;
        }

        .card-top p {
          margin: 5px 0 0;
          color: #6b7280;
          font-size: 14px;
        }

        .card-icon {
          width: 52px;
          height: 52px;
          border: 3px solid #1f2937;
          border-radius: 12px;
          background: #dcfce7;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
          box-shadow: 4px 4px 0 #1f2937;
        }

        .signup-error {
          background: #fee2e2;
          color: #991b1b;
          border: 3px solid #991b1b;
          padding: 12px 14px;
          border-radius: 9px;
          font-weight: 700;
          margin-bottom: 18px;
        }

        .signup-field {
          margin-bottom: 17px;
        }

        .signup-field label {
          display: block;
          color: #1f2937;
          font-size: 14px;
          font-weight: 900;
          margin-bottom: 7px;
        }

        .signup-field input {
          width: 100%;
          box-sizing: border-box;
          padding: 13px 14px;
          border: 3px solid #1f2937;
          border-radius: 8px;
          background: #f8fafc;
          color: #1f2937;
          font-size: 15px;
          outline: none;
          transition: 0.15s ease;
        }

        .signup-field input:focus {
          background: white;
          box-shadow: 4px 4px 0 #2563eb;
          transform: translate(-1px, -1px);
        }

        .signup-field input::placeholder {
          color: #9ca3af;
        }

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
          border: 3px solid #1f2937;
          border-radius: 9px;
          background: #f8fafc;
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
          font-size: 23px;
        }

        .role-option strong {
          display: block;
          color: #1f2937;
          font-size: 14px;
          font-weight: 900;
        }

        .role-option small {
          display: block;
          color: #6b7280;
          font-size: 11px;
          margin-top: 2px;
        }

        .signup-submit {
          width: 100%;
          margin-top: 5px;
          padding: 15px;
          border: 3px solid #1f2937;
          border-radius: 9px;
          background: #22c55e;
          color: #172015;
          font-size: 16px;
          font-weight: 950;
          cursor: pointer;
          box-shadow: 5px 5px 0 #1f2937;
          transition: 0.15s ease;
        }

        .signup-submit:hover:not(:disabled) {
          transform: translate(2px, 2px);
          box-shadow: 3px 3px 0 #1f2937;
        }

        .signup-submit:active:not(:disabled) {
          transform: translate(5px, 5px);
          box-shadow: none;
        }

        .signup-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .login-hint {
          text-align: center;
          color: #6b7280;
          font-size: 13px;
          margin: 22px 0 0;
        }

        .login-hint button {
          border: none;
          background: transparent;
          color: #2563eb;
          font-weight: 900;
          cursor: pointer;
          padding: 0;
        }

        .login-hint button:hover {
          text-decoration: underline;
        }

        @media (max-width: 750px) {
          .signup-wrapper {
            grid-template-columns: 1fr;
            max-width: 540px;
            gap: 20px;
          }

          .signup-intro {
            text-align: center;
          }

          .signup-intro p {
            margin-left: auto;
            margin-right: auto;
          }

          .signup-intro h1 {
            font-size: 45px;
          }
        }

        @media (max-width: 480px) {
          .signup-page {
            padding: 35px 14px 60px;
          }

          .signup-card {
            padding: 21px;
            box-shadow: 6px 6px 0 #1f2937;
          }

          .role-options {
            grid-template-columns: 1fr;
          }

          .signup-intro h1 {
            font-size: 39px;
          }
        }
      `}</style>
    </>
  );
}