import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ItemDto {
    @ApiProperty({
        description: 'The short product description for the item',
        example: 'Mountain Dew 12PK',
        pattern: '^[\\w\\s\\-]+$',
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[\w\s\-]+$/)
    shortDescription: string;

    @ApiProperty({
        description: 'The total price paid for this item',
        example: '6.49',
        pattern: '^\\d+\\.\\d{2}$',
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d+\.\d{2}$/)
    price: string;
}



