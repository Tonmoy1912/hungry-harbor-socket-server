export type AcceptOrderBody = {
    _id: string;
    status: string;
    active: string;
    ready_by: string;
    cooking_inst_status: string;
    userId: string;
};

export type DeliveredOrReadyOrderBody = Pick<AcceptOrderBody, '_id' | 'status'| 'active' |'userId'>;

export type UserCancelOrderBody= DeliveredOrReadyOrderBody & {refunded:string};