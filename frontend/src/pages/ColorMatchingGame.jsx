import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChild } from '../context/ChildContext';
import ChildSelector from '../components/ChildSelector';
import '../styles/colorMatching.css';

const ColorMatchingGame = () => {
  const navigate = useNavigate();
  const { selectedChild, recordActivity } = useChild();

  // Game levels configuration
  const levels = [
    { level: 1, name: 'Level 1', roundsNeeded: 5, colors: 4, timeLimit: 60, color: 'success' },
    { level: 2, name: 'Level 2', roundsNeeded: 6, colors: 4, timeLimit: 55, color: 'success' },
    { level: 3, name: 'Level 3', roundsNeeded: 7, colors: 5, timeLimit: 70, color: 'info' },
    { level: 4, name: 'Level 4', roundsNeeded: 8, colors: 5, timeLimit: 65, color: 'info' },
    { level: 5, name: 'Level 5', roundsNeeded: 9, colors: 6, timeLimit: 80, color: 'warning' },
    { level: 6, name: 'Level 6', roundsNeeded: 10, colors: 6, timeLimit: 75, color: 'warning' },
    { level: 7, name: 'Level 7', roundsNeeded: 11, colors: 6, timeLimit: 85, color: 'warning' },
    { level: 8, name: 'Level 8', roundsNeeded: 12, colors: 6, timeLimit: 80, color: 'danger' },
    { level: 9, name: 'Level 9', roundsNeeded: 13, colors: 6, timeLimit: 90, color: 'danger' },
    { level: 10, name: 'Level 10', roundsNeeded: 15, colors: 6, timeLimit: 85, color: 'danger' }
  ];

  // Color palette with 20+ colors
  const colorPalette = [
    { name: 'Red', hex: '#FF0000', rgb: 'rgb(255, 0, 0)' },
    { name: 'Blue', hex: '#0000FF', rgb: 'rgb(0, 0, 255)' },
    { name: 'Green', hex: '#00FF00', rgb: 'rgb(0, 255, 0)' },
    { name: 'Yellow', hex: '#FFFF00', rgb: 'rgb(255, 255, 0)' },
    { name: 'Orange', hex: '#FFA500', rgb: 'rgb(255, 165, 0)' },
    { name: 'Purple', hex: '#800080', rgb: 'rgb(128, 0, 128)' },
    { name: 'Pink', hex: '#FFC0CB', rgb: 'rgb(255, 192, 203)' },
    { name: 'Brown', hex: '#A52A2A', rgb: 'rgb(165, 42, 42)' },
    { name: 'Black', hex: '#000000', rgb: 'rgb(0, 0, 0)' },
    { name: 'White', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', border: '3px solid #aaa' },
    { name: 'Gray', hex: '#808080', rgb: 'rgb(128, 128, 128)' },
    { name: 'Cyan', hex: '#00FFFF', rgb: 'rgb(0, 255, 255)' },
    { name: 'Magenta', hex: '#FF00FF', rgb: 'rgb(255, 0, 255)' },
    { name: 'Lime', hex: '#32CD32', rgb: 'rgb(50, 205, 50)' },
    { name: 'Navy', hex: '#000080', rgb: 'rgb(0, 0, 128)' },
    { name: 'Teal', hex: '#008080', rgb: 'rgb(0, 128, 128)' },
    { name: 'Maroon', hex: '#800000', rgb: 'rgb(128, 0, 0)' },
    { name: 'Olive', hex: '#808000', rgb: 'rgb(128, 128, 0)' },
    { name: 'Violet', hex: '#EE82EE', rgb: 'rgb(238, 130, 238)' },
    { name: 'Gold', hex: '#FFD700', rgb: 'rgb(255, 215, 0)' },
    { name: 'Crimson', hex: '#DC143C', rgb: 'rgb(220, 20, 60)' },
    { name: 'Indigo', hex: '#4B0082', rgb: 'rgb(75, 0, 130)' },
    { name: 'Coral', hex: '#FF7F50', rgb: 'rgb(255, 127, 80)' },
    { name: 'Turquoise', hex: '#40E0D0', rgb: 'rgb(64, 224, 208)' }
  ];

  // State management
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentColor, setCurrentColor] = useState(null);
  const [displayedColors, setDisplayedColors] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [wrongColor, setWrongColor] = useState(null);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [levelComplete, setLevelComplete] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [bestTimes, setBestTimes] = useState({});
  const [levelScore, setLevelScore] = useState(0);

  const timerRef = useRef(null);

  // Timer effect
  useEffect(() => {
    if (isRunning && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setIsRunning(false);
            handleTimeUp();
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, timer]);

  // Load best times from localStorage
  useEffect(() => {
    const savedBestTimes = localStorage.getItem('colorMatchingBestTimes');
    if (savedBestTimes) {
      setBestTimes(JSON.parse(savedBestTimes));
    }
  }, []);

  // Start game for current level
  const startGame = () => {
    const level = levels[currentLevel - 1];
    setGameStarted(true);
    setLevelComplete(false);
    setScore(0);
    setLevelScore(0);
    setRoundsCompleted(0);
    setMistakes(0);
    setTimer(level.timeLimit);
    setIsRunning(true);
    startNewRound();
  };

  // Start a new round
  const startNewRound = () => {
    const level = levels[currentLevel - 1];
    const numColors = level.colors;

    // Select random colors
    const shuffled = [...colorPalette].sort(() => Math.random() - 0.5);
    const selectedColors = shuffled.slice(0, numColors);
    
    // Pick one as the target
    const targetColor = selectedColors[Math.floor(Math.random() * numColors)];

    setCurrentColor(targetColor);
    setDisplayedColors(selectedColors.sort(() => Math.random() - 0.5));
    setIsCorrect(null);
    setWrongColor(null);
  };

  // Handle color click
  const handleColorClick = (color) => {
    if (isCorrect !== null) return; // Prevent multiple clicks

    if (color.name === currentColor.name) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer(color);
    }
  };

  // Handle correct answer
  const handleCorrectAnswer = () => {
    setIsCorrect(currentColor.name);
    setScore((prev) => prev + 100);
    setLevelScore((prev) => prev + 100);

    setTimeout(() => {
      const newRoundsCompleted = roundsCompleted + 1;
      setRoundsCompleted(newRoundsCompleted);

      const level = levels[currentLevel - 1];
      if (newRoundsCompleted >= level.roundsNeeded) {
        completeLevel();
      } else {
        startNewRound();
      }
    }, 1000);
  };

  // Handle wrong answer
  const handleWrongAnswer = (color) => {
    setWrongColor(color.name);
    setMistakes((prev) => prev + 1);
    setScore((prev) => Math.max(0, prev - 20));
    setLevelScore((prev) => Math.max(0, prev - 20));

    setTimeout(() => {
      setWrongColor(null);
    }, 600);
  };

  // Handle time up
  const handleTimeUp = () => {
    setIsRunning(false);
    alert('Time\'s up! Try again.');
    resetGame();
  };

  // Complete current level
  const completeLevel = () => {
    setIsRunning(false);
    const finalScore = calculateScore();
    setLevelScore(finalScore);
    setTotalScore((prev) => prev + finalScore);

    // Save best time
    const level = levels[currentLevel - 1];
    const timeElapsed = level.timeLimit - timer;
    if (!bestTimes[currentLevel] || timeElapsed < bestTimes[currentLevel]) {
      const newBestTimes = { ...bestTimes, [currentLevel]: timeElapsed };
      setBestTimes(newBestTimes);
      localStorage.setItem('colorMatchingBestTimes', JSON.stringify(newBestTimes));
    }

    setLevelComplete(true);

    // Record activity if child is selected
    if (selectedChild) {
      recordActivity({
        activityType: 'game',
        activityName: 'Color Matching',
        score: finalScore,
        maxScore: 10000,
        percentage: (finalScore / 10000) * 100,
        duration: level.timeLimit - timer,
        attempts: 1,
        difficulty: level.name.toLowerCase(),
        correctAnswers: roundsWon,
        incorrectAnswers: mistakes,
        details: {
          level: currentLevel,
          levelName: level.name,
          roundsCompleted: roundsWon,
          timeRemaining: timer
        }
      }).catch(err => console.error('Failed to record activity:', err));
    }
  };

  // Calculate final score for level
  const calculateScore = () => {
    const level = levels[currentLevel - 1];
    const timeBonus = timer * 10;
    const accuracyBonus = Math.max(0, 500 - (mistakes * 50));
    const levelBonus = currentLevel * 200;
    const perfectBonus = mistakes === 0 ? 300 : 0;

    return levelScore + timeBonus + accuracyBonus + levelBonus + perfectBonus;
  };

  // Advance to next level
  const advanceLevel = () => {
    if (currentLevel < levels.length) {
      setCurrentLevel((prev) => prev + 1);
      setLevelComplete(false);
      startGame();
    } else {
      alert('Congratulations! You completed all levels!');
      navigate('/games');
    }
  };

  // Replay current level
  const replayLevel = () => {
    setLevelComplete(false);
    startGame();
  };

  // Reset game to level 1
  const resetGame = () => {
    setCurrentLevel(1);
    setScore(0);
    setTotalScore(0);
    setGameStarted(false);
    setLevelComplete(false);
    setRoundsCompleted(0);
    setMistakes(0);
    setIsRunning(false);
  };

  // Go back to games menu
  const goBack = () => {
    navigate('/games');
  };

  const currentLevelData = levels[currentLevel - 1];

  return (
    <div className="color-matching-container">
      {/* Header */}
      <div className="game-header">
        <button className="back-btn" onClick={goBack}>
          <i className="bi bi-arrow-left"></i> Back to Games
        </button>
        <h1 className="game-title">
          <i className="bi bi-palette"></i> Color Matching Game
        </h1>
      </div>

      <div className="container mt-3">
        {/* Child Selector */}
        <ChildSelector />

        {/* Activity tracking notice */}
        {!selectedChild && (
          <div className="alert alert-info mt-3">
            <i className="bi bi-info-circle me-2"></i>
            Select a child above to track their progress and performance automatically.
          </div>
        )}
        {selectedChild && (
          <div className="alert alert-success mt-3">
            <i className="bi bi-check-circle me-2"></i>
            Playing as <strong>{selectedChild.name}</strong> - Progress will be recorded automatically!
          </div>
        )}
      </div>

      {/* Start Screen */}
      {!gameStarted && !levelComplete && (
        <div className="start-screen">
          <div className="level-info-card">
            <h2 className={`level-name text-${currentLevelData.color}`}>
              {currentLevelData.name}
            </h2>
            <div className="level-details">
              <p><i className="bi bi-flag"></i> Rounds to Complete: <strong>{currentLevelData.roundsNeeded}</strong></p>
              <p><i className="bi bi-palette-fill"></i> Number of Colors: <strong>{currentLevelData.colors}</strong></p>
              <p><i className="bi bi-clock"></i> Time Limit: <strong>{currentLevelData.timeLimit}s</strong></p>
              {bestTimes[currentLevel] && (
                <p><i className="bi bi-trophy"></i> Best Time: <strong>{bestTimes[currentLevel]}s</strong></p>
              )}
            </div>
            <div className="instructions">
              <h3>How to Play:</h3>
              <ul>
                <li>A color name will appear at the top</li>
                <li>Click the matching color tile below</li>
                <li>Complete all rounds before time runs out</li>
                <li>Earn bonus points for speed and accuracy</li>
              </ul>
            </div>
            <button className="start-btn" onClick={startGame}>
              <i className="bi bi-play-fill"></i> Start Game
            </button>
          </div>
        </div>
      )}

      {/* Active Game Screen */}
      {gameStarted && !levelComplete && (
        <div className="game-area">
          {/* Stats Bar */}
          <div className="stats-bar">
            <div className="stat-item">
              <i className="bi bi-trophy"></i>
              <span>Level: {currentLevel}</span>
            </div>
            <div className="stat-item">
              <i className="bi bi-star-fill"></i>
              <span>Score: {score}</span>
            </div>
            <div className="stat-item">
              <i className="bi bi-clock-history"></i>
              <span className={timer <= 10 ? 'time-warning' : ''}>Time: {timer}s</span>
            </div>
            <div className="stat-item">
              <i className="bi bi-x-circle"></i>
              <span>Mistakes: {mistakes}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-label">
              Round {roundsCompleted + 1} of {currentLevelData.roundsNeeded}
            </div>
            <div className="progress-bar-wrapper">
              <div 
                className="progress-bar-fill"
                style={{ width: `${(roundsCompleted / currentLevelData.roundsNeeded) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Color Prompt */}
          <div className="color-prompt">
            <h2>Find:</h2>
            <h1 className="target-color">{currentColor?.name}</h1>
            <p className="prompt-instruction">👆 Click the matching color below</p>
          </div>

          {/* Color Grid */}
          <div className={`color-grid grid-${currentLevelData.colors}`}>
            {displayedColors.map((color, index) => (
              <button
                key={index}
                className={`color-tile ${isCorrect === color.name ? 'correct-glow' : ''} ${wrongColor === color.name ? 'wrong-shake' : ''}`}
                style={{
                  backgroundColor: color.hex,
                  border: color.border || 'none'
                }}
                onClick={() => handleColorClick(color)}
                disabled={isCorrect !== null}
                aria-label={`${color.name} color tile`}
              >
                <span className="color-name" style={{
                  color: color.name === 'White' || color.name === 'Yellow' || color.name === 'Lime' || color.name === 'Cyan' || color.name === 'Gold' ? '#333' : '#fff'
                }}>
                  {color.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Win Screen */}
      {levelComplete && (
        <div className="win-screen">
          <div className="win-card">
            <h1 className="win-title">🎉 Level Complete! 🎊</h1>
            <div className="win-stats">
              <h3>Performance Summary</h3>
              <div className="stat-row">
                <span>Level:</span>
                <strong>{currentLevel}</strong>
              </div>
              <div className="stat-row">
                <span>Rounds Completed:</span>
                <strong>{roundsCompleted}</strong>
              </div>
              <div className="stat-row">
                <span>Time Remaining:</span>
                <strong>{timer}s</strong>
              </div>
              <div className="stat-row">
                <span>Mistakes:</span>
                <strong>{mistakes}</strong>
              </div>
              <div className="stat-row">
                <span>Accuracy:</span>
                <strong>{((roundsCompleted / (roundsCompleted + mistakes)) * 100).toFixed(1)}%</strong>
              </div>
              <hr />
              <div className="score-breakdown">
                <h4>Score Breakdown:</h4>
                <div className="stat-row">
                  <span>Base Score:</span>
                  <strong>{levelScore}</strong>
                </div>
                <div className="stat-row">
                  <span>Time Bonus:</span>
                  <strong>{timer * 10}</strong>
                </div>
                <div className="stat-row">
                  <span>Accuracy Bonus:</span>
                  <strong>{Math.max(0, 500 - (mistakes * 50))}</strong>
                </div>
                <div className="stat-row">
                  <span>Level Bonus:</span>
                  <strong>{currentLevel * 200}</strong>
                </div>
                {mistakes === 0 && (
                  <div className="stat-row perfect">
                    <span>Perfect Round Bonus:</span>
                    <strong>300</strong>
                  </div>
                )}
                <hr />
                <div className="stat-row total">
                  <span>Total Level Score:</span>
                  <strong>{calculateScore()}</strong>
                </div>
              </div>
            </div>
            <div className="win-buttons">
              {currentLevel < levels.length ? (
                <>
                  <button className="next-level-btn" onClick={advanceLevel}>
                    <i className="bi bi-arrow-right-circle"></i> Next Level
                  </button>
                  <button className="replay-btn" onClick={replayLevel}>
                    <i className="bi bi-arrow-clockwise"></i> Replay Level
                  </button>
                </>
              ) : (
                <button className="next-level-btn" onClick={goBack}>
                  <i className="bi bi-trophy"></i> All Levels Complete!
                </button>
              )}
              <button className="back-to-games-btn" onClick={goBack}>
                <i className="bi bi-grid-3x3-gap"></i> Back to Games
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorMatchingGame;
