import { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Articles', 'Videos', 'Guides', 'Research', 'Tools'];

  const resources = [
    {
      id: 1,
      title: 'Understanding Autism Spectrum Disorder',
      type: 'Article',
      category: 'Articles',
      duration: '5 min read',
      description: 'Comprehensive guide to understanding autism spectrum disorders and their characteristics',
      author: 'Dr. Sarah Johnson',
      date: 'Nov 20, 2025',
      tags: ['Basics', 'Educational'],
      icon: 'bi-file-text'
    },
    {
      id: 2,
      title: 'Effective Communication Strategies',
      type: 'Video',
      category: 'Videos',
      duration: '12 min',
      description: 'Practical techniques for improving communication with children on the spectrum',
      author: 'Ms. Emily Chen',
      date: 'Nov 18, 2025',
      tags: ['Communication', 'Tutorial'],
      icon: 'bi-play-circle'
    },
    {
      id: 3,
      title: 'Sensory Integration Activities',
      type: 'Guide',
      category: 'Guides',
      duration: '8 min read',
      description: 'Step-by-step activities to help with sensory processing challenges',
      author: 'Dr. Maria Garcia',
      date: 'Nov 15, 2025',
      tags: ['Sensory', 'Activities'],
      icon: 'bi-book'
    },
    {
      id: 4,
      title: 'Latest Research on ABA Therapy',
      type: 'Research',
      category: 'Research',
      duration: '15 min read',
      description: 'Recent findings on the effectiveness of Applied Behavior Analysis',
      author: 'Research Team',
      date: 'Nov 12, 2025',
      tags: ['Research', 'ABA'],
      icon: 'bi-journal-text'
    },
    {
      id: 5,
      title: 'Social Skills Development Toolkit',
      type: 'Tool',
      category: 'Tools',
      duration: 'Interactive',
      description: 'Downloadable worksheets and activities for social skills practice',
      author: 'Mr. David Lee',
      date: 'Nov 10, 2025',
      tags: ['Social', 'Printable'],
      icon: 'bi-tools'
    },
    {
      id: 6,
      title: 'Managing Meltdowns and Tantrums',
      type: 'Article',
      category: 'Articles',
      duration: '7 min read',
      description: 'Evidence-based strategies for managing challenging behaviors',
      author: 'Dr. Sarah Johnson',
      date: 'Nov 8, 2025',
      tags: ['Behavior', 'Parenting'],
      icon: 'bi-file-text'
    },
    {
      id: 7,
      title: 'Introduction to PECS Communication',
      type: 'Video',
      category: 'Videos',
      duration: '18 min',
      description: 'Learn about Picture Exchange Communication System and its benefits',
      author: 'Ms. Emily Chen',
      date: 'Nov 5, 2025',
      tags: ['Communication', 'PECS'],
      icon: 'bi-play-circle'
    },
    {
      id: 8,
      title: 'Creating a Sensory-Friendly Environment',
      type: 'Guide',
      category: 'Guides',
      duration: '10 min read',
      description: 'Tips for designing spaces that support sensory needs',
      author: 'Dr. Maria Garcia',
      date: 'Nov 3, 2025',
      tags: ['Environment', 'Sensory'],
      icon: 'bi-book'
    }
  ];

  const filteredResources = selectedCategory === 'All' 
    ? resources 
    : resources.filter(r => r.category === selectedCategory);

  return (
    <div className="container mt-4 mb-5">
      <div className="mb-4">
        <h1 className="text-primary-custom">
          <i className="bi bi-book me-2"></i>
          Educational Resources
        </h1>
        <p className="text-muted">
          Access our library of articles, videos, guides, and tools for autism support
        </p>
      </div>

      {/* Search and Filter */}
      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search resources..."
            />
          </div>
        </div>
        <div className="col-md-4">
          <select className="form-select">
            <option>Sort by: Most Recent</option>
            <option>Sort by: Most Popular</option>
            <option>Sort by: A-Z</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-4">
        <div className="d-flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="row g-4">
        {/* Resources List */}
        <div className="col-lg-8">
          <div className="d-grid gap-4">
            {filteredResources.map((resource) => (
              <Card key={resource.id}>
                <div className="d-flex gap-3">
                  <div className="text-primary-custom" style={{ fontSize: '2.5rem' }}>
                    <i className={`bi ${resource.icon}`}></i>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h5 className="mb-1">{resource.title}</h5>
                        <div className="d-flex gap-2 align-items-center mb-2">
                          <Badge variant="primary">{resource.type}</Badge>
                          <small className="text-muted">
                            <i className="bi bi-clock me-1"></i>
                            {resource.duration}
                          </small>
                        </div>
                      </div>
                      <button className="btn btn-outline-primary btn-sm">
                        <i className="bi bi-bookmark"></i>
                      </button>
                    </div>

                    <p className="text-muted mb-3">{resource.description}</p>

                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {resource.tags.map((tag, idx) => (
                        <span key={idx} className="badge bg-light text-dark border">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-muted small">
                        <i className="bi bi-person me-1"></i>
                        {resource.author}
                        <span className="mx-2">•</span>
                        <i className="bi bi-calendar3 me-1"></i>
                        {resource.date}
                      </div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-primary btn-sm">
                          <i className="bi bi-eye me-1"></i>
                          View
                        </button>
                        <button className="btn btn-secondary btn-sm">
                          <i className="bi bi-download"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          {/* Featured Resource */}
          <Card title="Featured This Week" className="card-success">
            <div className="text-center mb-3">
              <i className="bi bi-star-fill fs-1 text-warning"></i>
            </div>
            <h6 className="mb-2">Complete Parent's Guide</h6>
            <p className="text-muted small mb-3">
              A comprehensive guide covering all aspects of autism support and care
            </p>
            <button className="btn btn-primary w-100 btn-sm">
              Download Free
            </button>
          </Card>

          {/* Popular Topics */}
          <Card title="Popular Topics" className="mt-4">
            <div className="d-grid gap-2">
              {['Communication', 'Behavior', 'Social Skills', 'Sensory', 'Education', 'Therapy'].map((topic) => (
                <button key={topic} className="btn btn-outline-primary btn-sm text-start">
                  <i className="bi bi-tag me-2"></i>
                  {topic}
                </button>
              ))}
            </div>
          </Card>

          {/* Recent Downloads */}
          <Card title="Your Recent Downloads" className="mt-4">
            <div className="d-grid gap-2">
              <div className="small">
                <div className="fw-medium">Social Skills Toolkit</div>
                <div className="text-muted">Downloaded 2 days ago</div>
              </div>
              <div className="small">
                <div className="fw-medium">Communication Guide</div>
                <div className="text-muted">Downloaded 5 days ago</div>
              </div>
              <div className="small">
                <div className="fw-medium">Sensory Activities</div>
                <div className="text-muted">Downloaded 1 week ago</div>
              </div>
            </div>
          </Card>

          {/* Newsletter */}
          <Card title="Stay Updated" className="mt-4">
            <p className="small text-muted mb-3">
              Subscribe to our newsletter for the latest resources and tips
            </p>
            <div className="mb-2">
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="Your email"
              />
            </div>
            <button className="btn btn-primary w-100 btn-sm">
              Subscribe
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Resources;
