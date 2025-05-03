import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { CellService } from "./cell.service";
import { CreateCellDto, CreateCellResponseDto } from "./dto/create-cell.dto";

import { ApiBaseResponse } from "@/libs/common/utils/base-response";
import { Authorization } from "@/auth/decorators/auth.decorator";

@ApiTags("cell")
@Controller("cell")
export class CellController {
    constructor(private readonly cellService: CellService) {}

    @ApiOperation({ summary: "Создание ячейки сейфа" })
    @ApiBaseResponse(CreateCellResponseDto, "Созданная ячейка")
    @Authorization()
    @HttpCode(HttpStatus.OK)
    @Post()
    create(@Body() dto: CreateCellDto) {
        return this.cellService.create(dto);
    }

    @Get()
    findAll() {
        return this.cellService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.cellService.findOne(+id);
    }

    @Get("/canTeacherOut/:teacherRfid")
    canTeacherOut(@Param("teacherRfid") teacherRfid: string) {
        return this.cellService.canTeacherOut(teacherRfid);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.cellService.remove(+id);
    }
}
