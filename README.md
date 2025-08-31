## 🚀MindSpace – AI Mental Health Support

#### Live Link - [mind-space-sigma.vercel.app](https://mind-space-sigma.vercel.app/)

### 📖Description

MindSpace is an AI-powered mental health support platform designed to improve wellbeing through mood tracking, creative expression, peer support circles, and actionable resources. The platform combines technology and community to break traditional barriers around accessing mental health care.A full-stack AI mental health app with React frontend and Node.js backend. Features mood tracking, creative therapy, real-time support circles, and personalized roadmaps. Uses environment variables for secure config and supports deployment on Vercel &amp; Render. Focused on user wellness and community.

### The website is divided into several sections, including:
- Home/Dashboard: An overview and entry point for users after login, displaying core features, support options, and quick links.
- Register/Login: Secure authentication pages for new and existing users to access personalized features.
- Mood Tracker: Section for logging daily moods, viewing trends, and accessing personal mental health reports.
- Creative Space: A platform for users to share thoughts, creative writing, and artistic expressions to support emotional wellbeing.
- Support Circles: Real-time community chat rooms where users can seek and provide peer support.
- Roadmaps: Guided plans and actionable steps for users to improve their mental health journey.
- Resources: Curated educational articles, self-help tips, and contact details for professional support.
- Profile & Settings: Personal dashboard for managing user settings, notifications, privacy, and customization options.

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

### 📁Project Structure

The project is structured into the following folders and files:
• `index.html`: The main entry point of the website.
• `src/`: Contains all React source code components and pages.
• `components/`: Reusable UI - Main application pages (Home, Dashboard, Login, Register, CreativeSpace, Roadmaps, SupportCircles, Resources, Profile).
• `styles/`: CSS or Material-UI theme files for the project.
• `public/`: Publicly accessible files, including favicon and manifest.
• `backend/`: Backend Node.js/Express server source.
• `models/`: Database schema definitions.
• `routes/`: API route handlers (auth, mood, creative, supportCircle, etc.).
• `controllers/`: Request handling logic and API controllers.
• `middleware/`: Authentication, error handling, and validation.
• `config/`: Configuration files for environment variables, database, etc.
• `package.json`: Project dependencies and configuration.
• `.env`: Environment variables for database and secret keys (not committed).
• `README.md`: Project documentation.

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

### Uses

- Track and improve personal mental health and wellbeing
- Get emotional support via real-time community conversations
- Follow guided mental health roadmaps for recovery
- Share creative thoughts and artwork as self-expression
- Access curated educational resources
- Ensure secure, private authentication and data management
- Receive real-time updates and reminders
- Support therapists and coaches in monitoring progress

### ⚙️How to Run

To run the website, follow these steps: 1. Clone the repository to your local machine using `git clone`. 2. Install the required dependencies using `npm install` in both frontend and backend folders. 3. Set up environment variables for backend configuration (`.env` file). 4. Run the backend server with `npm start` inside the `backend/` folder. 5. Run the frontend application with `npm start` inside the `src/` or `frontend/` folder. 6. Open the frontend app in your preferred web browser (usually at `http://localhost:3000`). 7. Optionally, customize CSS styles or add images/assets in the respective folders.

### 📸Preview

##### Home Page

![Home Page]()

##### Registration Page

![Registration Page]()

##### Dashboard

![Dashboard]()

##### Creative Therapy

![Creative Therapy]()

##### Support Circles

![Support Circles]()

##### Roadmap

![Roadmap]()

##### Insight Reports

![Insight Reports]()

##### Resources

![Resources]()

##### Dark Mode UI as well

![Dashboard]()

![Creative Therapy]()

![Support Circles]()

![Roadmap]()

![Insight Reports]()

![Resources]()

### 📝License

The website is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

---

## Installation

### Backend

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get your mongoDB Atlas URL after creating the cluster
2. Clone the repo
   ```sh
   git clone https://github.com/Mangalam-17/mindspace.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Configure `.env` with:
   ```js
   const MONGO_URI=`your_mongodb_connection_string`
   const JWT_SECRET=`your_jwt_secret`
   const PORT=`5000`
   ```
5. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes

6. Set start scripts if not set
   ```sh
   npm start or npm run dev
   ```


### Frontend

cd ../frontend
npm install

Configure `.env`:
REACT_APP_API_URL=http://localhost:5000

npm start

---

## Working

- **User Interaction:** Secure registration, login, and mood tracking.
- **Community Support:** Real-time chat in support circles.
- **Resource Access:** Guided mental health roadmaps and curated educational resources.

---

## Screenshots

![Login Page](./images/login-page.png)
![Register Page](./images/register-page.png)
![Dashboard](./images/dashboard.png)
![Support Circle Chat](./images/support-circle-chat.png)

---

## Advantages & Disadvantages

### Advantages

- Accessibility from anywhere and anytime
- Real-time peer and community support
- Personalized, AI-driven care
- Secure authentication and encrypted data
- Affordable and judgment-free experience
- Comprehensive educational and creative tools
- Encourages habit formation through notifications

### Disadvantages

- Requires internet connectivity and devices
- AI cannot replace professional therapy
- Data privacy concerns and need for user trust
- Engagement and motivation challenges
- Limited crisis intervention capabilities
- May require cultural/language adaptation
- Not a substitute for emergency situations

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
Email: your.email@example.com

---
