import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';

// ioredis bağlantısı oluşturma
const connection = new IORedis({
  host: '127.0.0.1',
  port: 6379
});

// Worker oluşturma
const worker = new Worker('emailQueue', async (job: Job) => {
  console.log('İş alındı:', job.data);
}, {
  connection
});

// İş Tamamlandığında
worker.on('completed', (job) => {
  console.log(`Job with id ${job.id} completed!`);
});

// İş Başarısız Olduğunda
worker.on('failed', (job, err) => {
  console.log(`Job with id ${job?.id} failed with error: ${err.message}`);
});
