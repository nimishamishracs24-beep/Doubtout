'use client';

import { useEffect, useState } from "react";
import Nav from "../../../components/Nav";
import { api, getStoredUser } from "../../../lib/api";

type Q = {
  question_id: number;
  question: string;
  course: string;
  asked_date: string;
  answer_text?: string;
  answered_by_name?: string;
};

export default function Questions() {
  const [qs, setQs] = useState<Q[]>([]);

  useEffect(() => {
    const u = getStoredUser();

    if (u) {
      api<{ questions: Q[] }>(`/student/questions/${u.user_id}`)
        .then((d) => setQs(d.questions))
        .catch(console.error);
    }
  }, []);

  return (
    <>
      <Nav />

      <main className="questions-page">
        <div className="questions-container">

          {/* Header */}
          <section className="page-header">
            <div className="header-sticker">
              YOUR QUESTIONS ✦
            </div>

            <h1>My Questions</h1>

            <p>
              Keep track of the doubts you've asked and
              see which ones have been answered.
            </p>
          </section>

          {/* Stats */}
          <section className="summary-bar">

            <div className="summary-item">
              <div className="summary-icon blue">
                ?
              </div>

              <div>
                <span>Total Questions</span>
                <strong>{qs.length}</strong>
              </div>
            </div>

            <div className="summary-divider" />

            <div className="summary-item">
              <div className="summary-icon green">
                ✓
              </div>

              <div>
                <span>Answered</span>
                <strong>
                  {qs.filter((q) => !!q.answer_text).length}
                </strong>
              </div>
            </div>

            <div className="summary-divider" />

            <div className="summary-item">
              <div className="summary-icon yellow">
                ⏳
              </div>

              <div>
                <span>Awaiting Response</span>
                <strong>
                  {qs.filter((q) => !q.answer_text).length}
                </strong>
              </div>
            </div>

          </section>

          {/* Questions */}
          <section className="questions-section">

            <div className="section-header">
              <div>
                <span className="section-label">
                  YOUR DOUBTS
                </span>

                <h2>Question History</h2>
              </div>

              <div className="count-badge">
                {qs.length} {qs.length === 1 ? "Question" : "Questions"}
              </div>
            </div>

            <div className="question-list">

              {qs.map((q) => (
                <article
                  className={`question-card ${
                    q.answer_text ? "answered" : "pending"
                  }`}
                  key={q.question_id}
                >

                  {/* Card Header */}
                  <div className="card-header">

                    <span className="course-badge">
                      {q.course}
                    </span>

                    <span
                      className={
                        q.answer_text
                          ? "status answered-status"
                          : "status pending-status"
                      }
                    >
                      {q.answer_text
                        ? "✓ Answered"
                        : "⏳ Awaiting response"}
                    </span>

                  </div>

                  {/* Question */}
                  <h3>{q.question}</h3>

                  <div className="asked-date">
                    <span>Asked</span>
                    {q.asked_date}
                  </div>

                  {/* Answer */}
                  {q.answer_text ? (
                    <div className="answer-section">

                      <div className="answer-heading">
                        <span className="answer-icon">
                          ✓
                        </span>

                        <div>
                          <span className="answer-label">
                            ANSWER
                          </span>

                          <strong>
                            Answered by {q.answered_by_name}
                          </strong>
                        </div>
                      </div>

                      <div className="answer-content">
                        {q.answer_text}
                      </div>

                    </div>
                  ) : (
                    <div className="waiting-box">
                      <span className="waiting-icon">
                        💭
                      </span>

                      <div>
                        <strong>
                          Your question is waiting for a response.
                        </strong>

                        <p>
                          A professor will review your doubt
                          and provide an answer.
                        </p>
                      </div>
                    </div>
                  )}

                </article>
              ))}

              {/* Empty state */}
              {qs.length === 0 && (
                <div className="empty-card">

                  <div className="empty-icon">
                    📝
                  </div>

                  <h3>No questions found</h3>

                  <p>
                    You haven't asked any doubts yet.
                    Start by asking your first question!
                  </p>

                  <a
                    href="/student/ask"
                    className="ask-btn"
                  >
                    Ask a Doubt →
                  </a>

                </div>
              )}

            </div>

          </section>

        </div>
      </main>

      <style jsx>{`
        .questions-page {
          min-height: calc(100vh - 70px);
          background: #f0f8ff;
          padding: 42px 20px 70px;
        }

        .questions-container {
          max-width: 1050px;
          margin: 0 auto;
        }

        /* HEADER */

        .page-header {
          text-align: center;
          margin-bottom: 35px;
        }

        .header-sticker {
          display: inline-block;
          background: #dbeafe;
          color: #1d4ed8;
          border: 3px solid #1f2937;
          padding: 8px 15px;
          font-size: 12px;
          font-weight: 900;
          transform: rotate(-2deg);
          box-shadow: 4px 4px 0 #1f2937;
          margin-bottom: 20px;
        }

        .page-header h1 {
          color: #1f2937;
          font-size: clamp(38px, 6vw, 54px);
          font-weight: 900;
          margin: 0;
        }

        .page-header p {
          max-width: 620px;
          margin: 14px auto 0;
          color: #64748b;
          font-size: 17px;
          line-height: 1.6;
        }

        /* SUMMARY */

        .summary-bar {
          background: white;
          border: 3px solid #1f2937;
          border-radius: 13px;
          box-shadow: 6px 6px 0 #1f2937;
          padding: 20px;
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: center;
          margin-bottom: 35px;
        }

        .summary-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 13px;
        }

        .summary-icon {
          width: 45px;
          height: 45px;
          display: grid;
          place-items: center;
          border: 2px solid #1f2937;
          border-radius: 9px;
          font-weight: 900;
          font-size: 21px;
        }

        .summary-icon.blue {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .summary-icon.green {
          background: #dcfce7;
          color: #15803d;
        }

        .summary-icon.yellow {
          background: #fef3c7;
          color: #92400e;
        }

        .summary-item span {
          display: block;
          color: #64748b;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .summary-item strong {
          display: block;
          color: #1f2937;
          font-size: 25px;
          margin-top: 2px;
        }

        .summary-divider {
          height: 45px;
          width: 2px;
          background: #e2e8f0;
        }

        /* MAIN SECTION */

        .questions-section {
          background: white;
          border: 3px solid #1f2937;
          border-radius: 14px;
          box-shadow: 7px 7px 0 #1f2937;
          padding: 28px;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding-bottom: 20px;
          border-bottom: 3px solid #e2e8f0;
          margin-bottom: 24px;
        }

        .section-label {
          color: #2563eb;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .section-header h2 {
          color: #1f2937;
          font-size: 26px;
          margin: 5px 0 0;
        }

        .count-badge {
          background: #dbeafe;
          color: #1e40af;
          border: 3px solid #1f2937;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 900;
          white-space: nowrap;
        }

        /* QUESTION LIST */

        .question-list {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .question-card {
          border: 3px solid #1f2937;
          border-radius: 11px;
          padding: 22px;
          transition: 0.15s;
        }

        .question-card.answered {
          background: #f0fdf4;
          box-shadow: 5px 5px 0 #4ade80;
        }

        .question-card.pending {
          background: #fffbeb;
          box-shadow: 5px 5px 0 #facc15;
        }

        .question-card:hover {
          transform: translate(-2px, -2px);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .course-badge {
          display: inline-block;
          background: #dbeafe;
          color: #1e40af;
          border: 2px solid #1f2937;
          border-radius: 7px;
          padding: 5px 10px;
          font-size: 12px;
          font-weight: 900;
        }

        .status {
          border: 2px solid;
          border-radius: 7px;
          padding: 5px 9px;
          font-size: 11px;
          font-weight: 900;
        }

        .answered-status {
          background: #dcfce7;
          color: #166534;
          border-color: #166534;
        }

        .pending-status {
          background: #fef3c7;
          color: #92400e;
          border-color: #b45309;
        }

        .question-card h3 {
          color: #1f2937;
          font-size: 20px;
          line-height: 1.45;
          margin: 0 0 10px;
        }

        .asked-date {
          color: #64748b;
          font-size: 12px;
          margin-bottom: 17px;
        }

        .asked-date span {
          font-weight: 900;
          margin-right: 5px;
        }

        /* ANSWER */

        .answer-section {
          background: white;
          border: 2px solid #86efac;
          border-radius: 9px;
          padding: 17px;
          margin-top: 5px;
        }

        .answer-heading {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 13px;
        }

        .answer-icon {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          background: #22c55e;
          color: white;
          border: 2px solid #166534;
          border-radius: 50%;
          font-weight: 900;
        }

        .answer-label {
          display: block;
          color: #15803d;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.1em;
        }

        .answer-heading strong {
          display: block;
          color: #334155;
          font-size: 12px;
          margin-top: 2px;
        }

        .answer-content {
          border-top: 2px dashed #bbf7d0;
          padding-top: 13px;
          color: #334155;
          line-height: 1.65;
          white-space: pre-wrap;
        }

        /* WAITING */

        .waiting-box {
          display: flex;
          align-items: center;
          gap: 13px;
          background: white;
          border: 2px dashed #f59e0b;
          border-radius: 9px;
          padding: 14px;
        }

        .waiting-icon {
          font-size: 25px;
          flex-shrink: 0;
        }

        .waiting-box strong {
          display: block;
          color: #92400e;
          font-size: 13px;
        }

        .waiting-box p {
          color: #78716c;
          font-size: 12px;
          margin: 4px 0 0;
        }

        /* EMPTY */

        .empty-card {
          text-align: center;
          background: #f8fafc;
          border: 3px dashed #94a3b8;
          border-radius: 11px;
          padding: 55px 20px;
        }

        .empty-icon {
          font-size: 43px;
          margin-bottom: 12px;
        }

        .empty-card h3 {
          color: #1f2937;
          font-size: 21px;
          margin: 0 0 7px;
        }

        .empty-card p {
          color: #64748b;
          margin: 0 0 18px;
        }

        .ask-btn {
          display: inline-block;
          background: #22c55e;
          color: #052e16;
          border: 3px solid #1f2937;
          border-radius: 8px;
          box-shadow: 4px 4px 0 #1f2937;
          padding: 9px 15px;
          text-decoration: none;
          font-weight: 900;
          font-size: 13px;
        }

        .ask-btn:hover {
          transform: translate(-2px, -2px);
        }

        @media (max-width: 750px) {
          .summary-bar {
            grid-template-columns: 1fr;
            gap: 17px;
          }

          .summary-divider {
            width: 100%;
            height: 2px;
          }
        }

        @media (max-width: 600px) {
          .questions-page {
            padding: 30px 15px 50px;
          }

          .questions-section {
            padding: 20px;
          }

          .section-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .card-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .question-card {
            padding: 18px;
          }
        }
      `}</style>
    </>
  );
}