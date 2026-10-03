'use client';

import { useEffect, useState } from "react";
import Nav from "../../../components/Nav";
import { api, getStoredUser } from "../../../lib/api";

type PendingAnswer = {
  practice_id: number;
  answer_text: string;
  status: string;
  question: string;
  course: string;
  student_name: string;
};

export default function PendingReview() {
  const [answers, setAnswers] = useState<PendingAnswer[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<number | null>(null);

  async function loadReviews() {
    const professor = getStoredUser();

    if (!professor || professor.role !== "professor") {
      window.location.href = "/login";
      return;
    }

    try {
      setLoading(true);

      const data = await api<{ practices: PendingAnswer[] }>(
        `/professor/practice/${professor.user_id}`
      );

      setAnswers(data.practices);
    } catch (error) {
      console.error(error);
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to load pending reviews."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  async function reviewAnswer(
    practiceId: number,
    action: "approved" | "rejected"
  ) {
    const professor = getStoredUser();

    if (!professor) return;

    try {
      setProcessing(practiceId);
      setMessage("");

      await api("/professor/practice/review", {
        method: "POST",
        body: JSON.stringify({
          practice_id: practiceId,
          professor_id: professor.user_id,
          action
        })
      });

      setMessage(
        action === "approved"
          ? "Answer approved successfully."
          : "Answer rejected successfully."
      );

      await loadReviews();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to review answer."
      );
    } finally {
      setProcessing(null);
    }
  }

  return (
    <>
      <Nav />

      <main className="prof-page">
        <div className="prof-container">

          <section className="page-heading">
            <div className="sticker">REVIEW ZONE ✦</div>

            <h1>Pending Student Answer Review</h1>

            <p>
              Verify student-provided answers and help maintain the quality
              of the DoubtOut knowledge base.
            </p>
          </section>

          <section className="review-stat">
            <div>
              <span>Total Pending Answers</span>
              <strong>{answers.length}</strong>
            </div>

            <div className="stat-icon">✓</div>
          </section>

          {message && (
            <div className="status-message">
              {message}
            </div>
          )}

          <section className="review-panel">
            <div className="panel-heading">
              <div>
                <span className="section-label">FACULTY REVIEW</span>
                <h2>Answers Awaiting Verification</h2>
              </div>

              <span className="count-badge">
                {answers.length} pending
              </span>
            </div>

            {loading ? (
              <div className="empty-card">
                <div className="loader">...</div>
                <h3>Loading reviews...</h3>
                <p>Please wait while we fetch pending answers.</p>
              </div>
            ) : answers.length === 0 ? (
              <div className="empty-card">
                <div className="empty-icon">✓</div>
                <h3>All clear!</h3>
                <p>
                  There are no student answers currently pending your review.
                </p>
              </div>
            ) : (
              <div className="review-list">
                {answers.map((item) => (
                  <article
                    className="review-card"
                    key={item.practice_id}
                  >
                    <div className="review-top">
                      <span className="course-badge">
                        {item.course}
                      </span>

                      <span className="pending-badge">
                        Pending Review
                      </span>
                    </div>

                    <h3>{item.question}</h3>

                    <p className="student-info">
                      Submitted by{" "}
                      <strong>{item.student_name}</strong>
                    </p>

                    <div className="answer-box">
                      <span>STUDENT ANSWER</span>
                      <p>{item.answer_text}</p>
                    </div>

                    <div className="review-actions">
                      <button
                        className="approve-btn"
                        disabled={processing === item.practice_id}
                        onClick={() =>
                          reviewAnswer(item.practice_id, "approved")
                        }
                      >
                        {processing === item.practice_id
                          ? "Processing..."
                          : "✓ Approve"}
                      </button>

                      <button
                        className="reject-btn"
                        disabled={processing === item.practice_id}
                        onClick={() =>
                          reviewAnswer(item.practice_id, "rejected")
                        }
                      >
                        {processing === item.practice_id
                          ? "Processing..."
                          : "✕ Reject"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <style jsx>{`
        .prof-page {
          min-height: calc(100vh - 70px);
          background: #f0f8ff;
          padding: 45px 20px 70px;
        }

        .prof-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .page-heading {
          text-align: center;
          margin-bottom: 35px;
        }

        .sticker {
          display: inline-block;
          background: #bbf7d0;
          color: #166534;
          border: 3px solid #1f2937;
          padding: 7px 14px;
          font-weight: 900;
          font-size: 12px;
          transform: rotate(-2deg);
          box-shadow: 4px 4px 0 #1f2937;
          margin-bottom: 20px;
        }

        .page-heading h1 {
          font-size: clamp(30px, 5vw, 48px);
          color: #1f2937;
          margin: 0 0 12px;
          font-weight: 900;
        }

        .page-heading p {
          color: #64748b;
          font-size: 16px;
          max-width: 650px;
          margin: auto;
          line-height: 1.6;
        }

        .review-stat {
          background: white;
          border: 3px solid #1f2937;
          box-shadow: 7px 7px 0 #1f2937;
          border-radius: 14px;
          padding: 22px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .review-stat span {
          display: block;
          font-size: 13px;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .review-stat strong {
          display: block;
          font-size: 38px;
          color: #15803d;
          margin-top: 5px;
        }

        .stat-icon {
          width: 55px;
          height: 55px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #dcfce7;
          border: 3px solid #1f2937;
          font-size: 25px;
          font-weight: 900;
          color: #15803d;
        }

        .status-message {
          background: #dcfce7;
          border: 3px solid #166534;
          color: #166534;
          padding: 13px 16px;
          border-radius: 10px;
          font-weight: 700;
          margin-bottom: 25px;
        }

        .review-panel {
          background: white;
          border: 3px solid #1f2937;
          box-shadow: 7px 7px 0 #1f2937;
          border-radius: 14px;
          padding: 28px;
        }

        .panel-heading {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          align-items: center;
          border-bottom: 3px solid #e2e8f0;
          padding-bottom: 18px;
          margin-bottom: 22px;
        }

        .section-label {
          font-size: 11px;
          font-weight: 900;
          color: #16a34a;
          letter-spacing: 0.12em;
        }

        .panel-heading h2 {
          margin: 4px 0 0;
          font-size: 25px;
          color: #1f2937;
        }

        .count-badge {
          background: #dcfce7;
          color: #166534;
          border: 2px solid #166534;
          padding: 7px 12px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 800;
          white-space: nowrap;
        }

        .review-list {
          display: grid;
          gap: 20px;
        }

        .review-card {
          border: 3px solid #1f2937;
          border-radius: 12px;
          padding: 22px;
          background: #f8fafc;
          box-shadow: 4px 4px 0 #93c5fd;
        }

        .review-top {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }

        .course-badge,
        .pending-badge {
          padding: 6px 10px;
          border-radius: 7px;
          font-size: 12px;
          font-weight: 900;
        }

        .course-badge {
          background: #dbeafe;
          color: #1d4ed8;
          border: 2px solid #2563eb;
        }

        .pending-badge {
          background: #fef3c7;
          color: #92400e;
          border: 2px solid #d97706;
        }

        .review-card h3 {
          color: #1f2937;
          font-size: 20px;
          margin: 0 0 8px;
          line-height: 1.4;
        }

        .student-info {
          color: #64748b;
          font-size: 14px;
          margin: 0 0 16px;
        }

        .answer-box {
          background: white;
          border: 2px solid #cbd5e1;
          border-radius: 9px;
          padding: 16px;
        }

        .answer-box span {
          font-size: 10px;
          color: #64748b;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .answer-box p {
          color: #334155;
          line-height: 1.7;
          margin: 8px 0 0;
          white-space: pre-wrap;
        }

        .review-actions {
          display: flex;
          gap: 12px;
          margin-top: 18px;
        }

        .approve-btn,
        .reject-btn {
          border: 3px solid #1f2937;
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 900;
          cursor: pointer;
          transition: 0.15s;
        }

        .approve-btn {
          background: #22c55e;
          color: #052e16;
          box-shadow: 3px 3px 0 #1f2937;
        }

        .reject-btn {
          background: #fecaca;
          color: #991b1b;
          box-shadow: 3px 3px 0 #1f2937;
        }

        .approve-btn:hover,
        .reject-btn:hover {
          transform: translate(-1px, -1px);
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .empty-card {
          text-align: center;
          padding: 60px 20px;
          color: #64748b;
        }

        .empty-icon {
          width: 60px;
          height: 60px;
          margin: auto;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #dcfce7;
          border: 3px solid #15803d;
          color: #15803d;
          font-size: 28px;
          font-weight: 900;
        }

        .empty-card h3 {
          color: #1f2937;
          margin: 15px 0 5px;
          font-size: 22px;
        }

        .empty-card p {
          margin: 0;
        }

        .loader {
          font-size: 35px;
          font-weight: 900;
          color: #16a34a;
        }

        @media (max-width: 650px) {
          .review-panel {
            padding: 18px;
          }

          .panel-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .review-actions {
            flex-direction: column;
          }

          .review-actions button {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}