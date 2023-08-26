start:
	docker-compose up -d

initial_db_setup:
	docker exec hitech_api npx prisma migrate deploy

display_api_logs:
	docker logs -f hitech_api