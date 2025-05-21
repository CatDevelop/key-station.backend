import { ApiProperty } from "@nestjs/swagger";

import { CreatedCustomerDto } from "@/customer/dto/create-customer.dto";

export class FindAllCustomersDto {
    @ApiProperty({ type: () => CreatedCustomerDto, isArray: true })
    customers: CreatedCustomerDto;
}
