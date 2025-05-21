import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { KeyLogService } from "./key-log.service";
import { TakeKeyDto } from "./dto/take-key.dto";

import { ReturnKeyDto } from "@/key-log/dto/return-key.dto";
import { Authorization } from "@/auth/decorators/auth.decorator";
import { FindAllLogsDto, FindAllLogsResponseDto } from "@/key-log/dto/find-all-logs.dto";
import { ApiBaseResponse } from "@/libs/common/utils/base-response";
import { CreateCellResponseDto } from "@/cell/dto/create-cell.dto";

@ApiTags("key")
@Controller("key")
export class KeyLogController {
    constructor(private readonly keyLogService: KeyLogService) {}

    @ApiOperation({ summary: "Взять ключ" })
    @Authorization()
    @HttpCode(HttpStatus.OK)
    @Post("take")
    takeKey(@Body() dto: TakeKeyDto) {
        return this.keyLogService.takeKey(dto);
    }

    @ApiOperation({ summary: "Вернуть ключ" })
    @Authorization()
    @HttpCode(HttpStatus.OK)
    @Post("return")
    returnKey(@Body() dto: ReturnKeyDto) {
        return this.keyLogService.returnKey(dto);
    }

    @ApiOperation({ summary: "Получение списка логов" })
    @ApiBaseResponse(FindAllLogsResponseDto, "Список логов")
    @Authorization()
    @HttpCode(HttpStatus.OK)
    @Get("logs")
    findAll(@Query() dto: FindAllLogsDto) {
        return this.keyLogService.findAllLogs(dto);
    }
}
