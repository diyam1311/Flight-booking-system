# Mobiyantra

React + Vite + Tailwind CSS (v3). Pages: Home, Login, Signup, Searching, Search Results, Traveller Details, Payment, E-ticket.

## Run

    npm install --omit=optional
    npm run dev          # http://localhost:5173
    npm run build        # production build -> dist/

Demo login: `demo@mobiyantra.com` / `Demo@123` (or create an account on /signup).
Trending Gateways photos live in `public/images/gateways/` (goa.jpg, amritsar.jpg, srinagar.jpg, devprayag.jpg, jaipur.jpg, majuli.jpg).

## Folder structure

    src/
      main.jsx                    app entry (only renders <App />)
      app/                        the app "shell"
        App.jsx                     Router + Auth provider
        router/                     AppRoutes.jsx (all pages), ProtectedRoute.jsx, GuestRoute.jsx
      config/                     settings used everywhere
        paths.js                    page URLs  (PATHS.home, PATHS.login ...)
        site.js                     navbar links + footer columns
      layouts/                    page frames
        MainLayout.jsx              Navbar + page + Footer
        BookingLayout.jsx           booking header (step bar) + page + Footer
        PaymentLayout.jsx           payment header (steps + timer) + page + Footer
        TicketLayout.jsx            e-ticket header + page + Footer
      components/layout/          Navbar, Footer
      hooks/                      hooks used by many features (useClickOutside)
      utils/                      helpers used by many features
        dates.js                    date text helpers + calendar grid
        validators.js               isEmail, isMobile ...
      assets/                     logos + images used by several features
      styles/index.css            Tailwind + base styles
      features/                   one folder per part of the product
        auth/                       login, signup, who-is-logged-in
        home/                       homepage sections
        search/                     the flight search form (used by Home and Results)
        flights/                    loading page, results page, filters
        booking/                    traveller details (step 2 of booking)
        payment/                    payment page + processing popup (step 3)
        ticket/                     booking-confirmed popup, e-ticket page, e-ticket PDF (jsPDF)

Every feature has the same shape (create only the folders you need):

    features/<name>/
      pages/         one file per page (what the router opens)
      components/    pieces used only by this feature
      hooks/         useXxx.js  (state + rules of a form / list)
      services/      talks to the backend (today: mock data -> replace with real API calls)
      utils/         small pure functions (validation, formatting, filtering)
      data/          fixed choices and demo data
      context/       React context (auth only so far)
      assets/        images used only by this feature
      index.js       the feature's public exports

## Rules of thumb

- **New page?** Create it in `features/<name>/pages`, export it in that feature's `index.js`, add a path in `config/paths.js`, add a `<Route>` in `app/router/AppRoutes.jsx`.
- **New feature (e.g. payment)?** Copy the shape above.
- **Only import another feature through its `index.js`** (`@/features/auth`), never from its inner files.
- **Used by 2+ features?** Move it to `src/components`, `src/hooks`, `src/utils`, `src/assets` or `src/config`.
- **Colours / font:** `tailwind.config.js`. **Text & demo data:** `features/*/data/`, `config/site.js`.
- `@/` means `src/` (set in `vite.config.js` + `jsconfig.json`).
- **Real backend later:** replace the functions in `features/auth/services/authService.js`, `features/flights/services/flightService.js` and `features/booking/services/bookingService.js` with `fetch()` calls. Nothing else needs to change.
