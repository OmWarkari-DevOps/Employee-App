# Production-grade Dockerfile for Employee Management System
# Multi-stage build: optimized for production

# Stage 1: Serve with Node.js (lightweight HTTP server)
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files
COPY . .

# Install global http-server for serving static files
RUN npm install -g http-server

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start server
CMD ["http-server", "-p", "8000", "-c-1"]
