# Hospital Queue Management System

A real-time hospital queue management system built with Laravel, React (Inertia.js), and Laravel Reverb for WebSocket broadcasting.

## About This Project

This application is designed to manage and display patient queues in a hospital setting. It provides a modern, real-time interface for both administrators to manage queues and display screens to show current queue information across multiple polyclinics.

## Features

-   **Real-time Queue Updates** - Queue status updates are broadcast instantly using Laravel Reverb
-   **Multi-Polyclinic Support** - Manage queues for multiple polyclinics simultaneously
-   **Admin Authentication** - Secure admin panel with Sanctum token authentication
-   **Queue Display Screen** - Modern TV display showing all active queues
-   **Queue Management** - Call, complete, or skip queue entries
-   **Automatic Queue Numbering** - Sequential queue numbers per polyclinic per day
-   **Queue Status Tracking** - Track queue states: waiting, called, done, skipped

## Tech Stack

-   **Backend**: Laravel 11
-   **Frontend**: React with Inertia.js
-   **Real-time**: Laravel Reverb (WebSocket)
-   **Authentication**: Laravel Sanctum
-   **Database**: MySQL
-   **Build Tool**: Vite

## Installation

### Prerequisites

-   PHP 8.2 or higher
-   Composer
-   Node.js and npm
-   MySQL

### Steps

1. Clone the repository

```bash
git clone <repository-url>
cd hospital-queue
```

2. Install PHP dependencies

```bash
composer install
```

3. Install JavaScript dependencies

```bash
npm install
```

4. Configure environment

```bash
cp .env.example .env
php artisan key:generate
```

5. Configure database in `.env`

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hospital_queue
DB_USERNAME=root
DB_PASSWORD=
```

6. Configure broadcasting

```env
BROADCAST_DRIVER=reverb
```

7. Run migrations and seeders

```bash
php artisan migrate --seed
```

8. Start the application

```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Vite dev server
npm run dev

# Terminal 3: Reverb WebSocket server
php artisan reverb:start
```

## Usage

### Admin Panel

Access the admin panel to manage queues and polyclinics.

### Queue Display Screen

Navigate to `/queue-screen` to view the real-time queue display suitable for TV monitors.

### Testing Real-time Updates

You can test the real-time broadcasting using Laravel Tinker:

```bash
php artisan tinker
```

Then broadcast a queue update:

```php
event(new \App\Events\QueueUpdated([
    'queue_number' => 'A001',
    'patient_name' => 'John Doe',
    'status' => 'called',
    'polyclinic_id' => 1
]));
```

## API Endpoints

-   `POST /api/login` - Admin authentication
-   `GET /api/polyclinics` - List all polyclinics
-   `POST /api/queues` - Create new queue entry
-   `POST /api/queues/{id}/call` - Call a queue
-   `POST /api/queues/{id}/done` - Mark queue as done
-   `POST /api/queues/{id}/skip` - Skip a queue
-   `GET /api/display/queues` - Get queues for display screen

## Database Schema

### Tables

-   `admins` - Admin users
-   `polyclinics` - Polyclinic information
-   `queues` - Queue entries
-   `users` - Patient users (optional)

## Broadcasting Events

-   **QueueUpdated** - Broadcast on channel `hospital-queue` when queue status changes

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
