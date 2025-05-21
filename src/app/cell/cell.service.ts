import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { KeyAction } from "@prisma/__generated__";

import { CreateCellDto } from "./dto/create-cell.dto";

import { PrismaService } from "@/prisma/prisma.service";
import { FindAllCellDto } from "@/cell/dto/find-all-cell.dto";
import { BlockCellDto, UnblockCellDto } from "@/cell/dto/block-cell.dto";

@Injectable()
export class CellService {
    public constructor(private readonly prismaService: PrismaService) {}

    async throwIfNotExistCell(cellId: string) {
        const cell = await this.prismaService.cell.findUnique({
            where: { id: cellId },
        });

        if (!cell) {
            throw new NotFoundException("Ячейка не найдена.");
        }
        return cell;
    }

    async throwIfNotExistAdmin() {
        const admin = await this.prismaService.customer.findFirst({
            where: { role: "ADMIN" },
        });

        if (!admin) {
            throw new NotFoundException("Клиент c ролью 'ADMIN' не найден, создайте его в БД.");
        }
        return admin;
    }

    async create(dto: CreateCellDto) {
        const cell = await this.prismaService.cell.create({
            data: dto,
        });

        return { cell };
    }

    async findAll(dto: FindAllCellDto) {
        const cells = await this.prismaService.cell.findMany({
            where: dto.floor ? { floor: +dto.floor } : undefined,
            orderBy: {
                classroom: "asc",
            },
            include: {
                customer: true,
            },
        });

        return { cells };
    }

    async findOne(id: string) {
        const cell = await this.prismaService.cell.findMany({
            where: { id },
        });

        return { cell };
    }

    async blockCell(dto: BlockCellDto) {
        const cell = await this.throwIfNotExistCell(dto.cellId);
        const admin = await this.throwIfNotExistAdmin();

        await this.prismaService.cell.update({
            where: { id: cell.id },
            data: {
                isLocked: true,
            },
        });

        await this.prismaService.keyLog.create({
            data: {
                action: KeyAction.BLOCK,
                customerId: admin.id,
                cellId: cell.id,
            },
        });

        return { details: "Ячейка успешно заблокирована!" };
    }

    async unblockCell(dto: UnblockCellDto) {
        const cell = await this.throwIfNotExistCell(dto.cellId);
        const admin = await this.throwIfNotExistAdmin();

        await this.prismaService.cell.update({
            where: { id: cell.id },
            data: {
                isLocked: false,
            },
        });

        await this.prismaService.keyLog.create({
            data: {
                action: KeyAction.UNBLOCK,
                customerId: admin.id,
                cellId: cell.id,
            },
        });

        return { details: "Ячейка успешно разблокирована!" };
    }

    async canCustomerOut(teacherRfid: string) {
        const existCustomer = await this.prismaService.customer.findFirst({
            where: { rfid: teacherRfid },
        });

        if (!existCustomer) throw new BadRequestException("Клиент не найден!");

        const cells = await this.prismaService.cell.findMany({
            where: {
                customerId: existCustomer.id,
            },
        });

        if (cells.length > 0) {
            return {
                canOut: false,
            };
        }

        return {
            canOut: true,
        };
    }

    async remove(id: string) {
        await this.prismaService.cell.delete({
            where: {
                id: id,
            },
        });

        return {
            details: "Ячейка успешно удалена!",
        };
    }
}
