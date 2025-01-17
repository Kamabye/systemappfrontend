export class ExperienceContextPayPalV2 {

    payment_method_preference : string = "IMMEDIATE_PAYMENT_REQUIRED";

    landing_page : string = "LOGIN";

    shipping_preference : string = "GET_FROM_FILE";

    user_action : string = "PAY_NOW";

    return_url : string = "http://localhost:4200/admin/returnv2";

    cancel_url : string = "http://localhost:4200/admin/cancelv2";

}