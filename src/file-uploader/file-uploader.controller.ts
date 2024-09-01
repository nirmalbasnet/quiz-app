import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploaderService } from './file-uploader.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class FileUploaderController {
  constructor(private readonly fileUploaderService: FileUploaderService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Query('type') type: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.fileUploaderService.uploadFile(file, type);
  }
}
