import { ApiProperty } from "@nestjs/swagger";

export class ReceiptResponseDTO {
    @ApiProperty()
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}