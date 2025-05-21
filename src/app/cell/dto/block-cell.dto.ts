import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class BlockCellDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: "ID ячейки обязателен для заполнения" })
    cellId: string;
}

export class UnblockCellDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: "ID ячейки обязателен для заполнения" })
    cellId: string;
}

export class CreatedCell {
    @ApiProperty({ type: "uuid", example: "4cd5975e-e958-45d6-b426-ad68b15bccd6" })
    id: string;

    @ApiProperty({ example: 1 })
    floor: number;

    @ApiProperty({ example: 210 })
    classroom: number;

    @ApiProperty({ type: "string", format: "date-time" })
    createdAt: string;

    @ApiProperty({ type: "string", format: "date-time", example: "2025-05-03T11:16:06.437Z" })
    updatedAt: string;
}

export class CreateCellResponseDto {
    @ApiProperty()
    cell: CreatedCell;
}
