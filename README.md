# Mini CRM Dashboard  
### Full Stack Web Development – Task 2 (Future Interns 2026)

A modern full-stack Mini CRM application built as part of the **Future Interns – Full Stack Web Development Task 2**.  
The project demonstrates CRUD operations, dashboard analytics, charts, and a professional dark UI.

## 🔗 Live Demo

- **Frontend:** (will be updated after deployment)
- **Backend API:** (will be updated after deployment)

## 🛠 Tech Stack

### Frontend
- React (Create React App)
- Functional Components
- React Hooks (useState, useEffect)
- Fetch API
- Plain CSS (No UI libraries)
- Chart.js (Donut & Line Charts)

### Backend
- Node.js
- Express.js
- MongoDB Atlas

### Tools
- Thunder Client (API testing)
- Git & GitHub

## ✨ Features

- Add new customers
- View customer list
- Delete customers
- Real-time UI updates without page reload
- Dashboard analytics
- Total customers count
- Unique companies count
- Donut chart – customer distribution by company
- Line chart – customer growth over time
- Form validation:
  - Invalid email detection
  - Invalid phone number detection
- Professional dark-themed UI
- Fully responsive design

## 🔌 API Endpoints

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api/customers` | Fetch all customers |
| POST | `/api/customers` | Add a new customer |
| DELETE | `/api/customers/:id` | Delete customer by ID |

## 📁 Project Structure

mini-crm-task-2/
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── CustomerForm.js
│   │   │   └── CustomerList.js
│   │   ├── styles/
│   │   │   ├── app.css
│   │   │   ├── customerform.css
│   │   │   └── customerlist.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md

## ▶️ How to Run Locally

### Backend
```bash
cd backend
npm install
npm start

cd frontend
npm install
npm start



---

# STEP  Testing Information (Thunder Client 🔥)

```md
## 🧪 API Testing

All backend APIs were tested using **Thunder Client** inside VS Code.

- Verified GET, POST, DELETE operations
- MongoDB Atlas connection tested
- API responses validated before frontend integration

## 🎓 Internship Task Information

This project is submitted as **Task 2 – Full Stack Web Development**  
under the **Future Interns Internship Program (2026)**.

The task focuses on:
- Full stack development
- REST API integration
- Database handling
- UI/UX design
- Industry-level coding practices

---

### 👨‍💻 Developed By
**Abhishek Suvarna**

Mini CRM Dashboard – Future Interns 2026

