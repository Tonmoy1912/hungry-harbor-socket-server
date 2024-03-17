import Stats from "../model/statsSchema";
import Orders from "../model/orderSchema";
import Notifications from "../model/notificationSchema";

//will be invoked every day
export async function createTodaysStats() {
    try {
        let curDate = new Date();
        curDate.setHours(0, 0, 0);
        const upperLimit = new Date(curDate);
        curDate.setDate(curDate.getDate() - 1);
        const lowerLimit = new Date(curDate);
        // console.log(lowerLimit.toLocaleString());
        // console.log(upperLimit.toLocaleString());
        const orders_placed = await Orders.find({ $and: [{ active: { $eq: "settled" } }, { date: { $gte: lowerLimit } }, { date: { $lt: upperLimit } }] }).countDocuments();
        const orders_cancelled = await Orders.find({ $and: [{ status: { $eq: "cancelled" } }, { date: { $gte: lowerLimit } }, { date: { $lt: upperLimit } }] }).countDocuments();
        let sells = 0;
        const delivered_order: { total_amount: number }[] = await Orders.find({ $and: [{ status: { $eq: "delivered" } }, { date: { $gte: lowerLimit } }, { date: { $lt: upperLimit } }] }).select({ total_amount: 1 });
        for (let x of delivered_order) {
            sells += x.total_amount;
        }
        const todaysStats = new Stats({
            sells, orders_placed, orders_cancelled, date: lowerLimit
        });
        await todaysStats.save();
    }
    catch (err: any) {
        console.log("Error on creating daily stats");
    }
}

//will be invoked on the first day of every month
export async function deleteOldStats() {
    try {
        let curDate = new Date();
        curDate.setHours(0, 0, 0);
        const upperMonthLimit = new Date(curDate);
        curDate.setMonth(curDate.getMonth() - 2);
        const lowerMonthLimit = new Date(curDate);
        // console.log(lowerMonthLimit.toLocaleString());
        // console.log(upperMonthLimit.toLocaleString());
        await Stats.deleteMany({ date: { $lt: lowerMonthLimit } });
    }
    catch (err: any) {
        console.log("Error while deleting old order.");
    }
}

//will be invoked in every sunday 
export async function deleteUnsettledOrders() {
    try {
        let curDate = new Date();
        curDate.setHours(0, 0, 0);
        const upperLimit = new Date(curDate);
        curDate.setDate(curDate.getDate() - 7);
        const lowerLimit = new Date(curDate);
        // console.log(lowerLimit.toLocaleString());
        // console.log(upperLimit.toLocaleString());
        await Orders.deleteMany({ $and: [{ active: { $eq: "initialized" } }, { date: { $lt: lowerLimit } }] });
    }
    catch (err: any) {
        console.log("Error while deleting unsettled order");
    }
}

//will be invoked on the first day of every month
export async function deleteNotifications() {
    try {
        let curDate = new Date();
        curDate.setHours(0, 0, 0);
        const upperLimit = new Date(curDate);
        curDate.setMonth(curDate.getMonth() - 2);
        const lowerLimit = new Date(curDate);
        await Notifications.deleteMany({ date: { $lt: lowerLimit } });
    }
    catch (err: any) {
        console.log("Error while deleting notifications");
    }
}

//will be invoked on the first day of every month
export async function deleteOrders() {
    try {
        let curDate = new Date();
        curDate.setHours(0, 0, 0);
        const upperLimit = new Date(curDate);
        curDate.setMonth(curDate.getMonth() - 6);
        const lowerLimit = new Date(curDate);
        await Orders.deleteMany({ date: { $lt: lowerLimit } });
    }
    catch (err: any) {
        console.log("Error while deleting orders");
    }
}