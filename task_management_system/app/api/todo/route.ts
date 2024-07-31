import clientPromise from '../../lib/connection';
import { ObjectId } from 'mongodb';
interface UpdateData {
  id:string,
  title: string,
  description: string,
  status: boolean,
}

export async function POST(req: Request) { 
  try {
    const { title, description }: UpdateData = await req.json();
    const client = await clientPromise;
    const record = await client.db().collection("task").insertOne({
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
    const records = await client.db().collection("task").find().toArray();
    return  Response.json({records});
  } catch (error: any) {
    return Response.json({ message: `Webhook error: ${error.message}` });
  }
}
export async function PATCH(req:Request){
  try {
    const {id, title, description, status }: UpdateData = await req.json(); 
    console.log(id)
    const client = await clientPromise;
    const records = await client.db().collection("task").findOne({ _id: new ObjectId(id) });
    console.log("records",records)
    if(!records){
      return  Response.json("Data doesn't exist");
    }
    const updateData: Record<string, any> = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;

    const result = await client.db().collection("task").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
  );
    return  Response.json({result});
  } catch (error: any) {
    return Response.json({ message: `Webhook error: ${error.message}` });
  }
}

export async function DELETE(req: Request) {
    try {
        const { id }: UpdateData = await req.json();
        console.log(id);
        const client = await clientPromise;
        const records =  await client.db().collection("task").findOne({ _id: new ObjectId(id) });
        console.log("records", records);

        if (!records) {
            return Response.json({ message: "Data doesn't exist" }, { status: 404, statusText: 'Not Found' });
        }

        const result =  await client.db().collection("task").deleteOne({ _id: new ObjectId(id) });

        return Response.json({ status: 'success', data: result });
    } catch (error: any) {
        console.error(error);
        return Response.json({ message: `Webhook error: ${error.message}` }, { status: 500, statusText: 'Internal Server Error' });
    }
}
