import { BadRequestException, Injectable } from "@nestjs/common";

import { CreateCellDto } from "./dto/create-cell.dto";

import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class CellService {
    public constructor(private readonly prismaService: PrismaService) {}

    async create(dto: CreateCellDto) {
        const cell = await this.prismaService.cell.create({
            data: dto,
        });

        return { cell };
    }

    findAll() {
        return `This action returns all cell`;
    }

    findOne(id: number) {
        return `This action returns a #${id} cell`;
    }

    async canTeacherOut(teacherId: string) {
        const existTeacher = await this.prismaService.teacher.findFirst({
            where: { id: teacherId },
        });

        if (!existTeacher) throw new BadRequestException("Преподаватель не найден!");

        const cells = await this.prismaService.cell.findMany({
            where: {
                teacherId: teacherId,
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

    remove(id: number) {
        return `This action removes a #${id} cell`;
    }
}
