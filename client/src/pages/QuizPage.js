import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import api from '../utils/api';
import styles from './QuizPage.module.css';

const STATES = { LOADING: 'loading', INTRO: 'intro', QUIZ: 'quiz', RESULT: 'result' };

export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState(STATES.LOADING);
  const [questions, setQuestions] = useState([]);
  const [roadmap, setRoadmap] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [pastResults, setPastResults] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [qRes, rmRes, prRes] = await Promise.all([
          api.get(`/quiz/${id}`),
          api.get(`/roadmaps/${id}`),
          api.get(`/quiz/${id}/results`)
        ]);
        setQuestions(qRes.data.questions);
        setRoadmap(rmRes.data.roadmap);
        setPastResults(prRes.data.results);
        setState(STATES.INTRO);
      } catch (e) {
        console.error(e);
        navigate('/dashboard');
      }
    };
    load();
  }, [id, navigate]);

  const startQuiz = () => {
    setAnswers({});
    setSelected(null);
    setCurrent(0);
    setState(STATES.QUIZ);
  };

  const selectAnswer = (idx) => {
    if (answers[questions[current].id] !== undefined) return;
    setSelected(idx);
  };

  const next = () => {
    if (selected === null) return;
    const newAnswers = { ...answers, [questions[current].id]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
    } else {
      submitQuiz(newAnswers);
    }
  };

  const submitQuiz = async (finalAnswers) => {
    setSubmitting(true);
    try {
      const res = await api.post(`/quiz/${id}/submit`, { answers: finalAnswers });
      setResults(res.data.results);
      setState(STATES.RESULT);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const q = questions[current];
  const progress = questions.length ? ((current) / questions.length) * 100 : 0;

  if (state === STATES.LOADING) return (
    <div className={styles.page}><Navbar />
      <div className={styles.center}><div className="spinner" style={{ width: 40, height: 40 }} /></div>
    </div>
  );

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <button className={styles.back} onClick={() => navigate(`/roadmap/${id}`)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Back to Roadmap
        </button>

        {/* INTRO */}
        {state === STATES.INTRO && (
          <div className={styles.card}>
            <div className={styles.introIcon}>{roadmap?.icon}</div>
            <h1 className={styles.introTitle}>{roadmap?.title} Quiz</h1>
            <p className={styles.introDesc}>Test your knowledge of {roadmap?.title}. Answer {questions.length} multiple-choice questions.</p>

            {pastResults.length > 0 && (
              <div className={styles.pastResults}>
                <h3 className={styles.pastTitle}>Previous Attempts</h3>
                <div className={styles.pastList}>
                  {pastResults.slice(0, 3).map((r, i) => (
                    <div key={i} className={styles.pastItem}>
                      <span className={styles.pastDate}>{new Date(r.completedAt).toLocaleDateString()}</span>
                      <span className={styles.pastScore} style={{ color: r.percentage >= 70 ? 'var(--success)' : r.percentage >= 50 ? 'var(--warning)' : 'var(--danger)' }}>
                        {r.score}/{r.totalQuestions} ({r.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.introStats}>
              <div className={styles.introStat}>
                <div className={styles.introStatNum}>{questions.length}</div>
                <div className={styles.introStatLabel}>Questions</div>
              </div>
              <div className={styles.introStat}>
                <div className={styles.introStatNum}>MCQ</div>
                <div className={styles.introStatLabel}>Format</div>
              </div>
              <div className={styles.introStat}>
                <div className={styles.introStatNum}>70%</div>
                <div className={styles.introStatLabel}>Pass Score</div>
              </div>
            </div>

            <button className={styles.startBtn} onClick={startQuiz}>Start Quiz →</button>
          </div>
        )}

        {/* QUIZ */}
        {state === STATES.QUIZ && q && (
          <div className={styles.quizWrap}>
            {/* Progress */}
            <div className={styles.quizProgress}>
              <div className={styles.quizProgressInfo}>
                <span>Question {current + 1} of {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className={styles.quizBar}>
                <div className={styles.quizBarFill} style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.qNum}>Q{current + 1}</div>
              <h2 className={styles.question}>{q.question}</h2>
              <div className={styles.options}>
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    className={`${styles.option} ${selected === i ? styles.optionSelected : ''}`}
                    onClick={() => selectAnswer(i)}
                  >
                    <span className={styles.optionLetter}>{String.fromCharCode(65 + i)}</span>
                    <span className={styles.optionText}>{opt}</span>
                    {selected === i && (
                      <svg className={styles.optionCheck} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    )}
                  </button>
                ))}
              </div>
              <div className={styles.quizActions}>
                <span className={styles.quizHint}>{selected === null ? 'Select an answer to continue' : 'Answer selected!'}</span>
                <button
                  className={styles.nextBtn}
                  onClick={next}
                  disabled={selected === null || submitting}
                >
                  {submitting ? <span className="spinner" style={{ width: 18, height: 18 }} /> :
                    current === questions.length - 1 ? 'Submit Quiz' : 'Next →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RESULT */}
        {state === STATES.RESULT && results && (
          <div className={styles.resultWrap}>
            <div className={styles.card}>
              <div className={styles.resultHeader}>
                <div className={styles.resultEmoji}>
                  {results.percentage >= 80 ? '🏆' : results.percentage >= 60 ? '👍' : '📚'}
                </div>
                <h2 className={styles.resultTitle}>
                  {results.percentage >= 80 ? 'Excellent!' : results.percentage >= 60 ? 'Good Job!' : 'Keep Practicing!'}
                </h2>
                <div className={styles.resultScore} style={{
                  color: results.percentage >= 70 ? 'var(--success)' : results.percentage >= 50 ? 'var(--warning)' : 'var(--danger)'
                }}>
                  {results.score}/{results.totalQuestions}
                </div>
                <div className={styles.resultPct}>{results.percentage}%</div>
                <div className={`${styles.resultBadge} ${results.percentage >= 70 ? styles.pass : styles.fail}`}>
                  {results.percentage >= 70 ? '✓ Passed' : '✗ Failed'}
                </div>
              </div>

              <h3 className={styles.reviewTitle}>Answer Review</h3>
              <div className={styles.reviewList}>
                {results.details.map((d, i) => (
                  <div key={d.questionId} className={`${styles.reviewItem} ${d.isCorrect ? styles.reviewCorrect : styles.reviewWrong}`}>
                    <div className={styles.reviewQ}>
                      <span className={styles.reviewNum}>Q{i + 1}</span>
                      <span className={styles.reviewIcon}>{d.isCorrect ? '✓' : '✗'}</span>
                    </div>
                    <p className={styles.reviewQuestion}>{d.question}</p>
                    <div className={styles.reviewAnswers}>
                      {d.options.map((opt, idx) => (
                        <div key={idx} className={`${styles.reviewOpt}
                          ${idx === d.correctAnswer ? styles.reviewOptCorrect : ''}
                          ${idx === d.selectedAnswer && !d.isCorrect ? styles.reviewOptWrong : ''}
                        `}>
                          <span>{String.fromCharCode(65 + idx)}.</span> {opt}
                          {idx === d.correctAnswer && <span className={styles.reviewLabel}>Correct</span>}
                          {idx === d.selectedAnswer && !d.isCorrect && <span className={styles.reviewLabelWrong}>Your answer</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.resultActions}>
                <button className={styles.retryBtn} onClick={startQuiz}>Retry Quiz</button>
                <button className={styles.roadmapBtn} onClick={() => navigate(`/roadmap/${id}`)}>
                  Back to Roadmap
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
