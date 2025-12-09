# note-keeper-291534-291543

Backend: notes_backend (Express)

- Runs on port 3001
- Swagger docs available at /docs
- Health endpoint at GET /health
- Notes CRUD endpoints under /notes

Getting started
1) Install dependencies
   cd notes_backend
   npm install

2) Run in dev mode (with auto-reload)
   npm run dev

3) Run in prod mode
   npm start

Health check
- GET http://localhost:3001/health
  Response:
  {
    "status": "ok",
    "message": "Service is healthy",
    "timestamp": "...",
    "environment": "development"
  }

Notes API
Base URL: http://localhost:3001

Endpoints:
- POST /notes
  Body: { "title": "My Note", "content": "Optional content" }
  201 Created -> Note JSON

- GET /notes
  200 OK -> [Note]

- GET /notes/:id
  200 OK -> Note
  404 Not Found

- PUT /notes/:id
  Body: { "title": "Updated Title", "content": "Updated content" } (either field optional)
  200 OK -> Updated Note
  400 Validation error (if title provided but empty)
  404 Not Found

- DELETE /notes/:id
  204 No Content
  404 Not Found

Example curl
Create:
curl -s -X POST http://localhost:3001/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"First note","content":"hello"}'

List:
curl -s http://localhost:3001/notes

Get by id:
curl -s http://localhost:3001/notes/<id>

Update:
curl -s -X PUT http://localhost:3001/notes/<id> \
  -H "Content-Type: application/json" \
  -d '{"title":"New title"}'

Delete:
curl -s -X DELETE http://localhost:3001/notes/<id>

API Docs
Open http://localhost:3001/docs for Swagger UI.