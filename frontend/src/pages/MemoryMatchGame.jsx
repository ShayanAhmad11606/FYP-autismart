import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MemoryMatchGame = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [bestTimes, setBestTimes] = useState({});

  // All available symbols
  const allSymbols = ['🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🎸', '🎺', '🎹', '🎬', '🎤', '🎧', '⚽', '🏀', '🎾', '🏐', '⚡', '🌟', '🎈', '🎁', '🚀', '🌈', '🦋', '🌺', '🍎', '🍕', '🎂', '🍭', '🐶', '🐱'];

  // Level configurations - 10 levels
  const levels = [
    { level: 1, pairs: 3, time: 45, name: 'Beginner', color: 'success', maxMoves: 15 },
    { level: 2, pairs: 4, time: 60, name: 'Easy', color: 'success', maxMoves: 20 },
    { level: 3, pairs: 6, time: 90, name: 'Simple', color: 'info', maxMoves: 25 },
    { level: 4, pairs: 8, time: 120, name: 'Medium', color: 'info', maxMoves: 30 },
    { level: 5, pairs: 10, time: 150, name: 'Intermediate', color: 'warning', maxMoves: 35 },
    { level: 6, pairs: 12, time: 180, name: 'Challenging', color: 'warning', maxMoves: 40 },
    { level: 7, pairs: 14, time: 210, name: 'Hard', color: 'danger', maxMoves: 45 },
    { level: 8, pairs: 16, time: 240, name: 'Very Hard', color: 'danger', maxMoves: 50 },
    { level: 9, pairs: 18, time: 270, name: 'Expert', color: 'primary', maxMoves: 55 },
    { level: 10, pairs: 20, time: 300, name: 'Master', color: 'dark', maxMoves: 60 }
  ];

  const currentLevelConfig = levels[currentLevel - 1];

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, [currentLevel]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const initializeGame = () => {
    // Get symbols for current level
    const levelSymbols = allSymbols.slice(0, currentLevelConfig.pairs);
    
    // Create pairs of cards
    const cardPairs = [...levelSymbols, ...levelSymbols]
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5);

    setCards(cardPairs);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
    setTimer(0);
    setIsRunning(false);
  };

  const calculateScore = () => {
    const timeBonus = Math.max(0, currentLevelConfig.time - timer) * 10;
    const moveBonus = Math.max(0, (currentLevelConfig.maxMoves - moves)) * 20;
    const levelBonus = currentLevel * 100;
    return timeBonus + moveBonus + levelBonus;
  };

  const handleCardClick = (index) => {
    // Start timer on first click
    if (!isRunning && moves === 0) {
      setIsRunning(true);
    }

    // Don't allow clicking if two cards are already flipped or card is already matched
    if (flipped.length === 2 || matched.includes(index) || flipped.includes(index)) {
      return;
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    // Check for match when two cards are flipped
    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = newFlipped;

      if (cards[firstIndex].symbol === cards[secondIndex].symbol) {
        // Match found
        const newMatched = [...matched, firstIndex, secondIndex];
        setMatched(newMatched);
        setFlipped([]);

        // Check if level is complete
        if (newMatched.length === cards.length) {
          const score = calculateScore();
          setTotalScore(totalScore + score);
          setGameWon(true);
          setIsRunning(false);
          
          // Save best time for this level
          if (!bestTimes[currentLevel] || timer < bestTimes[currentLevel]) {
            setBestTimes({ ...bestTimes, [currentLevel]: timer });
          }
        }
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  const handleNextLevel = () => {
    if (currentLevel < levels.length) {
      setCurrentLevel(currentLevel + 1);
      setGameWon(false);
    }
  };

  const handleRestartLevel = () => {
    initializeGame();
  };

  const handleLevelSelect = (level) => {
    setCurrentLevel(level);
    setGameWon(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mt-4 mb-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="text-primary-custom mb-2">
            <i className="bi bi-grid-3x3-gap me-2"></i>
            Memory Match Game
          </h1>
          <p className="text-muted mb-0">Level {currentLevel}: {currentLevelConfig.name} - Match {currentLevelConfig.pairs} pairs!</p>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => navigate('/games')}>
          <i className="bi bi-arrow-left me-2"></i>
          Back to Games
        </button>
      </div>

      {/* Level Progress Bar */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
        <div className="card-body p-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0 fw-bold">Level Progress</h6>
            <span className="badge bg-primary">Total Score: {totalScore}</span>
          </div>
          <div className="d-flex gap-2">
            {levels.map((level) => (
              <div
                key={level.level}
                className={`flex-fill text-center p-2 rounded ${
                  level.level === currentLevel
                    ? `bg-${level.color} text-white`
                    : level.level < currentLevel
                    ? 'bg-success text-white'
                    : 'bg-light text-muted'
                }`}
                style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                onClick={() => handleLevelSelect(level.level)}
              >
                <small className="fw-bold">{level.level}</small>
                <div style={{ fontSize: '0.7rem' }}>{level.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Game Stats */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
            <div className="card-body text-center">
              <i className="bi bi-clock fs-3 text-primary mb-2"></i>
              <h6 className="text-muted mb-1">Time</h6>
              <h4 className="mb-0 fw-bold">{formatTime(timer)}</h4>
              {bestTimes[currentLevel] && (
                <small className="text-success">Best: {formatTime(bestTimes[currentLevel])}</small>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
            <div className="card-body text-center">
              <i className="bi bi-cursor-fill fs-3 text-info mb-2"></i>
              <h6 className="text-muted mb-1">Moves</h6>
              <h4 className="mb-0 fw-bold">{moves}</h4>
              <small className={moves > currentLevelConfig.maxMoves ? 'text-danger' : 'text-success'}>
                Max: {currentLevelConfig.maxMoves}
              </small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
            <div className="card-body text-center">
              <i className="bi bi-trophy-fill fs-3 text-warning mb-2"></i>
              <h6 className="text-muted mb-1">Matched</h6>
              <h4 className="mb-0 fw-bold">{matched.length / 2} / {currentLevelConfig.pairs}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
            <div className="card-body text-center">
              <i className="bi bi-star-fill fs-3 text-success mb-2"></i>
              <h6 className="text-muted mb-1">Level Score</h6>
              <h4 className="mb-0 fw-bold">{gameWon ? calculateScore() : 0}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
        <div className="card-body p-4">
          <div className="row g-3" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {cards.map((card, index) => {
              const gridCols = currentLevelConfig.pairs <= 6 ? 4 : currentLevelConfig.pairs <= 10 ? 6 : 6;
              const colClass = `col-${12 / gridCols}`;
              
              return (
                <div key={card.id} className={colClass}>
                  <div
                    className={`card h-100 border-0 shadow-sm ${
                      flipped.includes(index) || matched.includes(index)
                        ? 'bg-primary text-white'
                        : 'bg-light'
                    }`}
                    style={{
                      minHeight: currentLevelConfig.pairs <= 6 ? '120px' : '100px',
                      cursor: matched.includes(index) ? 'default' : 'pointer',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      transform: flipped.includes(index) || matched.includes(index) ? 'rotateY(0deg)' : 'rotateY(0deg)',
                      opacity: matched.includes(index) ? 0.6 : 1
                    }}
                    onClick={() => handleCardClick(index)}
                    onMouseEnter={(e) => {
                      if (!matched.includes(index)) {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    <div className="card-body d-flex align-items-center justify-content-center p-2">
                      {flipped.includes(index) || matched.includes(index) ? (
                        <span style={{ fontSize: currentLevelConfig.pairs <= 6 ? '3rem' : '2.5rem' }}>{card.symbol}</span>
                      ) : (
                        <i className={`bi bi-question-circle ${currentLevelConfig.pairs <= 6 ? 'fs-1' : 'fs-3'} text-muted`}></i>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reset Button */}
          <div className="text-center mt-4">
            <button className="btn btn-outline-primary btn-lg px-5" onClick={handleRestartLevel}>
              <i className="bi bi-arrow-clockwise me-2"></i>
              Restart Level
            </button>
          </div>
        </div>
      </div>

      {/* Win Modal */}
      {gameWon && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            background: 'rgba(0,0,0,0.7)',
            zIndex: 1050
          }}
          onClick={() => setGameWon(false)}
        >
          <div
            className="card border-0 shadow-lg"
            style={{
              maxWidth: '500px',
              borderRadius: '20px',
              animation: 'fadeIn 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-body text-center p-5">
              <i className="bi bi-trophy-fill display-1 text-warning mb-4"></i>
              <h2 className="mb-3 fw-bold">Level {currentLevel} Complete! 🎉</h2>
              <p className="text-muted mb-4">
                {currentLevel === levels.length 
                  ? "Congratulations! You've mastered all levels!" 
                  : `Great job! Ready for Level ${currentLevel + 1}?`}
              </p>
              
              <div className="row g-3 mb-4">
                <div className="col-4">
                  <div className="p-3 bg-light rounded">
                    <i className="bi bi-clock text-primary"></i>
                    <div className="fw-bold mt-2">{formatTime(timer)}</div>
                    <small className="text-muted">Time</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-3 bg-light rounded">
                    <i className="bi bi-cursor-fill text-info"></i>
                    <div className="fw-bold mt-2">{moves}</div>
                    <small className="text-muted">Moves</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-3 bg-light rounded">
                    <i className="bi bi-star-fill text-warning"></i>
                    <div className="fw-bold mt-2">{calculateScore()}</div>
                    <small className="text-muted">Score</small>
                  </div>
                </div>
              </div>

              <div className="d-grid gap-2">
                {currentLevel < levels.length ? (
                  <>
                    <button className="btn btn-success btn-lg" onClick={handleNextLevel}>
                      <i className="bi bi-arrow-right-circle me-2"></i>
                      Next Level
                    </button>
                    <button className="btn btn-outline-primary" onClick={handleRestartLevel}>
                      <i className="bi bi-arrow-clockwise me-2"></i>
                      Replay Level
                    </button>
                  </>
                ) : (
                  <button className="btn btn-success btn-lg" onClick={() => handleLevelSelect(1)}>
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Play Again from Level 1
                  </button>
                )}
                <button className="btn btn-outline-secondary" onClick={() => navigate('/games')}>
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Games
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="card border-0 shadow-sm mt-4" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)' }}>
        <div className="card-body p-4">
          <h5 className="mb-3">
            <i className="bi bi-lightbulb-fill text-warning me-2"></i>
            Level Info & Tips
          </h5>
          <div className="row">
            <div className="col-md-6">
              <h6 className="fw-bold mb-2">Current Level Details:</h6>
              <ul className="mb-3">
                <li>Pairs to match: {currentLevelConfig.pairs}</li>
                <li>Recommended time: {currentLevelConfig.time}s</li>
                <li>Maximum moves: {currentLevelConfig.maxMoves}</li>
                <li>Difficulty: {currentLevelConfig.name}</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h6 className="fw-bold mb-2">Tips for Success:</h6>
              <ul className="mb-0">
                <li>Remember card positions carefully</li>
                <li>Create a mental map of the board</li>
                <li>Focus on one area at a time</li>
                <li>Beat the recommended time for bonus points!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryMatchGame;
