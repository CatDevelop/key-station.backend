import { join } from "path";

import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { TerminusModule } from "@nestjs/terminus";
import { ServeStaticModule } from "@nestjs/serve-static";

import { AuthModule } from "./auth/auth.module";
import { ProviderModule } from "./auth/provider/provider.module";
import { IS_DEV_ENV } from "./libs/common/utils/is-dev.util";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";

import { ResponseInterceptor } from "@/interceptors/response.interceptor";
import { LoggingMiddleware } from "@/middlewares/logging.middleware";
import { AppController } from "@/app.controller";
import { HttpExceptionFilter } from "@/filters/http.exception.filter";
import { TeacherModule } from './teacher/teacher.module';
import { CellModule } from './cell/cell.module';
import { KeyLogModule } from './key-log/key-log.module';

@Module({
    controllers: [AppController],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: !IS_DEV_ENV,
            isGlobal: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "..", "static"),
            serveRoot: "/api/static",
        }),
        PrismaModule,
        AuthModule,
        UserModule,
        ProviderModule,
        TerminusModule,
        TeacherModule,
        CellModule,
        KeyLogModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggingMiddleware).forRoutes("*");
    }
}
