# Employee Management System (3-Tier)

This is a complete employee management web application with a 3-tier architecture:

- **Tier 1 – Presentation Layer**: `app.js` and `components/` (React UI)
- **Tier 2 – Business Layer**: `business.js` (validation, logic)
- **Tier 3 – Data Layer**: `services/EmployeeService.js` (localStorage persistence)

## Architecture Overview

```
┌─────────────────────────────────────┐
│  TIER 1: Presentation Layer         │
│  app.js + components/               │
│  (React UI, User Interaction)       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  TIER 2: Business Layer             │
│  business.js                        │
│  (Validation, ID Gen, Search)       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  TIER 3: Data Layer                 │
│  services/EmployeeService.js        │
│  (localStorage persistence)         │
└─────────────────────────────────────┘
```

## Project Structure

```
Employee-app/
├── index.html                 # Main HTML entry point
├── style.css                  # Styling (dark theme)
├── app.js                     # Main App component (Tier 1)
├── business.js                # Business logic (Tier 2)
├── services/
│   └── EmployeeService.js     # Data operations (Tier 3)
├── components/
│   ├── EmployeeForm.js        # Form component
│   ├── EmployeeTable.js       # Table display
│   └── SearchBar.js           # Search component
├── Dockerfile                 # Docker image configuration
├── docker-compose.yml         # Production compose
├── docker-compose.dev.yml     # Development compose
├── docker-compose.advanced.yml # Full 3-tier with backend & DB
└── .dockerignore             # Files to exclude from Docker
```

## How to run

### Option 1: Direct Browser (Simplest)

```bash
cd /home/om/Desktop/practice-project/Employee-app
# Open index.html in your browser
open index.html  # macOS
# or
xdg-open index.html  # Linux
# or
start index.html  # Windows
```

### Option 2: Python HTTP Server

```bash
cd /home/om/Desktop/practice-project/Employee-app
python3 -m http.server 8000
# Visit: http://127.0.0.1:8000
```

### Option 3: Node.js HTTP Server

```bash
cd /home/om/Desktop/practice-project/Employee-app
npm install -g http-server
http-server -p 8000
# Visit: http://127.0.0.1:8000
```

---

## Docker Setup

### Prerequisites

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: Usually comes with Docker Desktop

### Verify Installation

```bash
docker --version
docker-compose --version
```

---

## Docker Options

### **Option 1: Basic Production Docker Compose**
**Use for**: Simple production deployment

**File**: `docker-compose.yml`

```bash
# Build and run
docker-compose up --build

# Or run in background
docker-compose up -d --build

# Stop
docker-compose down

# View logs
docker-compose logs -f
```

**Ports**: http://localhost:8000

---

### **Option 2: Development Docker Compose**
**Use for**: Development with live code reloading

**File**: `docker-compose.dev.yml`

```bash
# Run development environment
docker-compose -f docker-compose.dev.yml up --build

# Or in background
docker-compose -f docker-compose.dev.yml up -d --build

# Stop
docker-compose -f docker-compose.dev.yml down

# View logs
docker-compose -f docker-compose.dev.yml logs -f
```

**Features**:
- Hot-reload: Changes to files automatically refresh in browser
- Volumes mounted for live editing
- Development environment variables

**Ports**: http://localhost:8000

---

### **Option 3: Advanced 3-Tier Architecture**
**Use for**: Future-ready setup with backend API & PostgreSQL database

**File**: `docker-compose.advanced.yml`

**Services**:
- **Frontend**: React app (port 8000)
- **Backend**: Node.js API server (port 3001)
- **Database**: PostgreSQL (port 5432)
- **pgAdmin**: Database UI (port 5050)

```bash
# Start all services
docker-compose -f docker-compose.advanced.yml up --build

# Or in background
docker-compose -f docker-compose.advanced.yml up -d --build

# Stop all services
docker-compose -f docker-compose.advanced.yml down

# View logs for specific service
docker-compose -f docker-compose.advanced.yml logs -f frontend
docker-compose -f docker-compose.advanced.yml logs -f backend
docker-compose -f docker-compose.advanced.yml logs -f postgres
```

**Access Points**:
- Frontend: http://localhost:8000
- Backend API: http://localhost:3001
- PostgreSQL: localhost:5432
- pgAdmin: http://localhost:5050 (admin@employee.local / admin)

**Database Credentials**:
- User: `employee_user`
- Password: `secure_password_123`
- Database: `employee_db`

---

## Docker Compose Comparison

| Feature | Option 1 (Basic) | Option 2 (Dev) | Option 3 (Advanced) |
|---------|-----------------|----------------|-------------------|
| Purpose | Production | Development | Full Stack |
| Hot Reload | ❌ | ✅ | ✅ |
| Backend API | ❌ | ❌ | ✅ |
| Database | ❌ | ❌ | ✅ (PostgreSQL) |
| Best For | Deployment | Daily Dev | Full Architecture |
| Complexity | Low | Low | High |

---

## Common Docker Commands

### Build & Run

```bash
# Build image
docker build -t employee-app .

# Run container
docker run -p 8000:8000 employee-app

# Run with volume mount (live reload)
docker run -p 8000:8000 -v $(pwd):/app employee-app
```

### Managing Containers

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Stop container
docker stop <container-id>

# Remove container
docker rm <container-id>

# View logs
docker logs -f <container-id>
```

### Docker Compose Cleanup

```bash
# Stop all services
docker-compose down

# Remove all services including volumes
docker-compose down -v

# Rebuild images
docker-compose up --build

# Force rebuild (ignore cache)
docker-compose up --build --no-cache
```

---

## Environment Variables

### Development (.env)
```
NODE_ENV=development
REACT_APP_API_URL=http://localhost:3001
```

### Production
```
NODE_ENV=production
REACT_APP_API_URL=https://api.yourdomain.com
```

---

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 8000
lsof -i :8000  # macOS/Linux
netstat -ano | findstr :8000  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Use different port
docker run -p 8080:8000 employee-app
```

### Container Won't Start

```bash
# Check logs
docker logs <container-id>

# Rebuild from scratch
docker-compose down -v
docker-compose up --build --no-cache
```

### Slow Performance

```bash
# Check Docker resources (if using Docker Desktop)
# Preferences → Resources → Increase CPU/Memory

# Rebuild without cache
docker-compose up --build --no-cache
```

---

## Notes

- **Data Storage**: Employee records stored in browser `localStorage` under key `employee_management_system`
- **Reset Data**: Clear browser local storage or delete localStorage key
- **Production**: For production use, add HTTPS, environment-specific configs, and proper secrets management
- **Backend Ready**: The `docker-compose.advanced.yml` is prepared for future Node.js/Express backend integration

---

## Next Steps

1. **Add Backend API**: Create Node.js Express server in `/backend` directory
2. **Add Database**: Integrate PostgreSQL with ORM (Sequelize/TypeORM)
3. **Authentication**: Implement JWT token auth for API
4. **CI/CD**: Set up GitHub Actions for automated deployment
5. **Cloud Deploy**: Deploy to AWS/GCP/Azure using Docker images
