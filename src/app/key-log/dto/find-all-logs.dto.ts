import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { KeyAction } from "@prisma/__generated__";

import { CreatedCustomerDto } from "@/customer/dto/create-customer.dto";
import { Cell } from "@/cell/dto/create-cell.dto";

export class FindAllLogsDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    cellId?: string;
}

export class FindAllLogResponseDto {
    @ApiProperty({ example: "0efca53f-a44a-402c-a4fa-fb7011d8b1e9" })
    id: string;

    @ApiProperty({ type: "enum", enum: KeyAction, example: "BLOCK" })
    action: KeyAction;

    @ApiProperty({ format: "uuid", example: "1d4e42ae-cd1a-4240-936e-144fbb99ec6d" })
    cellId: string;

    @ApiProperty({ format: "uuid", example: "b6b84673-3699-464c-a41b-beabd8835d84" })
    customerId: string;

    @ApiProperty({ type: "string", format: "date-time", example: "2025-05-03T11:16:06.437Z" })
    timestamp: string;

    @ApiProperty({ type: () => CreatedCustomerDto })
    customer: CreatedCustomerDto;

    @ApiProperty({ type: () => Cell })
    cell: Cell;
}

export class FindAllLogsResponseDto {
    @ApiProperty({ type: () => FindAllLogResponseDto, isArray: true })
    logs: FindAllLogResponseDto;
}
