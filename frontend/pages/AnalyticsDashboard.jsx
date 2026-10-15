
import React from "react";
import "./AnalyticsDashboard.css";

const breakdowns = [
  { name: "Flat Tyre", count: 35 },
  { name: "Battery Failure", count: 25 },
  { name: "Engine Problem", count: 20 },
  { name: "Other Issues", count: 20 },
];

const total = breakdowns.reduce((sum, item) => sum + item.count, 0);

export default function AnalyticsDashboard() {
  const stats = [
    { title: "Total Requests", value: 100, icon: "📋" },
    { title: "Completed Services", value: 65, icon: "✅" },
    { title: "Pending Requests", value: 25, icon: "⏳" },
    { title: "In Progress", value: 10, icon: "🔧" },
  ];

  return (
    <main className="analytics-page">
      <header className="analytics-header">
        <div>
          <p className="analytics-label">ROADASSIST</p>
          <h1>Analytics Dashboard</h1>
          <p>Monitor roadside assistance requests and service activity.</p>
        </div>
        <button
          className="refresh-button"
          onClick={() => window.location.reload()}
        >
          ↻ Refresh
        </button>
      </header>

      <section className="analytics-cards">
        {stats.map((stat) => (
          <article className="analytics-card" key={stat.title}>
            <span className="analytics-icon">{stat.icon}</span>
            <p>{stat.title}</p>
            <h2>{stat.value}</h2>
          </article>
        ))}
      </section>

      <section className="analytics-panels">
        <article className="analytics-panel">
          <h2>Breakdown Analysis</h2>
          <p className="panel-description">
            Requests by vehicle problem
          </p>

          {breakdowns.map((item) => (
            <div className="breakdown-row" key={item.name}>
              <div className="breakdown-info">
                <span>{item.name}</span>
                <strong>{item.count}%</strong>
              </div>
              <div className="bar-background">
                <div
                  className="bar-fill"
                  style={{ width: `${(item.count / total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </article>

        <article className="analytics-panel">
          <h2>Service Status</h2>
          <p className="panel-description">
            Current request distribution
          </p>

          <div className="status-row">
            <span><i className="status-dot completed" /> Completed</span>
            <strong>65%</strong>
          </div>
          <div className="status-row">
            <span><i className="status-dot pending" /> Pending</span>
            <strong>25%</strong>
          </div>
          <div className="status-row">
            <span><i className="status-dot progress" /> In Progress</span>
            <strong>10%</strong>
          </div>

          <div className="status-bar">
            <div className="status-completed" />
            <div className="status-pending" />
            <div className="status-progress" />
          </div>
        </article>
      </section>

      <p className="analytics-note">
        Demo data is displayed. Connect your backend to show actual service
        requests and statuses.
      </p>
    </main>
  );
}
