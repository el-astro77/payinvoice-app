import { MongoClient, ObjectId } from "mongodb";
const Instamojo = require("instamojo-nodejs");
const API_KEY = 'test_58f63e6a3eb3483cc07b9901624';
const AUTH_KEY = 'test_c512ae48e86c1e2ca29c98f33fd';
Instamojo.setKeys(API_KEY, AUTH_KEY);
Instamojo.isSandboxMode(true);

export default async function handler(req, res) {
  const { invoiceId } = req.query;

  const client = await MongoClient.connect("mongodb+srv://inadmin:adminpass@invoice1.jgk5yn8.mongodb.net/invoices1?retryWrites=true&w=majority",{ useNewUrlParser: true , useUnifiedTopology: true, });

  const db = client.db();
  const collection = db.collection("allInvoices");

  if (req.method === "POST"){
    
  const invoice = await collection.findOne({ _id: new ObjectId(invoiceId) });
  // Creating a payment request using the invoice data

  //http://localhost:3000/api/instamojo/${invoiceId}
  //http://localhost:3000/invoices/${invoiceId}

  var data = new Instamojo.PaymentData();

  data.purpose = invoice.description,
  data.amount = invoice.total,
  data.buyer_name =  invoice.clientName,
  data.email = invoice.clientEmail,
  data.phone = invoice.paymentTerms,
  data.webhook = `https://invoice-app-im-unique-swaraj77.vercel.app/api/instamojo/index.js`,
  data.redirect_url = `https://invoice-app-im-unique-swaraj77.vercel.app/invoices/${invoiceId}`,

  console.log(invoiceId);
  Instamojo.createPayment(data, function(error, response) {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not create payment request' });
      } else {
        console.log(response);
        const responseData =  JSON.parse( response );
        const redirectUrl = responseData.payment_request.longurl;
        console.log(redirectUrl);
        res.status(200).json({paymentUrl : redirectUrl});
    }
  });
  await collection.updateOne(
    { _id:new ObjectId(invoiceId) },
    {
      $set: {
        status: "paid",
      },
    }
  );
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
  }
  // Close the MongoDB connection
  client.close();
};
