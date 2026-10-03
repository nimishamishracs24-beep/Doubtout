'use client';

import { useEffect, useState } from "react";
import Nav from "../../../components/Nav";
import { api, getStoredUser } from "../../../lib/api";

type D = {
  doubt_id: number;
  question: string;
  course: string;
  created_at: string;
  student_name: string;
};

type A = {
  answer_id: number;
  answer_text: string;
  question: string;
  course: string;
  answered_at: string;
};

export default function ProfessorDashboard() {
  const [doubts, setDoubts] = useState<D[]>([]);
  const [answers, setAnswers] = useState<A[]>([]);
  const [text, setText] = useState<Record<number, string>>({});
  const [message, setMessage] = useState("");

  async function load() {
    const u = getStoredUser();
    if (!u) return;

    try {
      const [d, a] = await Promise.all([
        api<{ doubts: D[] }>(`/professor/doubts/${u.user_id}`),
        api<{ answers: A[] }>(`/professor/answers/${u.user_id}`),
      ]);

      setDoubts(d.doubts);
      setAnswers(a.answers);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function answer(id: number) {
    const u = getStoredUser();
    if (!u) return;

    try {
      await api("/answers", {
        method: "POST",
        body: JSON.stringify({
          doubt_id: id,
          answer_text: text[id],
          answered_by: u.user_id,
        }),
      });

      setMessage("Answer submitted.");
      setText({ ...text, [id]: "" });
      load();
    } catch (e) {
      setMessage(
        e instanceof Error ? e.message : "Failed"
      );
    }
  }

  return (
    <>
      <Nav />

      <main className="prof-page">
        <div className="prof-container">

          {/* HEADER */}
          <section className="dashboard-header">
            <div>
              <div className="dashboard-sticker">
                PROFESSOR ZONE 👨‍🏫
              </div>

              <h1>
                Professor
                <span> Dashboard.</span>
              </h1>

              <p>
                Help students get unstuck, share your knowledge
                and make learning easier.
              </p>
            </div>

            <div className="dashboard-stat">
              <div className="stat-icon">💡</div>
              <div>
                <strong>{doubts.length}</strong>
                <small>Pending doubts</small>
              </div>
            </div>
          </section>

          {/* MESSAGE */}
          {message && (
            <div
              className={`status-message ${
                message === "Answer submitted."
                  ? "success"
                  : "error"
              }`}
            >
              <span>
                {message === "Answer submitted." ? "✓" : "⚠"}
              </span>

              {message}
            </div>
          )}

          {/* MAIN CONTENT */}
          <div className="dashboard-grid">

            {/* UNANSWERED */}
            <section className="dashboard-section">

              <div className="section-heading">
                <div>
                  <div className="section-label blue-label">
                    NEEDS YOUR HELP
                  </div>

                  <h2>Unanswered Doubts</h2>
                </div>

                <div className="count-badge blue-count">
                  {doubts.length}
                </div>
              </div>

              <div className="doubt-list">

                {doubts.map((d) => (
                  <article
                    className="doubt-card"
                    key={d.doubt_id}
                  >
                    <div className="card-meta">
                      <span className="course-badge">
                        {d.course}
                      </span>

                      <span className="question-number">
                        #{d.doubt_id}
                      </span>
                    </div>

                    <h3>{d.question}</h3>

                    <div className="asked-by">
                      <div className="student-avatar">
                        {d.student_name
                          ? d.student_name
                              .charAt(0)
                              .toUpperCase()
                          : "S"}
                      </div>

                      <div>
                        <small>Asked by</small>
                        <strong>{d.student_name}</strong>
                      </div>
                    </div>

                    <div className="answer-box">
                      <label>Your answer</label>

                      <textarea
                        value={text[d.doubt_id] ?? ""}
                        onChange={(e) =>
                          setText({
                            ...text,
                            [d.doubt_id]: e.target.value,
                          })
                        }
                        placeholder="Write a helpful solution..."
                      />

                      <button
                        className="answer-button"
                        onClick={() => answer(d.doubt_id)}
                      >
                        Submit Answer →
                      </button>
                    </div>
                  </article>
                ))}

                {doubts.length === 0 && (
                  <div className="empty-card">
                    <div className="empty-icon">🎉</div>

                    <h3>No unanswered doubts!</h3>

                    <p>
                      You've answered everything for now.
                    </p>
                  </div>
                )}

              </div>
            </section>

            {/* ANSWERS */}
            <section className="dashboard-section">

              <div className="section-heading">
                <div>
                  <div className="section-label green-label">
                    YOUR CONTRIBUTIONS
                  </div>

                  <h2>Your Answers</h2>
                </div>

                <div className="count-badge green-count">
                  {answers.length}
                </div>
              </div>

              <div className="answer-list">

                {answers.map((a) => (
                  <article
                    className="submitted-card"
                    key={a.answer_id}
                  >
                    <div className="submitted-top">
                      <span className="course-badge green-course">
                        {a.course}
                      </span>

                      <span className="verified-badge">
                        ✓ Submitted
                      </span>
                    </div>

                    <h3>{a.question}</h3>

                    <div className="submitted-answer">
                      <div className="answer-label">
                        YOUR ANSWER
                      </div>

                      <p>{a.answer_text}</p>
                    </div>
                  </article>
                ))}

                {answers.length === 0 && (
                  <div className="empty-card">
                    <div className="empty-icon">✍️</div>

                    <h3>No answers yet</h3>

                    <p>
                      Your submitted answers will appear here.
                    </p>
                  </div>
                )}

              </div>
            </section>

          </div>

        </div>
      </main>

      <style jsx>{`
        .prof-page {
          min-height: calc(100vh - 72px);
          background: #f0f8ff;
          padding: 45px 20px 80px;
        }

        .prof-container {
          max-width: 1200px;
          margin: auto;
        }

        /* HEADER */

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
          margin-bottom: 32px;
        }

        .dashboard-sticker {
          display: inline-block;
          padding: 9px 14px;
          background: #22c55e;
          color: #172015;
          border: 3px solid #1f2937;
          box-shadow: 5px 5px 0 #1f2937;
          font-size: 11px;
          font-weight: 950;
          letter-spacing: 1px;
          transform: rotate(-2deg);
          margin-bottom: 20px;
        }

        .dashboard-header h1 {
          margin: 0;
          color: #1f2937;
          font-size: clamp(40px, 5vw, 58px);
          line-height: 0.95;
          font-weight: 950;
          letter-spacing: -3px;
        }

        .dashboard-header h1 span {
          color: #2563eb;
        }

        .dashboard-header p {
          max-width: 580px;
          color: #4b5563;
          font-size: 15px;
          line-height: 1.6;
          margin: 17px 0 0;
        }

        .dashboard-stat {
          min-width: 155px;
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 13px;
          background: #fef3c7;
          border: 4px solid #1f2937;
          border-radius: 14px;
          box-shadow: 7px 7px 0 #1f2937;
          transform: rotate(1deg);
        }

        .stat-icon {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border: 3px solid #1f2937;
          border-radius: 9px;
          font-size: 23px;
        }

        .dashboard-stat strong {
          display: block;
          color: #1f2937;
          font-size: 27px;
          font-weight: 950;
        }

        .dashboard-stat small {
          display: block;
          color: #6b7280;
          font-size: 11px;
          font-weight: 800;
        }

        /* STATUS */

        .status-message {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 16px;
          margin-bottom: 25px;
          border: 3px solid #1f2937;
          border-radius: 9px;
          font-size: 14px;
          font-weight: 900;
          box-shadow: 4px 4px 0 #1f2937;
        }

        .status-message.success {
          background: #dcfce7;
          color: #166534;
        }

        .status-message.error {
          background: #fee2e2;
          color: #991b1b;
        }

        .status-message span {
          font-size: 18px;
        }

        /* GRID */

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 25px;
          align-items: start;
        }

        .dashboard-section {
          min-width: 0;
        }

        .section-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .section-heading h2 {
          margin: 4px 0 0;
          color: #1f2937;
          font-size: 24px;
          font-weight: 950;
        }

        .section-label {
          font-size: 10px;
          font-weight: 950;
          letter-spacing: 1px;
        }

        .blue-label {
          color: #2563eb;
        }

        .green-label {
          color: #16a34a;
        }

        .count-badge {
          min-width: 34px;
          height: 34px;
          padding: 0 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #1f2937;
          border-radius: 8px;
          font-weight: 950;
          box-shadow: 3px 3px 0 #1f2937;
        }

        .blue-count {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .green-count {
          background: #dcfce7;
          color: #166534;
        }

        /* DOUBTS */

        .doubt-list,
        .answer-list {
          display: grid;
          gap: 17px;
        }

        .doubt-card {
          background: white;
          border: 3px solid #1f2937;
          border-radius: 13px;
          padding: 21px;
          box-shadow: 5px 5px 0 #1f2937;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 13px;
        }

        .course-badge {
          display: inline-block;
          background: #dbeafe;
          color: #1d4ed8;
          border: 2px solid #2563eb;
          padding: 5px 9px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 950;
        }

        .question-number {
          color: #9ca3af;
          font-size: 11px;
          font-weight: 800;
        }

        .doubt-card h3,
        .submitted-card h3 {
          color: #1f2937;
          font-size: 18px;
          line-height: 1.4;
          margin: 0 0 15px;
          font-weight: 900;
        }

        .asked-by {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 18px;
          padding-bottom: 15px;
          border-bottom: 2px dashed #d1d5db;
        }

        .student-avatar {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #1f2937;
          border-radius: 50%;
          background: #dbeafe;
          color: #1d4ed8;
          font-weight: 950;
        }

        .asked-by small {
          display: block;
          color: #9ca3af;
          font-size: 10px;
        }

        .asked-by strong {
          color: #1f2937;
          font-size: 12px;
        }

        /* ANSWER BOX */

        .answer-box label {
          display: block;
          margin-bottom: 7px;
          color: #1f2937;
          font-size: 12px;
          font-weight: 950;
        }

        .answer-box textarea {
          width: 100%;
          min-height: 105px;
          box-sizing: border-box;
          resize: vertical;
          padding: 12px;
          background: #f8fafc;
          color: #1f2937;
          border: 3px solid #1f2937;
          border-radius: 8px;
          font-family: inherit;
          font-size: 13px;
          line-height: 1.5;
          outline: none;
        }

        .answer-box textarea:focus {
          background: white;
          box-shadow: 4px 4px 0 #2563eb;
        }

        .answer-box textarea::placeholder {
          color: #9ca3af;
        }

        .answer-button {
          margin-top: 11px;
          padding: 11px 17px;
          background: #22c55e;
          color: #172015;
          border: 3px solid #1f2937;
          border-radius: 8px;
          box-shadow: 4px 4px 0 #1f2937;
          font-size: 12px;
          font-weight: 950;
          cursor: pointer;
          transition: 0.15s ease;
        }

        .answer-button:hover {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0 #1f2937;
        }

        .answer-button:active {
          transform: translate(4px, 4px);
          box-shadow: none;
        }

        /* SUBMITTED ANSWERS */

        .submitted-card {
          background: white;
          border: 3px solid #1f2937;
          border-radius: 13px;
          padding: 20px;
          box-shadow: 5px 5px 0 #1f2937;
        }

        .submitted-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 13px;
        }

        .green-course {
          background: #dcfce7;
          color: #166534;
          border-color: #16a34a;
        }

        .verified-badge {
          padding: 5px 8px;
          border-radius: 6px;
          background: #dcfce7;
          color: #166534;
          font-size: 9px;
          font-weight: 950;
        }

        .submitted-answer {
          background: #f8fafc;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 13px;
        }

        .answer-label {
          color: #16a34a;
          font-size: 9px;
          font-weight: 950;
          letter-spacing: 0.8px;
          margin-bottom: 6px;
        }

        .submitted-answer p {
          margin: 0;
          color: #374151;
          font-size: 13px;
          line-height: 1.6;
          white-space: pre-wrap;
        }

        /* EMPTY */

        .empty-card {
          background: white;
          border: 3px dashed #1f2937;
          border-radius: 13px;
          padding: 45px 20px;
          text-align: center;
        }

        .empty-icon {
          font-size: 42px;
          margin-bottom: 9px;
        }

        .empty-card h3 {
          margin: 0;
          color: #1f2937;
          font-size: 18px;
          font-weight: 950;
        }

        .empty-card p {
          margin: 7px 0 0;
          color: #6b7280;
          font-size: 13px;
        }

        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 650px) {
          .prof-page {
            padding: 35px 14px 60px;
          }

          .dashboard-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .dashboard-stat {
            width: 100%;
            box-sizing: border-box;
          }

          .dashboard-header h1 {
            font-size: 43px;
          }
        }
      `}</style>
    </>
  );
}