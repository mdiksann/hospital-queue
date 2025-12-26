<?php

namespace App\Events;

use App\Models\Queue;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class QueueCreated implements ShouldBroadcast
{
    public $queue;

    public function __construct(Queue $queue)
    {
        $this->queue = $queue;
    }

    public function broadcastOn()
    {
        return new Channel(
            'queue.polyclinic.' . $this->queue->polyclinic_id
        );
    }
}
