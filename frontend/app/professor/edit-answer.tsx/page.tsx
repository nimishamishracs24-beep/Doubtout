'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "../../../components/Nav";
import { api, getStoredUser } from "../../../lib/api";

type AnswerData = {
  answer_text: string;
  question: string;
};

export default function EditAnswer() {
  const router = useRouter();

  const [answerId, setAnswerId] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const professor = getStoredUser();

    if (!professor || professor.role !== "professor") {
      window.location.href = "/login";
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get("answer_id");

    if (!id) {
      setMessage("No answer was selected.");
      setLoading(false);
      return;
    }

    setAnswerId(id);

    async function loadAnswer() {
      try {
        const data = await api<AnswerData>(
          `/answers/${id}`
        );

        setQuestion(data.question);
        setAnswerText(data.answer_text);
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Failed to load answer."
        );
      } finally {
        setLoading(false);
      }
    }

    loadAnswer();
  }, []);

  async function saveAnswer() {
    if (!answerId) return;

    if (!answerText.trim()) {
      setMessage("Answer text cannot be empty.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      await api(`/answers/${answerId}`, {
        method: "PUT",
        body: JSON.stringify({
          answer_text: answerText.trim()
        })
      });

      setMessage("Answer updated successfully.");

      setTimeout(() => {
        router.push("/professor/my-solutions");
      }, 700);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to update answer."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Nav />

      <main className="prof-page">
        <div className="edit-container">

          <div className="back-row">
            <button
              className="back-btn"
              onClick={() => router.push("/professor/my-solutions")}
            >
              ← Back to My Solutions
            </button>
          </div>

          <section className="edit-card">

            <div className="edit-header">
              <div className="sticker">EDIT CONTRIBUTION ✦</div>

              <h1>Edit Answer</h1>

              <p>
                Improve or update your answer before saving the changes.
              </p>
            </div>

            {loading ? (
              <div className="loading">
                <div>...</div>
                <p>Loading answer...</p>
              </div>
            ) : (
              <>
                <div className="question-box">
                  <span>QUESTION</span>
                  <h2>{question}</h2>
                </div>

                <div className="field">
                  <label htmlFor="answer">
                    Your Answer
                  </label>

                  <textarea
                    id="answer"
                    value={answerText}
                    onChange={(e) =>
                      setAnswerText(e.target.value)
                    }
                    rows={12}
                    placeholder="Write your answer..."
                  />
                </div>

                {message && (
                  <div className="message">
                    {message}
                  </div>
                )}

                <div className="actions">
                  <button
                    className="cancel-btn"
                    onClick={() =>
                      router.push("/professor/my-solutions")
                    }
                    disabled={saving}
                  >
                    Cancel
                  </button>

                  <button
                    className="save-btn"
                    onClick={saveAnswer}
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : "✓ Save Changes"}
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </main>

      <style jsx>{`
        .prof-page {
          min-height: calc(100vh - 70px);
          background: #f0f8ff;
          padding: 35px 20px 70px;
        }

        .edit-container {
          max-width: 850px;
          margin: auto;
        }

        .back-row {
          margin-bottom: 20px;
        }

        .back-btn {
          border: 3px solid #1f2937;
          background: white;
          color: #1f2937;
          padding: 9px 14px;
          border-radius: 8px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 3px 3px 0 #1f2937;
        }

        .back-btn:hover {
          transform: translate(-1px, -1px);
        }

        .edit-card {
          background: white;
          border: 3px solid #1f2937;
          border-radius: 15px;
          box-shadow: 8px 8px 0 #1f2937;
          padding: 35px;
        }

        .edit-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .sticker {
          display: inline-block;
          background: #bbf7d0;
          color: #166534;
          border: 3px solid #1f2937;
          padding: 7px 13px;
          font-size: 11px;
          font-weight: 900;
          transform: rotate(-2deg);
          box-shadow: 4px 4px 0 #1f2937;
          margin-bottom: 18px;
        }

        .edit-header h1 {
          color: #1f2937;
          font-size: 40px;
          font-weight: 900;
          margin: 0 0 8px;
        }

        .edit-header p {
          color: #64748b;
          margin: 0;
        }

        .question-box {
          background: #eff6ff;
          border: 3px solid #93c5fd;
          border-radius: 10px;
          padding: 18px;
          margin-bottom: 25px;
        }

        .question-box span {
          color: #2563eb;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.1em;
        }

        .question-box h2 {
          color: #1f2937;
          font-size: 20px;
          line-height: 1.5;
          margin: 8px 0 0;
        }

        .field label {
          display: block;
          color: #1f2937;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .field textarea {
          width: 100%;
          box-sizing: border-box;
          resize: vertical;
          border: 3px solid #1f2937;
          border-radius: 10px;
          padding: 14px;
          font: inherit;
          line-height: 1.6;
          outline: none;
        }

        .field textarea:focus {
          box-shadow: 5px 5px 0 #86efac;
        }

        .message {
          margin-top: 15px;
          background: #dcfce7;
          border: 3px solid #166534;
          color: #166534;
          padding: 11px 14px;
          border-radius: 8px;
          font-weight: 800;
        }

        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 22px;
        }

        .cancel-btn,
        .save-btn {
          border: 3px solid #1f2937;
          padding: 11px 18px;
          border-radius: 8px;
          font-weight: 900;
          cursor: pointer;
        }

        .cancel-btn {
          background: #e2e8f0;
          color: #334155;
        }

        .save-btn {
          background: #22c55e;
          color: #052e16;
          box-shadow: 4px 4px 0 #1f2937;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading {
          text-align: center;
          padding: 60px 0;
          color: #64748b;
        }

        .loading div {
          font-size: 35px;
          color: #16a34a;
          font-weight: 900;
        }

        @media (max-width: 600px) {
          .edit-card {
            padding: 22px;
          }

          .edit-header h1 {
            font-size: 32px;
          }

          .actions {
            flex-direction: column;
          }

          .actions button {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}