/**
 * stats.js
 * One render function for the stats block shown on both the Session Complete
 * overlay and the Settings/Profile page, so the two never drift apart.
 */

function renderStatsPanel(container, opts) {
    opts = opts || {};
    const user = Session.getCurrentUser();
    if (!user) return;

    const stats = user.stats || {};
    const history = Array.isArray(stats.history) ? stats.history : [];

    // Count sessions per day for the last 7 calendar days (today included)
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        const count = history.filter(h => h.date === key).length;
        const label = d.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 2);
        days.push({ key, count, label });
    }
    const maxCount = Math.max(1, ...days.map(d => d.count));

    const barsHtml = days.map(d => `
        <div class="stats-bar-col">
            <div class="stats-bar" style="height:${Math.max(6, (d.count / maxCount) * 100)}%"></div>
            <span class="stats-bar-label">${d.label}</span>
        </div>
    `).join('');

    const justCompletedHtml = opts.justCompletedMins
        ? `<div class="text-center mb-4">
             <div class="eyebrow mb-1">Session complete</div>
             <div class="display-6 fw-bold text-gradient">${opts.justCompletedMins} min</div>
           </div>`
        : '';

    container.innerHTML = `
        ${justCompletedHtml}
        <div class="row text-center mb-4">
            <div class="col-6 border-end" style="border-color:var(--line) !important">
                <div class="small text-uppercase ls-1" style="color:var(--muted)">Sessions</div>
                <div class="h3 fw-bold mb-0">${stats.totalSessions || 0}</div>
            </div>
            <div class="col-6">
                <div class="small text-uppercase ls-1" style="color:var(--muted)">Total hrs</div>
                <div class="h3 fw-bold mb-0">${stats.totalHours || '0.0'}</div>
            </div>
        </div>
        <div class="small text-uppercase ls-1 mb-2" style="color:var(--muted)">Last 7 days</div>
        <div class="stats-bars">${barsHtml}</div>
    `;
}
