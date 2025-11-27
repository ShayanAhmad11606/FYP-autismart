import { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';

const Notifications = () => {
  const [filter, setFilter] = useState('all');
  
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Session Completed',
      message: 'Speech therapy session completed successfully',
      time: '10 minutes ago',
      read: false,
      icon: 'bi-check-circle-fill',
    },
    {
      id: 2,
      type: 'info',
      title: 'New Message',
      message: 'You have a new message from Dr. Sarah',
      time: '1 hour ago',
      read: false,
      icon: 'bi-chat-dots-fill',
    },
    {
      id: 3,
      type: 'warning',
      title: 'Upcoming Session',
      message: 'Reminder: Therapy session tomorrow at 10:00 AM',
      time: '2 hours ago',
      read: true,
      icon: 'bi-clock-fill',
    },
    {
      id: 4,
      type: 'success',
      title: 'Progress Update',
      message: 'Great progress in communication skills this week!',
      time: '1 day ago',
      read: true,
      icon: 'bi-graph-up-arrow',
    },
    {
      id: 5,
      type: 'info',
      title: 'New Assessment Available',
      message: 'A new assessment has been assigned to you',
      time: '2 days ago',
      read: true,
      icon: 'bi-clipboard-check',
    },
    {
      id: 6,
      type: 'danger',
      title: 'Session Cancelled',
      message: 'Your session on Nov 25 has been cancelled',
      time: '3 days ago',
      read: true,
      icon: 'bi-x-circle-fill',
    },
  ];

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeColor = (type) => {
    const colors = {
      success: 'success',
      info: 'primary',
      warning: 'warning',
      danger: 'danger',
    };
    return colors[type] || 'secondary';
  };

  const markAsRead = (id) => {
    // API call to mark notification as read
    console.log('Mark as read:', id);
  };

  const markAllAsRead = () => {
    // API call to mark all as read
    console.log('Mark all as read');
  };

  const deleteNotification = (id) => {
    // API call to delete notification
    console.log('Delete notification:', id);
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              <i className="bi bi-bell me-2 text-primary"></i>
              Notifications
              {unreadCount > 0 && (
                <Badge variant="danger" className="ms-2">
                  {unreadCount}
                </Badge>
              )}
            </h2>
            <button className="btn btn-outline-primary btn-sm" onClick={markAllAsRead}>
              <i className="bi bi-check-all me-1"></i>
              Mark all as read
            </button>
          </div>

          {/* Filter Tabs */}
          <Card className="mb-4">
            <div className="btn-group w-100" role="group">
              <button
                type="button"
                className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('all')}
              >
                All ({notifications.length})
              </button>
              <button
                type="button"
                className={`btn ${filter === 'unread' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('unread')}
              >
                Unread ({unreadCount})
              </button>
              <button
                type="button"
                className={`btn ${filter === 'read' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('read')}
              >
                Read ({notifications.length - unreadCount})
              </button>
            </div>
          </Card>

          {/* Notifications List */}
          {filteredNotifications.length === 0 ? (
            <Card>
              <div className="text-center py-5 text-muted">
                <i className="bi bi-bell-slash fs-1 mb-3 d-block"></i>
                <p>No notifications to display</p>
              </div>
            </Card>
          ) : (
            <div className="list-group">
              {filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`list-group-item list-group-item-action ${
                    !notif.read ? 'bg-light' : ''
                  }`}
                >
                  <div className="d-flex w-100 justify-content-between align-items-start">
                    <div className="d-flex gap-3 flex-grow-1">
                      <div className={`text-${getTypeColor(notif.type)}`}>
                        <i className={`${notif.icon} fs-4`}></i>
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <h6 className="mb-0">{notif.title}</h6>
                          {!notif.read && (
                            <Badge variant="primary" className="badge-sm">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="mb-1 text-muted">{notif.message}</p>
                        <small className="text-muted">
                          <i className="bi bi-clock me-1"></i>
                          {notif.time}
                        </small>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      {!notif.read && (
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => markAsRead(notif.id)}
                          title="Mark as read"
                        >
                          <i className="bi bi-check"></i>
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteNotification(notif.id)}
                        title="Delete"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
