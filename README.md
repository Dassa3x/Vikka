#VIKKA
Wikka – Team software development project


**Smart Reuse, Resale & Rental Marketplace**

Wikka is a secure, user-friendly, web-based circular marketplace that allows users to **sell, rent, exchange, and donate** underutilized items.

The platform improves affordable access to useful products while encouraging reuse, reducing unnecessary purchases, and supporting a more sustainable circular economy.

## About the Project

Many people own useful products that remain unused for long periods, while others may need those products temporarily or may not be able to afford to purchase them new.

Most existing online marketplaces mainly support buying and selling. They do not provide structured options for renting, exchanging, and donating items through one platform.

Wikka addresses this problem by providing a four-in-one marketplace where users can:

* Sell items
* Rent items
* Exchange items
* Donate items

The platform is particularly useful for university students seeking affordable access to items such as books, electronics, formal wear, cameras, and project equipment.

## Aim of the Project

The aim of Wikka is to design and develop a secure, user-friendly circular marketplace that:

* Enables users to sell, rent, exchange, and donate underutilized items.
* Improves affordable access to products.
* Encourages product reuse and sharing.
* Reduces unnecessary purchases and waste.
* Promotes circular economy practices.

## Project Objectives

The main objectives of Wikka are to:

* Provide secure user registration and login.
* Allow users to create and manage profiles.
* Allow users to create item listings with images, descriptions, prices, and condition details.
* Support selling, renting, exchanging, and donating items.
* Provide smart search and filtering features.
* Support location-based item discovery.
* Manage rental availability and booking dates.
* Allow item owners to define rental amounts.
* Provide communication between users through chat.
* Allow users to add items to a wishlist.
* Provide ratings and reviews.
* Allow users to report suspicious listings.
* Provide an administrator dashboard for managing users, listings, and reports.

## Key Features

### User Authentication

* User registration
* Secure login and logout
* User profile management
* Role-based access for users and administrators

### Item Listings

* Create, view, update, and remove listings
* Upload item photographs
* Add item descriptions
* Specify item condition
* Select a transaction type
* Add prices or rental rates
* Add location information

### Transaction Types

Wikka supports four transaction methods:

1. **Sell** – Users can advertise items for sale.
2. **Rent** – Users can offer items for temporary use.
3. **Exchange** – Users can exchange items with other users.
4. **Donate** – Users can give items to others without requiring payment.

### Search and Discovery

* Search for items using keywords
* Filter items by category
* Filter items by transaction type
* Filter items by condition
* Filter items by price
* Discover items based on location

### Rental and Booking Management

* Rental availability calendar
* Selection of booking dates
* Rental amount calculation
* Booking request management
* Prevention of conflicting rental bookings

### Communication

* Communication between item owners and interested users
* Enquiries about listed items
* Discussion of rental, exchange, or collection details

### Wishlist

* Save interesting items
* View saved items later
* Remove items from the wishlist

### Ratings and Reviews

* Rate users after completing a transaction
* Write reviews
* View previous user ratings
* Improve trust between marketplace users

### Reporting and Administration

* Report suspicious or inappropriate listings
* Manage registered users
* Manage item listings
* Review user reports
* Remove inappropriate content
* Monitor marketplace activity

## Target Users

Wikka is designed for:

* Item owners
* Sellers
* Buyers
* Renters
* University students
* People seeking affordable products
* People interested in exchanging or donating items
* System administrators

## Uniqueness of Wikka

Wikka is different from a traditional online marketplace because it combines four transaction methods in one platform:

**SELL + RENT + EXCHANGE + DONATE**

Its unique characteristics include:

* A four-in-one circular marketplace
* A combination of peer-to-peer selling and short-term rentals
* Rental availability and booking management
* Ratings and reviews for building trust
* Reporting facilities for suspicious listings
* Affordable product access for university students
* Support for sustainable reuse and sharing
* An alternative to the traditional “buy, use, and discard” model

## System Architecture

Wikka follows a three-layer web application architecture.

