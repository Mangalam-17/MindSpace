## 🚀MindSpace – AI Mental Health Support

#### Live Link - [mind-space-sigma.vercel.app](https://mind-space-sigma.vercel.app/)

### 📖Description

MindSpace is an AI-powered mental health support platform designed to improve wellbeing through mood tracking, creative expression, peer support circles, and actionable resources. The platform combines technology and community to break traditional barriers around accessing mental health care.A full-stack AI mental health app with React frontend and Node.js backend. Features mood tracking, creative therapy, real-time support circles, and personalized roadmaps. Uses environment variables for secure config and supports deployment on Vercel &amp; Render. Focused on user wellness and community.

---

### The website is divided into several sections, including:

- Home/Dashboard: An overview and entry point for users after login, displaying core features, support options, and quick links.
- Register/Login: Secure authentication pages for new and existing users to access personalized features.
- Mood Tracker: Section for logging daily moods, viewing trends, and accessing personal mental health reports.
- Creative Space: A platform for users to share thoughts, creative writing, and artistic expressions to support emotional wellbeing.
- Support Circles: Real-time community chat rooms where users can seek and provide peer support.
- Roadmaps: Guided plans and actionable steps for users to improve their mental health journey.
- Resources: Curated educational articles, self-help tips, and contact details for professional support.
- Profile & Settings: Personal dashboard for managing user settings, notifications, privacy, and customization options.

---

### 🧰Tech Stack

| Technology                  | Version                       |
| --------------------------- | ----------------------------- |
| HTML                        | 5                             |
| CSS                         | 3                             |
| JavaScript                  | ES6                           |
| React.js                    | 18.x                          |
| Node.js                     | 18.x                          |
| Express.js                  | 4.x                           |
| MongoDB                     | 6.x                           |
| JWT Authentication          | Latest                        |
| Responsive Design.          | Material-UI v5                |
| Real-Time Communication     | Socket.iov4                   |
| Cross-Browser Compatibility | Chrome, Firefox, Edge, Safari |

---

### 📁Project Structure

The project is structured into the following folders and files:

- `index.html`: The main entry point of the website.
- `src/`: Contains all React source code components and pages.
- `components/`: Reusable UI - Main application pages (Home, Dashboard, Login, Register, CreativeSpace, Roadmaps, SupportCircles, Resources, Profile).
- `styles/`: CSS or Material-UI theme files for the project.
- `public/`: Publicly accessible files, including favicon and manifest.
- `backend/`: Backend Node.js/Express server source.
- `models/`: Database schema definitions.
- `routes/`: API route handlers (auth, mood, creative, supportCircle, etc.).
- `controllers/`: Request handling logic and API controllers.
- `middleware/`: Authentication, error handling, and validation.
- `config/`: Configuration files for environment variables, database, etc.
- `package.json`: Project dependencies and configuration.
- `.env`: Environment variables for database and secret keys (not committed).
- `README.md`: Project documentation.

---

### ✨Features

1. **Responsive Design**: The platform adapts seamlessly to all screen sizes—including desktops, tablets, and smartphones—for an optimal user experience.
2. **Secure Authentication**: Uses JWT and encrypted protocols to ensure user data privacy and secure login/logout processes.
3. **User-Friendly Interface**: Clean layouts, intuitive navigation, and accessible menus make it easy for users of all ages to interact with features.
4. **Real-Time Communication**: Integrated support circles enable instant peer-to-peer chat and timely emotional support.
5. **Accessibility Standards**: Designed with accessibility in mind, providing support for screen readers and easy keyboard navigation.
6. **Interactive Visuals & Charts**: Provides dynamic mood tracking reports and analytic charts for clear, actionable insights.
7. **Cross-Browser Compatibility**: Fully functional and consistent across Chrome, Firefox, Edge, and Safari.
8. **Social Media Integration**: Offers options to share achievements, creative posts, or invite friends via integrated social links.
9. **Notifications & Reminders**: Real-time notifications and reminders help users maintain healthy habits and stay engaged.
10. **Modular Architecture**: Built for scalability and future expansion, allowing easy addition of new sections and features.

---

### Installation

#### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

#### Backend

1. Clone the repo
   ```sh
   git clone https://github.com/Mangalam-17/mindspace.git
   ```
2. ```sh
   cd frontend
   ```
3. Setup mongoDB Atlas URL after creating the cluster
4. Install NPM packages
   ```sh
   npm install
   ```
5. Configure `.env` with:
   ```js
   const MONGO_URI = `your_mongodb_connection_string`;
   const JWT_SECRET = `your_jwt_secret`;
   const PORT = `5000`;
   ```
