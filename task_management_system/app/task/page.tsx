import { Suspense } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
export default async function Page() {
  const statuses: string[] = ['pending', 'completed', 'In progress'];
  return (
    <main>
      <h1 className='mb-4 text-xl md:text-2xl'>
        Task
      </h1>
      <div className='flex gap-5 md:justify-between flex-wrap'>
      {statuses.map((data) => (
        <Card sx={{ display: 'flex' }} key={data} className='min-h-5'>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h6">
                {data} Live From Space
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ))}
    </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">

      </div>
    </main>
  );
}