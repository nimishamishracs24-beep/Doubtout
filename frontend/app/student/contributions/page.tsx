'use client';

import { useEffect, useState } from "react";
import Nav from "../../../components/Nav";
import { api, getStoredUser } from "../../../lib/api";

type A = {
  practice_id: number;
  answer_text: string;
  status: string;
  question: string;
  course: string;
  professor_name: string;
};

export default function Contributions() {
  const [items, setItems] = useState<A[]>([]);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    const u = getStoredUser();

    if (u) {
      api<{ pending_count: number; approved_answers: A[] }>(
        `/student/contributions/${u.user_id}`
      )
        .then((d) => {
          setPending(d.pending_count);
          setItems(d.approved_answers);
        })
        .catch(console.error);
    }
  }, []);

  return (
    <>
      <Nav />

      <main className="contributions-page">
        <div className="contributions-container">

          {/* Header */}
          <section className="page-header">
            <div className="header-sticker">
              YOUR IMPACT ✦
            </div>

            <h1>My Contributions</h1>

            <p>
              Share your knowledge, help other students,
              and see the answers you've contributed.
            </p>
          </section>

          {/* Pending Review Card */}
          <section className="pending-card">
            <div className="pending-icon">
              ⏳
            </div>

            <div className="pending-info">
              <span className="small-label">
                CONTRIBUTIONS
              </span>

              <h2>{pending}</h2>

              <p>Pending reviews</p>
            </div>

            <div className="pending-note">
              <span>STATUS</span>
              <strong>
                {pending > 0 ? "Under Review" : "All Clear ✓"}
              </strong>
            </div>
          </section>

          {/* Contributions */}
          <section className="contributions-section">

            <div className="section-title">
              <div>
                <span className="section-label">
                  APPROVED CONTRIBUTIONS
                </span>

                <h2>Your Knowledge Library</h2>
              </div>

              <div className="count-badge">
                {items.length}{" "}
                {items.length === 1 ? "Answer" : "Answers"}
              </div>
            </div>

            <div className="contribution-list">

              {items.map((a) => (
                <article
                  className="contribution-card"
                  key={a.practice_id}
                >
                  <div className="card-top">
                    <span className="course-badge">
                      {a.course}
                    </span>

                    <span className="approved-badge">
                      ✓ Approved
                    </span>
                  </div>

                  <h3>{a.question}</h3>

                  <div className="answer-box">
                    <div className="answer-label">
                      YOUR ANSWER
                    </div>

                    <p>{a.answer_text}</p>
                  </div>

                  <div className="review-info">
                    <div className="professor-avatar">
                      👨‍🏫
                    </div>

                    <div>
                      <span>Reviewed by</span>
                      <strong>{a.professor_name}</strong>
                    </div>
                  </div>
                </article>
              ))}

              {items.length === 0 && (
                <div className="empty-card">
                  <div className="empty-icon">
                    💭
                  </div>

                  <h3>No approved contributions yet</h3>

                  <p>
                    Once your answers are reviewed and approved,
                    they'll appear here.
                  </p>
                </div>
              )}

            </div>
          </section>

          {/* Bottom message */}
          <section className="encouragement-card">
            <div className="encouragement-icon">
              ⭐
            </div>

            <div>
              <span>KEEP CONTRIBUTING</span>

              <h3>
                Your answer could help someone learn!
              </h3>

              <p>
                Every useful explanation adds to the DoubtOut
                knowledge community.
              </p>
            </div>
          </section>

        </div>
      </main>

      <style jsx>{`
        .contributions-page {
          min-height: calc(100vh - 70px);
          background: #f0f8ff;
          padding: 45px 20px 70px;
        }

        .contributions-container {
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
          background: #dcfce7;
          color: #166534;
          border: 3px solid #1f2937;
          padding: 8px 15px;
          font-size: 12px;
          font-weight: 900;
          transform: rotate(-2deg);
          box-shadow: 4px 4px 0 #1f2937;
          margin-bottom: 20px;
        }

        .page-header h1 {
          margin: 0;
          color: #1f2937;
          font-size: clamp(36px, 6vw, 52px);
          font-weight: 900;
        }

        .page-header p {
          max-width: 650px;
          margin: 14px auto 0;
          color: #64748b;
          font-size: 17px;
          line-height: 1.6;
        }

        /* PENDING CARD */

        .pending-card {
          background: #fff;
          border: 3px solid #1f2937;
          border-radius: 14px;
          box-shadow: 7px 7px 0 #1f2937;
          padding: 22px 25px;
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 38px;
        }

        .pending-icon {
          width: 64px;
          height: 64px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          background: #fef3c7;
          border: 3px solid #1f2937;
          border-radius: 12px;
          font-size: 29px;
        }

        .pending-info {
          flex: 1;
        }

        .small-label {
          color: #2563eb;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .pending-info h2 {
          color: #1f2937;
          font-size: 38px;
          line-height: 1;
          margin: 5px 0 2px;
        }

        .pending-info p {
          margin: 0;
          color: #64748b;
          font-weight: 700;
        }

        .pending-note {
          border-left: 3px solid #e2e8f0;
          padding-left: 25px;
          min-width: 150px;
        }

        .pending-note span {
          display: block;
          color: #94a3b8;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.1em;
          margin-bottom: 5px;
        }

        .pending-note strong {
          color: #15803d;
          font-size: 14px;
        }

        /* SECTION */

        .contributions-section {
          background: white;
          border: 3px solid #1f2937;
          border-radius: 14px;
          box-shadow: 7px 7px 0 #1f2937;
          padding: 28px;
        }

        .section-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          padding-bottom: 20px;
          border-bottom: 3px solid #e2e8f0;
          margin-bottom: 25px;
        }

        .section-label {
          color: #2563eb;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .section-title h2 {
          color: #1f2937;
          margin: 5px 0 0;
          font-size: 26px;
        }

        .count-badge {
          background: #dbeafe;
          color: #1e40af;
          border: 3px solid #1f2937;
          border-radius: 8px;
          padding: 8px 13px;
          font-size: 12px;
          font-weight: 900;
          white-space: nowrap;
        }

        /* CONTRIBUTION CARD */

        .contribution-list {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .contribution-card {
          background: #f8fafc;
          border: 3px solid #1f2937;
          border-radius: 11px;
          padding: 22px;
          box-shadow: 5px 5px 0 #4ade80;
          transition: 0.15s;
        }

        .contribution-card:hover {
          transform: translate(-2px, -2px);
        }

        .card-top {
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

        .approved-badge {
          color: #166534;
          background: #dcfce7;
          border: 2px solid #166534;
          border-radius: 7px;
          padding: 5px 10px;
          font-size: 11px;
          font-weight: 900;
        }

        .contribution-card h3 {
          color: #1f2937;
          font-size: 20px;
          line-height: 1.4;
          margin: 0 0 16px;
        }

        .answer-box {
          background: white;
          border: 2px solid #cbd5e1;
          border-radius: 9px;
          padding: 17px;
        }

        .answer-label {
          color: #64748b;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.1em;
          margin-bottom: 7px;
        }

        .answer-box p {
          color: #334155;
          line-height: 1.65;
          margin: 0;
          white-space: pre-wrap;
        }

        .review-info {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 17px;
          padding-top: 15px;
          border-top: 2px dashed #cbd5e1;
        }

        .professor-avatar {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          background: #ede9fe;
          border: 2px solid #1f2937;
          border-radius: 50%;
        }

        .review-info span,
        .review-info strong {
          display: block;
        }

        .review-info span {
          color: #94a3b8;
          font-size: 11px;
        }

        .review-info strong {
          color: #334155;
          font-size: 13px;
          margin-top: 2px;
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
          font-size: 42px;
          margin-bottom: 12px;
        }

        .empty-card h3 {
          color: #1f2937;
          margin: 0 0 7px;
          font-size: 21px;
        }

        .empty-card p {
          color: #64748b;
          margin: 0;
        }

        /* BOTTOM */

        .encouragement-card {
          margin-top: 30px;
          background: #fff;
          border: 3px solid #1f2937;
          border-radius: 12px;
          box-shadow: 6px 6px 0 #facc15;
          padding: 22px;
          display: flex;
          align-items: center;
          gap: 17px;
        }

        .encouragement-icon {
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

        .encouragement-card span {
          color: #b45309;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .encouragement-card h3 {
          color: #1f2937;
          margin: 4px 0;
          font-size: 19px;
        }

        .encouragement-card p {
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }

        @media (max-width: 650px) {
          .contributions-page {
            padding: 30px 15px 50px;
          }

          .pending-card {
            align-items: flex-start;
          }

          .pending-note {
            display: none;
          }

          .section-title {
            align-items: flex-start;
            flex-direction: column;
          }

          .card-top {
            align-items: flex-start;
            flex-direction: column;
          }

          .contributions-section {
            padding: 20px;
          }

          .encouragement-card {
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}