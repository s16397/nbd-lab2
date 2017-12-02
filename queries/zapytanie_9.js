db
.people
.updateMany(
{"first_name" : "Moscow"},
{$set: {"hobby" : "ping-pong"}}
)