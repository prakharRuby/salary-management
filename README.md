Salary Management Tool

A full-stack Salary Management System built using Ruby on Rails (API) and React (Vite) with analytics dashboard, filtering, and employee management features.

 Live Deployment
 Frontend: https://salary-management-inky.vercel.app
 Backend API: https://salary-management-production-064e.up.railway.app
Tech Stack
  Backend
  Ruby on Rails (API mode)
  PostgreSQL
  ActiveRecord
  CORS enabled API
  Frontend
  React (Vite)
  Axios
  Material UI
  React Hooks
  Deployment
  Backend: Railway
  Frontend: Vercel
Features
  Employee Management
  Add new employee
  Edit employee details
  Delete employee
  Search employees by name
  Pagination support
Salary Insights Dashboard
  Minimum salary by country
  Maximum salary by country
  Average salary analytics
  Filter by:
  Country
  Job title
  ⚡ Dynamic Data
  Countries fetched dynamically from database
  Job titles fetched dynamically
  No hardcoded dropdown values
Architecture
  Frontend (React + Vite)
          ↓ API calls
  Backend (Rails API on Railway)
          ↓
  PostgreSQL Database
API Endpoints
  Employees
  GET    /employees
  POST   /employees
  PUT    /employees/:id
  DELETE /employees/:id
  Insights
  GET /insights?country=India&job_title=Engineer
Setup Instructions
Backend (Rails)
  cd salary_backend
  bundle install
  rails db:create db:migrate db:seed
  rails server
Frontend (React)
  cd salary_frontend
  npm install
  npm run devn
Frontend (Vercel)
VITE_API_URL=https://salary-management-production-064e.up.railway.app
Testing
  TDD approach used for backend APIs
  Request specs for:
  Employees API
  Insights API
  Ensured failing test → implementation → passing test flow Key Improvements Made
Fixed Rails production deployment issues
  Migrated from SQLite → PostgreSQL
  Implemented proper CORS configuration
  Added dynamic dropdowns from DB
  Fixed missing nil guards in controllers
  Improved API structure for scalability
🎥 Demo Video

  https://www.loom.com/share/d7b0a38e838d46d796d86e9a6d4b8221

Future Improvements
  Authentication (JWT-based login)
  Role-based access control
  Export reports (CSV/PDF)
  Charts for salary trends
 Author

Built as a full-stack assignment project demonstrating:

REST API design
TDD workflow
Full deployment pipeline
Production-ready architecture
Final Note

This project follows:

Clean architecture
Production deployment standards
Scalable API design
Frontend-backend separation
