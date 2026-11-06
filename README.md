# WinaFakhar

The project uses React for the interface and Laravel for the API and database.

## Start locally

1. Start MySQL and create the database configured in `backend/.env` (`pottery_db` by default).
2. In a terminal:

   ```powershell
   cd backend
   php artisan migrate --force
   php artisan db:seed --force
   php artisan serve
   ```

3. In another terminal:

   ```powershell
   cd frontend
   npm start
   ```

4. Open `http://localhost:3000` for the React storefront. Laravel serves the API at `http://127.0.0.1:8000/api`.
5. Open `http://127.0.0.1:8000/admin/login` for the Laravel admin pages.

The seed creates sample products and a local admin account:

- Email: `admin@test.com`
- Password: `admin123`

Change the seeded password before using the project outside local development.

The admin login and product management pages are rendered by Laravel Blade. Products, registrations, orders, workshop reservations, and contact messages are handled by Laravel. The React storefront keeps the cart in the browser until checkout; Laravel calculates the order total from product prices stored in the database. Card payment is currently recorded as a selected method; no payment provider is connected.
