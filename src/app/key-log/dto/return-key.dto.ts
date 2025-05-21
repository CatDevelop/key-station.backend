import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ReturnKeyDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: "ID клиента обязателен для заполнения" })
    customerId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: "ID ячейки обязателен для заполнения" })
    cellId: string;
}
