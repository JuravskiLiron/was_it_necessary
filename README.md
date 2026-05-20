# WasItNecessary? — Conflict Transparency Platform

A professional web application documenting military operations with verified sources, evidence, and debunked false claims.

---

## Architecture

```
wasit-necessary/
├── frontend/         # React + Vite + TypeScript
│   └── src/
│       ├── components/   # MapView, Sidebar, Header, FilterBar
│       ├── data/         # Demo events data
│       ├── types/        # TypeScript interfaces
│       └── styles/       # Global CSS
└── backend/          # C# ASP.NET Core 8
    └── WasItNecessary/
        ├── Controllers/  # REST API endpoints
        ├── Services/     # Business logic
        ├── Models/       # Data models
        └── Middleware/   # Security, rate limiting
```

---

## Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
# Runs at http://localhost:5173
```

### Backend

```bash
cd backend/WasItNecessary
dotnet restore
dotnet run
# API at http://localhost:5000
# Swagger at http://localhost:5000/swagger
```

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | List all events (filterable) |
| GET | `/api/events/:id` | Single event with full evidence |
| GET | `/api/events/stats` | Category/status statistics |
| GET | `/health` | Health check |

### Query Parameters for GET /api/events

| Param | Values | Description |
|-------|--------|-------------|
| `category` | hospital, tunnel, weapons_depot, command_center, rocket_launch | Filter by type |
| `status` | verified, disputed, debunked | Filter by verification status |
| `search` | string | Full-text search on title and tags |
| `page` | int (default 1) | Pagination |
| `pageSize` | int (default 50) | Items per page |

---

## Security Architecture

### DDoS Protection (Critical for this platform)

1. **Cloudflare (required)** — Place behind Cloudflare Pro
   - Enable "Under Attack Mode" if DDoS begins
   - Enable Bot Fight Mode
   - Set up firewall rules blocking TOR exit nodes

2. **Rate Limiting** — Built into ASP.NET Core
   - 100 requests/minute per IP on all endpoints
   - Stricter limits on search (more expensive queries)
   - Returns 429 with `Retry-After: 60` header

3. **Honeypot Endpoints** — `SecurityMiddleware.cs`
   - Any request to `/admin`, `/wp-admin`, `/.env`, etc. gets 404
   - IP is logged for analysis

4. **Security Headers** — Set in `SecurityMiddleware.cs`
   - `X-Frame-Options: DENY`
   - `X-Content-Type-Options: nosniff`
   - `Content-Security-Policy` (strict)
   - `Referrer-Policy: strict-origin-when-cross-origin`

5. **Bad User-Agent Blocking** — Common attack tools blocked at middleware level

### Production Checklist

- [ ] Set `AllowedOrigins` in `appsettings.json` to your real domain
- [ ] Enable Cloudflare in front of the server
- [ ] Use HTTPS-only (enforce HSTS)
- [ ] Set up PostgreSQL with PostGIS for production data
- [ ] Configure Redis for rate limiting across multiple instances
- [ ] Enable Cloudflare Access for the admin panel (separate domain)
- [ ] Set up automated backups for the events database
- [ ] Enable Cloudflare DDoS L7 protection

---

## Database (Production)

Replace the in-memory `EventsService` with a PostgreSQL + PostGIS implementation:

```sql
CREATE TABLE strike_events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  coordinates GEOMETRY(Point, 4326),
  date DATE,
  category TEXT,
  verification_status TEXT,
  summary TEXT,
  full_description TEXT,
  target_justification TEXT,
  warning_given BOOLEAN,
  warning_details TEXT,
  verified_by TEXT,
  last_updated TIMESTAMP,
  data JSONB  -- stores sources, evidence, false_claims, tags
);

CREATE INDEX idx_events_category ON strike_events(category);
CREATE INDEX idx_events_status ON strike_events(verification_status);
CREATE INDEX idx_events_coords ON strike_events USING GIST(coordinates);
CREATE INDEX idx_events_data_gin ON strike_events USING GIN(data);
```

---

## Deployment

### Frontend → Vercel
```bash
cd frontend
npm run build
# Deploy dist/ to Vercel
# Set VITE_API_URL environment variable to your backend URL
```

### Backend → Railway / Azure App Service
```bash
cd backend/WasItNecessary
dotnet publish -c Release -o ./publish
# Deploy ./publish to Railway or Azure
```

### Recommended: Cloudflare Pages + Cloudflare Workers
For maximum DDoS protection, deploy both frontend and backend behind Cloudflare.

---

## Adding New Events

Events in demo mode are stored in `frontend/src/data/events.ts`.

For production, add events through the admin panel (separate protected endpoint) or directly via the API with JWT authentication.

Each event requires:
- Minimum 2 independent sources (credibility ≥ 3)
- At least 1 piece of evidence
- A verified-by editor name
- Complete false claims debunking if applicable

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, TypeScript |
| Map | Leaflet.js + CartoDB dark tiles |
| Backend | C# ASP.NET Core 8 |
| Database | PostgreSQL + PostGIS (demo: in-memory) |
| Cache | Redis (demo: MemoryCache) |
| Hosting | Vercel (FE) + Railway/Azure (BE) |
| CDN/DDoS | Cloudflare Pro |

---

## License

For demonstration purposes only.