### Presentation Layer

**React.js**

Responsible for:

* Responsive user interfaces
* User interactions
* Displaying marketplace information
* Communicating with backend APIs

### Business Logic Layer

**Node.js and Express.js**

Responsible for:

* REST API operations
* Authentication and authorization
* Marketplace rules
* Item listing management
* Rental and booking operations
* Search and filtering
* User communication
* Ratings, reviews, and reports

### Data Layer

**MySQL**

Responsible for storing:

* User accounts and profiles
* Item listings
* Item categories
* Rental bookings
* Wishlist information
* Messages
* Ratings and reviews
* User reports

## Technology Stack

| Area                    | Technology             |
| ----------------------- | ---------------------- |
| Frontend                | React.js               |
| Backend                 | Node.js and Express.js |
| Database                | MySQL                  |
| UI/UX Design            | Figma                  |
| Version Control         | Git and GitHub         |
| Development Methodology | Agile Scrum            |

## Non-Functional Requirements

### Security

* Secure authentication
* Password protection
* Role-based authorization
* Input validation
* Protection against unauthorized access

### Usability

* Simple and user-friendly interfaces
* Responsive design
* Easy navigation
* Clear listing and booking processes

### Performance

* Efficient item searching
* Fast filtering
* Reliable profile and listing retrieval
* Efficient booking management

### Privacy

* Protection of personal information
* Secure management of user data
* Controlled access to administrative features

### Maintainability

* Modular frontend and backend structure
* Clear separation between application layers
* Version control through Git and GitHub
* Documented source code

## Research Questions

The project investigates the following main question:

> How can a web platform encourage the reuse, rental, exchange, and resale of underutilized products?

Supporting questions include:

* What item and owner information is required to establish trust in peer-to-peer transactions?
* How can rental availability and bookings be managed effectively?
* How can search, filtering, and location features help users find affordable products?
* How can ratings, reviews, and reporting improve trust within the platform?

## Data-Gathering Methods

The following methods will be used to understand user requirements and validate the project:

* **Online questionnaires** – Collect the needs and preferences of university students and potential users.
* **Semi-structured interviews** – Understand the practical needs of students, item owners, and marketplace users.
* **Observation** – Examine current buying, renting, lending, and reselling practices.
* **Secondary research** – Review credible research relating to the circular economy and peer-to-peer sharing.
* **Competitor analysis** – Identify limitations and opportunities in existing marketplace and rental platforms.

## Project Scope

The initial Wikka prototype will include:

* User authentication
* Profile management
* Item listing management
* Smart search and filters
* Location-based discovery
* Rental and booking management
* Chat
* Wishlist
* Ratings and reviews
* Suspicious-listing reports
* Administrator dashboard

The following features are considered future enhancements:

* Online payment gateway
* Complete delivery and logistics management
* Mobile application
* Advanced recommendation system
* More sophisticated fraud detection

## Work Breakdown Structure

| WBS ID | Work Package                    | Main Output                                               |
| ------ | ------------------------------- | --------------------------------------------------------- |
| 1.0    | Project Initiation and Planning | Problem, objectives, stakeholders, and scope              |
| 2.0    | Requirements Analysis           | Functional and non-functional requirements                |
| 3.0    | System Design                   | UI/UX, architecture, UML diagrams, and database design    |
| 4.0    | Development                     | Authentication, listings, search, rental, and chat        |
| 5.0    | Testing and Quality Assurance   | Unit, integration, system, and usability testing          |
| 6.0    | Deployment and Final Delivery   | Prototype, documentation, presentation, and demonstration |

## Development Methodology

Wikka will be developed using the **Agile Scrum methodology**.

The project will be completed incrementally through:

* Requirement gathering
* UI/UX design
* System architecture and database design
* Core feature development
* Integration
* Testing and bug fixing
* Deployment
* Final demonstration

Git and GitHub will be used for version control and team collaboration. Team members will work on separate branches and submit their changes using pull requests.

## Installation and Setup

