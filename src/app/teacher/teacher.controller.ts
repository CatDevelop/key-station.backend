import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { TeacherService } from "./teacher.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";

import { ApiBaseResponse } from "@/libs/common/utils/base-response";
import { CreateCellResponseDto } from "@/cell/dto/create-cell.dto";
import { Authorization } from "@/auth/decorators/auth.decorator";

@ApiTags("teacher")
@Controller("teacher")
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}

    @ApiOperation({ summary: "Создание преподавателя" })
    @ApiBaseResponse(CreateCellResponseDto, "Созданный преподаватель")
    @Authorization()
    @HttpCode(HttpStatus.OK)
    @Post()
    create(@Body() dto: CreateTeacherDto) {
        return this.teacherService.create(dto);
    }
}
