![CI/CD Pipeline](https://github.com/prarthanashrirambankar-dev/docker-fullstack-app/actions/workflows/ci-cd.yml/badge.svg)

# 🐳 Multi-Stage Docker Full-Stack Application

A production-ready Node.js and PostgreSQL full-stack application containerized using Docker Multi-Stage Builds.

The project focuses on lightweight images, container security, health monitoring, database persistence, and automated Docker testing using GitHub Actions.

---

## 🚀 Project Overview

This project demonstrates how to containerize a Node.js web application with a PostgreSQL database using Docker Compose.

Key objectives:

- Use Docker Multi-Stage Builds
- Keep the final Docker image lightweight
- Run the application as a non-root user
- Orchestrate the application and database using Docker Compose
- Implement container health checks
- Persist PostgreSQL data using Docker volumes
- Automate Docker build and testing using GitHub Actions

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │      User / Browser  │
                    └──────────┬───────────┘
                               │
                               │ Port 3000
                               ▼
                    ┌──────────────────────┐
                    │   Node.js Web App    │
                    │      Express.js      │
                    │                      │
                    │    Non-root user     │
                    │      appuser         │
                    └──────────┬───────────┘
                               │
                               │ PostgreSQL
                               ▼
                    ┌──────────────────────┐
                    │     PostgreSQL       │
                    │      Database        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Docker Volume      │
                    │   postgres_data      │
                    └──────────────────────┘