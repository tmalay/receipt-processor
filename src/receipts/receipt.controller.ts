import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ReceiptDto } from './dto/receipt.dto';
import { ReceiptService } from './receipt.service';
import { PointsResponseDTO } from './dto/points.response.dto';

@ApiTags('Receipts')
@Controller('receipts')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) { }


  @ApiBody({ type: ReceiptDto })
  @Post('process')
  async create(@Body() createDto: ReceiptDto): Promise<any> {
    try {
      return this.receiptService.processReceipt(createDto);
    } catch (error) {
      throw new Error(error.message)
    }
  };


  @Get(':id/points')
  async getReceiptPoints(@Param('id') id: string): Promise<PointsResponseDTO> {
    return this.receiptService.getReceiptPoints(id);
  }


}
