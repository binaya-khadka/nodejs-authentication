# Nodejs Authentication and Authorization

## Password Hashing using bcryptjs

### install the pacakge

```bash
npm install bcryptjs --save
npm install @types/bcryptjs --save-dev
```

### import the package

```typescript
import * as bcrypt from 'bcryptjs';
```

### hash the password

```typescript
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
```

### compare the password

```typescript
const validPassword = await bcrypt.compare(password, user.password);
```

## JWT Authentication

### install the package

```bash
npm install jsonwebtoken --save
npm install @types/jsonwebtoken --save-dev
```

### import the package

```typescript
import * as jwt from 'jsonwebtoken';
```

### generate the token

```typescript

const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
res.header('auth-token', token).send(token);
```


## JWT Authorization

### install the package

```bash
npm install express-jwt --save
npm install @types/express-jwt --save-dev
```

### import the package

```typescript
import * as jwt from 'jsonwebtoken';
import * as expressJwt from 'express-jwt';
```

### create the middleware

```typescript
export function authJwt() {
  const secret = process.env.TOKEN_SECRET;
  return expressJwt({ secret, algorithms: ['HS256'] });
}
```

### use the middleware

```typescript
router.get('/profile', authJwt(), async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).send('User not found');
  res.send(user);
});
```

## Role Based Authorization

### create the middleware

```typescript

export function authJwt() {
  const secret = process.env.TOKEN_SECRET;
  return expressJwt({ secret, algorithms: ['HS256'] });
}

export function authRole(role: string) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401).send('Not authorized');
      return;
    }
    next();
  };
}
```

### use the middleware

```typescript
router.get('/admin', authJwt(), authRole('admin'), async (req, res) => {
  res.send('Admin');
});
```
