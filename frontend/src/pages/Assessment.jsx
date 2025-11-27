import { useState } from 'react';
import Card from '../components/Card';

const Assessment = () => {
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      category: 'Social Interaction',
      question: 'Does your child make eye contact when speaking?',
      options: ['Always', 'Sometimes', 'Rarely', 'Never']
    },
    {
      id: 2,
      category: 'Social Interaction',
      question: 'Does your child respond when their name is called?',
      options: ['Always', 'Sometimes', 'Rarely', 'Never']
    },
    {
      id: 3,
      category: 'Communication',
      question: 'Does your child use gestures to communicate needs?',
      options: ['Always', 'Sometimes', 'Rarely', 'Never']
    },
    {
      id: 4,
      category: 'Communication',
      question: 'Does your child engage in conversation with peers?',
      options: ['Always', 'Sometimes', 'Rarely', 'Never']
    },
    {
      id: 5,
      category: 'Behavior',
      question: 'Does your child have repetitive behaviors or routines?',
      options: ['Always', 'Sometimes', 'Rarely', 'Never']
    },
    {
      id: 6,
      category: 'Behavior',
      question: 'Does your child show strong interest in specific topics?',
      options: ['Always', 'Sometimes', 'Rarely', 'Never']
    },
    {
      id: 7,
      category: 'Sensory',
      question: 'Is your child sensitive to loud noises or bright lights?',
      options: ['Very Sensitive', 'Somewhat', 'Slightly', 'Not at all']
    },
    {
      id: 8,
      category: 'Sensory',
      question: 'Does your child have strong reactions to textures or foods?',
      options: ['Very Sensitive', 'Somewhat', 'Slightly', 'Not at all']
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Assessment answers:', answers);
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="mb-4">
            <h1 className="text-primary-custom">
              <i className="bi bi-clipboard-check me-2"></i>
              Autism Assessment
            </h1>
            <p className="text-muted">
              Please answer the following questions about your child's behavior and development
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit}>
              {questions.map((q, index) => (
                <div key={q.id} className={index > 0 ? 'mt-4 pt-4 border-top' : ''}>
                  <div className="mb-2">
                    <span className="badge badge-info me-2">{q.category}</span>
                    <span className="text-muted">Question {index + 1} of {questions.length}</span>
                  </div>
                  <h6 className="mb-3">{q.question}</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {q.options.map((option) => (
                      <div key={option} className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`question-${q.id}`}
                          id={`q${q.id}-${option}`}
                          checked={answers[q.id] === option}
                          onChange={() => handleAnswer(q.id, option)}
                        />
                        <label className="form-check-label" htmlFor={`q${q.id}-${option}`}>
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-4 pt-4 border-top d-flex gap-3">
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-check-circle me-2"></i>
                  Submit Assessment
                </button>
                <button type="button" className="btn btn-secondary">
                  Save Progress
                </button>
              </div>
            </form>
          </Card>

          <div className="mt-4">
            <Card title="Assessment Progress">
              <div className="mb-2 d-flex justify-content-between">
                <span>Completion Status</span>
                <span className="fw-bold">
                  {Object.keys(answers).length} / {questions.length} answered
                </span>
              </div>
              <div className="progress" style={{ height: '10px' }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                ></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
