# Wanderlust Project - Complete Documentation

## Project Overview

This is a Node.js/Express.js web application called "Wanderlust" - a travel listing platform where users can browse, create, edit, and delete travel listings. The application features user authentication, session management, and a MongoDB database.

## Folder Structure and Purpose

### 📁 Root Directory

- **app.js** - Main application entry point, sets up Express server, middleware, routes, and error handling
- **package.json** - Contains project metadata and dependencies
- **package-lock.json** - Lock file for dependency versions
- **schema.js** - Joi validation schemas for data validation

### 📁 models/

**Purpose**: Contains Mongoose data models for MongoDB collections

- **user.js** - User model with email field, uses passport-local-mongoose for authentication
- **listing.js** - Travel listing model with title, description, image, price, location, country fields
- **review.js** - Review model (referenced from listing.js but not shown in current view)

### 📁 routes/

**Purpose**: Contains Express route handlers organized by feature

- **user.js** - Handles user authentication routes (signup, login)
- **listing.js** - Handles CRUD operations for travel listings
- **review.js** - Handles review operations (referenced but not shown)

### 📁 views/

**Purpose**: Contains EJS templates for rendering HTML pages

#### 📁 views/layouts/

- **boilerplate.ejs** - Main layout template using ejs-mate

#### 📁 views/includes/

- **navbar.ejs** - Navigation bar component
- **footer.ejs** - Footer component
- **flash.ejs** - Flash messages display component

#### 📁 views/users/

- **signup.ejs** - User registration form
- **login.ejs** - User login form

#### 📁 views/listings/

- **index.ejs** - Display all listings
- **new.ejs** - Create new listing form
- **edit.ejs** - Edit existing listing form
- **show.ejs** - Show individual listing details
- **error.ejs** - Error page template

#### 📁 views/listings/static/

- **privacy.ejs** - Privacy policy page
- **terms.ejs** - Terms and conditions page
- **review.ejs** - Review policy page

### 📁 utils/

**Purpose**: Contains utility functions and classes

- **ExpressError.js** - Custom error class for handling HTTP errors
- **wrapAsync.js** - Utility function to wrap async routes with error handling

### 📁 middleware/

**Purpose**: Contains custom middleware functions

- **validation.js** - Custom validation middleware (not shown in current view)

### 📁 classroom/

**Purpose**: Contains classroom/exercise related files

- **server.js** - Classroom server file
- **views/page.ejs** - Classroom page template

### 📁 init/

**Purpose**: Contains initialization scripts

- **index.js** - Initialization script
- **data.js** - Sample data for initialization

### 📁 types/

**Purpose**: Contains TypeScript type definitions

- **ejs-mate.d.ts** - Type definitions for ejs-mate package

## Packages Used and Their Purpose

### Dependencies

1. **express** (^4.21.2) - Web framework for Node.js
2. **mongoose** (^8.17.0) - MongoDB object modeling tool
3. **ejs** (^3.1.10) - Embedded JavaScript templating engine
4. **ejs-mate** (^4.0.0) - Layout support for EJS templates
5. **passport** (^0.7.0) - Authentication middleware
6. **passport-local** (^1.0.0) - Local username/password authentication strategy
7. **passport-local-mongoose** (^8.0.0) - Mongoose plugin for passport-local
8. **express-session** (^1.18.2) - Session middleware for Express
9. **connect-flash** (^0.1.1) - Flash messages for Express
10. **method-override** (^3.0.0) - HTTP verb overriding middleware
11. **cookie-parser** (^1.4.7) - Cookie parsing middleware
12. **joi** (^18.0.0) - Data validation library
13. **bootstrap** (^5.3.7) - CSS framework for styling
14. **express-ejs-layouts** (^2.5.1) - Layout support for Express (alternative to ejs-mate)

### Dev Dependencies

1. **nodemon** (^3.1.10) - Development server with auto-restart

## Key Features and Functionality

### 🔐 Authentication System

- User registration and login using passport-local strategy
- Session management with express-session
- Flash messages for user feedback
- Password hashing and security through passport-local-mongoose

### 🏨 Listing Management

- CRUD operations for travel listings
- MongoDB integration with Mongoose
- Data validation using Joi schemas
- Image handling with default fallback images

### 🎨 Frontend Features

- EJS templating with layout support via ejs-mate
- Bootstrap 5 for responsive design
- Component-based structure (navbar, footer, flash messages)
- Error handling pages

### ⚙️ Technical Architecture

- MVC (Model-View-Controller) pattern
- Modular route handling
- Custom error handling with ExpressError class
- Async/await pattern with error wrapping
- Middleware-based architecture

## Database Structure

### MongoDB Collections:

1. **users** - User accounts with email and username
2. **listings** - Travel listings with various properties
3. **reviews** - User reviews for listings (referenced)

## How It All Works Together

1. **Server Setup**: app.js initializes Express, connects to MongoDB, sets up middleware
2. **Authentication**: Passport handles user auth, sessions maintain login state
3. **Routing**: Modular routes handle different features (users, listings, reviews)
4. **Templating**: EJS with ejs-mate layouts renders dynamic HTML
5. **Validation**: Joi validates incoming data, Mongoose validates database data
6. **Error Handling**: Custom ExpressError and wrapAsync handle errors gracefully

## Development Setup

1. Install dependencies: `npm install`
2. Start MongoDB locally on port 27017
3. Run development server: `npm run dev`
4. Access application at: `http://localhost:8080`

This project demonstrates a complete full-stack JavaScript application with proper separation of concerns, authentication, database integration, and modern web development practices.
