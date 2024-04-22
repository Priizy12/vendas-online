import { Body, Controller, Get, Param, Patch,  Put, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../decorators/role.decorator';
import { RoleGuard } from '../guards/role.guard';
import { Role } from '../enums/role.enum';
import { SendtrackingDto } from './dtos/send-tracking-dto';
import { ParamUserId } from '../decorators/param-userId.decorator';
import { User } from '../decorators/user.decorator';

@UseGuards(AuthGuard, RoleGuard)

@Controller('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }


  
  @Roles(Role.Admin)
  @Get()
  async getOrder() {
    return this.orderService.getOrderProducts();
  }


  @Roles(Role.Admin)
  @Get('User/:userId')
  async getOrderByUser(@Param('userId') userId: number) {
    return this.orderService.getOrderProductsByUser(userId)
  }

  @Roles(Role.cliente)
  @Get('User')
  async getOrderUser(@User() userId: number) {
    return this.orderService.getOrderProductsByUser(userId)
  }

 
  @Roles(Role.Admin)
  @Patch(":id")
  async UpdateDeliveredProduct( @Param('id') id: number) {
      return this.orderService.DeliveredProduct(id);
  }

  @Roles(Role.Admin)
  @Put('send-code/:userId')
  async TrackingCodeToUser (@Body() data: SendtrackingDto, @ParamUserId() userId: number) {
      return this.orderService.SendTrackingCode(data, userId);
  }



}
