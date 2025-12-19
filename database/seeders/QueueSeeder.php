<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QueueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $today = now()->toDateString();

        // Queue untuk Poli Umum
        /* DB::table('queues')->insert([
            [
                'queue_number' => 1,
                'patient_name' => 'Budi Santoso',
                'polyclinic_id' => 1,
                'status' => 'done',
                'queue_date' => $today,
                'called_at' => now()->subHours(2),
                'finished_at' => now()->subHours(1)->subMinutes(45),
                'created_at' => now()->subHours(3),
                'updated_at' => now()->subHours(1)->subMinutes(45),
            ],
            [
                'queue_number' => 2,
                'patient_name' => 'Siti Nurhaliza',
                'polyclinic_id' => 1,
                'status' => 'called',
                'queue_date' => $today,
                'called_at' => now()->subMinutes(15),
                'finished_at' => null,
                'created_at' => now()->subHours(2),
                'updated_at' => now()->subMinutes(15),
            ],
            [
                'queue_number' => 3,
                'patient_name' => 'Ahmad Wijaya',
                'polyclinic_id' => 1,
                'status' => 'waiting',
                'queue_date' => $today,
                'called_at' => null,
                'finished_at' => null,
                'created_at' => now()->subHours(1),
                'updated_at' => now()->subHours(1),
            ],
            [
                'queue_number' => 4,
                'patient_name' => 'Dewi Lestari',
                'polyclinic_id' => 1,
                'status' => 'waiting',
                'queue_date' => $today,
                'called_at' => null,
                'finished_at' => null,
                'created_at' => now()->subMinutes(30),
                'updated_at' => now()->subMinutes(30),
            ],
        ]); */

        // Queue untuk Poli Gigi
        /* DB::table('queues')->insert([
            [
                'queue_number' => 1,
                'patient_name' => 'Rudi Hartono',
                'polyclinic_id' => 2,
                'status' => 'done',
                'queue_date' => $today,
                'called_at' => now()->subHours(3),
                'finished_at' => now()->subHours(2)->subMinutes(30),
                'created_at' => now()->subHours(4),
                'updated_at' => now()->subHours(2)->subMinutes(30),
            ],
            [
                'queue_number' => 2,
                'patient_name' => 'Linda Kusuma',
                'polyclinic_id' => 2,
                'status' => 'waiting',
                'queue_date' => $today,
                'called_at' => null,
                'finished_at' => null,
                'created_at' => now()->subHours(2),
                'updated_at' => now()->subHours(2),
            ],
            [
                'queue_number' => 3,
                'patient_name' => 'Hendra Gunawan',
                'polyclinic_id' => 2,
                'status' => 'waiting',
                'queue_date' => $today,
                'called_at' => null,
                'finished_at' => null,
                'created_at' => now()->subHour(),
                'updated_at' => now()->subHour(),
            ],
        ]); */

        // Queue untuk Poli Anak
        /* DB::table('queues')->insert([
            [
                'queue_number' => 1,
                'patient_name' => 'Andi Pratama',
                'polyclinic_id' => 4,
                'status' => 'skipped',
                'queue_date' => $today,
                'called_at' => now()->subHours(2),
                'finished_at' => null,
                'created_at' => now()->subHours(3),
                'updated_at' => now()->subHours(1)->subMinutes(50),
            ],
            [
                'queue_number' => 2,
                'patient_name' => 'Maya Sari',
                'polyclinic_id' => 4,
                'status' => 'waiting',
                'queue_date' => $today,
                'called_at' => null,
                'finished_at' => null,
                'created_at' => now()->subHours(2),
                'updated_at' => now()->subHours(2),
            ],
        ]); */
    }
}
