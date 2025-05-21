import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";

import { ApiBaseResponse } from "@/libs/common/utils/base-response";
import { CreateCellResponseDto } from "@/cell/dto/create-cell.dto";
import { Authorization } from "@/auth/decorators/auth.decorator";
import { FindAllCustomersDto } from "@/customer/dto/find-all-customer.dto";
import { FindByRfidCustomerResponseDto, FindByRfidDto } from "@/customer/dto/find-by-rfid-customer.dto";
import { UpdateCustomerDto } from "@/customer/dto/update-customer.dto";

@ApiTags("customer")
@Controller("customer")
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @ApiOperation({ summary: "Создание нового клиента системы (Преподаватели и ученики)" })
    @ApiBaseResponse(CreateCellResponseDto, "Созданный клиент")
    @Authorization()
    @HttpCode(HttpStatus.OK)
    @Post()
    create(@Body() dto: CreateCustomerDto) {
        return this.customerService.create(dto);
    }

    @ApiOperation({ summary: "Получение списка клиентов" })
    @ApiBaseResponse(FindAllCustomersDto, "Созданный клиент")
    @Authorization()
    @HttpCode(HttpStatus.OK)
    @Get()
    findAll() {
        return this.customerService.findAll();
    }

    @ApiOperation({ summary: "Получение клиента по пропуску" })
    @ApiBaseResponse(FindByRfidCustomerResponseDto, "Клиент")
    @Authorization()
    @HttpCode(HttpStatus.OK)
    @Get("/:rfid")
    findByRfid(@Param() dto: FindByRfidDto) {
        return this.customerService.findByRfid(dto);
    }

    @ApiOperation({ summary: "Удаление клиента системы" })
    @Authorization()
    @HttpCode(HttpStatus.OK)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.customerService.remove(id);
    }

    @ApiOperation({ summary: "Обновление клиента системы" })
    @Authorization()
    @HttpCode(HttpStatus.OK)
    @Patch()
    update(@Body() dto: UpdateCustomerDto) {
        return this.customerService.update(dto);
    }
}
