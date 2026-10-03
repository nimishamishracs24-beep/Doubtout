'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "../../../components/Nav";
import { api, getStoredUser } from "../../../lib/api";

type Answer = {
  answer_id: number;
  answer_text: string;
  answered_at: string;
  question: string;
  course: string;
};

export default function MySolutions() {
  const router = useRouter();

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadAnswers() {
    const professor = getStoredUser();

    if (!professor || professor.role !== "professor") {
      window.location.href = "/login";
      return;
    }

    try {
      const data = await api<{ answers: Answer[] }>(
        `/professor/answers/${professor.user_id}`
      );

      setAnswers(data.answers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnswers();
  }, []);

  function editAnswer(id: number) {
    router.push(`/professor/edit-answer?answer_id=${id}`);
  }

  return (
    <>
      <Nav />

      <main className="prof-page">
        <div className="prof-container">

          <section className="page-heading">
            <div className="sticker">KNOWLEDGE CONTRIBUTIONS ✦</div>

            <h1>My Knowledge Contributions</h1>

            <p>
              Review, edit, and manage the answers you have provided to
              students.
            </p>
          </section>

          <section className="solutions-panel">
            <div className="panel-heading">
              <div>
                <span className="section-label">YOUR ANSWERS</span>
                <h2>Your Answer History</h2>
              </div>

              <span className="count-badge">
                {answers.length} answers
              </span>
            </div>

            {loading ? (
              <div className="empty-card">
                <div className="loader">...</div>
                <h3>Loading answers...</h3>
              </div>
            ) : answers.length === 0 ? (
              <div className="empty-card">
                <div className="empty-icon">?</div>
                <h3>No Answers Found</h3>
                <p>
                  You haven't provided any answers yet.
                </p>
              </div>
            ) : (
              <div className="answer-list">
                {answers.map((answer) => (
                  <article
                    className="answer-card"
                    key={answer.answer_id}
                  >
                    <div className="answer-card-top">
                      <span className="course-badge">
                        {answer.course}
                      </span>

                      <span className="published-badge">
                        Published
                      </span>
                    </div>

                    <h3>{answer.question}</h3>

                    <p className="date">
                      Answered on{" "}
                      {new Date(answer.answered_at).toLocaleDateString()}
                    </p>

                    <div className="answer-preview">
                      {answer.answer_text}
                    </div>

                    <button
                      className="edit-btn"
                      onClick={() => editAnswer(answer.answer_id)}
                    >
                      ✎ Edit Answer
                    </button>
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
          margin: auto;
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
          transform: rotate(2deg);
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
          max-width: 650px;
          margin: auto;
          line-height: 1.6;
        }

        .solutions-panel {
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
          color: #16a34a;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .panel-heading h2 {
          margin: 4px 0 0;
          color: #1f2937;
          font-size: 25px;
        }

        .count-badge {
          background: #dcfce7;
          color: #166534;
          border: 2px solid #166534;
          border-radius: 999px;
          padding: 7px 12px;
          font-size: 13px;
          font-weight: 900;
        }

        .answer-list {
          display: grid;
          gap: 18px;
        }

        .answer-card {
          background: #f8fafc;
          border: 3px solid #1f2937;
          border-radius: 12px;
          padding: 21px;
          box-shadow: 4px 4px 0 #93c5fd;
        }

        .answer-card-top {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 13px;
        }

        .course-badge,
        .published-badge {
          font-size: 12px;
          font-weight: 900;
          padding: 6px 10px;
          border-radius: 7px;
        }

        .course-badge {
          background: #dbeafe;
          color: #1d4ed8;
          border: 2px solid #2563eb;
        }

        .published-badge {
          background: #dcfce7;
          color: #166534;
          border: 2px solid #22c55e;
        }

        .answer-card h3 {
          margin: 0;
          color: #1f2937;
          font-size: 20px;
          line-height: 1.4;
        }

        .date {
          color: #64748b;
          font-size: 13px;
          margin: 7px 0 14px;
        }

        .answer-preview {
          background: white;
          border: 2px solid #cbd5e1;
          border-radius: 8px;
          padding: 14px;
          color: #334155;
          line-height: 1.6;
          max-height: 130px;
          overflow: hidden;
          white-space: pre-wrap;
        }

        .edit-btn {
          margin-top: 16px;
          border: 3px solid #1f2937;
          background: #22c55e;
          color: #052e16;
          padding: 9px 16px;
          border-radius: 8px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 3px 3px 0 #1f2937;
        }

        .edit-btn:hover {
          transform: translate(-1px, -1px);
        }

        .empty-card {
          text-align: center;
          padding: 60px 20px;
          color: #64748b;
        }

        .empty-icon {
          width: 58px;
          height: 58px;
          display: grid;
          place-items: center;
          margin: auto;
          border-radius: 50%;
          border: 3px solid #64748b;
          font-size: 25px;
          font-weight: 900;
        }

        .empty-card h3 {
          color: #1f2937;
          margin: 15px 0 5px;
        }

        .loader {
          color: #16a34a;
          font-size: 35px;
          font-weight: 900;
        }

        @media (max-width: 650px) {
          .solutions-panel {
            padding: 18px;
          }

          .panel-heading {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}