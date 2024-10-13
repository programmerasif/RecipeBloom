# Recipe Sharing Community

The Recipe Sharing Community is a full-stack web application aimed at bringing together cooking enthusiasts. This platform allows users to share, discover, and organize recipes, targeting home cooks, culinary students, and anyone passionate about cooking. The application provides social features to foster engagement and culinary knowledge sharing.

## Live Demo

Check out the live version of the project here: [Recipe Bloom](https://recipe-bloom.vercel.app/)

## Project Overview

Key features include:
- User registration and profile management
- Recipe submission with detailed ingredient lists
- A built-in cooking timer
- Social features like commenting, rating, following users, and upvoting/downvoting posts
- Premium content access via a subscription-based model

## Project Objectives

- **Frontend and Backend Development:** Separate frontend and backend components.
- **Authentication & Authorization:** Secure user authentication and authorization using JWT.
- **Database Integration:** MongoDB database for storing recipe data, user profiles, comments, and ratings.
- **Responsive UI/UX Design:** A mobile-friendly interface with a responsive design.
- **Recipe Creation & Sharing:** Users can submit, update, and manage recipes with rich text formatting.
- **Interactive Features:** Ingredient checklist and cooking timer.
- **Advanced Search:** Search with filters for ingredients, cooking times, and categories.
- **Payment System:** Integrate online payments for membership subscriptions using Aamarpay or Stripe.

## Functional Requirements

### 1. User Authentication & Authorization
- **User Registration:** Account creation with email, password, and profile details (e.g., username, profile picture).
- **Login & JWT-based Authentication:** Secure login and session management with JWT tokens.
- **Password Recovery:** Password reset functionality via email.
- **Secure Password Change:** Users can update their password after login.

### 2. User Profile Management
- **Profile Customization:** Users can update personal information, such as name, profile picture, and bio.
- **Social Connectivity:** Users can follow/unfollow others, with follower/following counts displayed.
- **Premium Membership Subscription:** Users can purchase premium memberships, which unlock premium content.

### 3. Recipe Management
- **My Recipes:** A section displaying the user’s submitted recipes with filtering, searching, pagination, and sorting.
- **Recipe Sharing:** Rich Text Editor support for formatting recipes and attaching images.
- **Ingredient Checklist (optional):** 
    - Users can check/uncheck ingredients they have gathered.
    - Show the number of remaining ingredients or group them by type.
- **Timer Functionality (optional):**
    - Start timers for cooking durations with sound or popup notifications when time is up.
    - Custom durations and multiple timers for different steps.
- **Recipe Deletion:** Users can delete their own recipes, and admins can manage all user-posted recipes.

### 4. Rating, Commenting & Upvote/Downvote System
- **Rate Recipes:** Users can rate recipes, and average ratings will be displayed on recipe cards.
- **Commenting:** Users can leave, edit, or delete their own comments.
- **Upvote & Downvote System:** Recipes can be upvoted or downvoted. Most upvoted recipes are displayed at the top.

### 5. Recipe Feed
- **Recipe Display:** A dynamic feed displaying recipes with basic information (e.g., title, image, rating).
- **Advanced Search & Filter:** Users can search recipes by keywords, ingredients, cooking time, and tags (e.g., "vegetarian", "gluten-free").
- **Infinite Scroll:** Implement infinite scrolling for seamless browsing.

### 6. User Management
- **Admin Controls:** Admins can block/unblock users, delete accounts, and manage recipes and admin accounts.

## User Interface Design

### Required Pages:
- **Login/Registration Page:** Secure user registration and login forms with validation, password recovery, and reset features.
- **User Dashboard:** Displays user-submitted recipes, follower/following counts, and profile management options.
- **Admin Dashboard:** Admins can manage recipes and users, including blocking/unblocking users and managing admin accounts.
- **Recipe Feed:** Lists all recipes with filtering and searching options, including infinite scroll.
- **Recipe Details Page:** Displays detailed recipes with instructions, ingredient checklist, timer, comments, ratings, and images.
- **Profile Page:** Displays user profiles, including their recipes, followers, and following.
- **About Us Page:** Provides information about the platform, its mission, and the team.
- **Contact Us Page:** A contact form for inquiries and support.

### Design Guidelines:
- **Color Scheme:** Warm, inviting colors reflecting the culinary theme.
- **Navigation:** User-friendly navigation for easy access to recipes, profiles, and the dashboard.
- **Mobile-Friendly:** Ensure responsive design across mobile devices and tablets.

## Bonus Requirements

### Micro Animations:
- **Smooth Transitions:** Add subtle animations during page transitions.
- **Hover Effects:** Include hover animations for buttons, recipe cards, and interactive elements.
- **Loading Animations:** Display loading animations while pages or components are loading.

### Payment Integration:
- **Subscription System:** Integrate Aamarpay/Stripe for premium content subscription payments.
- **Premium User Subscription:** Premium users get access to exclusive content, advanced filters, and an ad-free experience.

### Upvote & Downvote System:
- **Content Ranking:** Users can upvote or downvote posts to rank content based on community preferences.
- **Sorting by Popularity:** Add sorting options to prioritize highly upvoted content.

## Optional Requirements

### Social Media Integration:
- **Content Sharing:** Allow users to share recipes on social media platforms to expand the community.

## Additional Notes
- **Version Control:** Use Git for version control.
- **Error Handling & Validation:** Implement proper error handling and validation for security and user experience.
- **Comprehensive Documentation:** Ensure setup and deployment instructions are clearly documented.