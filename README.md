# Vikka.lk

**Smart Reuse, Resale & Rental Marketplace for University Students**

Vikka.lk is a secure, easy-to-use **mobile app** where university students can **sell, rent, exchange and donate** things they no longer use. It helps students get affordable access to books, electronics, formal wear, cameras and project equipment, and encourages reuse instead of the "buy, use, throw away" habit.

> 🚧 **Status:** Under development (Academic Year 2026)

---

## About the Project

Many people own useful items that stay unused for a long time. Other people need the same items for a short time, or cannot afford to buy them new. Most marketplaces focus on buying and selling only, and do not support structured rentals.

Vikka.lk brings four things into one app:

| Type | What it means |
|---|---|
| **Sell** | Advertise an item for sale |
| **Rent** | Let others use an item for selected dates |
| **Exchange** | Swap an item with another student |
| **Donate** | Give an item away for free |

## Aim

To design and develop a secure, user-friendly mobile marketplace for university students that improves affordable access to products, builds trust between users, and promotes reuse and the circular economy.

## Objectives

- **Requirements analysis:** collect and document functional and non-functional requirements from students and other stakeholders.
- **System design:** design the architecture, database, API and mobile UI/UX.
- **Marketplace features:** let students list, find and manage items to sell, rent, exchange or donate.
- **Rental management:** availability dates, booking requests and protection against double bookings.
- **Trust and safety:** ratings, reviews, reports and basic admin management.

---

## Scope of the First Release (MVP)

The first release focuses on **one complete journey**:

> Register → Log in → Create a listing → Browse / search → Choose rental dates → Send request → Owner accepts or rejects → Both users see the status

| Priority | Features |
|---|---|
| **Must have** | Registration and login, user roles, profile view/edit, create/edit/deactivate listings (Sell, Rent, Exchange, Donate), listing images, browse and search (keyword, category, type), rental dates and total price, booking request, owner accept/reject, overlap protection, booking status views, item availability status |
| **Should have** | District and price filters, sorting, wishlist, ratings and reviews, report suspicious listings, contact owner (privacy-aware), simple admin report review |
| **Future work** | Real-time chat, maps/GPS, online payments, delivery and logistics, university email verification badge, recommendations, advanced fraud detection |

The full requirement list is kept as the product backlog in `docs/requirements/`.

---

## Technology Stack

| Area | Technology |
|---|---|
| Mobile app | **React Native + Expo** (JavaScript) |
| Backend API | **Node.js + Express.js** |
| Database | **MySQL** |
| UI/UX design | Figma |
| Version control | Git and GitHub |
| API testing | Postman |
| Method | Agile Scrum |

### Architecture

```
Mobile app (React Native + Expo)
        │  HTTP requests (JSON)
        ▼
Backend API (Node.js + Express)  ← login, listings, bookings, rules
        │
        ▼
MySQL database  (users, listings, bookings, reviews, reports)
```

### Planned project structure

```
Vikka/
├── app/        Mobile app (React Native + Expo)
├── backend/    Express API and database code
├── docs/       Requirements, design, diagrams, Figma link
├── .gitignore
└── README.md
```

---

## Getting Started

The project is being set up. Full instructions will be added when the app and backend are ready.

**Tools every member needs**

- Git and VS Code
- Node.js (LTS version, same for everyone)
- MySQL and MySQL Workbench
- Postman
- **Expo Go** app on your phone (Android or iPhone)

**Get the code**

```bash
git clone https://github.com/Dassa3x/Vikka.git
cd Vikka
git checkout dev
```

**Good to know**

- A phone cannot reach `localhost` on your laptop. The app must call your laptop's Wi-Fi IP address (for example `http://192.168.1.5:3000`), and both devices must be on the same network.
- Never commit passwords or keys. Copy `.env.example` to `.env` and fill in your own values.

---

## Team Workflow

We work on **feature branches** and merge through **pull requests (PRs)**.

| Branch | Purpose |
|---|---|
| `main` | Stable, working versions only |
| `dev` | Where finished features are combined |
| `feature/...` | One branch per task, for example `feature/user-authentication` |

**Daily routine**

```bash
git checkout dev
git pull
git checkout -b feature/your-task-name

# work, then save small snapshots
git add .
git commit -m "Add login form"
git push -u origin feature/your-task-name
```

Then open a **pull request into `dev`** and ask a teammate to review it.

**Rules**

- Nobody pushes directly to `main` or `dev`.
- Every pull request is reviewed by at least one other member.
- Keep pull requests small and commit messages clear.
- Pull from `dev` every day.

**Suggested branch names:** `feature/user-authentication`, `feature/user-authorization`, `feature/item-listings`, `feature/search-filters`, `feature/rental-booking`, `feature/reviews-reports`, `fix/issue-name`, `docs/documentation-update`

---

## Key Business Rules

- Only logged-in users can create listings or send rental requests.
- Only the owner (or an admin) can edit or deactivate a listing.
- Users cannot request their own item.
- Sell needs a price. Rent needs a daily rate and available dates. Donate has no price. Exchange needs an exchange note.
- Two bookings overlap when `newStart < existingEnd` **and** `newEnd > existingStart`. The **backend** checks this, not only the app screen.
- Only the owner can accept or reject a request, and acceptance re-checks for overlaps.
- Payments and delivery are outside the first release. Users arrange the handover, preferably in a safe public or on-campus place.

---

## Requirements and Research

We collect requirements using an online student survey, short interviews, observation of current practices (WhatsApp and Facebook groups), secondary research, and a competitor review.

Evidence is stored in `docs/requirements/`.

**Research questions**

1. How can a mobile platform encourage reuse, rental, exchange and resale of underused products?
2. What item and owner information is needed to build trust in peer-to-peer transactions?
3. How can rental availability and booking be managed effectively?
4. How can search, filters and location features help users find affordable products?
5. How can ratings, reviews and reporting improve trust?

**Project links**

- Figma design: _add link here_
- Survey: _add link here_
- Task board (GitHub Projects): _add link here_

---

## Testing

- Unit and integration tests (especially the booking overlap check)
- API testing with Postman
- Authentication and security checks
- Usability testing with students
- Bug fixing and regression testing

---

## Team

| # | Name | Registration No. | Main area |
|---|---|---|---|
| M1 | _add name_ | _add reg. no._ | Authentication |
| M2 | _add name_ | _add reg. no._ | Authorization, profiles, admin and reports |
| M3 | _add name_ | _add reg. no._ | Listings and images |
| M4 | _add name_ | _add reg. no._ | Home, search, filters, wishlist |
| M5 | _add name_ | _add reg. no._ | Rental booking and reviews |

## Academic Information

- **Module:** SE2204 – Software Project Management
- **Degree:** BSc (Hons) in Software Engineering
- **Project type:** Software Project
- **Academic year:** 2026

## License

This project is developed for educational and academic purposes.