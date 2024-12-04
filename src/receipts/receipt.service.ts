import { Injectable } from '@nestjs/common';
import { ReceiptDto } from './dto/receipt.dto';
import { ReceiptResponseDTO } from './dto/receipt.response.dto';
import { PointsResponseDTO } from './dto/points.response.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ReceiptService {
  constructor() { }
  private receipts = new Map<string, { receipt: ReceiptDto; points: number }>();

  /**
   * Processes a receipt and calculates points.
   * @param receipt
   */
  processReceipt(receipt: ReceiptDto): ReceiptResponseDTO {
    const points = this.calculatePoints(receipt);
    const id = uuidv4()
    this.receipts.set(id, { receipt, points });
    console.log(this.receipts)
    return new ReceiptResponseDTO(id);
  }

  /**
   * Retrieves the points for a given receipt ID.
   * @param id - The unique ID of the receipt.
   * @returns - The points for the receipt, or `null` if not found.
   */
  getPointsById(id: string): number | null {
    const entry = this.receipts.get(id);
    return entry ? entry.points : null;
  }

  /**
   * Calculates the total points for a receipt based on the defined rules.
   * @param receipt
   * @returns - Total points for the receipt.
   */
  private calculatePoints(receipt: ReceiptDto): number {
    let points = 0;

    // Rule 1: One point for every alphanumeric character in the retailer name.
    points += (receipt.retailer.match(/\w/g) || []).length;

    // Rule 2: 50 points if the total is a round dollar amount with no cents.
    if (receipt.total.endsWith('.00')) {
      points += 50;
    }

    // Rule 3: 25 points if the total is a multiple of 0.25.
    if (parseFloat(receipt.total) % 0.25 === 0) {
      points += 25;
    }

    // Rule 4: 5 points for every two items on the receipt.
    points += Math.floor(receipt.items.length / 2) * 5;

    // Rule 5: Points for item descriptions being multiples of 3 in length.
    receipt.items.forEach((item) => {
      const trimmedLength = item.shortDescription.trim().length;
      if (trimmedLength % 3 === 0) {
        points += Math.ceil(parseFloat(item.price) * 0.2);
      }
    });

    // Rule 6: 6 points if the day in the purchase date is odd.
    const day = parseInt(receipt.purchaseDate.split('-')[2], 10);
    if (day % 2 !== 0) {
      points += 6;
    }

    // Rule 7: 10 points if the time of purchase is between 2:00pm and 4:00pm.
    const [hours, minutes] = receipt.purchaseTime.split(':').map(Number);
    if (hours === 14 || (hours === 15 && minutes === 0)) {
      points += 10;
    }

    return points;
  }


  getReceiptPoints(id: string): PointsResponseDTO {
    if (this.receipts.size == 0 || !this.receipts.has(id)) {
      throw new Error('Receipt not found with given Data')
    }
    return new PointsResponseDTO(this.receipts.get(id).points);
  }

}
