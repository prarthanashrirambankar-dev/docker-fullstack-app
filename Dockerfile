# Stage 1: Install dependencies
FROM node:20-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev


# Stage 2: Production image
FROM node:20-alpine AS production

WORKDIR /app

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only required application files and dependencies
COPY --from=dependencies /app/node_modules ./node_modules
COPY package*.json ./
COPY server.js ./

# Give the application user ownership
RUN chown -R appuser:appgroup /app

# Run the application as non-root user
USER appuser

# Application port
EXPOSE 3000

# Container health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
 CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/health || exit 1

# Start application
CMD ["npm", "start"]