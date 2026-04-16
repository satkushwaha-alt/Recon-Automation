export async function logMemory(step:string) {
  const used = process.memoryUsage();
  console.log(`--- Memory at ${step} ---`);
  for (let key in used) {
    console.log(`${key}: ${Math.round(used[key as keyof typeof used] / 1024 / 1024 * 100) / 100} MB`);
  }
}