import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ListTestQuestionDto {
  @ApiPropertyOptional({
    default: 1,
  })
  page?: number;

  @ApiPropertyOptional({
    default: 10,
  })
  limit?: number;

  @ApiProperty({
    example: 1,
  })
  testId: number;
}
