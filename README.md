# @mattinsler/garnish

A useful group of decorators

## Installation

```bash
$ npm install --save @mattinsler/garnish
```

## Usage

#### @concurrent(max-concurrent-executions)

Only allow a certain number of concurrent calls to a method. If the method
returns a promise, only `max-concurrent-executions` executions of that method
can be running at the same time. If the method is called more times
concurrently, an Error will be thrown.

```javascript
import { concurrent } from '@mattinsler/garnish'

class Foo {
  @concurrent(1)
  async update() {
    // do something that takes long
  }
}
```

#### @memoize

Ensure that a method is only called once per class instance. The return
value is saved and returned for all future calls. In order to not allow for
accidental RAM abuse, this will only work for methods that do not take any
parameters.

```javascript
import { memoize } from '@mattinsler/garnish'

class Foo {
  @memoize
  getConnection() {
    // establish connection and return a promise
  }

  async update() {
    const connection = await this.getConnection();
    // use connection
  }
}
```

#### @omit(...fields)

Remove fields from the return object. This will work for return values that
are plain objects or promises that return plain objects. This will also work
for single return values or arrays.

```javascript
import { omit } from '@mattinsler/garnish'

class User {
  @omit('_id', 'password')
  find(query) {
    return UserModel.find(query);
  }

  @omit('_id', 'password')
  findOne(query) {
    return UserModel.findOne(query);
  }
}
```

#### @view(viewConfigObject)

Mutates fields in the return object according to the viewConfigObject. This will
work for return values that are plain objects or promises that return plain objects.

There are 4 types of operations that you can use with the `@view` decorator.

- **Copy**: `{ 'to-key': 'from-key' }`
- **Rename**: `{ 'to-key': '!from-key' }`
- **Delete**: `{ key: 0 }` or `{ key: false }`
- **Compute**: `{ key: (object) => object.foo.bar * 3 }`

You can use any combination of operations in a single declaration. You can also
specify nested objects using `.` as a delimiter in either the key or value.

```javascript
import { view } from '@mattinsler/garnish'

class User {
  @view({
    id: '!_id',      // rename _id to id
    password: false  // delete password
    name: (user) => `${user.firstName} ${user.lastName}`, // compute name
    'accounts.github': 'github'  // copy { github } to { accounts: { github }}
  })
  findOne(query) {
    return UserModel.findOne(query);
  }
}
```
