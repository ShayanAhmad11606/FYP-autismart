import Card from '../components/Card';
import Badge from '../components/Badge';

const Leaderboard = () => {
  const topPlayers = [
    { rank: 1, name: 'Tommy Doe', avatar: '👦', points: 2850, level: 15, badges: 24, streak: 15, games: 120 },
    { rank: 2, name: 'Emma Smith', avatar: '👧', points: 2720, level: 14, badges: 22, streak: 12, games: 115 },
    { rank: 3, name: 'Alex Johnson', avatar: '👦', points: 2580, level: 13, badges: 20, streak: 10, games: 108 },
    { rank: 4, name: 'Lily Williams', avatar: '👧', points: 2340, level: 12, badges: 18, streak: 8, games: 95 },
    { rank: 5, name: 'Jack Brown', avatar: '👦', points: 2190, level: 12, badges: 17, streak: 7, games: 89 },
    { rank: 6, name: 'Sophie Davis', avatar: '👧', points: 2050, level: 11, badges: 16, streak: 6, games: 82 },
    { rank: 7, name: 'Noah Wilson', avatar: '👦', points: 1920, level: 10, badges: 14, streak: 5, games: 75 },
    { rank: 8, name: 'Mia Garcia', avatar: '👧', points: 1780, level: 10, badges: 13, streak: 4, games: 68 },
    { rank: 9, name: 'Liam Martinez', avatar: '👦', points: 1650, level: 9, badges: 12, streak: 3, games: 62 },
    { rank: 10, name: 'Ava Rodriguez', avatar: '👧', points: 1520, level: 9, badges: 11, streak: 2, games: 55 }
  ];

  const achievements = [
    { icon: 'bi-trophy-fill', name: 'First Win', color: 'warning', description: 'Complete your first game' },
    { icon: 'bi-star-fill', name: 'Rising Star', color: 'success', description: 'Reach Level 5' },
    { icon: 'bi-lightning-fill', name: 'Speed Runner', color: 'info', description: 'Complete 10 games in one day' },
    { icon: 'bi-fire', name: 'Hot Streak', color: 'danger', description: 'Maintain a 7-day streak' },
    { icon: 'bi-gem', name: 'Perfect Score', color: 'primary', description: 'Get 100% in any game' },
    { icon: 'bi-award-fill', name: 'Champion', color: 'warning', description: 'Reach Level 10' }
  ];

  return (
    <div className="container mt-4 mb-5">
      <div className="mb-4">
        <h1 className="text-primary-custom">
          <i className="bi bi-trophy me-2"></i>
          Leaderboard & Achievements
        </h1>
        <p className="text-muted">
          Celebrate progress and achievements of our amazing community
        </p>
      </div>

      <div className="row g-4">
        {/* Leaderboard */}
        <div className="col-lg-8">
          {/* Top 3 Podium */}
          <div className="row g-3 mb-4">
            {/* 2nd Place */}
            <div className="col-4">
              <Card className="card-info text-center h-100">
                <div className="mb-3" style={{ fontSize: '3rem' }}>
                  {topPlayers[1].avatar}
                </div>
                <div className="fs-1 fw-bold text-info mb-2">2nd</div>
                <h6 className="mb-1">{topPlayers[1].name}</h6>
                <div className="stat-value text-info">{topPlayers[1].points}</div>
                <div className="stat-label">Points</div>
                <div className="mt-3">
                  <Badge variant="info">Level {topPlayers[1].level}</Badge>
                </div>
              </Card>
            </div>

            {/* 1st Place */}
            <div className="col-4">
              <Card className="card-warning text-center h-100" style={{ transform: 'scale(1.05)' }}>
                <div className="mb-3" style={{ fontSize: '4rem' }}>
                  {topPlayers[0].avatar}
                </div>
                <div className="fs-1 fw-bold text-warning mb-2">
                  <i className="bi bi-trophy-fill"></i> 1st
                </div>
                <h6 className="mb-1">{topPlayers[0].name}</h6>
                <div className="stat-value text-warning">{topPlayers[0].points}</div>
                <div className="stat-label">Points</div>
                <div className="mt-3">
                  <Badge variant="warning">Level {topPlayers[0].level}</Badge>
                </div>
              </Card>
            </div>

            {/* 3rd Place */}
            <div className="col-4">
              <Card className="card-success text-center h-100">
                <div className="mb-3" style={{ fontSize: '3rem' }}>
                  {topPlayers[2].avatar}
                </div>
                <div className="fs-1 fw-bold text-success mb-2">3rd</div>
                <h6 className="mb-1">{topPlayers[2].name}</h6>
                <div className="stat-value text-success">{topPlayers[2].points}</div>
                <div className="stat-label">Points</div>
                <div className="mt-3">
                  <Badge variant="success">Level {topPlayers[2].level}</Badge>
                </div>
              </Card>
            </div>
          </div>

          {/* Full Leaderboard */}
          <Card title="Top Players">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Level</th>
                    <th>Points</th>
                    <th>Badges</th>
                    <th>Streak</th>
                    <th>Games</th>
                  </tr>
                </thead>
                <tbody>
                  {topPlayers.map((player) => (
                    <tr key={player.rank}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          {player.rank <= 3 && (
                            <i className={`bi bi-trophy-fill text-${
                              player.rank === 1 ? 'warning' : player.rank === 2 ? 'info' : 'success'
                            }`}></i>
                          )}
                          <span className="fw-bold">{player.rank}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <span style={{ fontSize: '1.5rem' }}>{player.avatar}</span>
                          <span className="fw-medium">{player.name}</span>
                        </div>
                      </td>
                      <td>
                        <Badge variant="primary">Lvl {player.level}</Badge>
                      </td>
                      <td className="fw-bold text-primary-custom">{player.points}</td>
                      <td>
                        <i className="bi bi-award-fill text-warning me-1"></i>
                        {player.badges}
                      </td>
                      <td>
                        <i className="bi bi-fire text-danger me-1"></i>
                        {player.streak} days
                      </td>
                      <td className="text-muted">{player.games}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          {/* Your Ranking */}
          <Card title="Your Ranking" className="card-stat">
            <div className="text-center mb-3">
              <div className="mb-2" style={{ fontSize: '3rem' }}>👦</div>
              <h5>Tommy Doe</h5>
              <Badge variant="warning">Rank #1</Badge>
            </div>
            <div className="row g-3 text-center">
              <div className="col-6">
                <div className="stat-value" style={{ fontSize: '1.5rem' }}>2850</div>
                <div className="stat-label">Points</div>
              </div>
              <div className="col-6">
                <div className="stat-value" style={{ fontSize: '1.5rem' }}>15</div>
                <div className="stat-label">Level</div>
              </div>
              <div className="col-6">
                <div className="stat-value" style={{ fontSize: '1.5rem' }}>24</div>
                <div className="stat-label">Badges</div>
              </div>
              <div className="col-6">
                <div className="stat-value" style={{ fontSize: '1.5rem' }}>15</div>
                <div className="stat-label">Day Streak</div>
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card title="Available Achievements" className="mt-4">
            <div className="d-grid gap-3">
              {achievements.map((achievement, idx) => (
                <div key={idx} className="d-flex gap-3 p-2 bg-light rounded">
                  <div className={`text-${achievement.color} fs-3`}>
                    <i className={`bi ${achievement.icon}`}></i>
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-medium">{achievement.name}</div>
                    <small className="text-muted">{achievement.description}</small>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Weekly Challenge */}
          <Card title="Weekly Challenge" className="mt-4 card-warning">
            <div className="text-center mb-3">
              <i className="bi bi-star-fill fs-1 text-warning"></i>
            </div>
            <h6 className="text-center mb-3">Complete 20 Games This Week</h6>
            <div className="mb-2">
              <div className="d-flex justify-content-between mb-1">
                <small>Progress</small>
                <small className="fw-bold">15/20</small>
              </div>
              <div className="progress" style={{ height: '10px' }}>
                <div className="progress-bar bg-warning" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="text-center mt-3">
              <Badge variant="warning">5 more to go!</Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
