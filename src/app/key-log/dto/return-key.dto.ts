import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ReturnKeyDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: "ID преподавателя обязателен для заполнения" })
    teacherId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: "ID преподавателя обязателен для заполнения" })
    cellId: string;
}