The project is currently under development. Complete installation instructions will be added after the initial application structure and required dependencies are finalized.

The repository can be cloned using:

```bash
git clone https://github.com/Dassa3x/Wikka.git
```

Move into the project directory:

```bash
cd Wikka
```

The finalized frontend, backend, environment configuration, database setup, and application startup instructions will be documented as development progresses.

## Testing

The project will undergo:

* Unit testing
* Integration testing
* System testing
* Usability testing
* Authentication and security testing
* User acceptance testing
* Bug fixing and regression testing

## Expected Outcome

The expected outcome is a working web-based prototype that demonstrates:

* Affordable access to useful products
* Effective item reuse and sharing
* Peer-to-peer selling, renting, exchanging, and donating
* Secure marketplace interactions
* Rental availability and booking management
* Improved trust through ratings, reviews, and reporting

## Project Status

🚧 **Wikka is currently under development.**

## Team Members

* Member 01 – Name and registration number
* Member 02 – Name and registration number
* Member 03 – Name and registration number
* Member 04 – Name and registration number
* Member 05 – Name and registration number
* Member 06 – Name and registration number

## Contribution Workflow

Each team member should create a separate branch for their assigned feature.

Example:

```bash
git switch -c feature/user-authentication
```

After completing the work:

```bash
git add .
git commit -m "Implement user authentication"
git push -u origin feature/user-authentication
```

The team member should then create a pull request on GitHub to merge the feature branch into the `main` branch.

Suggested branch names include:

* `feature/user-authentication`
* `feature/item-listings`
* `feature/search-filters`
* `feature/rental-booking`
* `feature/chat`
* `feature/admin-dashboard`
* `fix/issue-name`
* `docs/documentation-update`

## Academic Information

* **Module:** SE2204 – Software Project Management
* **Degree:** BSc (Hons) in Software Engineering
* **Project Type:** Software Project Proposal
* **Academic Year:** 2026

## License

This project is being developed for educational and academic purposes.
# Wikka

**Smart Reuse, Resale & Rental Marketplace**

Wikka is a secure, user-friendly, web-based circular marketplace that allows users to **sell, rent, exchange, and donate** underutilized items.

The platform improves affordable access to useful products while encouraging reuse, reducing unnecessary purchases, and supporting a more sustainable circular economy.

## About the Project

Many people own useful products that remain unused for long periods, while others may need those products temporarily or may not be able to afford to purchase them new.

Most existing online marketplaces mainly support buying and selling. They do not provide structured options for renting, exchanging, and donating items through one platform.

Wikka addresses this problem by providing a four-in-one marketplace where users can:

* Sell items
* Rent items
* Exchange items
* Donate items

The platform is particularly useful for university students seeking affordable access to items such as books, electronics, formal wear, cameras, and project equipment.

## Aim of the Project

The aim of Wikka is to design and develop a secure, user-friendly circular marketplace that:

* Enables users to sell, rent, exchange, and donate underutilized items.
* Improves affordable access to products.
* Encourages product reuse and sharing.
* Reduces unnecessary purchases and waste.
* Promotes circular economy practices.

## Project Objectives

The main objectives of Wikka are to:

* Provide secure user registration and login.
* Allow users to create and manage profiles.
* Allow users to create item listings with images, descriptions, prices, and condition details.
* Support selling, renting, exchanging, and donating items.
* Provide smart search and filtering features.
* Support location-based item discovery.
* Manage rental availability and booking dates.
* Allow item owners to define rental amounts.
* Provide communication between users through chat.
* Allow users to add items to a wishlist.
* Provide ratings and reviews.
* Allow users to report suspicious listings.
* Provide an administrator dashboard for managing users, listings, and reports.

## Key Features

### User Authentication

* User registration
* Secure login and logout
* User profile management
* Role-based access for users and administrators

### Item Listings

* Create, view, update, and remove listings
* Upload item photographs
* Add item descriptions
* Specify item condition
* Select a transaction type
* Add prices or rental rates
* Add location information

