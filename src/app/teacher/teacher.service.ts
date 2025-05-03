import { Injectable } from "@nestjs/common";

import { CreateTeacherDto } from "./dto/create-teacher.dto";

import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class TeacherService {
    public constructor(private readonly prismaService: PrismaService) {}

    async create(dto: CreateTeacherDto) {
        const teacher = await this.prismaService.teacher.create({
            data: {
                name: dto.name,
                rfid: dto.rfid,
            },
        });

        return { teacher };
    }
}
