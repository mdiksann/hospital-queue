<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class QueueUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public array $queue;

    public function __construct(array $queue)
    {
        $this->queue = $queue;
    }

    public function broadcastOn(): Channel
    {
        return new Channel('queue-screen.' . $this->queue['polyclinic_id']);
    }

    public function broadcastAs(): string
    {
        return 'QueueUpdated';
    }

    public function broadcastWith(): array
    {
        return [
            'queue' => $this->queue,
        ];
    }
}
