import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTeacherDto {
    @ApiProperty({ example: "Рожков Максим Евгеньевич" })
    @IsString()
    @IsNotEmpty({ message: "ФИО преподавателя обязательно для заполнения" })
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: "Метка пропуска преподавателя обязательна для заполнения" })
    rfid: string;
}
