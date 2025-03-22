import { environment } from "src/environments/environment";

export class ExperienceContextPayPalV2 {

    private url: string = `${environment.urlBaseFrontEnd}`;

    payment_method_preference : string = "IMMEDIATE_PAYMENT_REQUIRED";

    user_action : string = "PAY_NOW";

    return_url : string = `${this.url}/admin/returnv2`;

    cancel_url : string = `${this.url}/admin/cancelv2`;

}