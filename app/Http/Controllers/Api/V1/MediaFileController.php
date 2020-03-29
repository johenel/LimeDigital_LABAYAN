<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\MediaFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Optix\Media\MediaUploader;
use Optix\Media\Models\Media;

class MediaFileController extends Controller
{
    public function list(Request $request)
    {
        $response = [];

        $mediaFiles = MediaFile::orderBy('id', 'desc')->get();

        foreach($mediaFiles as $mf):
            $mf->media = $mf->getFirstMediaUrl();
        endforeach;

        $response['success'] = true;
        $response['data'] = $mediaFiles;

        return $response;
    }

    public function create(Request $request)
    {
        $response = [];

        $validator = Validator::make($request->all(), [
            'mediaFile' => 'required',
        ]);

        if($validator->fails()) {
            $response['success'] = false;
            $response['errors'] = $validator->getMessageBag();
        } else {
            $media = MediaUploader::fromFile($request->file('mediaFile'))->upload();

            $mediaFile = new MediaFile();
            $mediaFile->name = $request->name;
            $mediaFile->save();

            $mediaFile->attachMedia($media);

            $response['success'] = true;
            $response['data'] = $mediaFile;
        }

        return $response;

    }

    public function update(Request $request, $id)
    {
        $response = [];

        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        $mediaFile = MediaFile::find($id);

        if($mediaFile->name == $request->name):
            $response['success'] = true;
            $response['data'] = $mediaFile;
        elseif($validator->fails()):
            $response['success'] = false;
            $response['errors'] = $validator->getMessageBag();
        else:
            $mediaFile->name = $request->name;
            $mediaFile->save();

            $response['success'] = true;
            $response['data'] = $mediaFile;
        endif;

        return $response;
    }

    public function delete($id)
    {
        $mediaFile = MediaFile::find($id);
        $deleteItem = $mediaFile->id;
        DB::transaction(function() use ($mediaFile) {
            $media = $mediaFile->getFirstMedia();
            $mediaFile->detachMedia($media);
            Media::find($media->id)->delete();
            $mediaFile->delete();
        });

        $response = [];
        $response['success'] = true;
        $response['data'] = $deleteItem;

        return $response;
    }
}