6. Change git remote url to avoid accidental pushes to base project

   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes

   ```

7. Set start scripts if not set
   ```sh
   npm start or npm run dev
   ```

#### Frontend

1. ```sh
   cd frontend
   ```
2. Intall npm packages
   ```sh
   npm install
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Configure `.env` with:

   ```js
   const REACT_APP_API_URL = `http://localhost:5000`;
   ```

5. Set start scripts if not set
   ```sh
   npm start or npm run dev
   ```

---

### ⚙️How to Run

- To run the website, follow these steps -

1. Clone the repository to your local machine using `git clone`.
2. Install the required dependencies using `npm install` in both frontend and backend folders.
3. Set up environment variables for backend configuration (`.env` file).
4. Run the backend server with `npm start` inside the `backend/` folder.
5. Run the frontend application with `npm start` inside the `src/` or `frontend/` folder.
6. Open the frontend app in your preferred web browser (usually at `http://localhost:3000`). 7. Optionally, customize CSS styles or add images/assets in the respective folders.

---

### 📸Preview

##### Home Page

![Home Page](https://github.com/Mangalam-17/MindSpace/blob/49b9f45ab6af85f96d13a7f67a3b7bf0fdf84862/Preview/HomePage.png)

##### Registration Page

![Registration Page](https://github.com/Mangalam-17/MindSpace/blob/49b9f45ab6af85f96d13a7f67a3b7bf0fdf84862/Preview/RegisterPage.png)

##### Dashboard

![Dashboard](https://github.com/Mangalam-17/MindSpace/blob/49b9f45ab6af85f96d13a7f67a3b7bf0fdf84862/Preview/Dashboard.png)

##### Creative Therapy

![Creative Therapy](https://github.com/Mangalam-17/MindSpace/blob/49b9f45ab6af85f96d13a7f67a3b7bf0fdf84862/Preview/CreativeTherapy.png)

##### Support Circles

![Support Circles](https://github.com/Mangalam-17/MindSpace/blob/3955ac511c66fbc25a987998735a73ad289cae27/Preview/SupportCIrcles.png)

##### Roadmap

![Roadmap](https://github.com/Mangalam-17/MindSpace/blob/49b9f45ab6af85f96d13a7f67a3b7bf0fdf84862/Preview/Roadmap.png)

##### Insight Reports

![Insight Reports](https://github.com/Mangalam-17/MindSpace/blob/49b9f45ab6af85f96d13a7f67a3b7bf0fdf84862/Preview/InsightReports.png)

##### Resources

![Resources](https://github.com/Mangalam-17/MindSpace/blob/49b9f45ab6af85f96d13a7f67a3b7bf0fdf84862/Preview/Resources.png)

##### Dark Mode UI as well

![Dashboard_dark](https://github.com/Mangalam-17/MindSpace/blob/49b9f45ab6af85f96d13a7f67a3b7bf0fdf84862/Preview/Dashboard_dark.png)

![Creative Therapy_dark](https://github.com/Mangalam-17/MindSpace/blob/49b9f45ab6af85f96d13a7f67a3b7bf0fdf84862/Preview/CreativeTherapy_dark.png)

![Support Circles_dark](https://github.com/Mangalam-17/MindSpace/blob/3955ac511c66fbc25a987998735a73ad289cae27/Preview/SupportCircles_dark.png)

![Roadmap_dark](https://github.com/Mangalam-17/MindSpace/blob/49b9f45ab6af85f96d13a7f67a3b7bf0fdf84862/Preview/Roadmap_dark.png)

![Insight Reports_dark](https://github.com/Mangalam-17/MindSpace/blob/49b9f45ab6af85f96d13a7f67a3b7bf0fdf84862/Preview/InsightReports_dark.png)

![Resources_dark](https://github.com/Mangalam-17/MindSpace/blob/49b9f45ab6af85f96d13a7f67a3b7bf0fdf84862/Preview/Resources_dark.png)

---

## Future Scope

1. AI-driven mood prediction and therapy suggestions
2. Integration with wearable health-tracking devices
3. Multilingual and culturally adapted interfaces
4. Mobile app versions
5. VR/AR therapy modules
6. Enhanced teletherapy features
7. Safe, AI-moderated expanded communities
8. Advanced analytics dashboards
9. Integration with clinical systems
10. Gamification for better engagement

---

## Contact

Made with ❤️ by Mangalam  
Questions, ideas, or feedback?  
Email: mangalamab17@gmail.com

---
