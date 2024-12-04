import { ApiProperty } from "@nestjs/swagger";

export class PointsResponseDTO {
    @ApiProperty()
    points: number;

    constructor(points: number) {
        this.points = points;
    }
}
