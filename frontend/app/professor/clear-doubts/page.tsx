'use client';

import { useEffect, useState } from "react";
import Nav from "../../../components/Nav";
import { api, getStoredUser } from "../../../lib/api";

type Doubt = {
  doubt_id: number;
  question: string;
  course: string;
  created_at: string;
  student_name: string;
};

export default function ClearDoubts() {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [selected, setSelected] = useState<Doubt | null>(null);
  const [answerText, setAnswerText] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  async function loadDoubts() {
    const professor = getStoredUser();

    if (!professor || professor.role !== "professor") {
      window.location.href = "/login";
      return;
    }

    try {
      const data = await api<{ doubts: Doubt[] }>(
        `/professor/doubts/${professor.user_id}`
      );

      setDoubts(data.doubts);
    } catch (error) {
      console.error(error);
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to load doubts."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDoubts();
  }, []);

  function openAnswer(doubt: Doubt) {
    setSelected(doubt);
    setAnswerText("");
    setMessage("");
  }

  function closeAnswer() {
    if (submitting) return;

    setSelected(null);
    setAnswerText("");
  }

  async function submitAnswer() {
    const professor = getStoredUser();

    if (!professor || !selected) return;

    if (!answerText.trim()) {
      setMessage("Answer cannot be empty.");
      return;
    }

    try {
      setSubmitting(true);
      setMessage("");

      await api("/answers", {
        method: "POST",
        body: JSON.stringify({
          doubt_id: selected.doubt_id,
          answer_text: answerText.trim(),
          answered_by: professor.user_id
        })
      });

      setSelected(null);
      setAnswerText("");
      setMessage("Answer submitted successfully.");

      await loadDoubts();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit answer."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Nav />

      <main className="prof-page">
        <div className="prof-container">

          <section className="page-heading">
            <div className="sticker">HELP STUDENTS ✦</div>

            <h1>Clear Doubts</h1>

            <p>
              Answer unanswered academic questions and help students move
              forward.
            </p>
          </section>

          <section className="doubt-stat">
            <div>
              <span>Total Doubts Awaiting Answer</span>
              <strong>{doubts.length}</strong>
            </div>

            <div className="stat-icon">?</div>
          </section>

          {message && !selected && (
            <div className="status-message">
              {message}
            </div>
          )}

          <section className="doubt-panel">
            <div className="panel-heading">
              <div>
                <span className="section-label">UNANSWERED QUESTIONS</span>
                <h2>Questions Awaiting Your Expertise</h2>
              </div>

              <span className="count-badge">
                {doubts.length} open
              </span>
            </div>

            {loading ? (
              <div className="empty-card">
                <div className="loader">...</div>
                <h3>Loading doubts...</h3>
              </div>
            ) : doubts.length === 0 ? (
              <div className="empty-card">
                <div className="empty-icon">✓</div>
                <h3>Clear Sky!</h3>
                <p>
                  There are no unanswered doubts currently pending.
                </p>
              </div>
            ) : (
              <div className="doubt-list">
                {doubts.map((doubt) => (
                  <article
                    className="doubt-card"
                    key={doubt.doubt_id}
                  >
                    <div className="doubt-card-top">
                      <span className="course-badge">
                        {doubt.course}
                      </span>

                      <span className="date-badge">
                        {new Date(
                          doubt.created_at
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <h3>{doubt.question}</h3>

                    <p className="student">
                      Asked by{" "}
                      <strong>{doubt.student_name}</strong>
                    </p>

                    <button
                      className="answer-btn"
                      onClick={() => openAnswer(doubt)}
                    >
                      ✎ Answer
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {selected && (
        <div className="modal-backdrop">
          <div className="answer-modal">

            <div className="modal-heading">
              <div>
                <span className="section-label">WRITE SOLUTION</span>
                <h2>Answer the Doubt</h2>
              </div>

              <button
                className="close-btn"
                onClick={closeAnswer}
              >
                ×
              </button>
            </div>

            <div className="question-box">
              <span>{selected.course}</span>
              <h3>{selected.question}</h3>
            </div>

            <label>Your Answer</label>

            <textarea
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Write a clear and helpful solution..."
              rows={8}
            />

            {message && (
              <div className="modal-message">
                {message}
              </div>
            )}

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={closeAnswer}
                disabled={submitting}
              >
                Cancel
              </button>

              <button
                className="submit-btn"
                onClick={submitAnswer}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Answer"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .prof-page {
          min-height: calc(100vh - 70px);
          background: #f0f8ff;
          padding: 45px 20px 70px;
        }

        .prof-container {
          max-width: 1100px;
          margin: auto;
        }

        .page-heading {
          text-align: center;
          margin-bottom: 35px;
        }

        .sticker {
          display: inline-block;
          background: #bfdbfe;
          color: #1e40af;
          border: 3px solid #1f2937;
          padding: 7px 14px;
          font-size: 12px;
          font-weight: 900;
          transform: rotate(-2deg);
          box-shadow: 4px 4px 0 #1f2937;
          margin-bottom: 20px;
        }

        .page-heading h1 {
          color: #1f2937;
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 900;
          margin: 0 0 12px;
        }

        .page-heading p {
          color: #64748b;
          max-width: 650px;
          margin: auto;
          line-height: 1.6;
        }

        .doubt-stat {
          background: white;
          border: 3px solid #1f2937;
          box-shadow: 7px 7px 0 #1f2937;
          border-radius: 14px;
          padding: 22px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
        }

        .doubt-stat span {
          display: block;
          color: #64748b;
          font-size: 13px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .doubt-stat strong {
          color: #2563eb;
          display: block;
          font-size: 38px;
          margin-top: 5px;
        }

        .stat-icon {
          width: 55px;
          height: 55px;
          display: grid;
          place-items: center;
          background: #dbeafe;
          border: 3px solid #1f2937;
          border-radius: 50%;
          color: #1d4ed8;
          font-size: 27px;
          font-weight: 900;
        }

        .status-message {
          background: #dcfce7;
          color: #166534;
          border: 3px solid #166534;
          padding: 13px 16px;
          border-radius: 10px;
          font-weight: 800;
          margin-bottom: 25px;
        }

        .doubt-panel {
          background: white;
          border: 3px solid #1f2937;
          box-shadow: 7px 7px 0 #1f2937;
          border-radius: 14px;
          padding: 28px;
        }

        .panel-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          border-bottom: 3px solid #e2e8f0;
          padding-bottom: 18px;
          margin-bottom: 22px;
        }

        .section-label {
          font-size: 11px;
          color: #16a34a;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .panel-heading h2 {
          margin: 4px 0 0;
          color: #1f2937;
          font-size: 25px;
        }

        .count-badge {
          background: #dbeafe;
          color: #1d4ed8;
          border: 2px solid #2563eb;
          padding: 7px 12px;
          border-radius: 999px;
          font-weight: 900;
          font-size: 13px;
        }

        .doubt-list {
          display: grid;
          gap: 18px;
        }

        .doubt-card {
          background: #f8fafc;
          border: 3px solid #1f2937;
          border-radius: 12px;
          padding: 21px;
          box-shadow: 4px 4px 0 #86efac;
        }

        .doubt-card-top {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 13px;
        }

        .course-badge {
          background: #dbeafe;
          color: #1d4ed8;
          border: 2px solid #2563eb;
          border-radius: 7px;
          padding: 6px 10px;
          font-size: 12px;
          font-weight: 900;
        }

        .date-badge {
          color: #64748b;
          font-size: 12px;
          font-weight: 700;
        }

        .doubt-card h3 {
          color: #1f2937;
          font-size: 20px;
          line-height: 1.45;
          margin: 0;
        }

        .student {
          color: #64748b;
          font-size: 14px;
          margin: 9px 0 15px;
        }

        .answer-btn {
          border: 3px solid #1f2937;
          background: #22c55e;
          color: #052e16;
          padding: 9px 17px;
          border-radius: 8px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 3px 3px 0 #1f2937;
        }

        .answer-btn:hover {
          transform: translate(-1px, -1px);
        }

        .empty-card {
          text-align: center;
          padding: 60px 20px;
          color: #64748b;
        }

        .empty-icon {
          width: 60px;
          height: 60px;
          display: grid;
          place-items: center;
          margin: auto;
          background: #dcfce7;
          border: 3px solid #15803d;
          border-radius: 50%;
          color: #15803d;
          font-size: 27px;
          font-weight: 900;
        }

        .empty-card h3 {
          color: #1f2937;
          margin: 15px 0 5px;
        }

        .loader {
          font-size: 35px;
          font-weight: 900;
          color: #16a34a;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 100;
        }

        .answer-modal {
          width: min(700px, 100%);
          max-height: 90vh;
          overflow-y: auto;
          background: white;
          border: 4px solid #1f2937;
          border-radius: 16px;
          box-shadow: 10px 10px 0 #1f2937;
          padding: 25px;
        }

        .modal-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 3px solid #e2e8f0;
          padding-bottom: 15px;
          margin-bottom: 18px;
        }

        .modal-heading h2 {
          margin: 4px 0 0;
          color: #1f2937;
        }

        .close-btn {
          width: 38px;
          height: 38px;
          border: 3px solid #1f2937;
          background: #fee2e2;
          border-radius: 8px;
          font-size: 25px;
          font-weight: 900;
          cursor: pointer;
        }

        .question-box {
          background: #eff6ff;
          border: 2px solid #93c5fd;
          border-radius: 9px;
          padding: 15px;
          margin-bottom: 20px;
        }

        .question-box span {
          color: #2563eb;
          font-size: 11px;
          font-weight: 900;
        }

        .question-box h3 {
          margin: 7px 0 0;
          color: #1f2937;
          line-height: 1.5;
        }

        .answer-modal label {
          display: block;
          color: #1f2937;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .answer-modal textarea {
          width: 100%;
          box-sizing: border-box;
          resize: vertical;
          border: 3px solid #1f2937;
          border-radius: 9px;
          padding: 13px;
          font: inherit;
          outline: none;
        }

        .answer-modal textarea:focus {
          box-shadow: 4px 4px 0 #86efac;
        }

        .modal-message {
          margin-top: 12px;
          background: #fef3c7;
          border: 2px solid #d97706;
          color: #92400e;
          padding: 10px;
          border-radius: 8px;
          font-weight: 700;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 18px;
        }

        .cancel-btn,
        .submit-btn {
          border: 3px solid #1f2937;
          padding: 10px 17px;
          border-radius: 8px;
          font-weight: 900;
          cursor: pointer;
        }

        .cancel-btn {
          background: #e2e8f0;
          color: #334155;
        }

        .submit-btn {
          background: #22c55e;
          color: #052e16;
          box-shadow: 3px 3px 0 #1f2937;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 650px) {
          .doubt-panel {
            padding: 18px;
          }

          .panel-heading {
            flex-direction: column;
            align-items: flex-start;
          }

          .modal-actions {
            flex-direction: column;
          }

          .modal-actions button {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}