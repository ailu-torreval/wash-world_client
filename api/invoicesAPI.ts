import axios from 'axios';
import { SuperQueries } from './SuperQueries';
import { InvoiceDto } from '../entities/InvoiceDTO';

export class InvoicesAPI extends SuperQueries{
    static baseUrl = super.baseUrl  + "invoice";
    
// get ??
// post

  static async createInvoice(invoiceDto: InvoiceDto) {
    try {
        const response = await axios.post(this.baseUrl, invoiceDto);
        return response.data;
    } catch(error) {
        console.log("failed creating invoice", error)
    }
  }

}