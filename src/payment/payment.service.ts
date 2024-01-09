import { ForbiddenException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CheckPaymentDto } from './dto/check-payment.dto';
import { MakePaymentDto } from './dto/make-paymen.dto';

@Injectable()
export class PaymentService {
  async makePayment(makePaymentDto: MakePaymentDto) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: 'https://api.yookassa.ru/v3/payments',
        headers: {
          'Content-Type': 'application/json',
          'Idempotence-Key': Date.now(),
        },
        auth: {
          username: '261522',
          password: 'test_CI5MCaYVcLx7SuLDEQdABWUzL8ld0KcR6pGBwbNtDts',
        },
        data: {
          amount: {
            value: makePaymentDto.amount,
            currency: 'RUB',
          },
          capture: true,
          confirmation: {
            type: 'redirect',
            return_url: 'http://localhost:3000',
          },
          description: makePaymentDto.description,
        },
      });

      return data;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async checkPayment(checkPaymentDto: CheckPaymentDto) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `https://api.yookassa.ru/v3/payments/${checkPaymentDto.paymentId}`,
        auth: {
          username: '261522',
          password: 'test_CI5MCaYVcLx7SuLDEQdABWUzL8ld0KcR6pGBwbNtDts',
        },
      });

      return data;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
