import { BadRequestException, Injectable } from "@nestjs/common";

import { TakeKeyDto } from "./dto/take-key.dto";

import { ReturnKeyDto } from "@/key-log/dto/return-key.dto";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class KeyLogService {
    public constructor(private readonly prismaService: PrismaService) {}

    async takeKey(dto: TakeKeyDto) {
        const existKey = await this.prismaService.cell.findFirst({
            where: { id: dto.cellId },
        });

        if (!existKey) throw new BadRequestException("Ключ не найден!");

        const existTeacher = await this.prismaService.teacher.findFirst({
            where: { id: dto.teacherId },
        });

        if (!existTeacher) throw new BadRequestException("Преподаватель не найден!");

        const exist = await this.prismaService.cell.findFirst({
            where: { id: dto.cellId, NOT: { teacherId: null } },
        });

        if (exist) throw new BadRequestException("Ключ уже забрали!");

        const keyLog = await this.prismaService.keyLog.create({
            data: {
                action: "TAKEN",
                teacherId: dto.teacherId,
                cellId: dto.cellId,
            },
        });

        await this.prismaService.cell.update({
            where: { id: dto.cellId },
            data: {
                teacherId: dto.teacherId,
            },
        });

        return { keyLog };
    }

    async returnKey(dto: ReturnKeyDto) {
        const existKey = await this.prismaService.cell.findFirst({
            where: { id: dto.cellId },
        });

        if (!existKey) throw new BadRequestException("Ключ не найден!");

        const existTeacher = await this.prismaService.teacher.findFirst({
            where: { id: dto.teacherId },
        });

        if (!existTeacher) throw new BadRequestException("Преподаватель не найден!");

        const exist = await this.prismaService.cell.findFirst({
            where: { id: dto.cellId, teacherId: dto.teacherId },
        });

        if (!exist) throw new BadRequestException("Ключ не у этого преподавателя!");

        const keyLog = await this.prismaService.keyLog.create({
            data: {
                action: "RETURNED",
                teacherId: dto.teacherId,
                cellId: dto.cellId,
            },
        });

        await this.prismaService.cell.update({
            where: { id: dto.cellId },
            data: {
                teacherId: null,
            },
        });

        return { keyLog };
    }
}
