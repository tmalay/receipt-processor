import { ReceiptService } from './receipt.service';

describe('ReceiptService', () => {
  let receiptService: ReceiptService;

  beforeEach(() => {
    receiptService = new ReceiptService();
  });

  describe('processReceipt', () => {
    it('should generate a unique ID and store the receipt', () => {
      const receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [
          { shortDescription: 'Mountain Dew 12PK', price: '6.49' },
          { shortDescription: 'Emils Cheese Pizza', price: '12.25' },
        ],
        total: '18.74',
      };

      const res = receiptService.processReceipt(receipt);
      expect(typeof res.id).toBe('string');
      expect(res.id.length).toBeGreaterThan(0);

      const storedReceipt = receiptService['receipts'].get(res.id);
      expect(storedReceipt.receipt).toEqual(receipt);
    });
  });

  describe('getPoints', () => {
    it('should calculate points correctly for a receipt', () => {
      const receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        items: [
          { shortDescription: 'Mountain Dew 12PK', price: '6.49' },
          { shortDescription: 'Emils Cheese Pizza', price: '12.25' },
        ],
        total: '18.74',
      };

      const res = receiptService.processReceipt(receipt);
      const points = receiptService.getReceiptPoints(res.id);


      expect(points.points).toBe(20);
    });

  });

  describe('calculatePoints', () => {
    it('should calculate points based on rules', () => {
      const receipt = {
        retailer: 'M&M Corner Market',
        purchaseDate: '2022-03-20',
        purchaseTime: '14:33',
        items: [
          { shortDescription: 'Gatorade', price: '2.25' },
          { shortDescription: 'Gatorade', price: '2.25' },
          { shortDescription: 'Gatorade', price: '2.25' },
          { shortDescription: 'Gatorade', price: '2.25' },
        ],
        total: '9.00',
      };

      const points = receiptService['calculatePoints'](receipt);
      const expectedPoints = 50 + 25 + 14 + 10 + 10;
      expect(points).toBe(expectedPoints);
    });
  });
});
