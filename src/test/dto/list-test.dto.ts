import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListTestDto {
  @ApiPropertyOptional({
    default: 1,
  })
  page?: number;

  @ApiPropertyOptional({
    default: 10,
  })
  limit?: number;
}
