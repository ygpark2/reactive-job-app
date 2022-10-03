.PHONY: up

up:
	docker-compose --env-file env/dev -f ./backend/docker-compose.yml -f ./frontend/docker-compose.yml up --build --remove-orphans

down:
	docker-compose --env-file env/dev -f ./backend/docker-compose.yml -f ./frontend/docker-compose.yml down

ps:
	docker-compose --env-file env/dev -f ./backend/docker-compose.yml -f ./frontend/docker-compose.yml ps

rm:
	docker-compose --env-file env/dev -f ./backend/docker-compose.yml -f ./frontend/docker-compose.yml rm

logs:
	docker-compose --env-file env/dev -f ./backend/docker-compose.yml -f ./frontend/docker-compose.yml logs $(name)

exec:
	docker-compose --env-file env/dev -f ./backend/docker-compose.yml -f ./frontend/docker-compose.yml exec $(name) bash

