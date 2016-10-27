var slidingCounter = require('./index');

slidingCounter.increment("mykey", 60, function(err, replies){
    console.info(new Date().toISOString() + " replies= " +replies);
});

slidingCounter.count("mykey", function(err, count){
    console.info(new Date().toISOString() + " count= " +count);
});

slidingCounter.increment("mykey", 60, function(err, replies){
    console.info(new Date().toISOString() + " replies= " +replies);
});

slidingCounter.count("mykey", function(err, count){
    console.info(new Date().toISOString() + " count= " +count);
});
