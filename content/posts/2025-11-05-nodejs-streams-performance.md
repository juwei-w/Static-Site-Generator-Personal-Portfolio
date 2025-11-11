---
title: "Mastering Node.js Streams for Better Performance"
date: 2025-11-05
status: published
description: "Learn how Node.js streams can dramatically improve your application's performance when handling large datasets."
author: "Wong Ju Wei"
slug: "nodejs-streams-performance"
---

# Mastering Node.js Streams for Better Performance

If you're working with large files or data sets in Node.js, understanding streams is crucial for building performant applications.

## What Are Streams?

Streams are collections of data that might not be available all at once. Instead of loading an entire file into memory, streams let you process data piece by piece.

## Why Use Streams?

### Memory Efficiency
Without streams, reading a 1GB file would require 1GB of memory. With streams, you might only need a few KB at a time.

### Time Efficiency
You can start processing data as soon as the first chunk arrives, rather than waiting for the entire dataset.

## Types of Streams

Node.js provides four types of streams:

1. **Readable**: For reading data (e.g., fs.createReadStream)
2. **Writable**: For writing data (e.g., fs.createWriteStream)
3. **Duplex**: Both readable and writable (e.g., net.Socket)
4. **Transform**: Can modify data as it's read or written

## Practical Example

Here's a simple example of using streams to copy a large file:

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('copy.txt');

readStream.pipe(writeStream);
```

This uses minimal memory regardless of file size!

## Real-World Use Cases

I've used streams for:
- Processing large CSV files
- Video streaming applications
- Log file analysis
- Data transformation pipelines

## Performance Tips

1. Always handle errors on streams
2. Use `pipeline()` for better error handling
3. Consider backpressure when writing to streams
4. Use Transform streams for data manipulation

## Conclusion

Streams are a powerful feature of Node.js that every developer should understand. They're essential for building scalable, efficient applications.

Have questions about streams? Drop me a message!
