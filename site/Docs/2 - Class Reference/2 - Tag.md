# Tag Class

---

The `Tag` class can be accessed as follows.

```js
// with es6 object destructuring
const { Tag } = require("ethernet-ip");

// or as follows
const ethernet = require("ethernet-ip");
const Tag = ethernet.Tag;
```

---

# Create New Instance

Making a new `Tag` instance

```js
/* new Tag(name[, program[, datatype]]) */

// controller scope
const controllerTag = new Tag("tagname");

// program scope
const progTag = new Tag("tagname", "progname");
```

> **NOTE**
>
> The `Tag` constructor also takes an optional third datatype (Number) argument

---

# Instance Properties

| Property             | Type                                                                                          | Description                                                     |
| :------------------- | :-------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| name                 | String                                                                                        | Gets/Sets tag name                                              |
| Type[^first]         | Number                                                                                        | Gets/Sets tag datatype - must be a valid CIP typecode           |
| Read_size[^second]   | Number                                                                                        | Gets/Sets tag read size if array                                |
| value                | n/a[^third]                                                                                   | Gets/Sets Tag Value                                             |
| controller_value     | n/a[^third]                                                                                   | Gets last read or written tag value from _controller_ instance  |
| timestamp            | String                                                                                        | Gets a formatted timestamp of last update to _controller_value_ |
| timestamp_raw        | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | Gets timestamp of last update to _controller_value_             |
| error                | Error                                                                                         | Gets error if one is present                                    |
| path                 | Buffer                                                                                        | Gets CIP EPATH generated tag name is set                        |
| write_ready[^fourth] | Boolean                                                                                       | Gets whether or not a tag write is staging                      |

All properties listed below can be accessed as follows:

```js
// instatiate a tag
const tag = new Tag("tagname");

console.log(tag.<property>); // logs return from property accessor to console
```

> **NOTE**
>
> Currently only _Atomic_ types are supported (DINT, SINT, INT, BOOL, REAL). Not to worry, Arrays, UDTs, and Strings are on the roadmap! 👍

---

# Instance Methods

| Method                      | Description                                  |
| :-------------------------- | :------------------------------------------- |
| generateReadMessageRequest  | Returns a read tag message request buffer    |
| parseReadMessageResponse    | Parses an incoming read tag message response |
| generateWriteMessageRequest | Returns a write tag message request buffer   |
| unstageWriteRequest         | Unstages a write value                       |

### generateReadMessageRequest(size)

| Arg           | Type   | Default[^fifth] | Description                           |
| :------------ | :----- | :-------------- | :------------------------------------ |
| size[^second] | Number | `null`          | Length of data to read (for an Array) |

| Return  | Type   | Description                        |
| :------ | :----- | :--------------------------------- |
| ReadMSG | Buffer | Read tag request buffer to be sent |

### parseReadMessageResponse(data)

| Arg  | Type   | Description       |
| :--- | :----- | :---------------- |
| Data | Buffer | Data to be parsed |

### generateWriteMessageRequest([value[, size]])

| Arg           | Type   | Default[^fifth] | Description                            |
| :------------ | :----- | :-------------- | :------------------------------------- |
| value         | Number | `null`          | Value to write to                      |
| size[^second] | Number | `0x01`          | Length of data to write (for an Array) |

> **NOTE**
>
> If no value is provided then the message buffer will be generated with the _staged_ value if one exists.

| Return   | Type   | Description                         |
| :------- | :----- | :---------------------------------- |
| WriteMSG | Buffer | Write tag request buffer to be sent |

### unstageWriteRequest()

This method will set the `staged-change` bit to false and reset `value` to `controller_value`.

---

# Tag Events

| Event       | Description                                         |
| :---------- | :-------------------------------------------------- |
| Initialized | Emitted after the first successful read from target |
| Changed     | Emitted if the tag value in the target changes      |

```js
// catch the tag initialized event
tag1.on("Initialized", tag => {
    console.log(tag.value);
});

tag1.on("Changed", (tag, lastValue) => {
    console.log(tag.value);
});
```

---

# Static Methods

| Method         | Description                                                |
| :------------- | :--------------------------------------------------------- |
| isValidTagname | Returns whether or not the passed name is a valid tag name |

```js
// Tag Static Methods

Tag.isValidTagname("1234hello");
// returns false

Tag.isValidTagname("SomeTag");
// returns true
```

### generateReadMessageRequest

| Arg     | Type   | Default[^fifth] | Description        |
| :------ | :----- | :-------------- | :----------------- |
| tagname | String | n/a             | Named to be tested |

| Return  | Type    | Description |
| :------ | :------ | :---------- |
| isValid | Boolean | Test result |

[^first]: Only _Atomic_ types are supported as of `v1.1.0`
[^second]: Array support is not implemented as `v1.1.0`. _This feature is on the roadmap._
[^third]: Dependent on Tag type as defined by the _type_ property.
[^fourth]: Will be true if the user manually set the _value_ property.
[^fifth]: If a default other than `n/a` is shown then the argument is _optional_