### Transaction Types

Wikka supports four transaction methods:

1. **Sell** – Users can advertise items for sale.
2. **Rent** – Users can offer items for temporary use.
3. **Exchange** – Users can exchange items with other users.
4. **Donate** – Users can give items to others without requiring payment.

### Search and Discovery

* Search for items using keywords
* Filter items by category
* Filter items by transaction type
* Filter items by condition
* Filter items by price
* Discover items based on location

### Rental and Booking Management

* Rental availability calendar
* Selection of booking dates
* Rental amount calculation
* Booking request management
* Prevention of conflicting rental bookings

### Communication

* Communication between item owners and interested users
* Enquiries about listed items
* Discussion of rental, exchange, or collection details

### Wishlist

* Save interesting items
* View saved items later
* Remove items from the wishlist

### Ratings and Reviews

* Rate users after completing a transaction
* Write reviews
* View previous user ratings
* Improve trust between marketplace users

### Reporting and Administration

* Report suspicious or inappropriate listings
* Manage registered users
* Manage item listings
* Review user reports
* Remove inappropriate content
* Monitor marketplace activity

## Target Users

Wikka is designed for:

* Item owners
* Sellers
* Buyers
* Renters
* University students
* People seeking affordable products
* People interested in exchanging or donating items
* System administrators

## Uniqueness of Wikka

Wikka is different from a traditional online marketplace because it combines four transaction methods in one platform:

**SELL + RENT + EXCHANGE + DONATE**

Its unique characteristics include:

* A four-in-one circular marketplace
* A combination of peer-to-peer selling and short-term rentals
* Rental availability and booking management
* Ratings and reviews for building trust
* Reporting facilities for suspicious listings
* Affordable product access for university students
* Support for sustainable reuse and sharing
* An alternative to the traditional “buy, use, and discard” model

## System Architecture

Wikka follows a three-layer web application architecture.

### Presentation Layer

**React.js**

Responsible for:

* Responsive user interfaces
* User interactions
* Displaying marketplace information
* Communicating with backend APIs

### Business Logic Layer

**Node.js and Express.js**

Responsible for:

* REST API operations
* Authentication and authorization
* Marketplace rules
* Item listing management
* Rental and booking operations
* Search and filtering
* User communication
* Ratings, reviews, and reports

### Data Layer

**MySQL**

Responsible for storing:

* User accounts and profiles
* Item listings
* Item categories
* Rental bookings
* Wishlist information
* Messages
* Ratings and reviews
* User reports

## Technology Stack

| Area                    | Technology             |
| ----------------------- | ---------------------- |
| Frontend                | React.js               |
| Backend                 | Node.js and Express.js |
| Database                | MySQL                  |
| UI/UX Design            | Figma                  |
| Version Control         | Git and GitHub         |
| Development Methodology | Agile Scrum            |

## Non-Functional Requirements

### Security

* Secure authentication
* Password protection
* Role-based authorization
* Input validation
* Protection against unauthorized access

### Usability

* Simple and user-friendly interfaces
* Responsive design
* Easy navigation
* Clear listing and booking processes

### Performance

* Efficient item searching
* Fast filtering
* Reliable profile and listing retrieval
* Efficient booking management

### Privacy

* Protection of personal information
* Secure management of user data
* Controlled access to administrative features

### Maintainability

* Modular frontend and backend structure
* Clear separation between application layers
* Version control through Git and GitHub
* Documented source code

## Research Questions

The project investigates the following main question:

> How can a web platform encourage the reuse, rental, exchange, and resale of underutilized products?

Supporting questions include:

* What item and owner information is required to establish trust in peer-to-peer transactions?
* How can rental availability and bookings be managed effectively?
* How can search, filtering, and location features help users find affordable products?
* How can ratings, reviews, and reporting improve trust within the platform?

## Data-Gathering Methods

The following methods will be used to understand user requirements and validate the project:

