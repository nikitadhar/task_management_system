import clientPromise from '../../lib/connection'
interface UpdateData {
  title: string,
  description: string,
  status: boolean,
}

export async function POST(req: Request) { 
  try {
    const { title, description }: UpdateData = await req.json();
    const client = await clientPromise;
    const record = await client.db().collection("todo").insertOne({
      title: title,
      description: description,
      status: "to do",
      createdAt: new Date().toISOString()
    });

    return  Response.json({ id: record.insertedId });
  } catch (error: any) {
    console.log("error......",error)
    return Response.json({ message: `Webhook error: ${error.message}` });
  }
}
export async function GET(req:Request){
  try {
    const client = await clientPromise;
    const records = await client.db().collection("todo").find().toArray();
    return  Response.json({records});
  } catch (error: any) {
    return Response.json({ message: `Webhook error: ${error.message}` });
  }
}