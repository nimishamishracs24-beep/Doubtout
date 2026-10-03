'use client';

import { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import { api } from "../../lib/api";

type Row = {
  question: string;
  course: string;
  semester: string;
  answer_text: string;
  answered_by: string;
};

export default function Archive() {
  const [rows, setRows] = useState<Row[]>([]);
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");

  async function load() {
    const p = new URLSearchParams();

    if (search) p.set("search", search);
    if (course) p.set("course", course);
    if (semester) p.set("semester", semester);

    try {
      const d = await api<{ archive: Row[] }>(`/archive?${p}`);
      setRows(d.archive);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Nav />

      <main className="archive-page">
        <div className="archive-container">

          {/* HEADER */}
          <section className="archive-header">
            <div>
              <div className="archive-sticker">
                KNOWLEDGE HUB 📚
              </div>

              <h1>
                Answer
                <span> Archive.</span>
              </h1>

              <p>
                Browse faculty-verified questions and solutions.
                Find answers, learn from others and build your knowledge.
              </p>
            </div>

            <div className="archive-illustration">
              <div className="book-icon">📖</div>
              <span>Learn something new!</span>
            </div>
          </section>

          {/* SEARCH PANEL */}
          <section className="search-card">

            <div className="search-heading">
              <div>
                <h2>🔎 Find an answer</h2>
                <p>
                  Search through questions answered by faculty.
                </p>
              </div>

              <div className="verified-badge">
                ✓ Faculty Verified
              </div>
            </div>

            <div className="filter-grid">

              <div className="filter-field">
                <label htmlFor="archive-search">
                  Search questions
                </label>

                <input
                  id="archive-search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="What are you looking for?"
                />
              </div>

              <div className="filter-field">
                <label htmlFor="archive-course">
                  Course
                </label>

                <input
                  id="archive-course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="e.g. DBMS"
                />
              </div>

              <div className="filter-field">
                <label htmlFor="archive-semester">
                  Semester
                </label>

                <input
                  id="archive-semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  placeholder="e.g. 5"
                />
              </div>

            </div>

            <button
              className="search-button"
              onClick={load}
            >
              Search Archive →
            </button>
          </section>

          {/* RESULTS */}
          <section className="results-section">

            <div className="results-heading">
              <h2>
                {rows.length > 0
                  ? `${rows.length} Answer${rows.length === 1 ? "" : "s"} Found`
                  : "Archive Results"}
              </h2>

              {rows.length > 0 && (
                <span className="result-count">
                  VERIFIED CONTENT
                </span>
              )}
            </div>

            <div className="archive-list">

              {rows.map((r, i) => (
                <article
                  className="answer-card"
                  key={i}
                >
                  <div className="answer-top">

                    <span className="course-badge">
                      {r.course}
                    </span>

                    {r.semester && (
                      <span className="semester-badge">
                        Semester {r.semester}
                      </span>
                    )}

                    <span className="verified">
                      ✓ Verified
                    </span>

                  </div>

                  <h3>
                    {r.question}
                  </h3>

                  <div className="answer-divider" />

                  <div className="answer-label">
                    <span>💡</span>
                    Faculty Answer
                  </div>

                  <p className="answer-text">
                    {r.answer_text}
                  </p>

                  <div className="answer-footer">
                    <div className="professor">
                      <div className="avatar">
                        {r.answered_by
                          ? r.answered_by.charAt(0).toUpperCase()
                          : "P"}
                      </div>

                      <div>
                        <small>Answered by</small>
                        <strong>{r.answered_by}</strong>
                      </div>
                    </div>

                    <span className="helpful">
                      Faculty verified ✓
                    </span>
                  </div>
                </article>
              ))}

              {rows.length === 0 && (
                <div className="empty-card">
                  <div className="empty-icon">🔍</div>

                  <h3>
                    No matching answered questions
                  </h3>

                  <p>
                    Try changing your search terms or filters.
                  </p>
                </div>
              )}

            </div>
          </section>

        </div>
      </main>

      <style jsx>{`
        .archive-page {
          min-height: calc(100vh - 72px);
          background: #f0f8ff;
          padding: 50px 20px 80px;
        }

        .archive-container {
          width: 100%;
          max-width: 1100px;
          margin: auto;
        }

        /* HEADER */

        .archive-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 38px;
        }

        .archive-sticker {
          display: inline-block;
          background: #2563eb;
          color: white;
          border: 3px solid #1f2937;
          padding: 9px 15px;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 1px;
          box-shadow: 5px 5px 0 #1f2937;
          transform: rotate(-2deg);
          margin-bottom: 20px;
        }

        .archive-header h1 {
          margin: 0;
          color: #1f2937;
          font-size: clamp(43px, 6vw, 64px);
          line-height: 0.95;
          font-weight: 950;
          letter-spacing: -3px;
        }

        .archive-header h1 span {
          color: #2563eb;
        }

        .archive-header p {
          max-width: 610px;
          margin: 20px 0 0;
          color: #4b5563;
          font-size: 16px;
          line-height: 1.6;
        }

        .archive-illustration {
          min-width: 180px;
          padding: 22px;
          background: #fef3c7;
          border: 4px solid #1f2937;
          border-radius: 15px;
          box-shadow: 7px 7px 0 #1f2937;
          transform: rotate(2deg);
          text-align: center;
        }

        .book-icon {
          font-size: 52px;
          margin-bottom: 7px;
        }

        .archive-illustration span {
          display: block;
          color: #1f2937;
          font-size: 13px;
          font-weight: 900;
        }

        /* SEARCH */

        .search-card {
          background: white;
          border: 4px solid #1f2937;
          border-radius: 16px;
          padding: 27px;
          box-shadow: 8px 8px 0 #1f2937;
          margin-bottom: 42px;
        }

        .search-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 23px;
        }

        .search-heading h2 {
          margin: 0;
          color: #1f2937;
          font-size: 24px;
          font-weight: 950;
        }

        .search-heading p {
          margin: 5px 0 0;
          color: #6b7280;
          font-size: 13px;
        }

        .verified-badge {
          padding: 8px 12px;
          background: #dcfce7;
          color: #166534;
          border: 2px solid #166534;
          border-radius: 7px;
          font-size: 11px;
          font-weight: 950;
          white-space: nowrap;
        }

        .filter-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 15px;
        }

        .filter-field label {
          display: block;
          color: #1f2937;
          font-size: 13px;
          font-weight: 950;
          margin-bottom: 7px;
        }

        .filter-field input {
          width: 100%;
          box-sizing: border-box;
          padding: 13px;
          background: #f8fafc;
          color: #1f2937;
          border: 3px solid #1f2937;
          border-radius: 8px;
          outline: none;
          font-size: 14px;
          transition: 0.15s ease;
        }

        .filter-field input:focus {
          background: white;
          box-shadow: 4px 4px 0 #2563eb;
          transform: translate(-1px, -1px);
        }

        .filter-field input::placeholder {
          color: #9ca3af;
        }

        .search-button {
          margin-top: 18px;
          padding: 12px 21px;
          background: #2563eb;
          color: white;
          border: 3px solid #1f2937;
          border-radius: 8px;
          box-shadow: 4px 4px 0 #1f2937;
          font-size: 14px;
          font-weight: 950;
          cursor: pointer;
          transition: 0.15s ease;
        }

        .search-button:hover {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0 #1f2937;
        }

        .search-button:active {
          transform: translate(4px, 4px);
          box-shadow: none;
        }

        /* RESULTS */

        .results-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .results-heading h2 {
          margin: 0;
          color: #1f2937;
          font-size: 25px;
          font-weight: 950;
        }

        .result-count {
          color: #166534;
          background: #dcfce7;
          border: 2px solid #166534;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 950;
          letter-spacing: 0.7px;
        }

        .archive-list {
          display: grid;
          gap: 19px;
        }

        .answer-card {
          background: white;
          border: 3px solid #1f2937;
          border-radius: 13px;
          padding: 23px;
          box-shadow: 5px 5px 0 #1f2937;
          transition: 0.15s ease;
        }

        .answer-card:hover {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 #1f2937;
        }

        .answer-top {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 14px;
        }

        .course-badge {
          background: #dbeafe;
          color: #1d4ed8;
          border: 2px solid #2563eb;
          padding: 5px 9px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 950;
        }

        .semester-badge {
          background: #f3f4f6;
          color: #4b5563;
          border: 2px solid #9ca3af;
          padding: 5px 9px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 800;
        }

        .verified {
          margin-left: auto;
          color: #166534;
          background: #dcfce7;
          padding: 5px 9px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 950;
        }

        .answer-card h3 {
          margin: 0;
          color: #1f2937;
          font-size: 19px;
          line-height: 1.4;
          font-weight: 900;
        }

        .answer-divider {
          height: 3px;
          background: #e5e7eb;
          margin: 18px 0;
        }

        .answer-label {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #2563eb;
          font-size: 12px;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin-bottom: 8px;
        }

        .answer-text {
          margin: 0;
          color: #374151;
          font-size: 14px;
          line-height: 1.7;
          white-space: pre-wrap;
        }

        .answer-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          margin-top: 20px;
          padding-top: 15px;
          border-top: 2px dashed #d1d5db;
        }

        .professor {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .avatar {
          width: 34px;
          height: 34px;
          border: 2px solid #1f2937;
          border-radius: 50%;
          background: #dcfce7;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #166534;
          font-weight: 950;
        }

        .professor small {
          display: block;
          color: #9ca3af;
          font-size: 10px;
        }

        .professor strong {
          display: block;
          color: #1f2937;
          font-size: 12px;
          font-weight: 900;
        }

        .helpful {
          color: #166534;
          font-size: 11px;
          font-weight: 900;
        }

        /* EMPTY */

        .empty-card {
          text-align: center;
          background: white;
          border: 3px dashed #1f2937;
          border-radius: 13px;
          padding: 55px 25px;
        }

        .empty-icon {
          font-size: 45px;
          margin-bottom: 12px;
        }

        .empty-card h3 {
          margin: 0;
          color: #1f2937;
          font-size: 20px;
          font-weight: 950;
        }

        .empty-card p {
          color: #6b7280;
          font-size: 14px;
          margin: 8px 0 0;
        }

        @media (max-width: 800px) {
          .archive-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .archive-illustration {
            display: none;
          }

          .filter-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 550px) {
          .archive-page {
            padding: 35px 14px 60px;
          }

          .search-card {
            padding: 20px;
            box-shadow: 6px 6px 0 #1f2937;
          }

          .search-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .answer-card {
            padding: 18px;
          }

          .verified {
            margin-left: 0;
          }

          .answer-footer {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}