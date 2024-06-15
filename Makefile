push:
	npx nx format:write && npx nx run-many --targets=lint,type-check --skip-nx-cache
test:
	npx nx run-many --target=test
db:
	docker compose up -d
