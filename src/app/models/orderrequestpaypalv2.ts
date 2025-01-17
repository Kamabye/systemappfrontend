import { PaymentSourcePayPalV2 } from "./paymentsourcepaypalv2";
import { ItemPayPalV2 } from "./itempaypalv2";
import { PurchaseUnitPayPalV2 } from "./purchaseunitpaypalv2";

export class OrderRequestPayPalV2 {

    intent : string = "CAPTURE"

    purchase_units : PurchaseUnitPayPalV2[] = [];

    payment_source : PaymentSourcePayPalV2 = new PaymentSourcePayPalV2();

}