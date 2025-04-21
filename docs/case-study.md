### **Case Study: Backend Application for ToDo App**

#### **Overview**

This case study explores the creation of a backend API for ToDo App, a web application designed to help users manage task workflows efficiently. The backend is built using **Node.js**, **Express**, and **MongoDB**, and includes essential features such as user authentication, CRUD operations, and test-driven development practices.

---

#### **Problem Statement**

The goal was to build a scalable, secure, and maintainable backend that could support a growing user base while integrating seamlessly with the frontend. The challenges included:

- Ensuring fast response times even under heavy loads.
- Securing sensitive user data, particularly passwords.
- Writing effective and maintainable tests for critical parts of the application (authentication, user management, etc.).

---

#### **Tech Stack**

The following technologies were chosen for their scalability, performance, and developer-friendliness:

- **Node.js** – Asynchronous, event-driven architecture for handling concurrent requests.
- **Express** – Lightweight framework for building APIs and handling HTTP requests.
- **MongoDB** – NoSQL database, ideal for the flexibility of storing user data.
- **Jest & Supertest** – Chosen for testing due to their ease of use, built-in assertions, and smooth integration for API testing (see ADR for details on this decision).
- **JWT (JSON Web Tokens)** – Used for secure user authentication.

---

#### **Key Decisions & Trade-offs**

- **Why Node.js?**
  - Chose Node.js for its ability to handle many simultaneous connections with minimal overhead. This was essential for the app’s real-time features.
- **Why MongoDB?**

  - MongoDB was selected for its flexibility in storing data with different structures, allowing rapid changes to the app’s data models as features evolve.

- **Why Jest & Supertest for Testing?**
  - Chose **Jest** and **Supertest** over **Mocha/Chai** because Jest provides a comprehensive testing framework with built-in mocking and assertions, reducing the need for additional libraries (see ADR for detailed reasoning).

---

#### **Implementation Approach**

- **Authentication:**
  - JWT-based authentication was implemented for secure user login and token management.
- **API Endpoints:**

  - RESTful endpoints were created for user signup, login, and CRUD operations for tasks.
  - Example endpoint: `POST /auth/signup` for user registration.

- **Testing:**
  - Wrote unit and integration tests using **Jest** for the core functionality.
  - Used **Supertest** for API endpoint testing to ensure that routes returned correct responses.
  - Test coverage was tracked, ensuring critical paths were tested thoroughly.

---

#### **Challenges Faced**

1. **Handling Large Payloads:**
   - One major challenge was optimizing the handling of large JSON payloads in API requests, which could potentially slow down the application. Solutions included limiting request sizes and adding request validation.
2. **Authentication Security:**

   - Securing JWT tokens to prevent vulnerabilities such as token hijacking required implementing secure token storage and expiration policies.

3. **Testing Complexity:**
   - Writing tests for asynchronous code (especially user authentication and database interactions) was tricky. Mocking MongoDB interactions with Jest's mock functions helped streamline the process.

---

#### **Results & Learnings**

- **App Performance:**
  - The backend handled real-time data efficiently with minimal latency, even under increased load from concurrent users.
- **Testing Success:**
  - With **Jest & Supertest**, the team achieved full test coverage for critical routes, ensuring the app’s functionality was stable and reliable.
- **Security:**

  - JWT-based authentication worked as expected, keeping user sessions secure and protecting sensitive information.

- **Onboarding New Developers:**
  - Using Jest’s all-in-one setup made it easier for new developers to onboard quickly. The decision to use Supertest streamlined API testing and improved collaboration.

---

#### **Future Improvements**

- **Database Scaling:**
  - As the app grows, scaling MongoDB horizontally with sharding could become a priority.
- **CI/CD Integration:**

  - Adding continuous integration and deployment pipelines with automated testing to ensure faster delivery cycles.

- **Real-time Features:**
  - Considering adding WebSockets for real-time notifications and updates to enhance user engagement.

---

#### **Conclusion**

This backend API for ToDo App successfully addresses the needs of handling secure user data, providing efficient API endpoints, and ensuring robust testing coverage. By following best practices in testing and architecture, we laid the groundwork for future scaling and feature additions.
