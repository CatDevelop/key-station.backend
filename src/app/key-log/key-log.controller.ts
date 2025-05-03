import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { KeyLogService } from "./key-log.service";
import { TakeKeyDto } from "./dto/take-key.dto";

import { ReturnKeyDto } from "@/key-log/dto/return-key.dto";

@ApiTags("Key")
@Controller("key")
export class KeyLogController {
    constructor(private readonly keyLogService: KeyLogService) {}

    @Post("take")
    takeKey(@Body() dto: TakeKeyDto) {
        return this.keyLogService.takeKey(dto);
    }

    @Post("return")
    returnKey(@Body() dto: ReturnKeyDto) {
        return this.keyLogService.returnKey(dto);
    }
}
