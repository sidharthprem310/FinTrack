# Paynix 🚀

**Paynix** is a modern, intuitive Personal Finance Wrapper application designed to help you track income, expenses, and visualize spending habits effortlessly. Built with **React** and **Supabase** for a seamless and secure experience.

## ✨ Features

-   **Dashboard & Visualization**: Get a clear overview of your financial health with interactive charts and summaries.
-   **Transaction Management**: Easily add, edit, and delete income and expense transactions.
-   **Smart Categories**: Organize transactions with built-in categories or add your own "Others".
-   **Secure Authentication**: Robust signup and login powered by **Supabase Auth** with strict password policies.
-   **Real-time Data**: Instant updates and data persistence in the cloud.
-   **Responsive Design**: A beautiful, dark-themed UI that works on desktop and mobile.

## 🛠️ Tech Stack

-   **Frontend**: React, Vite, Tailwind CSS (styled components)
-   **Backend/Database**: Supabase (PostgreSQL, Auth, RLS)
-   **Routing**: React Router
-   **Icons**: Heroicons / Unsplash Images

## 🚀 Getting Started

### Prerequisites

-   Node.js 16+
-   npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/sidharthprem310/Paynix.git
    cd Paynix/frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the `frontend` directory with your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_project_url
    VITE_SUPABASE_ANON_KEY=your_anon_key
    ```

4.  **Run the Application**:
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` to view the app.

## 🗄️ Database Schema

The application uses a `transactions` table in Supabase.
(See `supabase_schema.sql` for details).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---
Made with ❤️ by [Sidharth Prem](https://github.com/sidharthprem310)
