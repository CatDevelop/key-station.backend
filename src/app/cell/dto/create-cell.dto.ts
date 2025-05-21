import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { CreatedCustomerDto } from "@/customer/dto/create-customer.dto";

export class CreateCellDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({ message: "Номер этажа обязателен для заполнения" })
    floor: number;

    @ApiProperty({ description: "Номер этажа" })
    @IsNumber()
    @IsNotEmpty({ message: "Номер этажа обязателен для заполнения" })
    classroom: number;
}

export class Cell {
    @ApiProperty({ type: "string", format: "uuid", example: "4cd5975e-e958-45d6-b426-ad68b15bccd6" })
    id: string;

    @ApiProperty({ example: 1 })
    floor: number;

    @ApiProperty({ example: 210 })
    classroom: number;

    @ApiProperty({ example: false })
    isLocked: boolean;

    @ApiProperty({ type: "string", format: "date-time" })
    createdAt: string;

    @ApiProperty({ type: "string", format: "date-time", example: "2025-05-03T11:16:06.437Z" })
    updatedAt: string;

    @ApiProperty({ type: "string", example: null })
    customerId?: string;
}

export class CreatedCell extends Cell {
    @ApiProperty({ type: () => CreatedCustomerDto })
    customer?: CreatedCustomerDto;
}

export class CreateCellResponseDto {
    @ApiProperty()
    cell: CreatedCell;
}
