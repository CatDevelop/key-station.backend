import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

import { CreatedCustomerDto } from "@/customer/dto/create-customer.dto";

export class FindByRfidDto {
    @ApiProperty({ example: "123412" })
    @IsString()
    @IsNotEmpty({ message: "Метка пропуска обязательна для заполнения" })
    rfid: string;
}

export class FindByRfidCustomerResponseDto {
    @ApiProperty({ type: () => CreatedCustomerDto })
    customer: CreatedCustomerDto;
}