* **Online questionnaires** – Collect the needs and preferences of university students and potential users.
* **Semi-structured interviews** – Understand the practical needs of students, item owners, and marketplace users.
* **Observation** – Examine current buying, renting, lending, and reselling practices.
* **Secondary research** – Review credible research relating to the circular economy and peer-to-peer sharing.
* **Competitor analysis** – Identify limitations and opportunities in existing marketplace and rental platforms.

## Project Scope

The initial Wikka prototype will include:

* User authentication
* Profile management
* Item listing management
* Smart search and filters
* Location-based discovery
* Rental and booking management
* Chat
* Wishlist
* Ratings and reviews
* Suspicious-listing reports
* Administrator dashboard

The following features are considered future enhancements:

* Online payment gateway
* Complete delivery and logistics management
* Mobile application
* Advanced recommendation system
* More sophisticated fraud detection

## Work Breakdown Structure

| WBS ID | Work Package                    | Main Output                                               |
| ------ | ------------------------------- | --------------------------------------------------------- |
| 1.0    | Project Initiation and Planning | Problem, objectives, stakeholders, and scope              |
| 2.0    | Requirements Analysis           | Functional and non-functional requirements                |
| 3.0    | System Design                   | UI/UX, architecture, UML diagrams, and database design    |
| 4.0    | Development                     | Authentication, listings, search, rental, and chat        |
| 5.0    | Testing and Quality Assurance   | Unit, integration, system, and usability testing          |
| 6.0    | Deployment and Final Delivery   | Prototype, documentation, presentation, and demonstration |

## Development Methodology

Wikka will be developed using the **Agile Scrum methodology**.

The project will be completed incrementally through:

* Requirement gathering
* UI/UX design
* System architecture and database design
* Core feature development
* Integration
* Testing and bug fixing
* Deployment
* Final demonstration

Git and GitHub will be used for version control and team collaboration. Team members will work on separate branches and submit their changes using pull requests.

## Installation and Setup

The project is currently under development. Complete installation instructions will be added after the initial application structure and required dependencies are finalized.

The repository can be cloned using:

```bash
git clone https://github.com/Dassa3x/Wikka.git
```

Move into the project directory:

```bash
cd Wikka
```

The finalized frontend, backend, environment configuration, database setup, and application startup instructions will be documented as development progresses.

## Testing

The project will undergo:

* Unit testing
* Integration testing
* System testing
* Usability testing
* Authentication and security testing
* User acceptance testing
* Bug fixing and regression testing

## Expected Outcome

The expected outcome is a working web-based prototype that demonstrates:

* Affordable access to useful products
* Effective item reuse and sharing
* Peer-to-peer selling, renting, exchanging, and donating
* Secure marketplace interactions
* Rental availability and booking management
* Improved trust through ratings, reviews, and reporting

## Project Status

🚧 **Wikka is currently under development.**

## Team Members

* Member 01 – Dulakmi Hemini- IFLS/0034
* Member 02 – Dasun Thenura -IFLS/0010
* Member 03 – Hiruni Malsha -IFLS/0043
* Member 04 – Andun Induwara⁩- UGC/001
* Member 05 – Irushi Theshala -IFLS/004
* Member 06 – Minura Kalhara IFLS/0027

## Contribution Workflow

Each team member should create a separate branch for their assigned feature.

Example:

```bash
git switch -c feature/user-authentication
```

After completing the work:

```bash
git add .
git commit -m "Implement user authentication"
git push -u origin feature/user-authentication
```

The team member should then create a pull request on GitHub to merge the feature branch into the `main` branch.

Suggested branch names include:

* `feature/user-authentication`
* `feature/item-listings`
* `feature/search-filters`
* `feature/rental-booking`
* `feature/chat`
* `feature/admin-dashboard`
* `fix/issue-name`
* `docs/documentation-update`

## Academic Information

* **Module:** SE2204 – Software Project Management
* **Degree:** BSc (Hons) in Software Engineering
* **Project Type:** Software Project Proposal
* **Academic Year:** 2026

## License

This project is being developed for educational and academic purposes.
