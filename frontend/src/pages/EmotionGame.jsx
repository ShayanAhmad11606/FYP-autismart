
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChild } from '../context/ChildContext';
import ChildSelector from '../components/ChildSelector';

const EmotionGame = () => {
    const navigate = useNavigate();
    const { selectedChild, recordActivity } = useChild();
    const [score, setScore] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);
    const [feedback, setFeedback] = useState(null); // 'correct' or 'incorrect'
    const [startTime, setStartTime] = useState(null);

    // Emojis for emotions - high quality and clear
    const emotions = [
        { name: 'Happy', emoji: '😊', description: 'Feeling good and smiling' },
        { name: 'Sad', emoji: '😢', description: 'Feeling down or crying' },
        { name: 'Angry', emoji: '😠', description: 'Feeling mad or upset' },
        { name: 'Surprised', emoji: '😮', description: 'Feeling shocked or amazed' },
        { name: 'Scared', emoji: '😨', description: 'Feeling afraid or nervous' },
        { name: 'Sleepy', emoji: '😴', description: 'Feeling tired or wanting to sleep' },
        { name: 'Love', emoji: '😍', description: 'Feeling love or affection' },
        { name: 'Thinking', emoji: '🤔', description: 'Thinking about something' },
        { name: 'Cool', emoji: '😎', description: 'Feeling confident or cool' },
        { name: 'Silly', emoji: '🤪', description: 'Being funny or goofy' }
    ];

    // Generate questions
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        // Create 10 rounds
        const newQuestions = Array(10).fill(null).map(() => {
            // Pick a random target emotion
            const target = emotions[Math.floor(Math.random() * emotions.length)];

            // Pick 3 distractors (unique from target)
            const distractors = emotions
                .filter(e => e.name !== target.name)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);

            // Combine and shuffle options
            const options = [target, ...distractors].sort(() => 0.5 - Math.random());

            return { target, options };
        });

        setQuestions(newQuestions);
        setScore(0);
        setQuestionIndex(0);
        setGameComplete(false);
        setFeedback(null);
        setStartTime(Date.now());
    };

    const handleAnswer = (selectedEmotion) => {
        if (feedback) return; // Prevent clicking while feedback is showing

        const currentQuestion = questions[questionIndex];
        const isCorrect = selectedEmotion.name === currentQuestion.target.name;

        if (isCorrect) {
            setScore(score + 10);
            setFeedback('correct');
        } else {
            setFeedback('incorrect');
        }

        // Wait for feedback animation
        setTimeout(() => {
            setFeedback(null);
            if (questionIndex < questions.length - 1) {
                setQuestionIndex(questionIndex + 1);
            } else {
                finishGame();
            }
        }, 1500);
    };

    const finishGame = () => {
        setGameComplete(true);
        const endTime = Date.now();
        const duration = Math.floor((endTime - startTime) / 1000);
        const finalScore = score + (feedback === 'correct' ? 10 : 0); // Add last point if correct

        if (selectedChild) {
            recordActivity({
                activityType: 'game',
                activityName: 'Emotion Recognition',
                score: finalScore,
                maxScore: 100,
                percentage: finalScore, // Since max is 100
                duration: duration,
                attempts: 1,
                difficulty: 'adaptive',
                correctAnswers: finalScore / 10,
                incorrectAnswers: 10 - (finalScore / 10),
                details: {
                    rounds: 10,
                    mode: 'standard'
                }
            }).catch(err => console.error('Failed to record activity:', err));
        }
    };

    if (questions.length === 0) return <div>Loading...</div>;

    const currentQuestion = questions[questionIndex];

    return (
        <div className="container mt-4 mb-5">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="text-primary mb-2" style={{ color: '#FF6B6B' }}>
                        <i className="bi bi-emoji-smile me-2"></i>
                        Emotion Recognition
                    </h1>
                    <p className="text-muted mb-0">Identify the correct emotion based on the face!</p>
                </div>
                <button className="btn btn-outline-secondary" onClick={() => navigate('/games')}>
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Games
                </button>
            </div>

            <ChildSelector />

            {!selectedChild && (
                <div className="alert alert-info mb-4">
                    <i className="bi bi-info-circle me-2"></i>
                    Select a child to track progress.
                </div>
            )}

            {/* Progress Bar */}
            <div className="progress mb-4" style={{ height: '20px', borderRadius: '10px' }}>
                <div
                    className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                    role="progressbar"
                    style={{ width: `${((questionIndex) / questions.length) * 100}%` }}
                ></div>
            </div>

            {!gameComplete ? (
                <div className="card border-0 shadow-lg" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                    <div className="card-body p-5 text-center">

                        <h2 className="mb-5 display-6 fw-bold">
                            Find the <span style={{ color: '#FF6B6B', textDecoration: 'underline' }}>{currentQuestion.target.name}</span> face
                        </h2>

                        <div className="row g-4 justify-content-center">
                            {currentQuestion.options.map((emotion, idx) => (
                                <div key={idx} className="col-6 col-md-3">
                                    <button
                                        className={`btn w-100 h-100 p-4 shadow-sm position-relative ${feedback === 'correct' && emotion.name === currentQuestion.target.name ? 'btn-success' :
                                                feedback === 'incorrect' && emotion.name !== currentQuestion.target.name ? 'btn-outline-secondary' : // Dim others
                                                    'btn-light'
                                            }`}
                                        style={{
                                            fontSize: '4rem',
                                            borderRadius: '16px',
                                            border: '2px solid #eee',
                                            transition: 'transform 0.2s',
                                            transform: feedback ? 'none' : 'scale(1)'
                                        }}
                                        onClick={() => handleAnswer(emotion)}
                                        onMouseEnter={(e) => !feedback && (e.currentTarget.style.transform = 'scale(1.05)')}
                                        onMouseLeave={(e) => !feedback && (e.currentTarget.style.transform = 'scale(1)')}
                                        disabled={!!feedback}
                                    >
                                        {emotion.emoji}
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Feedback Overlay */}
                        {feedback && (
                            <div className="mt-4 animate__animated animate__fadeIn">
                                {feedback === 'correct' ? (
                                    <div className="text-success">
                                        <i className="bi bi-check-circle-fill display-4"></i>
                                        <h3>Correct! Great job!</h3>
                                    </div>
                                ) : (
                                    <div className="text-danger">
                                        <i className="bi bi-x-circle-fill display-4"></i>
                                        <h3>Oops! Try again next time.</h3>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            ) : (
                <div className="card border-0 shadow-lg" style={{ borderRadius: '20px' }}>
                    <div className="card-body p-5 text-center">
                        <i className="bi bi-trophy-fill display-1 text-warning mb-4"></i>
                        <h2 className="mb-3">Game Complete!</h2>
                        <h4 className="mb-4">You scored: <span className="text-primary fw-bold">{score} / 100</span></h4>

                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-primary btn-lg" onClick={initializeGame}>
                                <i className="bi bi-arrow-repeat me-2"></i> Play Again
                            </button>
                            <button className="btn btn-outline-secondary btn-lg" onClick={() => navigate('/games')}>
                                <i className="bi bi-grid me-2"></i> All Games
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmotionGame;
