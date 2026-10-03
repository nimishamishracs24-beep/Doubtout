'use client';

import { FormEvent, useEffect, useState } from "react";
import Nav from "../../../components/Nav";
import { api, getStoredUser } from "../../../lib/api";

type Professor = {
  user_id: number;
  full_name: string;
};

export default function Ask() {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [course, setCourse] = useState("");
  const [question, setQuestion] = useState("");
  const [professor, setProfessor] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api<{ professors: Professor[] }>("/professors")
      .then((d) => setProfessors(d.professors))
      .catch(console.error);
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();

    const u = getStoredUser();
    if (!u) return;

    try {
      await api("/doubts", {
        method: "POST",
        body: JSON.stringify({
          user_id: u.user_id,
          branch,
          semester,
          course,
          question,
          professor: professor || null,
        }),
      });

      setMessage("Doubt submitted successfully.");
      setQuestion("");
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : "Submission failed"
      );
    }
  }

  return (
    <>
      <Nav />

      <main className="ask-page">
        <div className="ask-container">

          {/* Header */}
          <section className="page-header">
            <div className="question-sticker">
              GOT A DOUBT? 💡
            </div>

            <h1>Ask a Doubt</h1>

            <p>
              Don't let a question stay unanswered.
              Tell us what you're stuck on and get help from a professor.
            </p>
          </section>

          <div className="content-grid">

            {/* Form */}
            <form className="doubt-form" onSubmit={submit}>

              <div className="form-top">
                <div>
                  <span className="form-label">
                    ASK THE COMMUNITY
                  </span>

                  <h2>Tell us what you're stuck on</h2>
                </div>

                <div className="form-icon">
                  ?
                </div>
              </div>

              {message && (
                <div className="success-message">
                  <span>✓</span>
                  {message}
                </div>
              )}

              <div className="field-row">

                <div className="field">
                  <label>Branch</label>

                  <input
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="e.g. Computer Science"
                    required
                  />
                </div>

                <div className="field">
                  <label>Semester</label>

                  <input
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    placeholder="e.g. 5"
                    required
                  />
                </div>

              </div>

              <div className="field">
                <label>Course</label>

                <input
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="e.g. Database Management Systems"
                  required
                />
              </div>

              <div className="field">
                <label>
                  Professor
                  <span className="optional">Optional</span>
                </label>

                <select
                  value={professor}
                  onChange={(e) => setProfessor(e.target.value)}
                >
                  <option value="">Select professor</option>

                  {professors.map((p) => (
                    <option
                      key={p.user_id}
                      value={p.user_id}
                    >
                      {p.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Your Question</label>

                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Explain your doubt clearly. Include the concept, problem, or part you're having trouble with..."
                  required
                />

                <span className="helper">
                  💭 The more details you provide, the easier it is
                  for someone to help.
                </span>
              </div>

              <button
                type="submit"
                className="submit-btn"
              >
                Submit Doubt
                <span>→</span>
              </button>

            </form>

            {/* Side information */}
            <aside className="help-column">

              <div className="help-card blue-help">
                <div className="help-icon">
                  🧠
                </div>

                <h3>Ask clearly</h3>

                <p>
                  Mention the exact concept or problem you're
                  struggling with.
                </p>
              </div>

              <div className="help-card green-help">
                <div className="help-icon">
                  👨‍🏫
                </div>

                <h3>Get expert help</h3>

                <p>
                  Your doubt can be directed to a professor
                  who can help you understand it.
                </p>
              </div>

              <div className="tips-card">
                <span>QUICK TIPS</span>

                <ul>
                  <li>Be specific about your doubt</li>
                  <li>Include relevant details</li>
                  <li>Use clear language</li>
                  <li>Ask one concept at a time</li>
                </ul>
              </div>

            </aside>

          </div>

          <section className="bottom-note">
            <div className="note-icon">
              ✨
            </div>

            <div>
              <strong>
                Every question is worth asking.
              </strong>

              <p>
                Your doubt might help another student understand
                the same concept too.
              </p>
            </div>
          </section>

        </div>
      </main>

      <style jsx>{`
        .ask-page {
          min-height: calc(100vh - 70px);
          background: #f0f8ff;
          padding: 42px 20px 65px;
        }

        .ask-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* HEADER */

        .page-header {
          text-align: center;
          margin-bottom: 35px;
        }

        .question-sticker {
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
          max-width: 650px;
          margin: 14px auto 0;
          color: #64748b;
          font-size: 17px;
          line-height: 1.6;
        }

        /* GRID */

        .content-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.7fr) minmax(260px, 0.8fr);
          gap: 25px;
          align-items: start;
        }

        /* FORM */

        .doubt-form {
          background: white;
          border: 3px solid #1f2937;
          border-radius: 14px;
          box-shadow: 7px 7px 0 #1f2937;
          padding: 30px;
        }

        .form-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          border-bottom: 3px solid #e2e8f0;
          padding-bottom: 20px;
          margin-bottom: 22px;
        }

        .form-label {
          color: #2563eb;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .form-top h2 {
          margin: 5px 0 0;
          color: #1f2937;
          font-size: 25px;
        }

        .form-icon {
          width: 50px;
          height: 50px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          background: #dbeafe;
          color: #1d4ed8;
          border: 3px solid #1f2937;
          border-radius: 10px;
          font-size: 25px;
          font-weight: 900;
          transform: rotate(3deg);
        }

        /* SUCCESS */

        .success-message {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #dcfce7;
          color: #166534;
          border: 3px solid #166534;
          border-radius: 9px;
          padding: 12px 15px;
          margin-bottom: 20px;
          font-weight: 800;
        }

        .success-message span {
          width: 24px;
          height: 24px;
          display: grid;
          place-items: center;
          background: #22c55e;
          color: white;
          border-radius: 50%;
          font-size: 13px;
        }

        /* FIELDS */

        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 17px;
        }

        .field {
          margin-bottom: 18px;
        }

        .field label {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #1f2937;
          font-size: 13px;
          font-weight: 900;
          margin-bottom: 7px;
        }

        .optional {
          color: #94a3b8;
          font-size: 10px;
          font-weight: 700;
        }

        .field input,
        .field select,
        .field textarea {
          width: 100%;
          box-sizing: border-box;
          border: 2px solid #64748b;
          border-radius: 8px;
          background: #f8fafc;
          color: #1f2937;
          font-family: inherit;
          font-size: 15px;
          outline: none;
          transition: 0.15s;
        }

        .field input,
        .field select {
          height: 47px;
          padding: 0 13px;
        }

        .field textarea {
          min-height: 155px;
          resize: vertical;
          padding: 13px;
          line-height: 1.55;
        }

        .field input:focus,
        .field select:focus,
        .field textarea:focus {
          background: white;
          border-color: #2563eb;
          box-shadow: 3px 3px 0 #93c5fd;
        }

        .field input::placeholder,
        .field textarea::placeholder {
          color: #94a3b8;
        }

        .helper {
          display: block;
          color: #94a3b8;
          font-size: 11px;
          margin-top: 6px;
          line-height: 1.5;
        }

        /* BUTTON */

        .submit-btn {
          width: 100%;
          border: 3px solid #1f2937;
          border-radius: 9px;
          background: #22c55e;
          color: #052e16;
          box-shadow: 5px 5px 0 #1f2937;
          padding: 13px 18px;
          font-size: 16px;
          font-weight: 900;
          cursor: pointer;
          transition: 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .submit-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 #1f2937;
        }

        .submit-btn:active {
          transform: translate(3px, 3px);
          box-shadow: 2px 2px 0 #1f2937;
        }

        /* SIDE CARDS */

        .help-column {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .help-card {
          border: 3px solid #1f2937;
          border-radius: 11px;
          padding: 20px;
        }

        .blue-help {
          background: #eff6ff;
          box-shadow: 5px 5px 0 #60a5fa;
        }

        .green-help {
          background: #f0fdf4;
          box-shadow: 5px 5px 0 #4ade80;
        }

        .help-icon {
          font-size: 29px;
          margin-bottom: 9px;
        }

        .help-card h3 {
          color: #1f2937;
          font-size: 19px;
          margin: 0 0 6px;
        }

        .help-card p {
          color: #64748b;
          line-height: 1.55;
          margin: 0;
          font-size: 14px;
        }

        .tips-card {
          background: white;
          border: 3px solid #1f2937;
          border-radius: 11px;
          box-shadow: 5px 5px 0 #facc15;
          padding: 20px;
        }

        .tips-card > span {
          color: #b45309;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.1em;
        }

        .tips-card ul {
          margin: 12px 0 0;
          padding-left: 19px;
          color: #475569;
        }

        .tips-card li {
          margin-bottom: 8px;
          font-size: 13px;
          line-height: 1.4;
        }

        /* BOTTOM */

        .bottom-note {
          display: flex;
          align-items: center;
          gap: 15px;
          background: white;
          border: 3px solid #1f2937;
          border-radius: 11px;
          box-shadow: 6px 6px 0 #facc15;
          padding: 19px 22px;
          margin-top: 30px;
        }

        .note-icon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          background: #fef3c7;
          border: 3px solid #1f2937;
          border-radius: 50%;
          font-size: 22px;
        }

        .bottom-note strong {
          color: #1f2937;
          font-size: 16px;
        }

        .bottom-note p {
          color: #64748b;
          margin: 4px 0 0;
          font-size: 13px;
        }

        @media (max-width: 800px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 550px) {
          .ask-page {
            padding: 30px 15px 50px;
          }

          .doubt-form {
            padding: 20px;
          }

          .field-row {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .form-top h2 {
            font-size: 21px;
          }

          .bottom-note {
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}