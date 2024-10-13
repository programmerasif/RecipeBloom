# Recipe Sharing Community

**Live Demo**: [Recipe Bloom](https://recipe-bloom.vercel.app/)

## Overview

The Recipe Sharing Community is a full-stack web application designed for culinary enthusiasts to share, discover, and organize recipes. With features such as recipe submission, social engagement, and interactive tools, this platform caters to home cooks, culinary students, and anyone passionate about cooking. Premium content is also available through a subscription-based model.

## Features

- **User Authentication & Profile Management**: Users can register, log in securely, and customize their profiles.
- **Recipe Submission**: Submit recipes with images and detailed descriptions.
- **Social Features**: Commenting, rating, following users, upvoting, and downvoting recipes.
- **Interactive Tools**: Ingredient checklist and a built-in cooking timer.
- **Premium Membership**: Users can access exclusive content through a paid subscription.

---

## Project Objectives

1. **Frontend & Backend Development**: Separation of frontend and backend components for scalability and maintainability.
2. **Authentication & Authorization**: Secure user authentication using JWT (JSON Web Tokens) for session management.
3. **Database Integration**: Implement MongoDB for managing recipes, user profiles, comments, and ratings.
4. **Responsive Design**: Ensure a mobile-friendly user interface with smooth navigation across devices.
5. **Recipe Management**: Allow users to submit, edit, and delete their own recipes.
6. **Interactive Features**:
    - Ingredient checklist for tracking ingredients while cooking.
    - Timer functionality to help users track cooking durations.
7. **Advanced Search & Filter**: Enable users to search recipes by keywords, ingredients, cooking time, and categories.
8. **Payment Integration**: Implement Stripe/Aamarpay for premium content subscription.

---

## Functional Requirements

### 1. User Authentication & Authorization
- **User Registration**: Account creation with email, password, and profile information.
- **Login & JWT Authentication**: Secure login system with session management.
- **Password Recovery**: Password reset via email.
- **Secure Password Change**: Ability to update password securely after login.

### 2. User Profile Management
- **Profile Customization**: Users can update personal information such as name, profile picture, and bio.
- **Social Connectivity**: Users can follow/unfollow others, and view follower/following counts.
- **Premium Membership**: Paid membership for access to exclusive content.

### 3. Recipe Management
- **My Recipes**: Manage, search, and filter user-submitted recipes.
- **Recipe Submission**: Users can create and edit recipes with images and rich text formatting.
- **Ingredient Checklist (Optional)**: Interactive checklist to help users track ingredients during cooking.
- **Timer Functionality (Optional)**: Built-in timers for managing cooking times, with options for pause, reset, and notifications.
- **Recipe Deletion**: Users can delete their recipes, and admins can manage recipes.

### 4. Rating, Commenting & Upvote/Downvote System
- **Rate Recipes**: Users can rate recipes (e.g., 1 to 5 stars).
- **Commenting**: Users can comment on recipes, and edit/delete their own comments.
- **Upvote/Downvote**: Users can upvote or downvote recipes to promote popular content.

### 5. Recipe Feed
- **Recipe Display**: List of all recipes with basic details (e.g., title, image, rating).
- **Advanced Search & Filter**: Search by ingredients, cooking time, or tags (e.g., vegetarian, gluten-free).
- **Infinite Scroll**: Seamless browsing through the recipe feed.

### 6. User Management
- **Admin Controls**: Admins can manage users, block/unblock accounts, and publish/unpublish or delete recipes.

---

## User Interface Design

### Required Pages:
1. **Login/Registration Page**: User authentication with password recovery.
2. **User Dashboard**: Display user’s recipes, follower counts, and profile management.
3. **Admin Dashboard**: Manage recipes and users with publish/unpublish, block/unblock controls.
4. **Recipe Feed**: Browse recipes with search, filtering, and sorting options.
5. **Recipe Details Page**: Display full recipe details, comments, ratings, and social interactions.
6. **Profile Page**: View user profiles and their submitted recipes.
7. **About Us Page**: Platform information and team introduction.
8. **Contact Us Page**: Form for inquiries and support.

---

## Bonus Features

### 1. Micro Animations:
- **Smooth Transitions**: Page transition animations for a polished experience.
- **Hover Effects**: Interactive elements like buttons and cards respond to hover actions.
- **Loading Animations**: Display loading indicators while components are fetching data.

### 2. Payment Integration:
- **Subscription System**: Integrate Stripe/Aamarpay for premium content payments.
- **Premium User Subscription**: Unlock exclusive content, advanced filters, and an ad-free experience.

### 3. Upvote & Downvote System:
- **Content Ranking**: Rank recipes by upvotes and downvotes.
- **Sorting by Popularity**: Sort recipes by most popular based on upvotes.

---

## Optional Features

### 1. Social Media Integration:
- **Content Sharing**: Allow users to share recipes on social media platforms to grow the community.

### 2. Additional Notes:
- Ensure comprehensive documentation for setup and deployment.
- Use Git for version control.
- Implement error handling and validation for smooth user experience.

---

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT for secure user sessions
- **Payment Gateway**: Stripe/Aamarpay integration
- **Version Control**: Git
- **Deployment**: Vercel (Live at [Recipe Bloom](https://recipe-bloom.vercel.app/))

---

## Setup & Installation

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/recipe-sharing-community.git