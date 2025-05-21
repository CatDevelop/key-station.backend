import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

import { TakeKeyDto } from "./dto/take-key.dto";

import { ReturnKeyDto } from "@/key-log/dto/return-key.dto";
import { PrismaService } from "@/prisma/prisma.service";
import { FindAllLogsDto } from "@/key-log/dto/find-all-logs.dto";

@Injectable()
export class KeyLogService {
    public constructor(private readonly prismaService: PrismaService) {}

    async throwIfNotExistCell(cellId: string) {
        const existKey = await this.prismaService.cell.findFirst({
            where: { id: cellId },
        });

        if (!existKey) throw new BadRequestException("Ключ не найден!");
        return existKey;
    }

    async throwIfNotExistCustomer(customerId: string) {
        const existCustomer = await this.prismaService.customer.findFirst({
            where: { id: customerId },
        });

        if (!existCustomer) throw new BadRequestException("Клиент не найден!");
    }

    async takeKey(dto: TakeKeyDto) {
        const key = await this.throwIfNotExistCell(dto.cellId);
        await this.throwIfNotExistCustomer(dto.customerId);

        if (key.isLocked) throw new BadRequestException("Ячейка заблокирована!");

        const exist = await this.prismaService.cell.findFirst({
            where: { id: dto.cellId, NOT: { customerId: null } },
        });

        if (exist) throw new BadRequestException("Ключ уже забрали!");

        const keyLog = await this.prismaService.keyLog.create({
            data: {
                action: "TAKEN",
                customerId: dto.customerId,
                cellId: dto.cellId,
            },
        });

        await this.prismaService.cell.update({
            where: { id: dto.cellId },
            data: {
                customerId: dto.customerId,
            },
        });

        return { keyLog };
    }

    async returnKey(dto: ReturnKeyDto) {
        const key = await this.throwIfNotExistCell(dto.cellId);
        await this.throwIfNotExistCustomer(dto.customerId);

        if (key.isLocked) throw new BadRequestException("Ячейка заблокирована!");

        const exist = await this.prismaService.cell.findFirst({
            where: { id: dto.cellId, customerId: dto.customerId },
        });

        if (!exist) throw new BadRequestException("Ключ не у этого клиента!");

        const keyLog = await this.prismaService.keyLog.create({
            data: {
                action: "RETURNED",
                customerId: dto.customerId,
                cellId: dto.cellId,
            },
        });

        await this.prismaService.cell.update({
            where: { id: dto.cellId },
            data: {
                customerId: null,
            },
        });

        return { keyLog };
    }

    async findAllLogs(dto: FindAllLogsDto) {
        if (dto.cellId) {
            const cell = await this.prismaService.cell.findUnique({
                where: { id: dto.cellId },
            });

            if (!cell) {
                throw new NotFoundException("Ячейка не найдена.");
            }
        }

        const logs = await this.prismaService.keyLog.findMany({
            where: {
                cellId: dto.cellId ? dto.cellId : undefined,
            },
            orderBy: {
                timestamp: "desc",
            },
            include: {
                customer: true,
                cell: true,
            },
        });

        return { logs };
    }
}
