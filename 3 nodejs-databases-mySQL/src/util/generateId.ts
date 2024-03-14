function generateUniqueId(): string {
  // Generate a random number and convert it to base 36 (a-z + 0-9)
  const randomPart: string = Math.random().toString(36).substring(2);

  // Get the current timestamp in milliseconds
  const timestamp: number = new Date().getTime();

  // Concatenate the timestamp and random part
  const uniqueId: string = timestamp.toString(36) + randomPart;

  return uniqueId;
}

export default generateUniqueId;
