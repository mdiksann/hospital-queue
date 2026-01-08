<?php

namespace App\Http\Controllers;

use App\Models\Queue;
use App\Models\Polyclinic;
use App\Events\QueueUpdated;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminQueueController extends Controller
{
    public function index()
    {
        $polyclinics = Polyclinic::with(['queues' => function ($query) {
            $query->whereDate('queue_date', today())
                ->orderBy('queue_number');
        }])->where('is_active', true)->get();

        return Inertia::render('Admin/Dashboard', [
            'polyclinics' => $polyclinics
        ]);
    }

    public function call(Queue $queue)
    {
        $queue->update([
            'status' => 'called',
            'called_at' => now()
        ]);

        event(new QueueUpdated($queue->load('polyclinic')->toArray()));

        return back()->with('success', 'Pasien berhasil dipanggil');
    }

    public function skip(Queue $queue)
    {
        $queue->update([
            'status' => 'skipped'
        ]);

        event(new QueueUpdated($queue->load('polyclinic')->toArray()));

        return back()->with('success', 'Antrian berhasil dilewati');
    }

    public function done(Queue $queue)
    {
        $queue->update([
            'status' => 'done',
            'finished_at' => now()
        ]);

        event(new QueueUpdated($queue->load('polyclinic')->toArray()));

        return back()->with('success', 'Antrian selesai');
    }

    public function reset(Queue $queue)
    {
        $queue->update([
            'status' => 'waiting',
            'called_at' => null,
            'finished_at' => null
        ]);

        event(new QueueUpdated($queue->load('polyclinic')->toArray()));

        return back()->with('success', 'Antrian berhasil direset');
    }
}
