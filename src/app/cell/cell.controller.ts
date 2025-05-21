import { Body, Query, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { CellService } from "./cell.service";
import { CreateCellDto, CreateCellResponseDto } from "./dto/create-cell.dto";
import { FindAllCellDto, FindAllCellsResponseDto } from "./dto/find-all-cell.dto";

import { ApiBaseResponse } from "@/libs/common/utils/base-response";
import { Authorization } from "@/auth/decorators/auth.decorator";
import { BlockCellDto, UnblockCellDto } from "@/cell/dto/block-cell.dto";

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

    @ApiOperation({ summary: "Заблокировать ячейку сейфа" })
    @Authorization()
    @HttpCode(HttpStatus.OK)
    @Post("block/:cellId")
    block(@Param() dto: BlockCellDto) {
        return this.cellService.blockCell(dto);
    }

    @ApiOperation({ summary: "Разблокировать ячейку сейфа" })
    @Authorization()
    @HttpCode(HttpStatus.OK)
    @Post("unblock/:cellId")
    unblock(@Param() dto: UnblockCellDto) {
        return this.cellService.unblockCell(dto);
    }

    @ApiOperation({ summary: "Получение списка ячеек" })
    @ApiBaseResponse(FindAllCellsResponseDto, "Список ячеек")
    @Authorization()
    @HttpCode(HttpStatus.OK)
    @Get()
    findAll(@Query() dto: FindAllCellDto) {
        return this.cellService.findAll(dto);
    }

    @ApiOperation({ summary: "Получение информации о ячейке" })
    @Authorization()
    @HttpCode(HttpStatus.OK)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.cellService.findOne(id);
    }

    @ApiOperation({ summary: "Может ли пользователь выйти?" })
    @Authorization()
    @HttpCode(HttpStatus.OK)
    @Get("/canCustomerOut/:customerRfid")
    canCustomerOut(@Param("customerRfid") teacherRfid: string) {
        return this.cellService.canCustomerOut(teacherRfid);
    }

    @ApiOperation({ summary: "Удаление ячейки сейфа" })
    @Authorization()
    @HttpCode(HttpStatus.OK)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.cellService.remove(id);
    }
}
