


```
function (user, context, callback) {
  if (context.stats.loginsCount === 1) {
    user.is_singup = true; 
  } 
  callback(null, user, context);
}
```