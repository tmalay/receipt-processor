import { PartialType } from '@nestjs/swagger';
import { ReceiptDto } from './receipt.dto';

export class UpdateReceiptDto extends PartialType(ReceiptDto) { }   
