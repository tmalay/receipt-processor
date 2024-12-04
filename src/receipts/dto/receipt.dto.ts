import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsISO8601, IsMilitaryTime, IsNotEmpty, IsString, Matches, ValidateNested } from "class-validator";
import { ItemDto } from "./item.dto";

export class ReceiptDto {
    @ApiProperty({
        description: 'The name of the retailer or store the receipt is from',
        example: 'M&M Corner Market',
        pattern: '^[\\w\\s\\-&]+$',
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[\w\s\-&]+$/)
    retailer: string;

    @ApiProperty({
        description: 'The date of the purchase printed on the receipt',
        example: '2022-01-01',
    })
    @IsString()
    @IsISO8601()
    purchaseDate: string;

    @ApiProperty({
        description: 'The time of the purchase printed on the receipt (24-hour format)',
        example: '13:01',
    })
    @IsString()
    @IsMilitaryTime()
    purchaseTime: string;

    @ApiProperty({
        description: 'The list of purchased items',
        type: [ItemDto],
        minItems: 1,
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    items: ItemDto[];

    @ApiProperty({
        description: 'The total amount paid on the receipt',
        example: '6.49',
        pattern: '^\\d+\\.\\d{2}$',
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d+\.\d{2}$/)
    total: string;

    constructor(
        retailer: string,
        purchaseDate: string,
        purchaseTime: string,
        items: ItemDto[],
        total: string
    ) {
        this.retailer = retailer;
        this.purchaseDate = purchaseDate;
        this.purchaseTime = purchaseTime;
        this.items = items;
        this.total = total;
    }
}