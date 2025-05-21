import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { CreatedCell } from "@/cell/dto/create-cell.dto";

export class FindAllCellDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsOptional()
    floor?: string;
}

export class FindAllCellsResponseDto {
    @ApiProperty({ type: () => CreatedCell, isArray: true })
    cells: CreatedCell[];
}
