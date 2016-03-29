# Demo implementing progressive profiling

In order to skip the profiling step after the signup, this rule needs to be created in your account. It will add a flag to the user profile only after signup.

```
function (user, context, callback) {
  if (context.stats.loginsCount === 1) {
    user.is_singup = true; 
  } 
  callback(null, user, context);
}
```