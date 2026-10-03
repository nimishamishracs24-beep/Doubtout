'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { getStoredUser } from "../lib/api";

type User = {
  user_id: number;
  role: string;
  full_name?: string;
};

export default function Nav() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  function logout() {
    localStorage.removeItem("doubtoutUser");
    window.location.href = "/login";
  }

  return (
    <header className="nav-wrapper">
      <nav className="nav">

        {/* Logo */}
        <Link
          href={
            user?.role === "professor"
              ? "/professor/dashboard"
              : "/student/dashboard"
          }
          className="logo"
        >
          <span className="logo-icon">📖</span>
          <span>doubtout</span>
        </Link>

        {/* Navigation */}
        <div className="nav-links">

          <Link
            href={
              user?.role === "professor"
                ? "/professor/dashboard"
                : "/student/dashboard"
            }
            className="nav-link"
          >
            Home
          </Link>

          <Link
            href="/archive"
            className="nav-link"
          >
            Archive
          </Link>

          {user?.role === "student" && (
            <>
              <Link
                href="/student/ask"
                className="nav-link"
              >
                Ask a Doubt
              </Link>

              <Link
                href="/student/questions"
                className="nav-link"
              >
                My Questions
              </Link>

              <Link
                href="/student/contributions"
                className="nav-link"
              >
                Contributions
              </Link>
            </>
          )}

          {user?.role === "professor" && (
            <>
                <Link
                href="/professor/dashboard"
                className="nav-link"
                >
                Professor Dashboard
                </Link>

                <Link
                href="/professor/clear-doubts"
                className="nav-link"
                >
                Clear Doubts
                </Link>

                <Link
                href="/professor/pending-review"
                className="nav-link"
                >
                Pending Review
                </Link>

                <Link
                href="/professor/my-solutions"
                className="nav-link"
                >
                My Solutions
                </Link>

                <Link
                href="/professor/edit-answer"
                className="nav-link"
                >
                Edit Answer
                </Link>
            </>
            )}
          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>
      </nav>

      {/* Search bar */}
      <div className="search-wrapper">
        <Link href="/archive" className="search-bar">
          Search verified questions, subjects, or professors...
          <span>⌕</span>
        </Link>
      </div>

      <style jsx>{`
        .nav-wrapper {
          background: #111827;
          border-bottom: 4px solid #1f2937;
          position: relative;
          z-index: 10;
        }

        .nav {
          min-height: 72px;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #60a5fa;
          text-decoration: none;
          font-size: 28px;
          font-weight: 900;
          letter-spacing: -1px;
          white-space: nowrap;
        }

        .logo-icon {
          font-size: 21px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          flex-wrap: wrap;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          padding: 9px 13px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 800;
          transition: 0.15s;
          white-space: nowrap;
        }

        .nav-link:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }

        .logout-btn {
          border: 3px solid #1f2937;
          border-radius: 8px;
          background: #22c55e;
          color: #052e16;
          padding: 8px 15px;
          font-size: 15px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 3px 3px 0 #0f172a;
          transition: 0.15s;
          margin-left: 4px;
        }

        .logout-btn:hover {
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 #0f172a;
        }

        .logout-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0 #0f172a;
        }

        .search-wrapper {
          max-width: 1280px;
          margin: 0 auto;
          padding: 12px 48px 19px;
          display: flex;
          justify-content: center;
        }

        .search-bar {
          width: min(850px, 100%);
          box-sizing: border-box;
          height: 55px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          background: white;
          border: 3px solid #475569;
          border-radius: 30px;
          color: #64748b;
          text-decoration: none;
          font-size: 16px;
          transition: 0.15s;
        }

        .search-bar span {
          color: #2563eb;
          font-size: 25px;
          font-weight: 900;
        }

        .search-bar:hover {
          border-color: #2563eb;
          box-shadow: 3px 3px 0 #60a5fa;
        }

        @media (max-width: 1000px) {
          .nav {
            padding: 15px 25px;
            align-items: flex-start;
          }

          .nav-links {
            justify-content: flex-end;
          }

          .search-wrapper {
            padding-left: 25px;
            padding-right: 25px;
          }
        }

        @media (max-width: 700px) {
          .nav {
            flex-direction: column;
            align-items: stretch;
            gap: 13px;
          }

          .logo {
            justify-content: center;
          }

          .nav-links {
            justify-content: center;
          }

          .nav-link {
            font-size: 13px;
            padding: 7px 9px;
          }

          .logout-btn {
            font-size: 13px;
            padding: 7px 11px;
          }
        }

        @media (max-width: 480px) {
          .nav {
            padding: 14px;
          }

          .search-wrapper {
            padding: 10px 14px 16px;
          }

          .search-bar {
            height: 48px;
            font-size: 13px;
            padding: 0 15px;
          }
        }
      `}</style>
    </header>
  );
}