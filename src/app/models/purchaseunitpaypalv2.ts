import { AmountPayPalV2 } from "./amountpaypalv2";
import { ItemPayPalV2 } from "./itempaypalv2";

export class PurchaseUnitPayPalV2 {

    invoice_id: string = "";

    amount: AmountPayPalV2 = new AmountPayPalV2();

    items: ItemPayPalV2[] = [];

}