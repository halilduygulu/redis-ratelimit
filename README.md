
  Sliding window counter using Redis

  It uses ZSET data type of Redis to count for every key. Multiple increments in a millisecond is supported.

  There are 3 implementations for Node.js, Java and Scala. You can add others with PR.

  
  Originally forked from https://github.com/chriskinsman/redis-ratelimit