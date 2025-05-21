import { Injectable } from "@nestjs/common";

import { CreateCustomerDto } from "./dto/create-customer.dto";

import { PrismaService } from "@/prisma/prisma.service";
import { FindByRfidDto } from "@/customer/dto/find-by-rfid-customer.dto";
import { UpdateCustomerDto } from "@/customer/dto/update-customer.dto";

@Injectable()
export class CustomerService {
    public constructor(private readonly prismaService: PrismaService) {}

    async create(dto: CreateCustomerDto) {
        const customer = await this.prismaService.customer.create({
            data: {
                name: dto.name,
                rfid: dto.rfid,
                role: dto.role,
            },
        });

        return { customer };
    }

    async findAll() {
        const customers = await this.prismaService.customer.findMany();

        return { customers };
    }

    async findByRfid(dto: FindByRfidDto) {
        const customer = await this.prismaService.customer.findFirst({
            where: {
                rfid: dto.rfid,
            },
        });

        return { customer };
    }

    async remove(id: string) {
        await this.prismaService.customer.delete({
            where: { id: id },
        });

        return { details: "Клиент успешно удалён!" };
    }

    async update(dto: UpdateCustomerDto) {
        await this.prismaService.customer.update({
            where: { id: dto.id },
            data: dto,
        });

        return { details: "Клиент успешно обновлён!" };
    }
}
