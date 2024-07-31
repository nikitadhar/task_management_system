import Image from "next/image";
import task from './assets/task.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col gap-6">
        <Image src={task} alt="task" width={100} />
        <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
        <TextField id="standard-basic" label="Email" variant="standard" fullWidth/>
        <TextField id="standard-basic" label="Password" variant="standard" fullWidth />
        </div>
        <div className="flex justify-between">
        <Button variant="text" className="normal-case">Signup</Button>
        <Button variant="text" className="normal-case">Forget Password</Button></div>
        </div>
      </div>
    </div>
  );
}
