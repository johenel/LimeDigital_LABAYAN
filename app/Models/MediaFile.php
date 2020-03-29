<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Optix\Media\HasMedia;

class MediaFile extends Model
{
    use HasMedia;

    protected $table = 'media_files';
}
