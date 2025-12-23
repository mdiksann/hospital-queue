<?php

namespace App\Http\Controllers;

use App\Models\Queue;
use App\Models\Polyclinic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class QueueController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'patient_name' => 'required|string|max:100',
            'polyclinic_id' => 'required|exists:polyclinics,id'
        ]);

        $polyclinic = Polyclinic::where('id', $request->polyclinic_id)
            ->where('is_active', true)
            ->first();

        if (!$polyclinic) {
            return response()->json([
                'success' => false,
                'message' => 'Polyclinic not available'
            ], 400);
        }

        $today = Carbon::today();

        $queue = DB::transaction(function () use ($request, $today) {
            $lastQueue = Queue::where('polyclinic_id', $request->polyclinic_id)
                ->where('queue_date', $today)
                ->lockForUpdate()
                ->orderBy('queue_number', 'desc')
                ->first();

            $lastNumber = $lastQueue ? $lastQueue->queue_number : 0;

            return Queue::create([
                'queue_number' => $lastNumber + 1,
                'patient_name' => $request->patient_name,
                'polyclinic_id' => $request->polyclinic_id,
                'queue_date' => $today,
                'status' => 'waiting'
            ]);
        });

        return response()->json([
            'success' => true,
            'message' => 'Queue created',
            'data' => $queue
        ]);
    }

    public function call($id)
    {
        $queue = Queue::where('id', $id)
            ->where('status', 'waiting')
            ->firstOrFail();

        $queue->update([
            'status' => 'called',
            'called_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Queue called',
            'data' => $queue
        ]);
    }

    public function done($id)
    {
        $queue = Queue::where('id', $id)
            ->where('status', 'called')
            ->firstOrFail();

        $queue->update([
            'status' => 'done',
            'finished_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Queue finished',
            'data' => $queue
        ]);
    }

    public function skip($id)
    {
        $queue = Queue::where('id', $id)
            ->whereIn('status', ['waiting', 'called'])
            ->firstOrFail();

        $queue->update([
            'status' => 'skipped',
            'finished_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Queue skipped',
            'data' => $queue
        ]);
    }

    public function index(Request $request)
    {
        $request->validate([
            'polyclinic_id' => 'required|exists:polyclinics,id'
        ]);

        $queues = Queue::where('polyclinic_id', $request->polyclinic_id)
            ->where('queue_date', today())
            ->orderBy('queue_number')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $queues
        ]);
    }
}