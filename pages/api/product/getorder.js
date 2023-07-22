import connect from "../../../lib/conn";
import Payment from "../../../models/paymentSchema";

const handler = async (req, res) => {
  console.log("order");
  try {
    const order = await Payment.find();
    console.log(order);
    // return order;
    return res.status(200).json({ success: true, message: order });
  } catch (e) {
    console.log(e);
    return res
      .status(200)
      .json({ success: false, message: "Something went wrong" });
  }
};

export default connect(handler);
