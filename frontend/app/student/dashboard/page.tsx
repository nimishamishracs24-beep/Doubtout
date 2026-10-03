'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "../../../components/Nav";
import { api, getStoredUser } from "../../../lib/api";

type DashboardData = {
  total_questions?: number;
  answered_questions?: number;
  pending_questions?: number;
  contributions?: number;
};

export default function StudentDashboard() {
  const [data, setData] = useState<DashboardData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getStoredUser();

    if (!user || user.role !== "student") {
      window.location.href = "/login";
      return;
    }

    api<DashboardData>(`/student/dashboard/${user.user_id}`)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Nav />

      <main className="student-page">
        <div className="student-container">

          <section className="hero">
            <div className="sticker">
              STUDENT ZONE ✦
            </div>

            <h1>Student Dashboard</h1>

            <p>
              Ask questions, find answers, and build your knowledge
              with the DoubtOut community.
            </p>

            <div className="hero-actions">
              <Link href="/student/ask" className="primary-btn">
                + Ask a Doubt
              </Link>

              <Link href="/archive" className="secondary-btn">
                Explore Answers
              </Link>
            </div>
          </section>

          <section className="stats-grid">

            <div className="stat-card blue">
              <div className="stat-icon">?</div>

              <div>
                <span>Total Questions</span>
                <strong>
                  {loading ? "..." : data.total_questions ?? 0}
                </strong>
              </div>
            </div>

            <div className="stat-card green">
              <div className="stat-icon">✓</div>

              <div>
                <span>Answered</span>
                <strong>
                  {loading ? "..." : data.answered_questions ?? 0}
                </strong>
              </div>
            </div>

            <div className="stat-card yellow">
              <div className="stat-icon">⏳</div>

              <div>
                <span>Pending</span>
                <strong>
                  {loading ? "..." : data.pending_questions ?? 0}
                </strong>
              </div>
            </div>

            <div className="stat-card purple">
              <div className="stat-icon">★</div>

              <div>
                <span>Contributions</span>
                <strong>
                  {loading ? "..." : data.contributions ?? 0}
                </strong>
              </div>
            </div>

          </section>

          <section className="quick-section">

            <div className="section-heading">
              <div>
                <span className="section-label">
                  YOUR LEARNING SPACE
                </span>

                <h2>What would you like to do?</h2>
              </div>
            </div>

            <div className="quick-grid">

              <Link
                href="/student/ask"
                className="quick-card blue-card"
              >
                <div className="quick-icon">💡</div>

                <h3>Ask a Doubt</h3>

                <p>
                  Stuck on a concept? Ask a professor and
                  get a clear explanation.
                </p>

                <span className="card-link">
                  Ask now →
                </span>
              </Link>

              <Link
                href="/student/questions"
                className="quick-card green-card"
              >
                <div className="quick-icon">📚</div>

                <h3>My Questions</h3>

                <p>
                  Track your questions and see the answers
                  you've received.
                </p>

                <span className="card-link">
                  View questions →
                </span>
              </Link>

              <Link
                href="/student/contributions"
                className="quick-card yellow-card"
              >
                <div className="quick-icon">🏆</div>

                <h3>My Contributions</h3>

                <p>
                  See answers you've contributed and their
                  review status.
                </p>

                <span className="card-link">
                  View contributions →
                </span>
              </Link>

              <Link
                href="/archive"
                className="quick-card purple-card"
              >
                <div className="quick-icon">🔎</div>

                <h3>Answer Archive</h3>

                <p>
                  Browse verified answers and learn from
                  previously solved doubts.
                </p>

                <span className="card-link">
                  Explore archive →
                </span>
              </Link>

            </div>
          </section>

          <section className="tip-card">
            <div className="tip-icon">💭</div>

            <div>
              <span className="tip-label">
                DOUBTOUT TIP
              </span>

              <h3>
                Don't keep a doubt to yourself!
              </h3>

              <p>
                Asking questions helps you understand concepts
                better — and your question might help another
                student too.
              </p>
            </div>
          </section>

        </div>
      </main>

      <style jsx>{`
        .student-page {
          min-height: calc(100vh - 70px);
          background: #f0f8ff;
          padding: 45px 20px 70px;
        }

        .student-container {
          max-width: 1150px;
          margin: 0 auto;
        }

        .hero {
          text-align: center;
          padding: 15px 10px 40px;
        }

        .sticker {
          display: inline-block;
          background: #bfdbfe;
          color: #1e40af;
          border: 3px solid #1f2937;
          padding: 8px 15px;
          font-size: 12px;
          font-weight: 900;
          transform: rotate(-2deg);
          box-shadow: 4px 4px 0 #1f2937;
          margin-bottom: 20px;
        }

        .hero h1 {
          margin: 0;
          color: #1f2937;
          font-size: clamp(36px, 6vw, 58px);
          font-weight: 900;
        }

        .hero p {
          max-width: 650px;
          margin: 15px auto 25px;
          color: #64748b;
          font-size: 17px;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .primary-btn,
        .secondary-btn {
          text-decoration: none;
          border: 3px solid #1f2937;
          padding: 11px 18px;
          border-radius: 9px;
          font-weight: 900;
          transition: 0.15s;
        }

        .primary-btn {
          background: #22c55e;
          color: #052e16;
          box-shadow: 4px 4px 0 #1f2937;
        }

        .secondary-btn {
          background: white;
          color: #1f2937;
          box-shadow: 4px 4px 0 #1f2937;
        }

        .primary-btn:hover,
        .secondary-btn:hover {
          transform: translate(-2px, -2px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 35px;
        }

        .stat-card {
          background: white;
          border: 3px solid #1f2937;
          border-radius: 12px;
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 5px 5px 0 #1f2937;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 10px;
          border: 3px solid #1f2937;
          font-size: 22px;
          font-weight: 900;
        }

        .blue .stat-icon {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .green .stat-icon {
          background: #dcfce7;
          color: #15803d;
        }

        .yellow .stat-icon {
          background: #fef3c7;
          color: #92400e;
        }

        .purple .stat-icon {
          background: #ede9fe;
          color: #6d28d9;
        }

        .stat-card span {
          display: block;
          color: #64748b;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .stat-card strong {
          display: block;
          color: #1f2937;
          font-size: 30px;
          margin-top: 3px;
        }

        .quick-section {
          background: white;
          border: 3px solid #1f2937;
          border-radius: 14px;
          box-shadow: 7px 7px 0 #1f2937;
          padding: 28px;
          margin-bottom: 30px;
        }

        .section-heading {
          border-bottom: 3px solid #e2e8f0;
          padding-bottom: 18px;
          margin-bottom: 22px;
        }

        .section-label,
        .tip-label {
          color: #2563eb;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .section-heading h2 {
          color: #1f2937;
          margin: 5px 0 0;
          font-size: 26px;
        }

        .quick-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .quick-card {
          display: block;
          text-decoration: none;
          color: inherit;
          padding: 22px;
          border: 3px solid #1f2937;
          border-radius: 11px;
          transition: 0.15s;
        }

        .quick-card:hover {
          transform: translate(-2px, -2px);
        }

        .blue-card {
          background: #eff6ff;
          box-shadow: 5px 5px 0 #60a5fa;
        }

        .green-card {
          background: #f0fdf4;
          box-shadow: 5px 5px 0 #4ade80;
        }

        .yellow-card {
          background: #fffbeb;
          box-shadow: 5px 5px 0 #facc15;
        }

        .purple-card {
          background: #faf5ff;
          box-shadow: 5px 5px 0 #a78bfa;
        }

        .quick-icon {
          font-size: 30px;
          margin-bottom: 10px;
        }

        .quick-card h3 {
          color: #1f2937;
          font-size: 21px;
          margin: 0 0 7px;
        }

        .quick-card p {
          color: #64748b;
          line-height: 1.55;
          margin: 0 0 15px;
        }

        .card-link {
          color: #2563eb;
          font-weight: 900;
          font-size: 14px;
        }

        .tip-card {
          display: flex;
          align-items: center;
          gap: 18px;
          background: #fff;
          border: 3px solid #1f2937;
          border-radius: 12px;
          padding: 22px;
          box-shadow: 6px 6px 0 #facc15;
        }

        .tip-icon {
          width: 55px;
          height: 55px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          background: #fef3c7;
          border: 3px solid #1f2937;
          border-radius: 50%;
          font-size: 25px;
        }

        .tip-card h3 {
          margin: 4px 0;
          color: #1f2937;
          font-size: 20px;
        }

        .tip-card p {
          margin: 0;
          color: #64748b;
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 650px) {
          .student-page {
            padding: 30px 15px 50px;
          }

          .stats-grid,
          .quick-grid {
            grid-template-columns: 1fr;
          }

          .quick-section {
            padding: 18px;
          }

          .tip-card {
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}