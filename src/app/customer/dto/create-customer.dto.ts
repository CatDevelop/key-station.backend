import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { CustomerRole } from "@prisma/__generated__";

export class CreateCustomerDto {
    @ApiProperty({ example: "Рожков Максим Евгеньевич" })
    @IsString()
    @IsNotEmpty({ message: "ФИО клиента обязательно для заполнения" })
    name: string;

    @ApiProperty({ example: "123412" })
    @IsString()
    @IsNotEmpty({ message: "Метка пропуска обязательна для заполнения" })
    rfid: string;

    @ApiProperty({ example: "TEACHER" })
    @IsEnum(CustomerRole)
    @IsNotEmpty({ message: "Роль обязательна для заполнения" })
    role: CustomerRole;
}

export class CreatedCustomerDto {
    @ApiProperty({ example: "18412fbd-201a-4e0b-aa00-b21f3ac26b0a" })
    id: string;

    @ApiProperty({ example: "Рожков Максим Евгеньевич" })
    name: string;

    @ApiProperty({ example: "123412" })
    rfid: string;

    @ApiProperty({ example: "TEACHER" })
    role: CustomerRole;

    @ApiProperty({ type: "string", format: "date-time" })
    createdAt: string;

    @ApiProperty({ type: "string", format: "date-time", example: "2025-05-03T11:16:06.437Z" })
    updatedAt: string;
}
