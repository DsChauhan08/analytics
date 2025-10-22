.PHONY: help start stop build test clean logs setup

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

setup: ## Initial setup (install dependencies)
	@./scripts/setup.sh

start: ## Start all services
	docker compose up -d

start-build: ## Build and start all services
	docker compose up -d --build

stop: ## Stop all services
	docker compose down

logs: ## Show logs from all services
	docker compose logs -f

logs-backend: ## Show backend logs
	docker compose logs -f backend

logs-frontend: ## Show frontend logs
	docker compose logs -f frontend

logs-db: ## Show database logs
	docker compose logs -f db

test: ## Run backend tests
	cd backend && npm test

test-watch: ## Run tests in watch mode
	cd backend && npm test -- --watch

build: ## Build Docker images
	docker compose build

clean: ## Clean up containers and volumes
	docker compose down -v
	rm -rf backend/node_modules frontend/node_modules

backup: ## Backup database
	@./scripts/backup.sh

load-test: ## Run load tests
	@./scripts/load-test.sh

dev-backend: ## Run backend in development mode
	cd backend && npm run dev

dev-frontend: ## Run frontend in development mode
	cd frontend && npm run dev

shell-backend: ## Open shell in backend container
	docker compose exec backend sh

shell-db: ## Open PostgreSQL shell
	docker compose exec db psql -U postgres -d analytics

restart: stop start ## Restart all services

ps: ## Show running containers
	docker compose ps
