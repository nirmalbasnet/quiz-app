import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import {
  ASSETS_DIRECTORY,
  AUDIO_UPLOAD_DESTINATION,
  IMAGE_UPLOAD_DESTINATION,
  VIDEO_UPLOAD_DESTINATION,
} from '../utils/app.constants';
import { v4 as uniqueId } from 'uuid';

@Injectable()
export class FileUploaderService {
  uploadFile(file: Express.Multer.File, type: string) {
    let destination: string;

    if (!existsSync(ASSETS_DIRECTORY)) {
      mkdirSync(ASSETS_DIRECTORY);
    }

    if (type === 'images') {
      if (!existsSync(IMAGE_UPLOAD_DESTINATION)) {
        mkdirSync(IMAGE_UPLOAD_DESTINATION);
      }
      destination = IMAGE_UPLOAD_DESTINATION;
    }

    if (type === 'audios') {
      if (!existsSync(AUDIO_UPLOAD_DESTINATION)) {
        mkdirSync(AUDIO_UPLOAD_DESTINATION);
      }
      destination = AUDIO_UPLOAD_DESTINATION;
    }

    if (type === 'videos') {
      if (!existsSync(VIDEO_UPLOAD_DESTINATION)) {
        mkdirSync(VIDEO_UPLOAD_DESTINATION);
      }
      destination = VIDEO_UPLOAD_DESTINATION;
    }

    const filename = `${uniqueId()}${file.originalname.substring(
      file.originalname.lastIndexOf('.'),
    )}`;
    const fileFullPath = `${destination}/${filename}`;

    writeFileSync(fileFullPath, file.buffer);
    return `/${type}/${filename}`;
  }
}
