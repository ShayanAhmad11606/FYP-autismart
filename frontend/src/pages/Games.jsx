import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const Games = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 1,
      title: 'Memory Match',
      description: 'Match pairs of cards to improve memory and concentration',
      icon: 'bi-grid-3x3-gap',
      difficulty: 'Easy',
      category: 'Memory',
      color: 'success',
      route: '/games/memory-match'
    },
    {
      id: 2,
      title: 'Color Sorter',
      description: 'Sort objects by color to enhance visual processing',
      icon: 'bi-palette',
      difficulty: 'Easy',
      category: 'Visual',
      color: 'info'
    },
    {
      id: 3,
      title: 'Puzzle Builder',
      description: 'Complete puzzles to develop problem-solving skills',
      icon: 'bi-puzzle',
      difficulty: 'Medium',
      category: 'Logic',
      color: 'warning'
    },
    {
      id: 4,
      title: 'Shape Finder',
      description: 'Identify and match shapes to improve pattern recognition',
      icon: 'bi-hexagon',
      difficulty: 'Easy',
      category: 'Shapes',
      color: 'success'
    },
    {
      id: 5,
      title: 'Number Adventure',
      description: 'Learn counting and basic math through interactive play',
      icon: 'bi-123',
      difficulty: 'Medium',
      category: 'Math',
      color: 'warning'
    },
    {
      id: 6,
      title: 'Emotion Explorer',
      description: 'Recognize and understand different facial expressions',
      icon: 'bi-emoji-smile',
      difficulty: 'Medium',
      category: 'Social',
      color: 'info'
    },
    {
      id: 7,
      title: 'Story Sequencer',
      description: 'Arrange story events in correct order',
      icon: 'bi-book',
      difficulty: 'Hard',
      category: 'Logic',
      color: 'danger'
    },
    {
      id: 8,
      title: 'Sound Match',
      description: 'Match sounds to objects to improve auditory processing',
      icon: 'bi-music-note-beamed',
      difficulty: 'Easy',
      category: 'Audio',
      color: 'success'
    },
    {
      id: 9,
      title: 'Pattern Creator',
      description: 'Create and complete patterns to develop sequencing skills',
      icon: 'bi-grid',
      difficulty: 'Hard',
      category: 'Logic',
      color: 'danger'
    }
  ];

  const categories = ['All', 'Memory', 'Visual', 'Logic', 'Math', 'Social', 'Audio'];

  return (
    <div className="container mt-4 mb-5">
      <div className="mb-4">
        <h1 className="text-primary-custom">
          <i className="bi bi-controller me-2"></i>
          Interactive Therapy Games
        </h1>
        <p className="text-muted">
          Choose from our collection of educational therapy games designed for autism development
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="mb-4">
        <div className="d-flex flex-wrap gap-2">
          {categories.map((category) => (
            <button key={category} className="btn btn-secondary btn-sm">
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <div className="row g-4">
        {games.map((game) => (
          <div key={game.id} className="col-md-6 col-lg-4">
            <Card className="h-100">
              <div className="text-center mb-3">
                <div className={`fs-1 text-${game.color} mb-3`}>
                  <i className={`bi ${game.icon}`}></i>
                </div>
                <h5 className="card-title">{game.title}</h5>
                <div className="mb-2">
                  <span className={`badge badge-${game.color} me-2`}>{game.category}</span>
                  <span className="badge badge-info">{game.difficulty}</span>
                </div>
              </div>
              <p className="card-text text-muted">{game.description}</p>
              <div className="mt-auto">
                <button 
                  className="btn btn-primary w-100"
                  onClick={() => game.route ? navigate(game.route) : alert('Coming Soon!')}
                >
                  <i className="bi bi-play-fill me-2"></i>
                  Play Now
                </button>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Achievement Section */}
      <div className="mt-5">
        <h3 className="mb-4">Recent Achievements</h3>
        <div className="row g-3">
          <div className="col-md-3">
            <Card className="text-center card-success">
              <i className="bi bi-trophy-fill fs-1 text-warning mb-2"></i>
              <h6>10 Therapy Games Completed</h6>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="text-center card-info">
              <i className="bi bi-star-fill fs-1 text-warning mb-2"></i>
              <h6>5 Day Streak</h6>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="text-center card-warning">
              <i className="bi bi-lightning-fill fs-1 text-warning mb-2"></i>
              <h6>Fast Learner</h6>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="text-center card-stat">
              <i className="bi bi-graph-up fs-1 text-success mb-2"></i>
              <h6>Level 5 Reached</h6>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
