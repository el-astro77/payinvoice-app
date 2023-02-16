import { MongoClient, ObjectId } from "mongodb";
const Instamojo = require('instamojo-nodejs');

const api_key = "test_58f63e6a3eb3483cc07b9901624";
const auth_key = "test_c512ae48e86c1e2ca29c98f33fd";
Instamojo.setKeys(api_key,auth_key);
Instamojo.isSandboxMode(true);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { payment_request_id, payment_id } = req.body;

    const client = await MongoClient.connect("mongodb+srv://inadmin:adminpass@invoice1.jgk5yn8.mongodb.net/invoices1?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db();
    const collection = db.collection("allInvoices");

    const invoice = await collection.findOne({ paymentRequestId: payment_request_id });

    if (invoice) {
      // const payment = await insta_client.getPaymentDetails(payment_id);
      const payment = await Instamojo.getPaymentDetails(payment_id);

      if (payment.success) {
        await collection.updateOne(
          { _id: new ObjectId(invoice._id) },
          {
            $set: {
              status: "paid",
              paymentId: payment_id,
              paymentDate: new Date(),
            },
          }
        );

        //await sendEmail(invoice.clientEmail, "Payment Received", `Thank you for your payment of ${invoice.total}.`);

        res.status(200).json({ message: "Payment received" });
      } else {
        res.status(400).json({ message: "Payment failed" });
      }
    } else {
      res.status(400).json({ message: "Invoice not found" });
    }
    client.close();
  }
  else if (req.method === "DELETE") {
    const { invoiceId } = req.query;
    const client = await MongoClient.connect("mongodb+srv://inadmin:adminpass@invoice1.jgk5yn8.mongodb.net/invoices1?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const collection = db.collection("allInvoices");
    await collection.deleteOne({ _id: new ObjectId(invoiceId) });

    res.status(200).json({ message: "Invoice deleted successfully" });
    client.close();
  }
}
